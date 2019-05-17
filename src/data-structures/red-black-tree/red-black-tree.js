'use strict';

const Node = require('./red-black-tree-node.js');

class RedBlackTree {
  constructor() {
    this.root = null;
  }

  insert(rawValue) {
    if (!this.isNumericInput(rawValue)) { return undefined; }
    const value = Number(rawValue);
    const newNode = new Node(value);

    if (this.treeIsEmpty()) {
      this.root = newNode;
      newNode.color = 'black';
      return newNode;
    }
    
    // insert node reguarly
    let success = this.addNodeToTree(newNode);
    if(!success) { return undefined; }

    this.fixAfterInsertion(newNode);
    return newNode;
  }

  remove(rawValue) {
    if (!this.isNumericInput(rawValue)) { return undefined; }

    const value = Number(rawValue);
    let target = this.navigateToNode(value);
    if (!target) { return undefined; } // value doesn't exist
    let result = target.value;
    this.handleRemove(target);

    return result;
  }

  handleRemove(target) {
    // cases:
    // red w 0 child          (case A)
    // red w 2 child          (***6 base cases)
    // black w 0 child        (***6 base cases)
    // black w 1 red child    (case B)
    // black w 2 child        (***6 base cases)
    // red w 0 child          <-- impossible
    // black w 1 black child  <-- impossible
    if (this.isRedWithNoChildren(target)) { // terminal
      this.deleteLeaf(target);
    } else if (this.isBlackWithOnlyOneRedChild(target)){ // terminal
      this.handleRemoveBlackWithOneRedChild(target);
    } else if (this.hasTwoChildren(target)) {
      let replacementDir = this.pickASide();
      let replacementNode = this.getReplacementNode(target, replacementDir);
      this.swapNodeValues(replacementNode, target);
      if (this.isRedWithNoChildren(replacementNode)) { // terminal
        this.deleteLeaf(replacementNode);
      } else if (this.isBlackWithOnlyOneRedChild(replacementNode)){ // terminal
        this.handleRemoveBlackWithOneRedChild(replacementNode);
      } else {
        this.handle_Six_Cases(replacementNode);
        this.cleanupFinalNode(replacementNode);
      }
    } else {
      // black w 0 children
      this.handle_Six_Cases(target);
      this.cleanupFinalNode(target);
    }
  }

  addNodeToTree(newNode) {
    if (this.treeIsEmpty()) {
      this.root = newNode;
      newNode.color = 'black';
      return newNode;
    }

    let current = this.root;
    let value = newNode.value;
    while (true) {
      if (!current.left && value < current.value) { // base case
        current.left = newNode;
        newNode.parent = current;
        break;
      } else if (!current.right && value > current.value) { // base case
        current.right = newNode;
        newNode.parent = current;
        break;
      } else if (current.left && value < current.value) { // go left
        current = current.left;
      } else if (current.right && value > current.value) { // go right
        current = current.right;
      } else if (value === current.value) {
        return undefined; // value already in tree
      }
    }
    return newNode;
  }

  fixAfterInsertion(n) {
    let {p, u, g, ggp} = this.getAncestors_Insert(n);

    if (n === this.root && this.getColor(this.root) === 'red') {
      // node is root, and root is red, color black and done
      this.root.color = 'black';
    } else if (this.getColor(p) === 'black') {
      // node is red and parent is black, do nothing
    } else if (this.getColor(u) === 'red' && this.getColor(p) === 'red') {
      // parent is red and uncle is red, recolor: g , p, and u
      p.color = 'black';
      u.color = 'black';
      g.color = 'red';
      this.fixAfterInsertion(g);
    } else if (this.getColor(u) === 'black' && this.getColor(p) === 'red') {
      // parent is red, and uncle is black
      // cases:
      //      G       |      G  
      //    P   U     |    U   P        
      //  N           |          N        
      if (g.right === p && g.left === u && p.right === n) {
        this.singleLeft_Insert(n);
      }
      if (g.left === p && g.right === u && p.left === n) {
        this.singleRight_Insert(n);
      }
      // cases:
      //      G            |         G
      //    P   U          |      U    P
      //     N             |          N
      if (g.left === p && g.right === u && p.right === n) {
        this.doubleLeft_Insert(n);
      }
      if (g.right === p && g.left === u && p.left === n) {
        this.doubleRight_Insert(n);
      }
    }
  }

