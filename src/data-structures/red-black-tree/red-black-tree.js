/* eslint-disable class-methods-use-this */
/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */

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
    const success = this.addNodeToTree(newNode);
    if (!success) { return undefined; }

    this.fixAfterInsertion(newNode);
    return newNode;
  }

  remove(rawValue) {
    if (!this.isNumericInput(rawValue)) { return undefined; }

    const value = Number(rawValue);
    const target = this.navigateToNode(value);
    if (!target) { return undefined; } // value doesn't exist
    const result = target.value;
    this.handleRemove(target);
    return result;
  }

  handleEasyTerminalCases(target) {
    if (this.isRedWithNoChildren(target)) { // terminal
      this.deleteLeaf(target);
    } else if (this.isBlackWithOnlyOneRedChild(target)) { // terminal
      this.handleRemoveBlackWithOneRedChild(target);
    } else {
      this.handleSixCases(target);
      this.cleanupFinalNode(target);
    }
  }

  reduceTwoChildProblem(target) {
    const replacementDir = this.pickASide();
    const replacementNode = this.getReplacementNode(target, replacementDir);
    this.swapNodeValues(replacementNode, target);
    return replacementNode;
  }

  handleRemove(target) {
    if (this.hasTwoChildren(target)) {
      // reduce the 2-child problem to a 1 or 0 child problem, then re-run
      const newTarget = this.reduceTwoChildProblem(target);
      this.handleRemove(newTarget);
    } else if (this.isRedWithNoChildren(target)) { // terminal
      this.deleteLeaf(target);
    } else if (this.isBlackWithOnlyOneRedChild(target)) { // terminal
      this.handleRemoveBlackWithOneRedChild(target);
    } else {
      // black w 0 children
      this.handleSixCases(target);
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
    const val = newNode.value;
    while (true) {
      if (!current.left && val < current.value) { // base case
        current.left = newNode;
        newNode.parent = current;
        break;
      } else if (!current.right && val > current.value) { // base case
        current.right = newNode;
        newNode.parent = current;
        break;
      } else if (current.left && val < current.value) { // go left
        current = current.left;
      } else if (current.right && val > current.value) { // go right
        current = current.right;
      } else if (val === current.value) {
        return undefined; // value already in tree
      }
    }
    return newNode;
  }

  fixAfterInsertion(n) {
    const { p, u, g } = this.getAncestors(n);

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
        this.singleLeftInsert(n);
      }
      if (g.left === p && g.right === u && p.left === n) {
        this.singleRightInsert(n);
      }
      // cases:
      //      G            |         G
      //    P   U          |      U    P
      //     N             |          N
      if (g.left === p && g.right === u && p.right === n) {
        this.doubleLeftInsert(n);
      }
      if (g.right === p && g.left === u && p.left === n) {
        this.doubleRightInsert(n);
      }
    }
  }

  navigateToNode(value) {
    let current = this.root;

    if (this.treeIsEmpty()) {
      return undefined;
    }
    while (true) {
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

    const nodeDir = this.getNodeDirection(target);
    target.parent[nodeDir] = replacementNode;

    replacementNode.color = 'black';
    replacementNode.parent = target.parent;
    return replacementNode;
  }

  getReplacementNode(target, replacementDir) {
    if (replacementDir === 'left') {
      return this.getMaxNode(target.left);
    }
    return this.getMinNode(target.right);
  }

  swapNodeValues(incomingNode, outgoingNode) {
    const incomingVal = incomingNode.value;
    outgoingNode.value = incomingVal;
  }

  handleSixCases(target) {
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
    const { p, s, sl, sr } = this.getAncestors(n);
    return (
      this.getColor(p) === 'black'
      && this.getColor(s) === 'red'
      && this.getColor(sl) === 'black'
      && this.getColor(sr) === 'black');
  }

  case3(n) {
    // P is black, S is black w/ 2 black children
    const { p, s, sl, sr } = this.getAncestors(n);
    return (
      this.getColor(p) === 'black'
      && this.getColor(s) === 'black'
      && this.getColor(sl) === 'black'
      && this.getColor(sr) === 'black');
  }

  case4(n) {
    // P is red, S is black w/ 2 black children
    const { p, s, sl, sr } = this.getAncestors(n);
    return (
      this.getColor(p) === 'red'
      && this.getColor(s) === 'black'
      && this.getColor(sl) === 'black'
      && this.getColor(sr) === 'black');
  }

  case5(n) {
    // P is black, S is black, S has red left child, black right child
    const { p, s } = this.getAncestors(n);

    const nodeDir = this.getNodeDirection(n);
    const sibDir = this.getSiblingDirection(n);

    return (
      this.getColor(p) === 'black'
      && this.getColor(s) === 'black'
      && this.getColor(s[nodeDir]) === 'red'
      && this.getColor(s[sibDir]) === 'black');
  }

  case6(n) {
    // S is black, S has red child away-from-node
    //  del: 5             |  del: 9
    //       10x           |          8x
    //    5b     30b       |       5b    9b
    //         25x   40r   |    4r   6x
    const { s } = this.getAncestors(n);

    const sibDir = this.getSiblingDirection(n);
    return (
      this.getColor(s) === 'black'
      && this.getColor(s[sibDir]) === 'red');
  }

  handleCase2(n) {
    // single rotation toward node at P, make P red, make S black
    // rotate child: S
    const { p, s } = this.getAncestors(n);
    const nodeDir = this.getNodeDirection(n);
    this.singleRotation(s, nodeDir);
    p.color = 'red';
    s.color = 'black';
    this.handleSixCases(n);
  }

  handleCase3(n) {
    // make S red, new problem node is P
    const { p, s } = this.getAncestors(n);
    s.color = 'red';
    this.handleSixCases(p);
  }

  handleCase4(n) {
    // make P black, make S red
    const { p, s } = this.getAncestors(n);
    p.color = 'black';
    s.color = 'red';
  }

  handleCase5(n) {
    // rotation at S away from N, make S red and sl black
    // rotate child: sl
    const { s, sl, sr } = this.getAncestors(n);
    const sibDir = this.getSiblingDirection(n);
    if (sibDir === 'left') {
      this.singleRotation(sr, sibDir);
    } else {
      this.singleRotation(sl, sibDir);
    }
    s.color = 'red';
    const nodeDir = this.getNodeDirection(n);
    if (nodeDir === 'left') {
      sl.color = 'black';
    } else {
      sr.color = 'black';
    }
    this.handleSixCases(n);
  }

  handleCase6(n) {
    // rotation at P toward N, make S color of P, sr black
    // rotate child: s
    const { p, s } = this.getAncestors(n);
    const nodeDir = this.getNodeDirection(n);
    const sibDir = this.getSiblingDirection(n);
    this.singleRotation(s, nodeDir);
    s.color = p.color;
    p.color = 'black';
    s[sibDir].color = 'black';
  }

  cleanupFinalNode(node) {
    if (node === this.root) {
      this.root = null;
    } else {
      const nodeDir = this.getNodeDirection(node);
      node.parent[nodeDir] = null;
    }
  }

  singleRotation(node, dir) {
    if (dir === 'left') {
      return this.singleLeftRemove(node);
    }
    return this.singleRightRemove(node);
  }

  singleLeftRemove(n) {
    const { p, g } = this.getAncestors(n);
    if (p === this.root) {
      this.root = this.leftRot(n, p);
      n.parent = null;
    } else {
      if (g.right === p) {
        g.right = this.leftRot(n, p);
      } else {
        g.left = this.leftRot(n, p);
      }
      n.parent = g;
    }
  }

  singleRightRemove(n) {
    const { p, g } = this.getAncestors(n);
    if (p === this.root) {
      this.root = this.rightRot(n, p);
      n.parent = null;
    } else {
      if (g.right === p) {
        g.right = this.rightRot(n, p);
      } else {
        g.left = this.rightRot(n, p);
      }
      n.parent = g;
    }
  }

  singleLeftInsert(n) {
    const { p, g, ggp } = this.getAncestors(n);
    if (g === this.root) {
      this.root = this.leftRot(p, g);
      p.parent = null;
    } else {
      if (ggp.left === g) {
        ggp.left = this.leftRot(p, g);
      } else {
        ggp.right = this.leftRot(p, g);
      }
      p.parent = ggp;
    }
    g.parent = p;
    p.color = 'black';
    g.color = 'red';
  }

  singleRightInsert(n) {
    const { p, g, ggp } = this.getAncestors(n);
    if (g === this.root) {
      this.root = this.rightRot(p, g);
      p.parent = null;
    } else {
      if (ggp.left === g) {
        ggp.left = this.rightRot(p, g);
      } else {
        ggp.right = this.rightRot(p, g);
      }
      p.parent = ggp;
    }
    g.parent = p;
    p.color = 'black';
    g.color = 'red';
  }

  doubleLeftInsert(n) {
    const { p, g, ggp } = this.getAncestors(n);
    g.left = this.leftRot(n, p);
    if (g === this.root) {
      this.root = this.rightRot(n, g);
      n.parent = null;
    } else {
      if (ggp.left === g) {
        ggp.left = this.rightRot(n, g);
      } else {
        ggp.right = this.rightRot(n, g);
      }
      n.parent = ggp;
    }
    p.parent = n;
    g.parent = n;
    n.color = 'black';
    g.color = 'red';
  }

  doubleRightInsert(n) {
    const { p, g, ggp } = this.getAncestors(n);
    g.right = this.rightRot(n, p);
    if (g === this.root) {
      this.root = this.leftRot(n, g);
      n.parent = null;
    } else {
      if (ggp.left === g) {
        ggp.left = this.leftRot(n, g);
      } else {
        ggp.right = this.leftRot(n, g);
      }
      n.parent = ggp;
    }
    p.parent = n;
    g.parent = n;
    n.color = 'black';
    g.color = 'red';
  }

  rightRot(node, parent) {
    parent.left = node.right;
    if (node.right) { node.right.parent = parent; }
    node.right = parent;
    parent.parent = node;
    return node;
  }

  leftRot(node, parent) {
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
    }
    return 'left';
  }

  getNodeDirection(node) {
    if (node && node.parent && node.parent.left === node) {
      return 'left';
    }
    return 'right';
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

  getAncestors(n) {
    const p = this.getParent(n);
    const u = this.getUncle(n);
    const g = this.getGrandParent(n);
    const ggp = this.getGreatGrandParent(n);
    const s = this.getSibling(n);
    const sl = this.getSiblingLeftChild(n);
    const sr = this.getSiblingRightChild(n);
    return { p, u, g, ggp, s, sl, sr };
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
    const p = this.getParent(node);
    const gp = this.getGrandParent(node);
    if (gp) { // if no grandparent, no uncle
      if (gp.left === p) {
        return gp.right;
      }
      return gp.left;
    }
    // returning undefined signals no GP
    return undefined;
  }

  getGreatGrandParent(node) {
    if (node === undefined) {
      return undefined;
    }
    const gp = this.getGrandParent(node);
    if (gp) {
      return this.getParent(gp);
    }
    return undefined;
  }

  getSibling(node) {
    if (node === undefined || !node.parent) {
      return undefined;
    }
    const sibDir = this.getSiblingDirection(node);
    return node.parent[sibDir]; // could return null
  }

  getSiblingLeftChild(node) { return this.getSiblingChild(node, 'left'); }

  getSiblingRightChild(node) { return this.getSiblingChild(node, 'right'); }

  getSiblingChild(node, childDir) {
    if (node === undefined || !node.parent) {
      return undefined;
    }
    const sibDir = this.getSiblingDirection(node);
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
    const paths = [];
    const path = [];
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
    };
    go(this.root);
    return paths;
  }

  allPathsAreValid() {
    const paths = this.generateAllPaths();
    if (paths.length === 1) { return true; }

    let isValid = true;
    let targetBlackPathLength;

    paths.forEach((path, i) => {
      let blackPathLength = 0;

      path.forEach((node, j) => {
        // root must be black
        if (j === 0 && this.getColor(node) === 'red') {
          isValid = false;
          throw new Error('root is red');
        }
        if (this.getColor(node) === 'black') {
          blackPathLength += 1;
        }
        // if node is red, both children must be black (or null)
        if (this.getColor(node) === 'red') {
          if (this.getColor(node.left) === 'red') {
            isValid = false;
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

      if (node.left) { go(node.left); }
      if (node.right) { go(node.right); }
    };
    go(this.root);

    return pointersAreCorrect;
  }

  getNodeColor(letter) {
    if (letter === 'r') {
      return 'red';
    }
    return 'black';
  }

  constructTestTree(arr) {
    const nodes = [];
    for (let i = 0; i < arr.length; i += 1) {
      const nodeVal = Number(arr[i].match(/-?\d+/)[0]);
      const nodeColor = this.getNodeColor(arr[i].slice(-1));
      const newNode = new Node(nodeVal);
      newNode.color = nodeColor;
      nodes.push(newNode);
    }
    for (let i = 0; i < nodes.length; i += 1) {
      this.addNodeToTree(nodes[i]);
    }
  }
}

module.exports = RedBlackTree;
