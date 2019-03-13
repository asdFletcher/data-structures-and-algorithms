'use strict';

const Node = require ('./stack-node.js');

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
      throw new Error(`Stack is empty. Can't pop.`);
    }
    const popped = this.top;
    this.top = this.top.next;
    return popped.value;
  }

  peek(){
    if (this.top === null) {
      throw new Error(`Stack is empty. Can't peek.`);
    }
    return this.top.value;
  }
}

module.exports = Stack;