  navigateToNode(value) {
    let current = this.root;

    if (this.treeIsEmpty()) {
      return undefined;
    }
    while(true) {
      if (value < current.value) {
        if (current.left) {
          current = current.left;
        } else {
          return undefined; // value doesn't exist
        }
      } else if (value > current.value) {
        if (current.right) {
          current = current.right;
        } else {
          return undefined; // value doesn't exist
        }
      } else { // value found
        return current;
      }
    }
  }

  deleteLeaf(node) {
    if (node === this.root) {
      this.root = null;
    } else if (node.parent.left === node) {
      node.parent.left = null;
    } else if (node.parent.right === node) {
      node.parent.right = null;
    }
    return node;
  }

  handleRemoveBlackWithOneRedChild(target) {
    let replacementNode;
    if (target.left) {
      replacementNode = target.left;
    } else {
      replacementNode = target.right;
    }

    let nodeDir = this.getNodeDirection(target);
    target.parent[nodeDir] = replacementNode;

    replacementNode.color = 'black';
    replacementNode.parent = target.parent;
    return replacementNode;
  }

  getReplacementNode(target, replacementDir) {
    if (replacementDir === 'left') {
      return this.getMaxNode(target.left);
    } else { // right
      return this.getMinNode(target.right);
    }
  }

  swapNodeValues(incomingNode, outgoingNode) {
    let incomingVal = incomingNode.value;
    let outgoingVal = outgoingNode.value;

    outgoingNode.value = incomingVal;
  }

  handle_Six_Cases(target) {
    if (this.case1(target)) { // terminal
      // do nothing
    } else if (this.case2(target)) {
      this.handleCase2(target);
    } else if (this.case3(target)) {
      this.handleCase3(target);
    } else if (this.case4(target)) { // terminal
      this.handleCase4(target);
    } else if (this.case5(target)) {
      this.handleCase5(target);
    } else if (this.case6(target)) { // terminal
      this.handleCase6(target);
    }
  }

  case1(n) {
    // node is root, and root is black
    return (n === this.root && this.root.color === 'black');
  }
  case2(n) {
    // P is black, S is red w/ 2 black children
    let {p, s, sl, sr} = this.getAncestors_Remove(n);
    return (
      this.getColor(p) === 'black' &&
      this.getColor(s) === 'red' &&
      this.getColor(sl) === 'black' &&
      this.getColor(sr) === 'black');
  }
  case3(n) {
    // P is black, S is black w/ 2 black children
    let {p, s, sl, sr} = this.getAncestors_Remove(n);
    return (
      this.getColor(p) === 'black' &&
      this.getColor(s) === 'black' &&
      this.getColor(sl) === 'black' &&
      this.getColor(sr) === 'black');
  }
  case4(n) {
    // P is red, S is black w/ 2 black children
    let {p, s, sl, sr} = this.getAncestors_Remove(n);
    return (
      this.getColor(p) === 'red' &&
      this.getColor(s) === 'black' &&
      this.getColor(sl) === 'black' &&
      this.getColor(sr) === 'black');
  }
  case5(n) {
    // P is black, S is black, S has red left child, black right child
    let {p, s, sl, sr} = this.getAncestors_Remove(n);

    let nodeDir = this.getNodeDirection(n);
    let sibDir = this.getSiblingDirection(n);

    return (
      this.getColor(p) === 'black' &&
      this.getColor(s) === 'black' &&
      this.getColor(s[nodeDir]) === 'red' &&
      this.getColor(s[sibDir]) === 'black');
  }
  case6(n) {
    // S is black, S has red child away-from-node
    //  del: 5             |  del: 9
    //       10x           |          8x            
    //    5b     30b       |       5b    9b          
    //         25x   40r   |    4r   6x          
    let {p, s, sl, sr} = this.getAncestors_Remove(n);

    let sibDir = this.getSiblingDirection(n);
    return (
      this.getColor(s) === 'black' &&
      this.getColor(s[sibDir]) === 'red');
  }

