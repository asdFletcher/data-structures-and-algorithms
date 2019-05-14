'use strict';

const Node = require('./red-black-tree-node.js');

class RedBlackTree {
  constructor() {
    this.root = null;

    this.N;
    this.P;
    this.U;
    this.GP;
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

    
    // store grand parent
    // store parent
    // store uncle

    let result;
    let current = this.root;
    
    // insert node reguarly
    while (true) {
      if (!current.left && value < current.value) { // base case
        current.left = newNode;
        newNode.parenet = current;
        break;
      } else if (!current.right && value > current.value) { // base case
        current.right = newNode;
        newNode.parenet = current;
        break;
      } else if (current.left && value < current.value) { // go left
        current = current.left;
      } else if (current.right && value > current.value) { // go right
        current = current.left;
      } else if (value === current.value) {
        // result = undefined; // value already in tree
        return undefined;
      }
    }

    // if parent is black, do nothing
    let parent = this.getParent(newNode);
    if (this.getColor(parent) === 'black') {
      return newNode;
    }

    // if parent is red, and uncle is red
    let uncle = this.getUncle(newNode);
    if (uncle !== undefined) { // has uncle, and thus parent
      if (this.getColor(uncle) === 'red' && this.getColor(parent) === 'red') {
        
      }
    }

    // if parent is red, and uncle is black



    // start at the root
    // current = this.root
    // if left  and left.value < value , current = current.left
    // if right is less, current = current.right


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

  isNumericInput(value) {
    if (typeof value === 'boolean') { return false; }

    const numericalValue = Number(value);

    if (Number.isNaN(numericalValue)) { return false; }

    if (typeof numericalValue === 'number') { return true; }
    return false;
  }
}



module.exports = RedBlackTree;