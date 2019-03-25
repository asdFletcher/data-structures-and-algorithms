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
      
      if (imbalancedNode){
        let problemNodeDirection = this.getProblemNodeDirection(node, imbalancedNode);
        this.performRotations(imbalancedNode, node, problemNodeDirection);
      }
      if (!imbalancedNode && this.isImbalanced(node)){
        imbalancedNode = node;
      }

      this.updateNodeHeight(node);
      return result;
    };
    
    let result = _go(this.root);

    // root imbalance
    if (this.isImbalanced(this.root)){
      this.performRotations(this.root);
    }

    return result;
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // vvvvvvvvvv delete vvvvvvvvv

  remove(value){
    if (!this.isNumericInput()){ return undefined; }
    value = parseInt(value);

    if (this.treeIsEmpty()){ return undefined; }

    let imbalancedNode;

    const _go = (node) => {

      let result;

      // root node is the value
      if(node.value === value){
        // located node to be deleted
        result = new Node(node.value);

        // remove the node
        this.root = this.removeNode(node);
        if ( this.root ) { this.updateNodeHeight(this.root); }

        return result;
      }

      if (node.right && node.right.value === value){
        // located node to be deleted
        result = new Node(node.right.value);

        // remove the node
        node.right = this.removeNode(node.right);
        if ( node.right) { this.updateNodeHeight(node.right); }
        this.updateNodeHeight(node);

        // check for problem nodes
        if (!imbalancedNode && this.isImbalanced(node)){
          console.log(`imbalance detected, setting it: node: `, node);
          imbalancedNode = node;
        }
        return result;
      }
      if (node.left && node.left.value === value){
        // located node to be deleted
        result = new Node(node.left.value);

        // remove the node
        node.left = this.removeNode(node.left);
        if ( node.left) { this.updateNodeHeight(node.left); }
        this.updateNodeHeight(node);
        
        // check for problem nodes
        if (!imbalancedNode && this.isImbalanced(node)){
          console.log(`imbalance detected, setting it: node: `, node);
          imbalancedNode = node;
        }
        return result;
      }
      // navigate right
      if (value > node.value){
        result = _go(node.right);
      } else if (value < node.value){
        // navigate left
        result = _go(node.left);
      }
      
      // done with recursion
      console.log(`on node: `, node);
      console.log(`left height: `, node.left && node.left.height);
      console.log(`right height: `, node.right && node.right.height);
      console.log(`imbalanced node: `, imbalancedNode);
      
      if (imbalancedNode){
        console.log(`🍊imbalance detected, fixing it: node: `, node);
        // debugger
        let problemNodeDirection = this.getProblemNodeDirection(node, imbalancedNode);
        this.performRotations(imbalancedNode, node, problemNodeDirection);
      }
      if (!imbalancedNode && this.isImbalanced(node)){
        console.log(`🍊imbalance detected, setting it: node: `, node);
        imbalancedNode = node;
      }

      this.updateNodeHeight(node);
      console.log(`🍓done w delete: `, result);
      return result;
    };
    
    let result = _go(this.root);

    // root is gone
    if(!this.root){ return result; }
    
    // root imbalance
    if (this.isImbalanced(this.root)){
      console.log(`root imbalance detected: `, this.root);
      this.performRotations(this.root);
    }

    return result;

  }

  removeNode(node){
    console.log(`in remove node`);

    // if leaf, remove
    if (!node.left && !node.right){
      return null;
    }

    // if two children --> Find sub tree min or max --> replace that node
    if (node.left && node.right){
      return this.removeNodeWithTwoChildren(node);
    }

    // if only one child, make that child the new node
    if (node.left){
      return node.left;
    }
    return node.right;

  }

  removeNodeWithTwoChildren(node){
    // debugger
    console.log(`it has 2 children`);
    let maxNodeValueOfSubTree;
    let minNodeValueOfSubTree;
    let imbalancedNode;
    
    // ~~~~~~ 🐤🍊🍎🐤🍊🍎🐤🍊🍎🐤🍊🍎🐤🍊 ~~~~~~ 

    const _goMin = (node) => {
      console.log(`~~ goMin ~~ node: `, node);
      // base case
      if(!node.left){
        minNodeValueOfSubTree = node.value;
        console.log(`base case of goMin, minNodeValueOfSubTree:`, minNodeValueOfSubTree);

        if(!node.right){
          return null;
        }
        return node.right;
      }

      let result = _goMin(node.left);
      
      if (result === null){
        node.left = null;
        this.updateNodeHeight(node);
        if (this.isImbalanced(node)){
          console.log(`🍎imbalance detected, setting it: node: `, node);
          imbalancedNode = node;
        }
        return true;
      }
      if (result instanceof Node){
        node.left = result;
        this.updateNodeHeight(node.left);
        this.updateNodeHeight(node);
        if (this.isImbalanced(node)){
          console.log(`🍊🍎imbalance detected, setting it: node: `, node);
          imbalancedNode = node;
        }
        return true;
      }

      this.updateNodeHeight(node);

      if (imbalancedNode){
        console.log(`🍊🍊imbalance detected, fixing it: node: `, node);
        let problemNodeDirection = this.getProblemNodeDirection(node, imbalancedNode);
        this.performRotations(imbalancedNode, node, problemNodeDirection);
      }
      if (!imbalancedNode && this.isImbalanced(node)){
        console.log(`🍎🍊imbalance detected, setting it: node: `, node);
        imbalancedNode = node;
      }

      return result;
    };

    // ~~~~~~ 🐤🍊🍎🐤🍊🍎🐤🍊🍎🐤🍊🍎🐤🍊 ~~~~~~ 

    const _goMax = (node) => {
      console.log(`~~ goMax ~~ node: `, node);

      // base case
      if(!node.right){
        console.log(`base case of goMax, minNodeValueOfSubTree:`, maxNodeValueOfSubTree);

        maxNodeValueOfSubTree = node.value;

        if(!node.left){
          return null;
        }
        return node.left;
      }

      let result = _goMax(node.right);
      
      if (result === null){
        node.right = null;
        this.updateNodeHeight(node);
        if (this.isImbalanced(node)){
          console.log(`🍎imbalance detected, setting it: node: `, node);
          imbalancedNode = node;
        }
        return true;
      }
      if (result instanceof Node){
        node.right = result;
        this.updateNodeHeight(node.right);
        this.updateNodeHeight(node);
        if (this.isImbalanced(node)){
          console.log(`🍊🍎imbalance detected, setting it: node: `, node);
          imbalancedNode = node;
        }
        return true;
      }

      this.updateNodeHeight(node);

      if (imbalancedNode){
        console.log(`🍊🍊imbalance detected, fixing it: node: `, node);
        let problemNodeDirection = this.getProblemNodeDirection(node, imbalancedNode);
        this.performRotations(imbalancedNode, node, problemNodeDirection);
      }
      if (!imbalancedNode && this.isImbalanced(node)){
        console.log(`🍎🍊imbalance detected, setting it: node: `, node);
        imbalancedNode = node;
      }

      return result;
    };

    if (node.left.height > node.right.height){
      let result = _goMax(node.left);

      if (result === null){
        node.right = null;
        this.updateNodeHeight(node);
        if (this.isImbalanced(node)){
          console.log(`🍎imbalance detected, setting it: node: `, node);
          imbalancedNode = node;
        }
      }
      if (result instanceof Node){
        node.right = result;
        this.updateNodeHeight(node.right);
        this.updateNodeHeight(node);
        if (this.isImbalanced(node)){
          console.log(`🍊🍎imbalance detected, setting it: node: `, node);
          imbalancedNode = node;
        }
      }

      node.value = maxNodeValueOfSubTree;
      console.log(`done with delete, node: `, node);
    } else {
      let result = _goMin(node.right);

      if (result === null){
        node.right = null;
        this.updateNodeHeight(node);
        if (this.isImbalanced(node)){
          console.log(`🍎imbalance detected, setting it: node: `, node);
          imbalancedNode = node;
        }
      }
      if (result instanceof Node){
        node.right = result;
        this.updateNodeHeight(node.right);
        this.updateNodeHeight(node);
        if (this.isImbalanced(node)){
          console.log(`🍊🍎imbalance detected, setting it: node: `, node);
          imbalancedNode = node;
        }
      }

      node.value = minNodeValueOfSubTree;
      console.log(`done with delete, node: `, node);
    }

    return node;
  }

  // ^^^^^^^^^^ delete ^^^^^^^^^
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~
  
  getProblemNodeDirection(node, imbalancedNode){
    if (node.left && node.left.value === imbalancedNode.value){
      return 'left';
    }
    return 'right';
  }

  performRotations(originalRoot, parentNode, problemNodeDirection){
    let leftHeight = this.getLeftHeight(originalRoot);
    let rightHeight = this.getRightHeight(originalRoot);

    // left imbalance
    if (leftHeight - rightHeight >= 2){
      console.log(`left imbalance: rightHeight${rightHeight}, leftHeight:${leftHeight}`);
      let leftChild = originalRoot.left;
      let leftChildLeftHeight = this.getLeftHeight(leftChild);
      let leftChildRightHeight = this.getRightHeight(leftChild);

      // single left rotation
      if (leftChildLeftHeight > leftChildRightHeight){
        console.log(`single left rotation`);
        this._handleSingleLeftRotation(originalRoot, parentNode, problemNodeDirection);
      }
      // double left rotation
      if (leftChildRightHeight > leftChildLeftHeight){
        console.log(`double left rotation`);
        this._handleDoubleLeftRotation(originalRoot, parentNode, problemNodeDirection);
      }

      // case: L.L & L.R are equal, can only happen on delete
      // prefer a double rotation in this case
      if (leftChildRightHeight === leftChildLeftHeight){
        console.log(`double left rotation deletion case`);
        this._handleDoubleLeftRotation(originalRoot, parentNode, problemNodeDirection);
      }

    }
    
    // right imbalance
    if (rightHeight - leftHeight >= 2){
      console.log(`right imbalance: rightHeight${rightHeight}, leftHeight:${leftHeight}`);
      let rightChild = originalRoot.right;
      let rightChildLeftHeight = this.getLeftHeight(rightChild);
      let rightChildRightHeight = this.getRightHeight(rightChild);
      // single right rotation
      if (rightChildRightHeight > rightChildLeftHeight){
        console.log(`single right rotation`);
        this._handleSingleRightRotation(originalRoot, parentNode, problemNodeDirection);
      }
      // double right rotation
      if (rightChildLeftHeight > rightChildRightHeight){
        console.log(`double right rotation`);
        this._handleDoubleRightRotation(originalRoot, parentNode, problemNodeDirection);
      }

      // case: R.L & R.R are equal, can only happen on delete
      // prefer a double rotation in this case
      if (rightChildRightHeight === rightChildLeftHeight){
        console.log(`double right rotation delete case`);
        this._handleDoubleRightRotation(originalRoot, parentNode, problemNodeDirection);
      }

    }
  }

  _handleDoubleLeftRotation(originalRoot, parentNode, problemNodeDirection){
    if (!parentNode){
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
    if (!parentNode){
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
    if (!parentNode){
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
    if (!parentNode){
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
    if (!node.left){ return -1; }
    return node.left.height;
  }
  getRightHeight(node){
    if (!node.right){ return -1; }
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
    if (!this.root) { return true; }
    return false;
  }

  isNumericInput(value){
    let numericalValue = parseInt(value);
    if ( typeof numericalValue === 'number' ) { return true; }
    return false;
  }

  // contains
  // findMin
  // findMax
  // print
}

module.exports = AVLTree;