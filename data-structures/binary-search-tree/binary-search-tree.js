'use strict';

const Node = require('./binary-search-tree-node.js');

class BinarySearchTree {

  constructor() {
    this.root = null;
    this.insertComputations = 0;
    this.removeComputations = 0;
    this.containsComputations = 0;
    this.findMaxComputations = 0;
    this.findMinComputations = 0;
    this.printComputations = 0;
  }

  insert(value){

    // for timing
    this.insertComputations = 0;

    if (!this.isNumericInput(value)) { return; }
    value = parseInt(value);

    let newNode = new Node(value);
    
    if (this.treeIsEmpty()) { 
      this.root = newNode;
      return newNode;
    }

    const _go = (node) => {
      this.insertComputations++;

      if (node.value === value) { return; } // already in tree

      if (!node.left && value < node.value ) {
        node.left = newNode;
        return newNode;
      }
      if (!node.right && value > node.value ) {
        node.right = newNode;
        return newNode;
      }
      
      if (value > node.value) {
        return _go(node.right);
      }

      return _go(node.left);
    };

    return _go(this.root);
  }

  remove(value){
    
    // for timing
    this.removeComputations = 0;

    if (this.treeIsEmpty()) { return; }
    
    if (!this.isNumericInput(value)) { return; }
    value = parseInt(value);

    // if root is removed
    if(this.root.value === value){
      let newRoot = this._removeRootFromTree(this.root);
      this.root = newRoot;
    }

    let parentNode = this.findParent(value);
    let deletedNode;

    if (!parentNode) { return; }

    if ( value < parentNode.value ) {
      deletedNode = parentNode.left;
      parentNode.left = this._removeRootFromTree(parentNode.left);
    } else {
      deletedNode = parentNode.right;
      parentNode.right = this._removeRootFromTree(parentNode.right);
    }
    return deletedNode;    
  }

  _removeRootFromTree(node){

    if (!node.left && !node.right) { return null; }
    if (!node.left) { return node.right; } 
    if (!node.right) { return node.left; }
    
    const replacementDirection = this._pickASide();
    let newRoot = node[replacementDirection];

    if (replacementDirection === 'left'){
      const maxNodeOfLeftTree = this.findMaxNode(node.left);
      maxNodeOfLeftTree.right = node.right;
    }
    
    if (replacementDirection === 'right'){
      const minNodeOfRightTree = this.findMinNode(node.right);
      minNodeOfRightTree.left = node.left;
    }
    
    return newRoot;
  }

  findMax(){
    this.findMaxComputations = 0;
    let node = this.findMaxNode(this.root);
    return node && node.value;
  }
  
  findMin(){
    this.findMinComputations = 0;
    let node = this.findMinNode(this.root);
    return node && node.value;
  }

  contains(value){
    this.containsComputations = 0;

    if (this.treeIsEmpty()) { return false; }
    if (!this.isNumericInput(value)) { return false; }

    value = parseInt(value);

    const _go = (node) => {
      this.containsComputations++;

      if (!node) { return false; }
      if (node.value === value) { return true; }
      if (value > node.value) { return _go(node.right); }
      
      return _go(node.left);
    };

    return _go(this.root);
  }

  isNumericInput(value){
    let numericalValue = parseInt(value);
    if ( typeof numericalValue === 'number' ) { return true; }
    return false;
  }

  _pickASide(){
    let roll = Math.random();
    if (roll > 0.5){
      return 'left';
    } else {
      return 'right';
    }
  }

  findParent(value){
    const _go = (node) => {
      this.removeComputations++;
      if (!node) { return undefined; }

      if (node.left && node.left.value === value){ return node; }
      if (node.right && node.right.value === value){ return node; }
      
      if (value > node.value){
        return _go(node.right);
      }
      
      return _go(node.left);
    };

    return _go(this.root);
  }

  findMaxNode(node){
    if (!node) { return undefined; }
    
    let current = node;

    while (current.right){
      current = current.right;
      this.removeComputations++;
      this.findMaxComputations++;
    }

    return current;
  }

  findMinNode(node){
    if (!node) { return undefined; }
    
    let current = node;

    while (current.left){
      current = current.left;
      this.removeComputations++;
      this.findMinComputations++;
    }

    return current;
  }

  treeIsEmpty(){
    if (!this.root) { return true; }

    return false;
  }

  printPreOrder(){
    this.printComputations = 0;
    const result = [];

    const _go = (node) => {
      
      if (!node) { return; }
      this.printComputations++;
      result.push(node.value);
      _go(node.left);
      _go(node.right);
    };

    _go(this.root);
    return result;
  }
  printInOrder(){
    const result = [];

    const _go = (node) => {
      if (!node) { return; }
      _go(node.left);
      result.push(node.value);
      _go(node.right);
    };

    _go(this.root);
    return result;
  }
  printPostOrder(){
    const result = [];

    const _go = (node) => {
      if (!node) { return; }
      _go(node.left);
      _go(node.right);
      result.push(node.value);
    };

    _go(this.root);
    return result;
  }
}

module.exports = BinarySearchTree;