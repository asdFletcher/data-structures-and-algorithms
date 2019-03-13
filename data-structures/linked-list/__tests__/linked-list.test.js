'ust strict';

let LinkedList = require('../linked-list.js');

describe('linked list class', () => {

  describe('constructor', () => {

    it('can be constructed with default value of null', () => {
      let expected =
      {
        head: null,
      };
      let result = new LinkedList();
      expect(expected).toEqual(result);
    });
  
    it('can handle arguments in the constructor', () => {
      let expected =
      {
        head: null,
      };
      let result = new LinkedList(1234);
      expect(expected).toEqual(result);
    });
  });
  
  describe('append method', () => {
  
    it('can append a first node', () => {
      let node1 = {
        value: 5,
        next: null,
      };
      let expected =
      {
        head: node1,
      };
  
      let result = new LinkedList();
      result.append(5);
      expect(expected).toEqual(result);
    });
  
    it('can be appended to twice', () => {
      let node2 = {
        value: 10,
        next: null,
      };
      let node1 = {
        value: 5,
        next: node2,
      };
      let expected =
      {
        head: node1,
      };
  
      let result = new LinkedList();
      result.append(5);
      result.append(10);
      expect(expected).toEqual(result);
    });
  
    it('can accept multiple data types', () => {
      let node2 = {
        value: null,
        next: null,
      };
      let node1 = {
        value: 5,
        next: node2,
      };
      let expected =
      {
        head: node1,
      };
  
      let result = new LinkedList();
      result.append(5);
      result.append(null);
      expect(expected).toEqual(result);
    });
  
    it('can accept no parameters', () => {
      let node1 = {
        value: undefined,
        next: null,
      };
      let expected =
      {
        head: node1,
      };
  
      let result = new LinkedList();
      result.append();
      expect(expected).toEqual(result);
    });
  
    it('can accept multiple parameters', () => {
      let node1 = {
        value: 5,
        next: null,
      };
      let expected =
      {
        head: node1,
      };
  
      let result = new LinkedList();
      result.append(5, 10);
      expect(expected).toEqual(result);
    });
  });
  
  describe('insert method', () => {
  
    it('can insert a first node', () => {
      let node1 = {
        value: 5,
        next: null,
      };
      let expected =
      {
        head: node1,
      };
  
      let result = new LinkedList();
      result.insert(5);
      expect(expected).toEqual(result);
    });
  
    it('can insert a second node', () => {
      let node2 = {
        value: 5,
        next: null,
      };
      let node1 = {
        value: 10,
        next: node2,
      };
      let expected =
      {
        head: node1,
      };
  
      let result = new LinkedList();
      result.insert(5);
      result.insert(10);
      expect(expected).toEqual(result);
    });
  
    it('can accept multiple data types', () => {
      let node2 = {
        value: null,
        next: null,
      };
      let node1 = {
        value: 5,
        next: node2,
      };
      let expected =
      {
        head: node1,
      };
  
      let result = new LinkedList();
      result.insert(null);
      result.insert(5);
      expect(expected).toEqual(result);
    });
  
    it('can handle no parameters', () => {
      let node1 = {
        value: undefined,
        next: null,
      };
      let expected =
      {
        head: node1,
      };
  
      let result = new LinkedList();
      result.insert();
      expect(expected).toEqual(result);
    });
  
    it('can handle multiple parameters', () => {
      let node1 = {
        value: 5,
        next: null,
      };
      let expected =
      {
        head: node1,
      };
  
      let result = new LinkedList();
      result.insert(5, 10);
      expect(expected).toEqual(result);
    });
  });
  
  describe('includes method', () => {
  
    it('can handle an empty list', () => {
      let expected = false;
  
      let list = new LinkedList();
      let result = list.includes(5);
      expect(expected).toEqual(result);
    });
  
    it('returns true correctly', () => {
      let expected = true;
  
      let list = new LinkedList();
      list.insert(5);
      list.insert(10);
      let result = list.includes(5);
      expect(expected).toEqual(result);
    });
  
    it('returns false correctly', () => {
      let expected = false;
  
      let list = new LinkedList();
      list.insert(5);
      list.insert(10);
      let result = list.includes(11);
      expect(expected).toEqual(result);
    });
  
    it('handles single item lists', () => {
      let expected = true;
  
      let list = new LinkedList();
      list.insert(5);
      let result = list.includes(5);
      expect(expected).toEqual(result);
    });
  
    it('handles multiple item lists', () => {
      let expected = true;
  
      let list = new LinkedList();
      list.insert(null);
      list.insert(10);
      let result = list.includes(null);
      expect(expected).toEqual(result);
    });
  
    it('handles no parameters', () => {
      let expected = false;
  
      let list = new LinkedList();
      list.insert(2);
      list.insert(10);
      let result = list.includes();
      expect(expected).toEqual(result);
    });
  
    it('can handle multiple parameters', () => {
      let expected = true;
  
      let list = new LinkedList();
      list.insert(2);
      list.insert(10);
      let result = list.includes(2,100);
      expect(expected).toEqual(result);
    });
  });
  
  describe('print method', () => {
  
    it('can handle an empty list', () => {
      console.log = jest.fn();
  
      let list = new LinkedList();
      list.print();
  
      let expected = 'undefined';
      expect(console.log.mock.calls[0][0]).toEqual(expected);
    });
  
    it('can handle a single element list', () => {
      console.log = jest.fn();
      
      let list = new LinkedList();
      list.insert(5);
      list.print();
  
      let expected = 5;
      expect(console.log.mock.calls[0][0]).toEqual(expected);
    });
  
    it('can handle multiple element lists', () => {
      console.log = jest.fn();
      
      let list = new LinkedList();
      list.insert(5);
      list.insert(10);
      list.print();
  
      let expected1 = 10;
      let expected2 = 5;
      expect(console.log.mock.calls[0][0]).toEqual(expected1);
      expect(console.log.mock.calls[1][0]).toEqual(expected2);
    });
  
    it('can handle parameters', () => {
      console.log = jest.fn();
      
      let list = new LinkedList();
      list.insert(5);
      list.insert(10);
      list.print('test');
  
      let expected1 = 10;
      let expected2 = 5;
      expect(console.log.mock.calls[0][0]).toEqual(expected1);
      expect(console.log.mock.calls[1][0]).toEqual(expected2);
    });
  });
  
  describe('insert after', () => {
    it('correctly inserts a node with specified value before the first occurence', () => { 
      let list = new LinkedList();
      list.append(1);
      list.append(2);
      list.append(3);
      list.append(4);
      list.insertBefore(3,5);
  
      let expected = new LinkedList();
      expected.append(1);
      expected.append(2);
      expected.append(5);
      expected.append(3);
      expected.append(4);

      expect(list).toEqual(expected);
    });
  
    it('can handle an empty list', () => {
      let list = new LinkedList();
      list.insertBefore(0, 5);
  
      expect(list.head.value).toEqual(5);
    });
  });
  
  describe('insert after', () => {
    it('inserts a node with specified value after the first occurence', () => { 
      let list = new LinkedList();
      list.append(1);
      list.append(2);
      list.append(3);
      list.append(4);
      list.insertAfter(3,5);

      let expected = new LinkedList();
      expected.append(1);
      expected.append(2);
      expected.append(3);
      expected.append(5);
      expected.append(4);

      expect(list).toEqual(expected);
    });
  
    it('insertAfter(value, newValue) should create a head node if the linked list is empty', () => {
      let list = new LinkedList();
      list.insertAfter(0, 5);
      console.log(list);
  
      expect(list.head.value).toEqual(5);
    });
  });
  
  describe('kthFromEnd', () => {
    it('correctly returns the kth element from the end of the list', () => { 
      let list = new LinkedList();
      list.append(1);
      list.append(2);
      list.append(3);
      list.append(4);
  
      let expected = 2;
      let result = list.kthFromEnd(2);
  
      expect(result).toEqual(expected);
    });
  
    it('returns undefined if k > list length', () => { 
      let list = new LinkedList();
      list.append(1);
      list.append(2);
      list.append(3);
      list.append(4);
  
      let expected = undefined;
      let result = list.kthFromEnd(4);
  
      expect(result).toEqual(expected);
    });
  
    it('retruns undefined if list is empty', () => { 
      let list = new LinkedList();
  
      let expected = undefined;
      let result = list.kthFromEnd(4);
  
      expect(result).toEqual(expected);
    });
  
    it('retruns undefined if no parameters are passed in', () => { 
      let list = new LinkedList();
  
      let expected = undefined;
      let result = list.kthFromEnd();
  
      expect(result).toEqual(expected);
    });
  
  });
});
