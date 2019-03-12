'ust strict';

let LinkedList = require('../linked-list.js').LinkedList;

describe('linked list constructor', () => {

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

describe('linked list append method', () => {

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

describe('linked list insert method', () => {

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

describe('linked list includes method', () => {

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

describe('linked list print method', () => {

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

describe('linked list insert before', () => {
  it('insertAfter(value, newValue) should prepend a value to the node that is referenced by the argument value', () => { 
    let list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    list.append(4);
    list.insertAfter(3,5);
    console.log(list);

    expect(list.head.value).toEqual(1);
    expect(list.head.next.value).toEqual(2);
    expect(list.head.next.next.value).toEqual(3);
    expect(list.head.next.next.next.value).toEqual(5);
    expect(list.head.next.next.next.next.value).toEqual(4);
    expect(list.head.next.next.next.next.next).toBeNull();
  });

  it('insertBefore(value, newValue) should throw a Type Error if newValue is not a number', () => {
    let list = new LinkedList();
    list.insertBefore('mabel', 6);

    expect(() => {
      list.insertBefore('mabel');
    }).toThrow();
  });


  it('insertBefore(value, newValue) should create a head node if the linked list is empty', () => {
    let list = new LinkedList();
    list.insertBefore(0, 5);
    console.log(list);

    expect(list.head.value).toEqual(5);
  });
});

describe('linked list insert after', () => {
  it('insertAfter(value, newValue) should prepend a value to the node that is referenced by the argument value', () => { 
    let list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    list.append(4);
    list.insertAfter(3,5);
    console.log(list);

    expect(list.head.value).toEqual(1);
    expect(list.head.next.value).toEqual(2);
    expect(list.head.next.next.value).toEqual(3);
    expect(list.head.next.next.next.value).toEqual(5);
    expect(list.head.next.next.next.next.value).toEqual(4);
    expect(list.head.next.next.next.next.next).toBeNull();
  });

  it('insertAfter(value, newValue) should throw a Type Error if newValue is not a number', () => {
    let list = new LinkedList();
    list.insertAfter('mabel', 6);

    expect(() => {
      list.insertAfter('mabel');
    }).toThrow();
  });


  it('insertAfter(value, newValue) should create a head node if the linked list is empty', () => {
    let list = new LinkedList();
    list.insertAfter(0, 5);
    console.log(list);

    expect(list.head.value).toEqual(5);
  });
});

describe('linked list kthFromEnd', () => {
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