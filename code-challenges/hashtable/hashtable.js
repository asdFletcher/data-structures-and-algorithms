'use strict';

const LinkedList = require('/Users/fletcher/programming/codefellows/401/data-structures-and-algorithms/code-challenges/linked_list/linked-list.js').LinkedList;

// [ undefined , undefined , undefined ]
// [ [key, value] , [key, value] , [key, value] , [key, value] , [key, value] ]
// [ LinkedList--> head: Node { [k,v], next: } , LinkedList--> head: Node { [k,v], next: } ]

class HashTable {
  constructor(size){
    if (!size) { size = 31; }
    this.size = size;
    this.table = new Array(size);
    this.key;
  }

  add(key, value){
    this._throwIfNotString();
    this.key = key;
    this.value = value;
    this.tableIndex = this.getHash(this.key);
    let list = this._getList();

    if (!list) { return undefined; }
    
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
    this.operation = 'find';
    this._lookUp();
  }
  
  contains(key){
    this.key = key;
    this.operation = 'contains';
    this._lookUp();
  }

  getHash(key){
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
    while(current.next){
      if (current.value[0] === this.key){
        return current;
      }
      current = current.next;
    }
    return undefined;
  }

  _lookUp(){
    this._throwIfNotString();

    this.tableIndex = this.getHash(this.key);

    let entry = this.table[this.tableIndex];

    if (this._typeOf(entry) === 'undefined')  { this._handleUndefined(); }
    if (this._typeOf(entry) === 'LinkedList') { this._handleLinkedList(); }
  }

  _typeOf(entry) {
    if (entry === undefined) {
      return 'undefined';
    }
    if (entry instanceof LinkedList) {
      return 'LinkedList';
    }
  }

  _handleUndefined(){
    switch(this.operation){
    case 'find':
      return undefined;
    case 'add':
      this.table[this.tableIndex] = [this.key,this.value];
      return;
    case 'contains':
      return false;
    }
  }

  _handleLinkedList(){
    let entry = this.table[this.tableIndex];

    let current = entry.head;
    while(current.next){
      if (current.value[0] === this.key){
        switch(this.operation){
        case 'find':
          return current.value[1];
        case 'add':
          current.value[1] = this.value;
          return;
        case 'contains':
          return true;
        }
      }
      current = current.next;
    }

    switch(this.operation){
    case 'find':
      return undefined;
    case 'add':
      entry.append([this.key,this.value]);
      return;
    case 'contains':
      return false;
    }

  }

  _throwIfNotString(){
    if (typeof this.key !== 'string') {
      throw new Error('key must be a string');
    }
  }
}

let myHashTable = new HashTable(100);
myHashTable.getHash('ab');
myHashTable.getHash('ba');
myHashTable.getHash('aa');
myHashTable.getHash('dan');
myHashTable.getHash('ran');
myHashTable.add('ran', 'too');

let myList = new LinkedList();
myList.insert(5);
myList.insert(4);
console.log(typeof myList);
console.log( myList instanceof LinkedList );

module.exports = HashTable;