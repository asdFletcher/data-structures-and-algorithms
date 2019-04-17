'use strict';

const Queue = require('../queue/queue.js');

class BinaryTree {

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

  breadthFirst() {
    let node = this.root;
    let queue = new Queue();
    if (!this.root) {
      return;
    }
    queue.enqueue(node);
    while(queue.front) {
      if(queue.front.left) {
        queue.enqueue(queue.front.left);
      }
      if(queue.front.right) {
        queue.enqueue(queue.front.right);
      }
      queue.dequeue();
    }
  }
}

module.exports = BinaryTree;