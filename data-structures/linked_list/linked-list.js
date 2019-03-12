'use strict';

class Node {
  constructor(value){
    this.value = value;
    this.next = null;
  }
}

class LinkedList {

  constructor(){
    this.head = null;
  }

  insert(value){
    let oldHead = this.head;
    let newHead = new Node(value);
    this.head = newHead;
    newHead.next = oldHead;
  }

  includes(value){
      
    let included = false;
    if(this.head === null){
      return included;
    }
    let current = this.head;
    if (current.value === value) {return true; }   
    while(current.next !== null){
      current = current.next;
      if (current.value === value) {return true; }   
    }
    return false;
  }

  print(){
    if (this.head === null){
      console.log('undefined');
      return null;
    }

    let current = this.head;
    console.log(current.value);
    while(current.next !== null){
      current = current.next;
      console.log(current.value);
    }
  }

  append(value){
    let node = new Node(value);

    if (this.head === null){
      this.head = node;
      return;
    }

    let current = this.head;
    while(current.next !== null){
      current = current.next;
    }
    current.next = node;
  }

  insertBefore(value, newValue){
    if(!this.head){
      this.head = new Node(newValue);
      return;
    }

    let current = this.head;
    while(current.next.value !== value){
      current = current.next;
    }
    let node = new Node(newValue);
    node.next = current.next;
    current.next = node;
  }

  insertAfter(value, newValue){
    if(!this.head){
      this.head = new Node(newValue);
      return;
    }

    let current = this.head;
    while(current.value !== value){
      current = current.next;
    }
    let node = new Node(newValue);
    node.next = current.next;
    current.next = node;
  }

  kthFromEnd(k){
    
    if(!this.head){ return; }
    let current = this.head;
    let totalSteps = 0;

    while(current.next){
      current = current.next;
      totalSteps++;
    }

    current = this.head;
    let steps = totalSteps - k;
    
    if (steps < 0){ return; }

    for(let i = 0; i < steps; i++){
      current = current.next;
    }
    
    return current.value;
  }

}

module.exports = {LinkedList};