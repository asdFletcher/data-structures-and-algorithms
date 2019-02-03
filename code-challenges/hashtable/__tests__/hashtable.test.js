'use strict';


const HashTable = require('../hashtable.js');
const LinkedList = require('/Users/fletcher/programming/codefellows/401/data-structures-and-algorithms/code-challenges/linked_list/linked-list.js').LinkedList;

describe('hashtable constructor', () => {
  it('defaults to a size if none specified', ()=> {
    let myHashTable = new HashTable();
    expect(myHashTable.size).toEqual(31);
  });
  it('defaults to a size if size specified is not a number', ()=> {
    let myHashTable = new HashTable(null);
    expect(myHashTable.size).toEqual(31);
  });
  it('defaults to a size if size specified is not a number', ()=> {
    let myHashTable = new HashTable('string');
    expect(myHashTable.size).toEqual(31);
  });
  it('defaults to a size if size specified is not positive', ()=> {
    let myHashTable = new HashTable(-2);
    expect(myHashTable.size).toEqual(31);
  });
  it('sizes correctly when a size is specified', ()=> {
    let myHashTable = new HashTable(55);
    expect(myHashTable.size).toEqual(55);
  });
  let myHashTable = new HashTable(2);
  for(let i = 0; i < myHashTable.size; i++){
    it('each node in the table is a linked list', ()=> {
      console.log(myHashTable.table[i]);
      expect(myHashTable.table[i]).toBeInstanceOf(LinkedList);
    });
  }
}); 

describe('hashtable add', () => {
  it('throws if not given a string', ()=> {
    let myHashTable = new HashTable(null);
    expect( () => {
      myHashTable.add(null, null);
    }).toThrow();
  });
  
  it('adds as undefined if given only a key', ()=> {
    let myHashTable = new HashTable(5);
    let key = 'onlykey';
    myHashTable.add(key);
    let index = myHashTable.getHash(key);
    let expected =
    let result = myHashTable.table[index];
    expect().toEqaul();
    console.log();
  });

  it('ignores additional parameters', ()=> {
    let myHashTable = new HashTable(5);
    console.log(myHashTable);
  });

  it('adds a single unique value correctly', ()=> {

  });

  it('over-writes data on duplicate key', ()=> {

  });

  it('creates new linked list node on collision', ()=> {

  });
}); 