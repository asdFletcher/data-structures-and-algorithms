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
    
    let ggpIndex = path.length - 4;
    let ggp = path[ggpIndex];

    const reduceCounters = (num) => {
      parentIndex -= num;
      grandParentIndex -= num;
      ggpIndex -= num;

      parent = path[parentIndex];
      grandParent = path[grandParentIndex];
      ggp = path[ggpIndex];
      updatePointers();
    }

    const updatePointers = () => {
      parent = path[parentIndex];
      grandParent = path[grandParentIndex];
      ggp = path[ggpIndex];
    }

    while (this.root !== target) {
      // case 
      //      R
      //    T
      if (parent === this.root && parent.left === target) {
        this.root = this.rightSingle(target, parent);
        continue;
      }
      // case 
      //      R
      //        T
      if (parent === this.root && parent.right === target) {
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
      if (this.root === grandParent && grandParent.left === parent && parent.right === target) {
        grandParent.left = this.leftSingle(target, parent);
        reduceCounters(1);
        continue;
      }
      // case 
      //      R
      //        P
      //       T
      if (this.root === grandParent && grandParent.right === parent && parent.left === target) {
        grandParent.right = this.rightSingle(target, parent);
        reduceCounters(1);
        continue;
      }

      // cases 
      //        GG            GG      
      //      G                  G    
      //    P                  P      
      //  T                  T        
      if (grandParent.left === parent && parent.left === target) {

        if (ggp.left === grandParent) {
          ggp.left = this.rightSingle(parent, grandParent);
          ggp.left = this.rightSingle(target, parent);
        } else if (ggp.right === grandParent) {
          ggp.right = this.rightSingle(parent, grandParent);
          ggp.right = this.rightSingle(target, parent);
        }
        reduceCounters(2);
        continue;
      }
      // cases 
      //        GG          GG       
      //      G                 G          
      //    P                 P            
      //     T                 T           
      if (grandParent.left === parent && parent.right === target) {
        if (ggp.left === grandParent) {
          grandParent.left = this.leftSingle(target, parent);
          ggp.left = this.rightSingle(target, grandParent);
        } else if (ggp.right === grandParent) {
          grandParent.right = this.leftSingle(target, parent);
          ggp.right = this.rightSingle(target, grandParent);
        }
        reduceCounters(2);
        continue;
      }
      // cases 
      //        GG         GG    
      //      G               G    
      //        P               P    
      //       T               T    
      if (grandParent.right === parent && parent.left === target) {
        if (ggp.left === grandParent) {
          grandParent.right = this.rightSingle(target, parent);
          ggp.left = this.leftSingle(target, grandParent);
        } else if (ggp.right === grandParent) {
          grandParent.right = this.rightSingle(target, parent);
          ggp.right = this.leftSingle(target, grandParent);
        }
        reduceCounters(2);
        continue;
      }
      // case 
      //        GG         GG       
      //      G               G       
      //        P               P       
      //          T               T       
      if (grandParent.right === parent && parent.right === target) {
        if (ggp.left === grandParent) {
          ggp.left = this.leftSingle(parent, grandParent);
          ggp.left = this.leftSingle(target, parent);
        } else if (ggp.right === grandParent) {
          ggp.right = this.leftSingle(parent, grandParent);
          ggp.right = this.leftSingle(target, parent);
        }
        reduceCounters(2);
        continue;
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
