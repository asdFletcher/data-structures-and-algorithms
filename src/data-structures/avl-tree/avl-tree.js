'use strict';

const Node = require('./avl-tree-node.js');

class AVLTree {
  constructor() {
    this.root = null;
    this.imbalancedNode = null;
    this.imbalancedNodeParent = null;
    this.problemNodeDirection = null;
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
      if (cb){ cb(); }
      if (value === node.value) { return undefined; } // value already in tree

      // add right node
      if (!node.right && value > node.value) {
        node.right = newNode;
        this.updateNodeHeight(node);
        return newNode;
      }
      // add left node
      if (!node.left && value < node.value) {
        node.left = newNode;
        this.updateNodeHeight(node);
        return newNode;
      }

      let result;
      // navigate right
      if (value > node.value) {
        result = go(node.right);
      } else if (value < node.value) {
        // navigate left
        result = go(node.left);
      }

      // done with recursion
      this.fixImbalances(node);
      this.setImbalancedNode(node);
      this.updateNodeHeight(node);
      return result;
    };

    const result = go(this.root);

    this.handleRootImbalance();

    this.imbalancedNode = null;
    this.imbalancedNodeParent = null;
    return result;
  }

  remove(value, cb) {
    if (!this.isNumericInput(value)) { return undefined; }
    value = Number(value);

    if (this.treeIsEmpty()) { return undefined; }

    if (cb){ cb(); }

    if (this.root.value === value) {
      if (!this.root.left && !this.root.right) {
        const result = this.root;
        this.root = null;
        return result;
      }
    }
    const go = (node) => {
      if (cb){ cb(); }

      let result;

      // root node is the value
      if (node.value === value) {
        // located node to be deleted
        result = new Node(node.value);

        // remove the node
        this.root = this.removeNode(node, cb);
        this.fixImbalances(node);
        if (this.root) { this.updateNodeHeight(this.root); }

        return result;
      }

      if (node.right && node.right.value === value) {
        // located node to be deleted
        result = new Node(node.right.value);

        // remove the node
        node.right = this.removeNode(node.right, cb);
        if (node.right) { this.updateNodeHeight(node.right); }
        this.updateNodeHeight(node);

        // check for problem nodes
        this.setImbalancedNode(node);

        return result;
      }
      if (node.left && node.left.value === value) {
        // located node to be deleted
        result = new Node(node.left.value);

        // remove the node
        node.left = this.removeNode(node.left, cb);
        if (node.left) { this.updateNodeHeight(node.left); }
        this.updateNodeHeight(node);

        // check for problem nodes
        this.setImbalancedNode(node);

        return result;
      }

      // navigate right
      if (value > node.value) {
        if (!node.right) { return undefined; }
        result = go(node.right);
      } else if (value < node.value) {
        // navigate left
        if (!node.left) { return undefined; }
        result = go(node.left);
      }

      // done with recursion, call stack collapsing
      // if imbalanced node was set in previous function call
      // this.imbalancedNode will be defined, and is fixed here
      // if there remains an imbalance afterwards, this.imbalancedNode 
      // is then assigned for the next function call to handle
      this.fixImbalances(node);
      this.setImbalancedNode(node);

      this.updateNodeHeight(node);
      return result;
    };

    const result = go(this.root);

    // root is gone
    if (!this.root) { return result; }

    this.handleRootImbalance();
    this.imbalancedNode = null;
    this.imbalancedNodeParent = null;

    return result;
  }

  removeNode(node, cb) {
    // if leaf, remove
    if (!node.left && !node.right) {
      return null;
    }

    // if two children --> Find sub tree min or max --> replace that node
    if (node.left && node.right) {
      return this.removeNodeWithTwoChildren(node, cb);
    }

    // if only one child, make that child the new node
    if (node.left) {
      return node.left;
    }
    return node.right;
  }

  removeNodeWithTwoChildren(node, cb) {
    let maxNodeValueOfSubTree;
    let minNodeValueOfSubTree;

    const deleteMin = (node) => {
      if (cb){ cb(); }
      // base case
      if (!node.left) {
        minNodeValueOfSubTree = node.value;
        if (!node.right) {
          return null;
        }
        return node.right;
      }

      const result = deleteMin(node.left);

      if (result === true) {
        this.fixImbalances(node);
        this.setImbalancedNode(node);
        this.updateNodeHeight(node);
        return result;
      }
      node.left = result;
      this.updateNodeHeight(node);
      if (node.left) { this.updateNodeHeight(node.left); }
      this.setImbalancedNode(node);
      return true;
    };

    const deleteMax = (node, cb) => {
      if (cb){ cb(); }
      // base case
      if (!node.right) {
        maxNodeValueOfSubTree = node.value;
        if (!node.left) {
          return null;
        }
        return node.left;
      }

      const result = deleteMax(node.right, cb);

      if (result === true) {
        this.fixImbalances(node);
        this.setImbalancedNode(node);
        this.updateNodeHeight(node);
        return result;
      }
      node.right = result;
      this.updateNodeHeight(node);
      if (node.right) { this.updateNodeHeight(node.right); }
      this.setImbalancedNode(node);
      return true;
    };

    let result;
    if (node.left.height > node.right.height) {
      result = deleteMax(node.left, cb);
      node.value = maxNodeValueOfSubTree;
      if (result === true) {
        this.fixImbalances(node);
        this.setImbalancedNode(node);
      } else {
        node.left = result;
        this.updateNodeHeight(node);
        if (node.left) { this.updateNodeHeight(node.left); }
        this.setImbalancedNode(node);
      }
    } else {
      result = deleteMin(node.right);
      node.value = minNodeValueOfSubTree;
      if (result === true) {
        this.fixImbalances(node);
        this.setImbalancedNode(node);
      } else {
        node.right = result;
        this.updateNodeHeight(node);
        if (node.right) { this.updateNodeHeight(node.right); }
        this.setImbalancedNode(node);
      }
    }
    return node;
  }

  handleRootImbalance() {
    if (this.isImbalanced(this.root)) {
      this.performRotations(this.root);
      this.imbalancedNode = null;
      this.imbalancedNodeParent = null;
    }

    if (this.root.left && this.isImbalanced(this.root.left)) {
      this.imbalancedNode = this.root.left;
      this.imbalancedNodeParent = this.root;
      this.fixImbalances(this.root);
    }
    if (this.root.right && this.isImbalanced(this.root.right)) {
      this.imbalancedNode = this.root.right;
      this.imbalancedNodeParent = this.root;
      this.fixImbalances(this.root);
    }
  }

  fixImbalances(parent) {
    if (this.imbalancedNode) {
      this.imbalancedNodeParent = parent;
      this.setProblemNodeDirection();
      this.performRotations();

      while (this.imbalancedNode) {
        this.setProblemNodeDirection();
        this.performRotations();
      }

      this.imbalancedNode = null;
      this.imbalancedNodeParent = null;
      this.problemNodeDirection = null;
    }
  }
  
  performRotations() {
    let heavySide = this.getTallerSubTree();
    let rotationType = this.getRotationType(heavySide);

    if (rotationType === 'single') {
      this.handleSingleRotation(heavySide);
    } else {
      this.handleDoubleRotation(heavySide);
    }
  }

  setProblemNodeDirection() {
    let parent = this.imbalancedNodeParent;
    if (parent && parent.left && parent.left.value === this.imbalancedNode.value) {
      this.problemNodeDirection = 'left';
    } else {
      this.problemNodeDirection = 'right';
    }
  }

  getRotationType(heavySide) {
    // if heavy side is left, we need to check for a right rotation and vice versa
    if (heavySide === 'left') {
      if (this.isSingleRightRotation()) {
        return 'single'
      }
      return 'double';
    } else {
      if (this.isSingleLeftRotation()) {
        return 'single'
      }
      return 'double';
    }
  }

  getTallerSubTree() {
    const leftHeight = this.getHeight(this.imbalancedNode.left);
    const rightHeight = this.getHeight(this.imbalancedNode.right);

    if (leftHeight - rightHeight >= 2) {
      return 'left';
    } else {
      return 'right';
    }
  }

  handleDoubleRotation(heavySide) {
    let newRoot;
    if (heavySide === 'left') {
      newRoot = this.handleDoubleRightRotation();
    } else {
      newRoot = this.handleDoubleLeftRotation();
    }
    let parentNode = this.imbalancedNodeParent;
    if (!parentNode) {
      this.root = newRoot;
    } else {
      parentNode[this.problemNodeDirection] = newRoot;
    }

    this.updateNodeHeightAndBothChildren(newRoot);
    this.imbalancedNode = null;
    this.imbalancedNodeParent = null;
    this.setImbalancedNodeFromParent(newRoot);
  }

  handleSingleRotation(heavySide) {
    let newRoot;
    if (heavySide === 'left') {
      newRoot = this.handleSingleRightRotation();
    } else {
      newRoot = this.handleSingleLeftRotation();
    }
    let parentNode = this.imbalancedNodeParent;
    if (!parentNode) {
      this.root = newRoot;
    } else {
      parentNode[this.problemNodeDirection] = newRoot;
    }

    this.updateNodeHeightAndBothChildren(newRoot);
    this.imbalancedNode = null;
    this.imbalancedNodeParent = null;
    this.setImbalancedNodeFromParent(newRoot);
  }

  isSingleLeftRotation() {
    const rightChild = this.imbalancedNode.right;
    const rightChildLeftHeight = this.getHeight(rightChild.left);
    const rightChildRightHeight = this.getHeight(rightChild.right);
    if (rightChildRightHeight > rightChildLeftHeight) {
      return true;
    }
    return false;
  }
  isSingleRightRotation() {
    const leftChild = this.imbalancedNode.left;
    const leftChildLeftHeight = this.getHeight(leftChild.left);
    const leftChildRightHeight = this.getHeight(leftChild.right);
    if (leftChildLeftHeight > leftChildRightHeight) {
      return true;
    }
    return false;
  }

  handleSingleLeftRotation() {
    let originalRoot = this.imbalancedNode;
    const newRoot = this.singleLeft(originalRoot);
    return newRoot;
  }

  handleSingleRightRotation() {
    let originalRoot = this.imbalancedNode;
    const newRoot = this.singleRight(originalRoot);
    return newRoot;
  }

  handleDoubleRightRotation() {
    let newRoot;
    let originalRoot = this.imbalancedNode;
    originalRoot.left = this.singleLeft(originalRoot.left);
    newRoot = this.singleRight(originalRoot);
    return newRoot;
  }

  handleDoubleLeftRotation() {
    let newRoot;
    let originalRoot = this.imbalancedNode;
    originalRoot.right = this.singleRight(originalRoot.right);
    newRoot = this.singleLeft(originalRoot);
    return newRoot;
  }

  singleRight(node) {
    const newRoot = node.left;
    node.left = newRoot.right;
    newRoot.right = node;
    return newRoot;
  }

  singleLeft(node) {
    const newRoot = node.right;
    node.right = newRoot.left;
    newRoot.left = node;
    return newRoot;
  }

  getHeight(node) {
    if (!node) { return -1; }
    return node.height;
  }

  setImbalancedNode(node) {
    if (!this.imbalancedNode && this.isImbalanced(node)) {
      this.imbalancedNode = node;
      // set parent?
    }
  }

  setImbalancedNodeFromParent(parentNode) {
    if (parentNode.left && this.isImbalanced(parentNode.left)) {
      this.imbalancedNode = parentNode.left;
      this.imbalancedNodeParent = parentNode;
    }
    if (parentNode.right && this.isImbalanced(parentNode.right)) {
      this.imbalancedNode = parentNode.right;
      this.imbalancedNodeParent = parentNode;
    }
  }

  isImbalanced(node) {
    const leftHeight = this.getHeight(node.left);
    const rightHeight = this.getHeight(node.right);

    if (Math.abs(leftHeight - rightHeight) >= 2) {
      return true;
    }
    return undefined;
  }

  updateNodeHeight(node) {
    if (!node.left && !node.right) {
      node.height = 0;
      return;
    }
    if (!node.left) {
      node.height = node.right.height + 1;
      return;
    }
    if (!node.right) {
      node.height = node.left.height + 1;
      return;
    }
    if (node.left && node.right) {
      node.height = Math.max(node.left.height, node.right.height) + 1;
    }
  }

  updateNodeHeightAndBothChildren(node) {
    this.updateNodeHeight(node.left)
    this.updateNodeHeight(node.right)
    this.updateNodeHeight(node)
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

  contains(value, cb) {
    if (!this.isNumericInput(value)) { return undefined; }
    value = Number(value);

    if (this.treeIsEmpty()) { return false; }

    const go = (node) => {
      // base case
      if (cb){ cb(); }
      if (node.value === value) {
        return true;
      }

      if (!node.left && !node.right) { return false; }

      if (value < node.value) {
        if (node.left) {
          return go(node.left);
        }
        return false;
      }
      if (value > node.value) {
        if (node.right) {
          return go(node.right);
        }
        return false;
      }
      return undefined;
    };

    const result = go(this.root);

    return result;
  }

  findMin(cb) {
    if (this.treeIsEmpty()) { return undefined; }

    let current = this.root;

    while (current.left) {
      if (cb){ cb(); }
      current = current.left;
    }

    return current.value;
  }

  findMax(cb) {
    if (this.treeIsEmpty()) { return undefined; }

    let current = this.root;

    while (current.right) {
      if (cb){ cb(); }
      current = current.right;
    }

    return current.value;
  }

  printPreOrder() {
    const result = [];

    if (this.treeIsEmpty()) { return result; }

    const go = (node) => {
      result.push(node.value);
      if (node && node.left) { go(node.left); }
      if (node && node.right) { go(node.right); }
    };

    go(this.root);

    return result;
  }

  printInOrder() {
    const result = [];

    if (this.treeIsEmpty()) { return result; }

    const go = (node) => {
      if (node && node.left) { go(node.left); }
      result.push(node.value);
      if (node && node.right) { go(node.right); }
    };

    go(this.root);

    return result;
  }

  printPostOrder() {
    const result = [];

    if (this.treeIsEmpty()) { return result; }

    const go = (node) => {
      if (node && node.left) { go(node.left); }
      if (node && node.right) { go(node.right); }
      result.push(node.value);
    };

    go(this.root);

    return result;
  }

  containsDuplicates() {
    const seen = new Set();
    const inOrderArray = this.printInOrder();

    for (let i = 0; i < inOrderArray.length; i += 1) {
      const current = inOrderArray[i];

      if (seen.has(current)) {
        return true;
      }
      seen.add(current);
    }
    return false;
  }

  containsHeightErrors() {
    let result = false;

    if (this.treeIsEmpty()) { return false; }

    const go = (node) => {
      if (node && node.left) { go(node.left); }
      if (node && node.right) { go(node.right); }
      if (this.isImbalanced(node)) {
        result = true;
      }
    };

    go(this.root);

    return result;
  }
}

module.exports = AVLTree;
