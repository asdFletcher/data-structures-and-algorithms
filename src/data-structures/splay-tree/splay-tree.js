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

    if (this.treeIsEmpty()) {
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

  zigzig(target, parent, grandParent) {
    
  }

  rightSingle(target, parent) {
    // console.log(`in case right single target.value: ${target.value}, parent.value: ${parent.value}`);
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
    console.log(`path: `, path);
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
        console.log(`in case 🍎 target: ${target.value} parent: ${parent.value} this.root: ${this.root.value}`);
        this.root = this.rightSingle(target, parent);
        console.log(`after in case 🍎: `, this.root);
        continue;
      }
      // case 
      //      R
      //        T
      if (parent === this.root && parent.right === target) {
        console.log(`in case 🍊`);
        this.root = this.leftSingle(target, parent);
        continue;
      }

      // case 
      //      R
      //    P
      //  T
      if (this.root === grandParent && grandParent.left === parent && parent.left === target) {
          this.root = this.rightSingle(parent, grandParent);
          this.root = this.rightSingle(target, parent);
          continue;
      }

      // case 
      //      R
      //        P
      //          T
      if (this.root === grandParent && grandParent.right === parent && parent.right === target) {
        this.root = this.leftSingle(parent, grandParent);
        this.root = this.leftSingle(target, parent);
        continue;
      }

      // case 
      //      R
      //    P
      //     T
      if (grandParent.left === parent && parent.right === target) {
        console.log(`in case 🍎🍊`);
        grandParent.left = this.leftSingle(target, parent);
        parentIndex -= 1;
        parent = path[parentIndex];
        grandParentIndex -= 1;
        grandParent = path[grandParentIndex];
        continue;
      }
      // case 
      //      R
      //        P
      //       T
      if (grandParent.right === parent && parent.left === target) {
        console.log(`in case 🍊🍎`);
        grandParent.right = this.rightSingle(target, parent, grandParent);
        parentIndex -= 1;
        parent = path[parentIndex];
        grandParentIndex -= 1;
        grandParent = path[grandParentIndex];
        continue;
      }

      // case 
      //        GG
      //      G
      //    P
      //  T
      // if () {
      //   ggp.left = this.rightSingle(parent, grandParent);
      //   ggp.left = this.rightSingle(parent, grandParent);

      //   console.log(`in case 🍎🍎`);
      //   grandParent.left = this.rightSingle(target, parent);
      //   parentIndex -= 1;
      //   parent = path[parentIndex];
      //   grandParentIndex -= 1;
      //   grandParent = path[grandParentIndex];
      //   console.log(`after case 🍎🍎: `, this.root);
      //   continue;
      // }
      // case 
      //      R
      //        P
      //          T
      // if (grandParent.right === parent && parent.right === target) {
      //   console.log(`in case 🍊🍊`);
      //   grandParent.right = this.leftSingle(target, parent);
      //   parentIndex -= 1;
      //   parent = path[parentIndex];
      //   grandParentIndex -= 1;
      //   grandParent = path[grandParentIndex];
      //   continue;
      // }
      
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
