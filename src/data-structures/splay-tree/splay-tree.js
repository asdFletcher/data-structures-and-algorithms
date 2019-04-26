/* eslint-disable class-methods-use-this */

'use strict';

const Node = require('./splay-tree-node.js');

class SplayTree {
  constructor() {
    this.root = null;
  }

  insertWithoutSplay(rawValue) {
    return this.communalInsertCode(rawValue, false);
  }

  insert(rawValue) {
    return this.communalInsertCode(rawValue, true);
  }

  communalInsertCode(rawValue, splay) {
    if (!this.isNumericInput(rawValue)) { return undefined; }

    const value = Number(rawValue);

    const newNode = new Node(value);

    if (this.treeIsEmpty()) {
      this.root = newNode;
      return newNode;
    }

    const path = [];
    let result;

    const go = (node) => {
      if (splay) { path.push(node); }
      if (value < node.value) {
        if (!node.left) { // base case
          node.left = newNode;
          result = newNode;
          if (splay) { path.push(newNode); }
          return;
        }
        go(node.left);
      } else if (value > node.value) {
        if (!node.right) { // base case
          node.right = newNode;
          result = newNode;
          if (splay) { path.push(newNode); }
          return;
        }
        go(node.right);
      }
    };

    go(this.root);

    if (result === undefined) { return result; }

    // conditionally perform splay
    if (splay) { this.splay(path); }

    return result;
  }

  remove(rawValue) {
    if (!this.isNumericInput(rawValue)) { return undefined; }

    const value = Number(rawValue);

    const path = [];
    let result;
    let deleteTarget;
    let deleteTargetParent;

    let rootIsTarget = false;
    if (this.root.value === value) { rootIsTarget = true; }

    const go = (node) => {
      // base case
      if (node.value === value) {
        deleteTarget = node;
        result = node;
        deleteTargetParent = path[path.length - 1];

        let deleteDirection;
        if (!rootIsTarget) {
          if (deleteTargetParent.left === deleteTarget) {
            deleteDirection = 'left';
          } else {
            deleteDirection = 'right';
          }
        }

        // pick a side edge cases: leaf node, or only 1 child
        let replacementNode;
        if (!deleteTarget.left && !deleteTarget.right) {
          if (rootIsTarget) {
            this.root = null;
          } else {
            deleteTargetParent[deleteDirection] = null;
          }
          return;
        }
        if (!deleteTarget.left) {
          if (rootIsTarget) {
            this.root = deleteTarget.right;
          } else {
            replacementNode = this.removeMin(deleteTarget.right);
            deleteTargetParent[deleteDirection] = replacementNode;
          }
          return;
        }
        if (!deleteTarget.right) {
          if (rootIsTarget) {
            this.root = deleteTarget.left;
          } else {
            replacementNode = this.removeMax(deleteTarget.left);
            deleteTargetParent[deleteDirection] = replacementNode;
          }
          return;
        }
        // pick a side general case: 2 children
        const replacementDirection = this.pickASide();

        // remove min, or remove max
        if (replacementDirection === 'left') {
          if (this.hasNoChildren(deleteTarget.left)) {
            replacementNode = deleteTarget.left;
            replacementNode.right = deleteTarget.right;
          } else if (!deleteTarget.left.right) {
            // removeMax call will target sub tree root
            replacementNode = deleteTarget.left;
            replacementNode.right = deleteTarget.right;
          } else {
            replacementNode = this.removeMax(deleteTarget.left);
            replacementNode.left = deleteTarget.left;
            replacementNode.right = deleteTarget.right;
          }
        }
        if (replacementDirection === 'right') {
          if (this.hasNoChildren(deleteTarget.right)) {
            replacementNode = deleteTarget.right;
            replacementNode.left = deleteTarget.left;
          } else if (!deleteTarget.right.left) {
            // removeMin call will target sub tree root
            replacementNode = deleteTarget.right;
            replacementNode.left = deleteTarget.left;
          } else {
            replacementNode = this.removeMin(deleteTarget.right);
            replacementNode.left = deleteTarget.left;
            replacementNode.right = deleteTarget.right;
          }
        }

        // replace the target node
        result = deleteTarget;
        if (rootIsTarget) {
          this.root = replacementNode;
        } else {
          deleteTargetParent[deleteDirection] = replacementNode;
        }
        return;
      }

      // recursive calls
      if (node.left && value < node.value) {
        path.push(node);
        go(node.left);
      }
      if (node.right && value > node.value) {
        path.push(node);
        go(node.right);
      }
    };

    go(this.root);

    // don't splay if value isn't found
    if (!result) { return undefined; }

    result.left = null;
    result.right = null;

    // don't splay if root was deleted
    if (rootIsTarget) { return result; }

    // perform splay on parent of deleted node, not the deleted node replacement
    this.splay(path);

    return result;
  }

