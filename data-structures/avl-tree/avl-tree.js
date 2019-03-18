'use strict';

const Node = require('./avl-tree-node.js');

class AVLTree {
  constructor(){
    this.root = null;
  }

  insert(value){

    if (!this.isNumericInput()){ return undefined; }
    value = parseInt(value);

    let newNode = new Node(value);

    // console.log(`new node: `, newNode);
    if (this.treeIsEmpty()){ 
      this.root = newNode;
      return newNode;
    }

    let problemNode;

    const _go = (node) => {
      // console.log(`~~ ${node.value} ~~`);
      if (value === node.value) { return undefined; } // value already in tree

      // add right node
      if (!node.right && value > node.value ){
        // console.log(`🍦 adding right`);
        node.right = newNode;
        this.updateNodeHeight(node);
        return newNode;
      }
      // add left node
      if (!node.left && value < node.value ){
        // console.log(`🍕 adding left`);
        node.left = newNode;
        this.updateNodeHeight(node);
        return newNode;
      }
      
      let result;
      // navigate right
      if (value > node.value){
        // console.log(`🍡 go right`);
        result = _go(node.right);
      } else if (value < node.value){
        // navigate left
        // console.log(`🌝 go left`);
        result = _go(node.left);
      }
      
      // done with recursion
      // console.log(`done with recrusion 🍊`);
      this.updateNodeHeight(node);
      if(problemNode){
        let problemNodeDirection = this.getProblemNodeDirection(node, problemNode);
        this.handleProblemNode(problemNode, node, problemNodeDirection);
      }
      if(!problemNode && this.isImbalanced(node)){
        problemNode = node;
      }

      return result;
    }
    
    let result = _go(this.root);

    if(this.isImbalanced(this.root)){
      // console.log(`root imbalance detected`);
      this.handleProblemNode(problemNode);
    }

    this.updateHeights();
    // console.log(`Tree this.root: `, this.root);

    // console.log(`problemNode: `, problemNode);
    return result;
  }

  getProblemNodeDirection(node, problemNode){
    if(node.left && node.left.value === problemNode.value){
      return "left";
    }
    return "right";
  }

  handleProblemNode(originalRoot, parentNode, problemNodeDirection){
    let leftHeight = this.getLeftHeight(originalRoot);
    let rightHeight = this.getRightHeight(originalRoot);

    // left imbalance
    if (leftHeight - rightHeight >= 2){
      let leftChild = originalRoot.left;
      let leftChildLeftHeight = this.getLeftHeight(leftChild);
      let leftChildRightHeight = this.getRightHeight(leftChild);

      // single left rotation
      if (leftChildLeftHeight > leftChildRightHeight){
        this._handleSingleLeftRotation(originalRoot, parentNode, problemNodeDirection);

      }
      // double left rotation
      if (leftChildRightHeight > leftChildLeftHeight){
        this._handleDoubleLeftRotation(originalRoot, parentNode, problemNodeDirection);
      }

    }

    // right imbalance
    if (rightHeight - leftHeight >= 2){
      let rightChild = originalRoot.right;
      let rightChildLeftHeight = this.getLeftHeight(rightChild);
      let rightChildRightHeight = this.getRightHeight(rightChild);
      // single right rotation
      if (rightChildRightHeight > rightChildLeftHeight){
        this._handleSingleRightRotation(originalRoot, parentNode, problemNodeDirection);
      }
      // double right rotation
      if (rightChildLeftHeight > rightChildRightHeight){
        this._handleDoubleRightRotation(originalRoot, parentNode, problemNodeDirection);
      }
    }

  }

  _handleDoubleLeftRotation(originalRoot, parentNode, problemNodeDirection){
    if(!parentNode){
      const rightSubTree = this.root;
      const leftSubTree = originalRoot.left;
      const newRoot = leftSubTree.right;

      leftSubTree.right = newRoot.left;
      rightSubTree.left = newRoot.right;
      newRoot.left = leftSubTree;
      newRoot.right = rightSubTree;
      this.root = newRoot;
      return;
    }
    const rightSubTree = originalRoot;
    const leftSubTree = originalRoot.left;
    const newRoot = leftSubTree.right;

    leftSubTree.right = newRoot.left;
    rightSubTree.left = newRoot.right;
    newRoot.left = leftSubTree;
    newRoot.right = rightSubTree;
    parentNode[problemNodeDirection] = newRoot;
  }
  _handleDoubleRightRotation(originalRoot, parentNode, problemNodeDirection){
    if(!parentNode){
      const leftSubTree = this.root;
      const rightSubTree = originalRoot.right;
      const newRoot = rightSubTree.left;

      leftSubTree.right = newRoot.left;
      rightSubTree.left = newRoot.right;
      newRoot.left = leftSubTree;
      newRoot.right = rightSubTree;
      this.root = newRoot;
      return;
    }

    const leftSubTree = originalRoot;
    const rightSubTree = originalRoot.right;
    const newRoot = rightSubTree.left;

    leftSubTree.right = newRoot.left;
    rightSubTree.left = newRoot.right;
    newRoot.left = leftSubTree;
    newRoot.right = rightSubTree;
    parentNode[problemNodeDirection] = newRoot;

  }
  _handleSingleLeftRotation(originalRoot, parentNode, problemNodeDirection){
    if(!parentNode){
      this.root = originalRoot.left;
      originalRoot.left = this.root.right;
      this.root.right = originalRoot;
      return;
    }
    let newRoot = originalRoot.left;
    originalRoot.left = newRoot.right;
    newRoot.right = originalRoot;
    parentNode[problemNodeDirection] = newRoot;
  }
  _handleSingleRightRotation(originalRoot, parentNode, problemNodeDirection){
    if(!parentNode){
      this.root = originalRoot.right;
      originalRoot.right = this.root.left;
      this.root.left = originalRoot;
      return;
    }
    let newRoot = originalRoot.right;
    originalRoot.right = newRoot.left;
    newRoot.left = originalRoot;
    parentNode[problemNodeDirection] = newRoot;
  }
  
  updateHeights(){
    if(this.treeIsEmpty()){ return; }

    const _go = (node) => {
      if (!node.left && !node.right){
        this.updateNodeHeight(node);
      }
      // go right
      if (node.right){
        // going down
        _go(node.right);
        // coming up
        this.updateNodeHeight(node);
      }
      // go left
      if (node.left){
        // going down
        _go(node.left);
        // coming up
        this.updateNodeHeight(node);
      }
    }

    _go(this.root);
  }

  getLeftHeight(node){
    if(!node.left){ return -1 }
    return node.left.height;
  }
  getRightHeight(node){
    if(!node.right){ return -1 }
    return node.right.height;
  }

  isImbalanced(node){
    let leftHeight = this.getLeftHeight(node);
    let rightHeight = this.getRightHeight(node);

    if (Math.abs(leftHeight - rightHeight) >= 2){
      return true;
    }
  }

  updateNodeHeight(node){
    if (!node.left && !node.right){
      node.height = 0;
      return;
    }
    if (!node.left){
      node.height = node.right.height + 1;
      return;
    }
    if (!node.right){
      node.height = node.left.height + 1;
      return;
    }
    if (node.left && node.right) {
      node.height = Math.max(node.left.height, node.right.height) + 1;
    }
  }

  treeIsEmpty(){
    if(!this.root) { return true; }
    return false;
  }

  isNumericInput(value){
    let numericalValue = parseInt(value);
    if ( typeof numericalValue === 'number' ) { return true; }
    return false;
  }
  // insert
  // delete
  // contains
  // findMin
  // findMax
  // print
}

module.exports = AVLTree;