  handleCase2(n) {
    // single rotation toward node at P, make P red, make S black
    // rotate child: S
    let {p, s, sl, sr} = this.getAncestors_Remove(n);
    let nodeDir = this.getNodeDirection(n);
    this.singleRotation(s, nodeDir);
    p.color = 'red';
    s.color = 'black'; 
    this.handle_Six_Cases(n);
  }
  handleCase3(n) {
    // make S red, new problem node is P
    let {p, s, sl, sr} = this.getAncestors_Remove(n);
    s.color = 'red';
    this.handle_Six_Cases(p);
  }
  handleCase4(n) {
    // make P black, make S red
    let {p, s, sl, sr} = this.getAncestors_Remove(n);
    p.color = 'black';
    s.color = 'red';
  }
  handleCase5(n) {
    // rotation at S away from N, make S red and sl black
    // rotate child: sl
    let {p, s, sl, sr} = this.getAncestors_Remove(n);
    let sibDir = this.getSiblingDirection(n);
    if (sibDir === 'left') {
      this.singleRotation(sr, sibDir);
    } else {
      this.singleRotation(sl, sibDir);
    }
    s.color = 'red';
    let nodeDir = this.getNodeDirection(n);
    if (nodeDir === 'left') {
      sl.color = 'black';
    } else {
      sr.color = 'black';
    }
    this.handle_Six_Cases(n);
  }
  handleCase6(n) {
    // rotation at P toward N, make S color of P, sr black
    // rotate child: s
    let {p, s, sl, sr} = this.getAncestors_Remove(n);
    let nodeDir = this.getNodeDirection(n);
    let sibDir = this.getSiblingDirection(n);
    this.singleRotation(s, nodeDir);
    s.color = p.color;
    p.color = 'black';
    s[sibDir].color = 'black';
  }

  cleanupFinalNode(node) {
    if (node === this.root) {
      this.root = null;
    } else {
      let nodeDir = this.getNodeDirection(node);
      node.parent[nodeDir] = null;
    }
  }

  singleRotation(node, dir){
    if (dir === 'left') {
      return this.singleLeft_Remove(node);
    } else {
      return this.singleRight_Remove(node);
    }
  }

  singleLeft_Remove(n) {
    let  {p, g, s} = this.getAncestors_Insert(n);
    if ( p === this.root) {
      this.root = this.left_rotation(n, p);
      n.parent = null;
    } else {
      if (g.right === p) {
        g.right = this.left_rotation(n, p);
      } else {
        g.left = this.left_rotation(n, p);
      }
      n.parent = g;
    }
  }

  singleRight_Remove(n) {
    let  {p, g, s} = this.getAncestors_Insert(n);
    if ( p === this.root) {
      this.root = this.right_rotation(n, p);
      n.parent = null;
    } else {
      if (g.right === p) {
        g.right = this.right_rotation(n, p);
      } else {
        g.left = this.right_rotation(n, p);
      }
      n.parent = g;
    }
  }

  singleLeft_Insert(n) {
    let {p, u, g, ggp} = this.getAncestors_Insert(n);
    if (g === this.root) {
      this.root = this.left_rotation(p, g);
      p.parent = null;
    } else {
      if (ggp.left === g) {
        ggp.left = this.left_rotation(p, g);
      } else {
        ggp.right = this.left_rotation(p, g);
      }
      p.parent = ggp;
    }
    g.parent = p;
    p.color = 'black';
    g.color = 'red';
  }

  singleRight_Insert(n) {
    let {p, u, g, ggp} = this.getAncestors_Insert(n);
    if (g === this.root) {
      this.root = this.right_rotation(p,g);
      p.parent = null;
    } else {
      if (ggp.left === g) {
        ggp.left = this.right_rotation(p,g);
      } else {
        ggp.right = this.right_rotation(p,g);
      }
      p.parent = ggp;
    }
    g.parent = p;
    p.color = 'black';
    g.color = 'red';
  }

