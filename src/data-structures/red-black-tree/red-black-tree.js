'use strict';

const Node = require('./red-black-tree-node.js');

class RedBlackTree {
  constructor() {
    this.root = null;
  }

  insert_case_1(newNode) {
    this.root = newNode;
    newNode.color = 'black';
    return newNode;
  }

  insert(rawValue) {
    if (!this.isNumericInput(rawValue)) { return undefined; }

    const value = Number(rawValue);

    const newNode = new Node(value);

    if (this.treeIsEmpty()) {
      return this.insert_case_1(newNode);
    }

    let current = this.root;
    
    // insert node reguarly
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

    this.fixAfterInsertion(newNode);
    return newNode;
  }

  fixAfterInsertion(n) {
    let {p, u, g, ggp} = this.getAncestors(n);

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
        this.singleLeft(n);
      }
      if (g.left === p && g.right === u && p.left === n) {
        this.singleRight(n);
      }
      // cases:
      //      G            |         G
      //    P   U          |      U    P
      //     N             |          N
      if (g.left === p && g.right === u && p.right === n) {
        this.doubleLeft(n);
      }
      if (g.right === p && g.left === u && p.left === n) {
        this.doubleRight(n);
      }
    }
  }

  getAncestors(n) {
    let p = this.getParent(n);
    let u = this.getUncle(n);
    let g = this.getGrandParent(n);
    let ggp = this.getGreatGrandParent(n);
    return {p, u, g, ggp};
  }

  singleLeft(n) {
    let {p, u, g, ggp} = this.getAncestors(n);
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
  singleRight(n) {
    let {p, u, g, ggp} = this.getAncestors(n);
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
  doubleLeft(n) {
    let {p, u, g, ggp} = this.getAncestors(n);
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
  doubleRight(n) {
    let {p, u, g, ggp} = this.getAncestors(n);
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
    return node;
  }
  
  left_rotation(node, parent) {
    parent.right = node.left;
    if (node.left) { node.left.parent = parent; }
    node.left = parent;
    return node;
  }

  getColor(node) {
    if (node === null) {
      return 'black';
    }
    return node.color;
  }

  getParent(node) {
    return node.parent;
  }
  
  getGrandParent(node) {
    if (node.parent && node.parent.parent) { 
      return node.parent.parent;
    }
    return undefined;
  }

  // returning null signifies empty child
  getUncle(node) {
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
    let GP = this.getGrandParent(node);
    if (GP) {
      return this.getParent(GP);
    }
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
        }
        if (this.getColor(node) === 'black') {
          blackPathLength += 1;
        }
        // if node is red, both children must be black (or null)
        if (this.getColor(node) === 'red') {
          if (this.getColor(node.left) === 'red') {
            isValid = false;
          }
          if (this.getColor(node.right) === 'red') {
            isValid = false;
          }
        }
      });

      // black length must be equal at all leaves
      if (i === 0) {
        targetBlackPathLength = blackPathLength;
      } else if (blackPathLength !== targetBlackPathLength) {
        isValid = false;
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
}

module.exports = RedBlackTree;