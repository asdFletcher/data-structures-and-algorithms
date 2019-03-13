'use strict';

const Node = require('./queue-node.js');


class Queue {
  constructor(){
    this.front = null;
    this.back = null;
  }

  enqueue(value) {
    const node = new Node(value);
    
    if(!this.front){
      this.front = node;
      this.back = node;
      return;
    }

    this.back.next = node;
    this.back = node;
  }

  dequeue() {
    if(this.front === null){
      throw new Error('Queue is empty, can\'t dequeue.');
    }
    const dequeued = this.front.value;

    if (!this.front.next){
      this.front = null;
      this.back = null;
    } else {
      this.front = this.front.next;
    }
    return dequeued;
  }

  peek() {
    if(this.front === null){
      throw new Error('Queue is empty, can\'t peek.');
    }

    return this.front.value;
  }
}

module.exports = Queue;