  doubleLeft_Insert(n) {
    let {p, u, g, ggp} = this.getAncestors_Insert(n);
    g.left = this.left_rotation(n, p);
    if (g === this.root) {
      this.root = this.right_rotation(n, g);
      n.parent = null;
    } else {
      if (ggp.left === g) {
        ggp.left = this.right_rotation(n, g);
      } else {
        ggp.right = this.right_rotation(n, g);
      }
      n.parent = ggp;
    }
    p.parent = n;
    g.parent = n;
    n.color = 'black';
    g.color = 'red';
  }

  doubleRight_Insert(n) {
    let {p, u, g, ggp} = this.getAncestors_Insert(n);
    g.right = this.right_rotation(n, p);
    if (g === this.root) {
      this.root = this.left_rotation(n, g);
      n.parent = null;
    } else {
      if (ggp.left === g) {
        ggp.left = this.left_rotation(n, g);
      } else {
        ggp.right = this.left_rotation(n, g);
      }
      n.parent = ggp;
    }
    p.parent = n;
    g.parent = n;
    n.color = 'black';
    g.color = 'red';
  }

  right_rotation(node, parent) {
    parent.left = node.right;
    if (node.right) { node.right.parent = parent; }
    node.right = parent;
    parent.parent = node;
    return node;
  }
  
  left_rotation(node, parent) {
    parent.right = node.left;
    if (node.left) { node.left.parent = parent; }
    node.left = parent;
    parent.parent = node;
    return node;
  }

  getMaxNode(node) {
    let current = node;
    while (current && current.right) {
      current = current.right;
    }
    return current;
  }