  // donesn't splay if value is not found
  contains(rawValue) {
    if (!this.isNumericInput(rawValue)) { return undefined; }

    const value = Number(rawValue);

    if (this.treeIsEmpty()) { return false; }

    const path = [];
    let result = false;

    const go = (node) => {
      path.push(node);
      if (value < node.value) {
        if (!node.left) { // base case, value does not exist
          return;
        }
        go(node.left);
      } else if (value > node.value) {
        if (!node.right) { // base case, value does not exist
          return;
        }
        go(node.right);
      } else { // value found
        path.push();
        result = true;
      }
    };

    go(this.root);

    if (result) {
      this.splay(path);
    }

    return result;
  }

  findMax() {
    return this.findMinMaxCommunalCode('right');
  }

  findMin() {
    return this.findMinMaxCommunalCode('left');
  }

  findMinMaxCommunalCode(direction) {
    if (this.treeIsEmpty()) { return undefined; }

    const path = [];
    let current = this.root;
    path.push(this.root);

    while (current[direction]) {
      current = current[direction];
      path.push(current);
    }

    const result = current.value;
    this.splay(path);
    return result;
  }

  removeMin(node) {
    let current = node;
    let parent;
    while (current.left) {
      parent = current;
      current = current.left;
    }

    // replacement node is a leaf node
    if (!parent) { return node; }

    if (current.right) {
      parent.left = current.right;
    } else {
      parent.left = null;
    }

    current.left = null;
    current.right = null;
    return current;
  }

  removeMax(node) {
    let current = node;
    let parent;
    while (current.right) {
      parent = current;
      current = current.right;
    }

    // replacement node is a leaf node
    if (!parent) { return node; }

    if (current.left) {
      parent.right = current.left;
    } else {
      parent.right = null;
    }

    current.left = null;
    current.right = null;
    return current;
  }

  hasNoChildren(node) {
    if (!node.left && !node.right) {
      return true;
    }
    return false;
  }

  pickASide() {
    const roll = Math.random();
    if (roll > 0.5) {
      return 'left';
    }
    return 'right';
  }

  rightSingle(target, parent) {
    parent.left = target.right;
    target.right = parent;
    return target;
  }

  leftSingle(target, parent) {
    parent.right = target.left;
    target.left = parent;
    return target;
  }

  splay(path) {
    const targetIndex = path.length - 1;
    const target = path[targetIndex];

    let parentIndex = path.length - 2;
    let parent = path[parentIndex];

    let grandParentIndex = path.length - 3;
    let grandParent = path[grandParentIndex];

    let ggpIndex = path.length - 4;
    let ggp = path[ggpIndex];

    const updatePointers = () => {
      parent = path[parentIndex];
      grandParent = path[grandParentIndex];
      ggp = path[ggpIndex];
    };

    const reduceCounters = (num) => {
      parentIndex -= num;
      grandParentIndex -= num;
      ggpIndex -= num;

      parent = path[parentIndex];
      grandParent = path[grandParentIndex];
      ggp = path[ggpIndex];
      updatePointers();
    };

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
          grandParent.left = this.leftSingle(target, parent);
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
}

module.exports = SplayTree;
