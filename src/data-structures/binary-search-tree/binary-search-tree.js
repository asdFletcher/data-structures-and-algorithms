'use strict';

const Node = require('./binary-search-tree-node.js');

class BinarySearchTree {
  constructor() {
    this.root = null;
    this.replacementNode = null;
  }

  insert(value, cb) {
    if (!this.isNumericInput(value)) { return undefined; }
    value = Number(value);

    const newNode = new Node(value);

    if (this.treeIsEmpty()) {
      this.root = newNode;
      return newNode;
    }

    const go = (node) => {
      if (cb) { cb(); }

      if (node.value === value) { return undefined; } // already in tree

      if (!node.left && value < node.value) {
        node.left = newNode;
        return newNode;
      }
      if (!node.right && value > node.value) {
        node.right = newNode;
        return newNode;
      }

      if (value > node.value) {
        return go(node.right);
      }

      return go(node.left);
    };

    return go(this.root);
  }

  remove(value, cb) {
    if (this.treeIsEmpty()) { return undefined; }
    if (!this.isNumericInput(value)) { return undefined; }
    value = Number(value);
    if (this.root.value === value) {
      this.root = this.removeRootFromTree(this.root);
    } else {
      const parentNode = this.findParent(value, cb);
      if (!parentNode) { return undefined; } // value not in tree

      if (value < parentNode.value) {
        parentNode.left = this.removeRootFromTree(parentNode.left, cb);
      } else {
        parentNode.right = this.removeRootFromTree(parentNode.right, cb);
      }
    }

    const result = this.deletedNode;
    this.deletedNode = undefined;
    result.left = null;
    result.right = null;
    return result;
  }

  removeRootFromTree(root, cb) {
    this.deletedNode = root;

    if (!root.left && !root.right) { return null; }
    if (!root.left) { return root.right; }
    if (!root.right) { return root.left; }

    const replacementNodeDirection = this.pickASide();

    let newRoot;
    // replacement side has 1 child
    if (replacementNodeDirection === 'left' && this.subTreeRootIsMax(root.left)) {
      newRoot = root[replacementNodeDirection];
      newRoot.right = root.right;
      return newRoot;
    }
    if (replacementNodeDirection === 'right' && this.subTreeRootIsMin(root.right)) {
      newRoot = root[replacementNodeDirection];
      newRoot.left = root.left;
      return newRoot;
    }

    // replacement side has 2 children
    return this.removeMinOrMax(root, replacementNodeDirection, cb);
  }

  getOppositeDirection(direction) {
    let oppositeDirection;
    if (direction === 'left') {
      oppositeDirection = 'right';
    } else {
      oppositeDirection = 'left';
    }
    return oppositeDirection;
  }

  removeMinOrMax(root, replacementDir, cb) {
    let newRoot;

    const oppositeDir = this.getOppositeDirection(replacementDir);

    // find max or min node and remove it from the subtree
    let current = root[replacementDir];
    while (current[oppositeDir][oppositeDir]) {
      if (cb) { cb(); }
      current = current[oppositeDir];
    }

    newRoot = current[oppositeDir];
    if (newRoot[replacementDir]) {
      current[oppositeDir] = newRoot[replacementDir];
    } else {
      current[oppositeDir] = null;
    }
    newRoot.left = root.left;
    newRoot.right = root.right;
    return newRoot;
  }

  subTreeRootIsMax(node) {
    if (!node.right) {
      return true;
    }
    return false;
  }

  subTreeRootIsMin(node) {
    if (!node.left) {
      return true;
    }
    return false;
  }

  remove_bad(value, cb) {
    if (cb) { cb(); }

    if (this.treeIsEmpty()) { return undefined; }

    if (!this.isNumericInput(value)) { return undefined; }
    value = Number(value);

    // if root is removed
    if (this.root.value === value) {
      const newRoot = this.removeRootFromTreeBad(this.root);
      this.root = newRoot;
    }

    const parentNode = this.findParent(value, cb);
    let deletedNode;

    if (!parentNode) { return undefined; }

    if (value < parentNode.value) {
      deletedNode = parentNode.left;
      parentNode.left = this.removeRootFromTreeBad(parentNode.left);
    } else {
      deletedNode = parentNode.right;
      parentNode.right = this.removeRootFromTreeBad(parentNode.right);
    }
    return deletedNode;
  }

  removeRootFromTreeBad(node) {
    if (!node.left && !node.right) { return null; }
    if (!node.left) { return node.right; }
    if (!node.right) { return node.left; }

    const replacementDirection = this.pickASide();
    const newRoot = node[replacementDirection];

    if (replacementDirection === 'left') {
      const maxNodeOfLeftTree = this.findMaxNode(node.left, cb);
      maxNodeOfLeftTree.right = node.right;
    }

    if (replacementDirection === 'right') {
      const minNodeOfRightTree = this.findMinNode(node.right, cb);
      minNodeOfRightTree.left = node.left;
    }

    return newRoot;
  }

  findMax() {
    const node = this.findMaxNode(this.root, cb);
    return node && node.value;
  }

  findMin() {
    const node = this.findMinNode(this.root, cb);
    return node && node.value;
  }

  contains(value, cb) {
    if (this.treeIsEmpty()) { return false; }
    if (!this.isNumericInput(value)) { return false; }
    if (cb) { cb(); }

    value = Number(value);

    const go = (node) => {
      if (cb) { cb(); }
      if (!node) { return false; }
      if (node.value === value) { return true; }
      if (value > node.value) { return go(node.right); }

      return go(node.left);
    };

    return go(this.root);
  }

  isNumericInput(value) {
    if (typeof value === 'boolean') { return false; }

    const numericalValue = Number(value);

    if (Number.isNaN(numericalValue)) { return false; }

    if (typeof numericalValue === 'number') { return true; }
    return false;
  }

  pickASide() {
    const roll = Math.random();
    if (roll > 0.5) {
      return 'left';
    }
    return 'right';
  }

  findParent(value, cb) {
    const go = (node) => {
      if (!node) { return undefined; }
      if (cb) { cb(); }

      if (node.left && node.left.value === value) { return node; }
      if (node.right && node.right.value === value) { return node; }

      if (value > node.value) {
        return go(node.right);
      }

      return go(node.left);
    };

    return go(this.root);
  }

  findMaxNode(node, cb) {
    if (!node) { return undefined; }

    let current = node;

    while (current.right) {
      current = current.right;
      if (cb) { cb(); }
    }

    return current;
  }

  findMinNode(node, cb) {
    if (!node) { return undefined; }

    let current = node;

    while (current.left) {
      current = current.left;
      if (cb) { cb(); }
    }

    return current;
  }

  treeIsEmpty() {
    if (!this.root) { return true; }

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

module.exports = BinarySearchTree;
