'use strict';

const Node = require('./avl-tree-node.js');

class AVLTree {
  constructor(){
    this.root = null;
    this.insertComputations = 0;
    this.removeComputations = 0;
    this.containsComputations = 0;
    this.findMaxComputations = 0;
    this.findMinComputations = 0;
    this.printComputations = 0;
  }

  insert(value){
    this.insertComputations = 0;

    if (!this.isNumericInput()){ return undefined; }
    value = parseInt(value);

    let newNode = new Node(value);

    if (this.treeIsEmpty()){ 
      this.root = newNode;
      return newNode;
    }

    let imbalancedNode;

    const _go = (node) => {
      this.insertComputations++;
      if (value === node.value) { return undefined; } // value already in tree

      // add right node
      if (!node.right && value > node.value ){
        node.right = newNode;
        this.updateNodeHeight(node);
        return newNode;
      }
      // add left node
      if (!node.left && value < node.value ){
        node.left = newNode;
        this.updateNodeHeight(node);
        return newNode;
      }
      
      let result;
      // navigate right
      if (value > node.value){
        result = _go(node.right);
      } else if (value < node.value){
        // navigate left
        result = _go(node.left);
      }
      
      // done with recursion
      
      if(imbalancedNode){
        let problemNodeDirection = this.getProblemNodeDirection(node, imbalancedNode);
        this.performRotations(imbalancedNode, node, problemNodeDirection);
      }
      if(!imbalancedNode && this.isImbalanced(node)){
        imbalancedNode = node;
      }

      this.updateNodeHeight(node);
      return result;
    };
    
    let result = _go(this.root);

    // root imbalance
    if(this.isImbalanced(this.root)){
      this.performRotations(imbalancedNode);
    }


    // this.updateHeights();
    return result;
  }

  getProblemNodeDirection(node, imbalancedNode){
    if(node.left && node.left.value === imbalancedNode.value){
      return 'left';
    }
    return 'right';
  }

  performRotations(originalRoot, parentNode, problemNodeDirection){
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

      this.updateNodeHeight(leftSubTree);
      this.updateNodeHeight(rightSubTree);
      this.updateNodeHeight(newRoot);
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

    this.updateNodeHeight(leftSubTree);
    this.updateNodeHeight(rightSubTree);
    this.updateNodeHeight(newRoot);
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

      this.updateNodeHeight(leftSubTree);
      this.updateNodeHeight(rightSubTree);
      this.updateNodeHeight(newRoot);
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

    this.updateNodeHeight(leftSubTree);
    this.updateNodeHeight(rightSubTree);
    this.updateNodeHeight(newRoot);
  }

  _handleSingleLeftRotation(originalRoot, parentNode, problemNodeDirection){
    if(!parentNode){
      this.root = originalRoot.left;
      originalRoot.left = this.root.right;
      this.root.right = originalRoot;

      this.updateNodeHeight(this.root.left);
      this.updateNodeHeight(this.root.right);
      this.updateNodeHeight(this.root);
      return;
    }

    let newRoot = originalRoot.left;
    originalRoot.left = newRoot.right;
    newRoot.right = originalRoot;
    parentNode[problemNodeDirection] = newRoot;

    this.updateNodeHeight(newRoot.left);
    this.updateNodeHeight(newRoot.right);
    this.updateNodeHeight(newRoot);
  }

  _handleSingleRightRotation(originalRoot, parentNode, problemNodeDirection){
    if(!parentNode){
      this.root = originalRoot.right;
      originalRoot.right = this.root.left;
      this.root.left = originalRoot;

      this.updateNodeHeight(this.root.left);
      this.updateNodeHeight(this.root.right);
      this.updateNodeHeight(this.root);
      return;
    }

    let newRoot = originalRoot.right;
    originalRoot.right = newRoot.left;
    newRoot.left = originalRoot;
    parentNode[problemNodeDirection] = newRoot;

    this.updateNodeHeight(newRoot.left);
    this.updateNodeHeight(newRoot.right);
    this.updateNodeHeight(newRoot);
  }

  getLeftHeight(node){
    if(!node.left){ return -1; }
    return node.left.height;
  }
  getRightHeight(node){
    if(!node.right){ return -1; }
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
  // delete
  // contains
  // findMin
  // findMax
  // print
}

module.exports = AVLTree;