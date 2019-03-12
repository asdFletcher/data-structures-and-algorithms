'use strict';

class Node {
  constructor(value){
    this.value = value;
    this.next = null;
  }
}


class Stack {
  constructor(){
    this.top = null;
  }

  push(value){
    let node = new Node(value);

    if (!this.top){
      this.top = node;
      return;
    }
    node.next = this.top;
    this.top = node;
  }

  pop(){
    if (this.top === null) {
      throw new Error('Stack is empty. Can\'t pop.');
    }
    const popped = this.top;
    this.top = this.top.next;
    return popped.value;
  }

  peek(){
    if (this.top === null) {
      throw new Error('Stack is empty. Can\'t peek.');
    }
    return this.top.value;
  }
}

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

    // if there is only one node in the queue
    // eject it and set front and back to null
    if (!this.front.next){
      this.front = null;
      this.back = null;
    } else {
      // there is more than 1 node in the queue
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
module.exports = {
  Stack,
  Queue,
};
