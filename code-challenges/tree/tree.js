'use strict';

class Node{
  constructor(value){
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

class Tree {

  constructor(){
    this.root = null;
    this.left = null;
    this.right = null;
  }

  preOrder(){
    let results = [];

    function _go(node){
      results.push(node.value);
      if (node.left){ _go(this.left); }
      if (node.right){ _go(this.left); }
    }
    _go(this.root);

  }

  inOrder(){
    let results = [];

    function _go(node){
      if (node.left){ _go(this.left); }
      results.push(node.value);
      if (node.right){ _go(this.left); }
    }
    _go(this.root);

  }
  
  postOrder(){
    let results = [];

    function _go(node){
      if (node.left){ _go(this.left); }
      if (node.right){ _go(this.left); }
      results.push(node.value);
    }
    _go(this.root);

  }

}

module.exports = {
  Tree,
  Node,
};