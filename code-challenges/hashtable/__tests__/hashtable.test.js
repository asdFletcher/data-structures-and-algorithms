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
    let expected = undefined;
    let result = myHashTable.table[index].value;
    expect(result).toEqual(expected);
  });

  it('adds a single unique value correctly', ()=> {
    let myHashTable = new HashTable(5);
    let key = 'mykey';
    let value = 'myvalue';
    myHashTable.add(key, value);
    let index = myHashTable.getHash(key);
    
    let node = myHashTable.table[index].head;
    expect(node.value[0]).toEqual(key);
    expect(node.value[1]).toEqual(value);
  });

  it('over-writes data on duplicate key', ()=> {
    let myHashTable = new HashTable(5);
    let key = 'mykey';
    let valueA = 'myvalue';
    myHashTable.add(key, valueA);
    
    let valueB = 'myvalueTwo';
    myHashTable.add(key, valueB);

    let index = myHashTable.getHash(key);
    
    let node = myHashTable.table[index].head;
    expect(node.value[0]).toEqual(key);
    expect(node.value[1]).toEqual(valueB);
  });

  it('test keys generate a collision', ()=> {
    let myHashTable = new HashTable(5);
    let keyA = 'key';
    let valueA = 'myvalue';
    myHashTable.add(keyA, valueA);
    
    let keyB = 'keya';
    let valueB = 'myvalueTwo';
    myHashTable.add(keyB, valueB);

    let hashValA = myHashTable.getHash(keyA);
    let hashValB = myHashTable.getHash(keyB);
    expect(hashValA).toEqual(hashValB);
  });

  it('creates a new linked list node on collision', ()=> {
    let myHashTable = new HashTable(5);
    let keyA = 'key';
    let valueA = 'myvalue';
    myHashTable.add(keyA, valueA);
    
    let keyB = 'keya';
    let valueB = 'myvalueTwo';
    myHashTable.add(keyB, valueB);

    let index = myHashTable.getHash(keyA);

    let front = myHashTable.table[index].head;
    let second = front.next;
    expect(front.value).toEqual([keyB, valueB]);
    expect(second.value).toEqual([keyA, valueA]);
  });
});

describe('hashtable find', () => {
  it('throws if not given a string', ()=> {
    let myHashTable = new HashTable(5);
    expect( () => {
      myHashTable.find(null);
    }).toThrow();
  });
  
  it('returns undefined on nonexistent value', ()=> {
    let myHashTable = new HashTable(5);
    let result = myHashTable.find('notAKey');
    expect(result).toEqual(undefined);
  });

  it('returns the value correctly if only node in list', ()=> {
    let myHashTable = new HashTable(5);
    let key = 'mykey';
    let value = 'myvalue';
    myHashTable.add(key, value);

    let result = myHashTable.find(key);
    expect(result).toEqual(value);
  });

  it('test keys generate a collision', ()=> {
    let myHashTable = new HashTable(5);
    let keyA = 'key';
    let valueA = 'myvalue';
    myHashTable.add(keyA, valueA);
    
    let keyB = 'keya';
    let valueB = 'myvalueTwo';
    myHashTable.add(keyB, valueB);

    let hashValA = myHashTable.getHash(keyA);
    let hashValB = myHashTable.getHash(keyB);
    expect(hashValA).toEqual(hashValB);
  });

  it('finds the value if not the first node in the list', ()=> {
    let myHashTable = new HashTable(5);
    let keyA = 'key';
    let valueA = 'myvalue';
    myHashTable.add(keyA, valueA);
    
    let keyB = 'keya';
    let valueB = 'myvalueTwo';
    myHashTable.add(keyB, valueB);

    let result = myHashTable.find(keyA);
    expect(result).toEqual(valueA);
  });
});

describe('hashtable contains', () => {
  it('throws if not given a string', ()=> {
    let myHashTable = new HashTable(5);
    expect( () => {
      myHashTable.contains(null);
    }).toThrow();
  });
  
  it('returns false if hash does not contain the key', ()=> {
    let myHashTable = new HashTable(5);
    let result = myHashTable.contains('notThere');
    expect(result).toEqual(false);
  });

  it('returns true if the value exists in the first list node', ()=> {
    let myHashTable = new HashTable(5);
    let key = 'mykey';
    let value = 'myvalue';
    myHashTable.add(key, value);

    let result = myHashTable.contains('mykey');

    expect(result).toEqual(true);
  });

  it('test keys generate a collision', ()=> {
    let myHashTable = new HashTable(5);
    let keyA = 'key';
    let valueA = 'myvalue';
    myHashTable.add(keyA, valueA);
    
    let keyB = 'keya';
    let valueB = 'myvalueTwo';
    myHashTable.add(keyB, valueB);

    let hashValA = myHashTable.getHash(keyA);
    let hashValB = myHashTable.getHash(keyB);
    expect(hashValA).toEqual(hashValB);
  });

  it('returns true if the value exists in the second list node', ()=> {
    let myHashTable = new HashTable(5);
    let keyA = 'key';
    let valueA = 'myvalue';
    myHashTable.add(keyA, valueA);
    
    let keyB = 'keya';
    let valueB = 'myvalueTwo';
    myHashTable.add(keyB, valueB);

    let resultA = myHashTable.contains('key');
    let resultB = myHashTable.contains('keya');

    expect(resultA).toEqual(true);
    expect(resultB).toEqual(true);
  });
});

describe('hashtable getHash', () => {
  it('throws when not given a string', ()=> {
    let myHashTable = new HashTable(5);
    expect( () => {
      myHashTable.getHash(4);
    }).toThrow();
  });

  it('returns a number when given a string', ()=> {
    let myHashTable = new HashTable(5);
    let result = myHashTable.getHash('keyString');

    expect(typeof result).toEqual('number');
  });
  
});
