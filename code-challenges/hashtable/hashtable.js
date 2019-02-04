'use strict';

const LinkedList = require('/Users/fletcher/programming/codefellows/401/data-structures-and-algorithms/code-challenges/linked_list/linked-list.js').LinkedList;
const util = require('util');
// [ undefined , undefined , undefined ]
// [ LinkedList--> head: Node { [k,v], next: } , LinkedList--> head: Node { [k,v], next: } ]

class HashTable {
  constructor(size){
    if (typeof size !== 'number' || size < 1) { size = 31; }
    this.size = size;
    this.table = new Array(this.size);
    this._fillTableWithLinkedLists();
  }

  add(key, value){
    this.key = key;
    this._throwIfNotString();
    this.value = value;
    this.tableIndex = this.getHash(this.key);
    let list = this._getList();

    let node = this._locateNode(list);
    if (node){
      node.value[1] = this.value;
    } else {
      list.insert( [this.key, this.value] );
    }
    return;
  }

  _getList(){
    return this.table[this.tableIndex];
  }

  find(key){
    this.key = key;
    this._throwIfNotString();

    this.tableIndex = this.getHash(key);
    
    let list = this._getList();

    let node = this._locateNode(list);
    
    if (!node) { return undefined; }

    return node.value[1];
  }
  
  contains(key){
    this.key = key;

    this._throwIfNotString();

    this.tableIndex = this.getHash(key);
    
    let list = this._getList();

    let node = this._locateNode(list);

    if (node) { return true; }

    return false;
  }

  getHash(key){
    this.key = key;
    this._throwIfNotString(key);

    let num = 0;
    for(let i = 0; i < key.length; i++){
      // assign number normalize on a-z being most common
      let charNum = key[i].charCodeAt(0) - 97;
      // remove negatives
      if (charNum < 0) { charNum = charNum * -1; }
      // multiply by character position to make order matter
      charNum = charNum * (i+1);
      // add them all together
      num += charNum;
    }
    // mod size to make it fit in the array
    num = num % this.size;

    return num;
  }

  _locateNode(entry){
    let current = entry.head;
    if(!entry.head) {
      return entry.head;
    }
    while(current){
      if (current.value[0] === this.key){
        return current;
      }
      current = current.next;
    }
    return undefined;
  }

  _fillTableWithLinkedLists(){
    for(let i = 0; i < this.size; i++){
      this.table[i] = new LinkedList();
    }
  }

  _throwIfNotString(){
    if (typeof this.key !== 'string') {
      throw new Error('key must be a string');
    }
  }
}

module.exports = HashTable;