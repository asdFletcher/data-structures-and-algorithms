'use strict';

const Node = require('./binary-search-tree-node.js');

class BinarySearchTree {

  constructor() {
    this.root = null;
    this.insertComputations = 0;
    this.removeComputations = 0;
    this.replacementNode = null;
    this.containsComputations = 0;
  }

  insert(value){
    this.insertComputations = 0;

    if (!this.isNumericInput(value)) { return; }
    value = Number(value);

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
    this.removeComputations = 0;
    
    if (this.treeIsEmpty()) { return; }
    if (!this.isNumericInput(value)) { return; }
    value = Number(value);
    
    if (this.root.value === value){
      this.root = this._removeRootFromTree(this.root);
    } else {
      let parentNode = this.findParent(value);
      if (!parentNode) { return; } // value not in tree

      if ( value < parentNode.value ) {
        parentNode.left = this._removeRootFromTree(parentNode.left);
      } else {
        parentNode.right = this._removeRootFromTree(parentNode.right);
      }
    }

    let result = this.deletedNode;
    this.deletedNode = undefined;
    result.left = null;
    result.right = null;
    return result;
  }

  _removeRootFromTree(root){
    this.deletedNode = root;

    if (!root.left && !root.right) { return null; }
    if (!root.left) { return root.right; } 
    if (!root.right) { return root.left; }
    
    let replacementNodeDirection = this._pickASide();

    let newRoot;

    // replacement side has 1 child
    if (replacementNodeDirection === 'left' && this._subTreeRootIsMax(root.left)){
      newRoot = root[replacementNodeDirection];
      newRoot.right = root.right;
      return newRoot;
    }
    if (replacementNodeDirection === 'right' && this._subTreeRootIsMin(root.right)){
      newRoot = root[replacementNodeDirection];
      newRoot.left = root.left;
      return newRoot;
    }

    // replacement side has 2 children
    return this._removeMinOrMax(root, replacementNodeDirection);
  }

  _getOppositeDirection(direction){
    let oppositeDirection;
    if (direction === 'left'){
      oppositeDirection = 'right';
    } else {
      oppositeDirection = 'left';
    }
    return oppositeDirection;
  }

  _removeMinOrMax(root, replacementDir){
    let newRoot;

    let oppositeDir = this._getOppositeDirection(replacementDir);

    // find max or min node and remove it from the subtree
    let current = root[replacementDir];
    while(current[oppositeDir][oppositeDir]){
      current = current[oppositeDir];
    }

    newRoot = current[oppositeDir];
    if (newRoot[replacementDir]){
      current[oppositeDir] = newRoot[replacementDir];
    } else {
      current[oppositeDir] = null;
    }
    newRoot.left = root.left;
    newRoot.right = root.right;
    return newRoot; 
  }

  _subTreeRootIsMax(node){
    if(!node.right){
      return true;
    }
    return false;
  }

  _subTreeRootIsMin(node){
    if(!node.left){
      return true;
    }
    return false;
  }

  remove_bad(value){
    this.removeComputations = 0;

    if (this.treeIsEmpty()) { return; }
    
    if (!this.isNumericInput(value)) { return; }
    value = Number(value);

    // if root is removed
    if(this.root.value === value){
      let newRoot = this._removeRootFromTree_Bad(this.root);
      this.root = newRoot;
    }

    let parentNode = this.findParent(value);
    let deletedNode;

    if (!parentNode) { return; }

    if ( value < parentNode.value ) {
      deletedNode = parentNode.left;
      parentNode.left = this._removeRootFromTree_Bad(parentNode.left);
    } else {
      deletedNode = parentNode.right;
      parentNode.right = this._removeRootFromTree_Bad(parentNode.right);
    }
    return deletedNode;    
  }

  _removeRootFromTree_Bad(node){

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
    let node = this.findMaxNode(this.root);
    return node && node.value;
  }
  
  findMin(){
    let node = this.findMinNode(this.root);
    return node && node.value;
  }

  contains(value){
    if (this.treeIsEmpty()) { return false; }
    if (!this.isNumericInput(value)) { return false; }
    this.containsComputations = 0;

    value = Number(value);

    const _go = (node) => {
      this.containsComputations++;
      if (!node) { return false; }
      if (node.value === value) { return true; }
      if (value > node.value) { return _go(node.right); }
      
      return _go(node.left);
    }

    return _go(this.root);
  }

  isNumericInput(value){
    if (typeof value === 'boolean'){ return false; }

    let numericalValue = Number(value);

    if (isNaN(numericalValue)){ return false; }
    
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
      if (!node) { return undefined; }
      this.removeComputations++;

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
    }

    return current;
  }

  findMinNode(node){
    if (!node) { return undefined; }
    
    let current = node;

    while (current.left){
      current = current.left;
      this.removeComputations++;
    }

    return current;
  }

  treeIsEmpty(){
    if (!this.root) { return true; }

    return false;
  }

  printPreOrder(){
    const result = [];

    function _go(node){
      if (!node) { return; }
      result.push(node.value);
      _go(node.left);
      _go(node.right);
    }

    _go(this.root);
    return result;
  }

  printInOrder(){
    const result = [];

    function _go(node){
      if (!node) { return; }
      _go(node.left);
      result.push(node.value);
      _go(node.right);
    }

    _go(this.root);
    return result;
  }
  
  printPostOrder(){
    const result = [];

    function _go(node){
      if (!node) { return; }
      _go(node.left);
      _go(node.right);
      result.push(node.value);
    }

    _go(this.root);
    return result;
  }
}

module.exports = BinarySearchTree;
