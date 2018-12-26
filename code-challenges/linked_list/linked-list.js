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

    add(value){
        let node = new Node(value);
        // if first node, make it the head
        if (this.head === null){
            this.head = node;
            return;
        }
        // if it is not empty
        // go to the end and create a new node
        // go until current.next === null;
      
        let current = this.head;
        while(current.next !== null){
            current = current.next;
        }
        current.next = node;
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
 
}

module.exports = {LinkedList};