/* eslint-disable class-methods-use-this */
'use strict';

const Node = require('./splay-tree-node.js');

class SplayTree {
  constructor() {
    this.root = null;
  }

  insert(rawValue) {
    if (!this.isNumericInput(rawValue)) { return undefined; }
    
    const value = Number(rawValue);

    const newNode = new Node(value);

    if (this.treeisEmpty()) {
      this.root = new Node();
      return newNode;
    }

    const path = [];
    let result = undefined;

    const go = (node) => {
      path.push(node);
      if (value < node.value) {
        if (!node.left) { // base case
          node.left = newNode;
          result = newNode;
          path.push(newNode);
          return;
        }
        go(node.left);
      } else if (value > node.value) {
        if (!node.right) { // base case
          node.right = newNode;
          result = newNode;
          path.push(newNode);
          return;
        }
        go(node.right);
      } else {
        return; // duplicate value
      }
    }

    go(this.root);

    if (result === undefined) { return result; }
    
    // perform splay
    this.splay(path);

    return result;
  }

  rightSingle(target, parent) {
    parent.left = target.right;
    target.right = parent;
    return target;
  }

  // case 
  //      R
  //        T
  leftSingle(target, parent) {
    parent.right = target.left;
    target.left = parent;
    return target;
  }

  splay(path) {
    let targetIndex = path.length - 1;
    let target = path[targetIndex];
    
    let parentIndex = path.length - 2;
    let parent = path[parentIndex];

    let grandParentIndex = path.length - 3;
    let grandParent = path[grandParentIndex];
    
    while (this.root !== target) {
      // case 
      //      R
      //    T
      if (parent === this.root && parent.left === target) {
        this.root.left = this.rightSingle(target, parent);
      }
      // case 
      //      R
      //        T
      if (parent === this.root && parent.right === target) {
        this.root.right = this.leftSingle(target, parent);
      }

      // case 
      //      R
      //    P
      //  T
      if (grandParent.left === parent && parent.left === target) {
        grandParent.left = this.rightSingle(target, parent);
        parentIndex -= 1;
        parent = path[parentIndex];
        grandParentIndex -= 1;
        grandParent = path[grandParentIndex];
      }
      // case 
      //      R
      //        P
      //          T
      if (grandParent.right === parent && parent.right === target) {
        grandParent.right = this.leftSingle(target, parent);
        parentIndex -= 1;
        parent = path[parentIndex];
        grandParentIndex -= 1;
        grandParent = path[grandParentIndex];
      }
      // case 
      //      G
      //    P
      //     T
      if (grandParent.left === parent && parent.right === target) {
        grandParent.left = this.leftSingle(target, parent);
        parentIndex -= 1;
        parent = path[parentIndex];
        grandParentIndex -= 1;
        grandParent = path[grandParentIndex];
      }
      // case 
      //      G
      //        P
      //       T
      if (grandParent.right === parent && parent.left === target) {
        grandParent.right = this.rightSingle(target, parent, grandParent);
        parentIndex -= 1;
        parent = path[parentIndex];
        grandParentIndex -= 1;
        grandParent = path[grandParentIndex];
      }
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
}


module.exports = SplayTree;