  getMinNode(node) {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  getSiblingDirection(node) {
    if (node && node.parent && node.parent.left === node) {
      return 'right';
    } else {
      return 'left';
    }
  }

  getNodeDirection(node) {
    if (node && node.parent && node.parent.left === node) {
      return 'left';
    } else {
      return 'right';
    }
  }

  isRedWithNoChildren(node) {
    return (!node.left && !node.right && node.color === 'red');
  }

  isBlackWithOnlyOneRedChild(node) {
    if (node.color === 'black') {
      if (this.hasTwoChildren(node)) { return false; }
      if (node.left && node.left.color === 'red') { return true; }
      if (node.right && node.right.color === 'red') { return true; }
    }
    return false;
  }

  hasTwoChildren(node) {
    return (node.left && node.right);
  }

  pickASide() {
    const roll = Math.random();
    if (roll > 0.5) {
      return 'left';
    }
    return 'right';
  }

  getAncestors_Insert(n) {
    let p = this.getParent(n);
    let u = this.getUncle(n);
    let g = this.getGrandParent(n);
    let ggp = this.getGreatGrandParent(n);
    return {p, u, g, ggp};
  }

  getAncestors_Remove(n) {
    let p = this.getParent(n);
    let s = this.getSibling(n);
    let sl = this.getSiblingLeftChild(n);
    let sr = this.getSiblingRightChild(n);
    return {p, s, sl, sr};
  }

  getColor(node) {
    if (node === undefined) {
      return undefined;
    }
    if (node === null) {
      return 'black';
    }
    return node.color;
  }

  getParent(node) {
    if (node) {
      return node.parent;
    }
    return undefined;
  }
  
  getGrandParent(node) {
    if (node && node.parent && node.parent.parent) { 
      return node.parent.parent;
    }
    return undefined;
  }

  getUncle(node) {
    // returning null signifies empty child
    if (node === undefined) {
      return undefined;
    }
    let P = this.getParent(node);
    let GP = this.getGrandParent(node);
    if (GP) { // if no grandparent, no uncle
      if (GP.left === P) {
        return GP.right;
      } else {
        return GP.left;
      }
    }
    // returning undefined signals no GP
    return undefined;
  }

  getGreatGrandParent(node) {
    if (node === undefined) {
      return undefined;
    }
    let GP = this.getGrandParent(node);
    if (GP) {
      return this.getParent(GP);
    }
    return undefined;
  }

  getSibling(node) {
    if (node === undefined || !node.parent) {
      return undefined;
    }
    let sibDir = this.getSiblingDirection(node);
    return node.parent[sibDir]; // could return null
  }

  getSiblingLeftChild(node) { return this.getSiblingChild(node, 'left'); }
  getSiblingRightChild(node) { return this.getSiblingChild(node, 'right'); }

  getSiblingChild(node, childDir) {
    if (node === undefined || !node.parent) {
      return undefined;
    }
    let sibDir = this.getSiblingDirection(node);
    if (node.parent[sibDir]) {
      return node.parent[sibDir][childDir];
    }
    return undefined;
  }

  treeIsEmpty() {
    if (!this.root) { return true; }
    return false;
  }

  isNumericInput(value) {
    if (typeof value === 'boolean') { return false; }

    const numericalValue = Number(value);

    if (Number.isNaN(numericalValue)) { return false; }

    if (typeof numericalValue === 'number') { return true; }
    return false;
  }

  printPreOrder() {
    const result = [];

    function go(node) {
      if (!node) { return; }
      result.push(node.value);
      go(node.left);
      go(node.right);
    }

    go(this.root);
    return result;
  }

  printInOrder() {
    const result = [];

    function go(node) {
      if (!node) { return; }
      go(node.left);
      result.push(node.value);
      go(node.right);
    }

    go(this.root);
    return result;
  }

  printPostOrder() {
    const result = [];

    function go(node) {
      if (!node) { return; }
      go(node.left);
      go(node.right);
      result.push(node.value);
    }

    go(this.root);
    return result;
  }

  generateAllPaths() {
    let paths = [];
    let path = [];
    const go = (node) => {
      if (node) {
        path.push(node);
      } else { // base case, node === null
        paths.push([...path]);
        return;
      }

      go(node.left);
      go(node.right);
      path.pop(); // remove last value from path
    }
    go(this.root);
    return paths;
  }

  allPathsAreValid() {
    let paths = this.generateAllPaths();
    if (paths.length === 1) { return true; }

    let isValid = true;
    let targetBlackPathLength;

    paths.forEach( (path, i) => {
      
      let blackPathLength = 0;
      path.forEach( (node, j) => {
        // root must be black
        if (j === 0 && this.getColor(node) === 'red') {
          isValid = false;
          console.log(`node: `, node);
          throw new Error('root is red');
        }
        if (this.getColor(node) === 'black') {
          blackPathLength += 1;
        }
        // if node is red, both children must be black (or null)
        if (this.getColor(node) === 'red') {
          if (this.getColor(node.left) === 'red') {
            isValid = false;
            console.log(`node.value: `, node.value);
            throw new Error('red node has red left child');
          }
          if (this.getColor(node.right) === 'red') {
            isValid = false;
            throw new Error('red node has red right child');
          }
        }
      });

      // black length must be equal at all leaves
      if (i === 0) {
        targetBlackPathLength = blackPathLength;
      } else if (blackPathLength !== targetBlackPathLength) {
        isValid = false;
        throw new Error('black pathlengths are not all equal');
      }
    });

    return isValid;
  }

  allParentPointersAreValid() {
    let pointersAreCorrect = true;
    if (!this.root) {
      return true;
    }
    const go = (node) => {
      if (node.left && node.left.parent !== node) {
        pointersAreCorrect = false;
      }
      if (node.right && node.right.parent !== node) {
        pointersAreCorrect = false;
      }

      if (node.left) { go(node.left) };
      if (node.right) { go(node.right) };
    }
    go(this.root);

    return pointersAreCorrect;
  }

  getNodeColor(letter) {
    if ( letter === 'r') {
      return 'red';
    } else {
      return 'black';
    }
  }

  constructTestTree(arr) {
    let nodes = [];
    for (let i = 0; i < arr.length; i++) {
      let nodeVal = Number(arr[i].match(/-?\d+/)[0]);
      let nodeColor = this.getNodeColor(arr[i].slice(-1));
      let newNode = new Node(nodeVal);
      newNode.color = nodeColor;
      nodes.push(newNode);
    }
    for (let i = 0; i < nodes.length; i++){
      this.addNodeToTree(nodes[i]);
    }
  }
}

module.exports = RedBlackTree;