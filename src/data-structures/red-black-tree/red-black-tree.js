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

    let result;
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
        // result = undefined; // value already in tree
        return undefined;
      }
    }

    this.fixAfterInsertion(newNode);

    return newNode;
  }

  fixAfterInsertion(n) {
    let p = this.getParent(n);
    let u = this.getUncle(n);
    let g = this.getGrandParent(n);
    let ggp = this.getGreatGrandParent(n);

    // root is red
    if (n === this.root && this.getColor(this.root) === 'red') {
      this.root.color = 'black';
      return;
    }

    // node is red and parent is black, do nothing
    if (this.getColor(p) === 'black') {
      return;
    }

    // has uncle, and thus parent, and grandparent
    if (u !== undefined) { 
      // parent is red and uncle is red, recolor: g , p, and u
      if (this.getColor(u) === 'red' && this.getColor(p) === 'red') {
        p.color = 'black';
        u.color = 'black';
        g.color = 'red';
        this.fixAfterInsertion(g);
      }
      
      // parent is red, and uncle is black
      if (this.getColor(u) === 'black' && this.getColor(p) === 'red') {
        // cases:
        //      G       |      G  
        //    P   U     |    U   P        
        //  N           |          N        
        let singleRight = (g.left === p && g.right === u && p.left === n);
        let singleLeft = (g.right === p && g.left === u && p.right === n);
        // cases:
        //      G            |         G
        //    P   U          |      U    P
        //     N             |          N
        let doubleLeft = (g.left === p && g.right === u && p.right === n);
        let doubleRight = (g.right === p && g.left === u && p.left === n);
        
        if (singleLeft || singleRight) {
          if (singleRight) {
            if (g === this.root) {
              this.root = this.singleRight(p,g);
              p.parent = null;
            } else {
              if (ggp.left === g) {
                ggp.left = this.singleRight(p,g);
              } else {
                ggp.right = this.singleRight(p,g);
              }
              p.parent = ggp;
            }
          }
          if (singleLeft) {
            if (g === this.root) {
              this.root = this.singleLeft(p, g);
              p.parent = null;
            } else {
              if (ggp.left === g) {
                ggp.left = this.singleLeft(p, g);
              } else {
                ggp.right = this.singleLeft(p, g);
              }
              p.parent = ggp;
            }
          }
          g.parent = p;
          p.color = 'black';
          g.color = 'red';
          return;
        } else {
          if (doubleLeft) {
            g.left = this.singleLeft(n, p);
            if (g === this.root) {
              this.root = this.singleRight(n, g);
              n.parent = null;
            } else {
              if (ggp.left === g) {
                ggp.left = this.singleRight(n, g);
              } else {
                ggp.right = this.singleRight(n, g);
              }
              n.parent = ggp;
            }
          }
          if (doubleRight) {
            g.right = this.singleRight(n, p);
            if (g === this.root) {
              this.root = this.singleLeft(n, g);
              n.parent = null;
            } else {
              if (ggp.left === g) {
                ggp.left = this.singleLeft(n, g);
              } else {
                ggp.right = this.singleLeft(n, g);
              }
              n.parent = ggp;
            }
          }
          p.parent = n;
          g.parent = n;
          n.color = 'black';
          g.color = 'red';
          return;
        }
      }
    }

    // root is red
    if (this.getColor(this.root) === 'red') {
      this.root.color = 'black';
      return;
    }
  }

  singleRight(node, parent) {
    parent.left = node.right;
    if (node.right) { node.right.parent = parent; }
    node.right = parent;
    return node;
  }
  
  singleLeft(node, parent) {
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

  getGreatGrandParent(node) {
    let grandParent = this.getGrandParent(node)
    if (grandParent) {
      return greatGrandParent.parent;
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
    if (paths.length === 0) { return true; }

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