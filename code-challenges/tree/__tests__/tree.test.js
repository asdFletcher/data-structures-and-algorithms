'ust strict';

let Tree = require('../tree.js');

describe('tree constructor', () => {

  it('can be constructed with default value of null', () => {
    let expected =
    {
      root: null,
    };
    let result = new Tree();
    expect(expected).toEqual(result);
  });

  it('can handle arguments in the constructor', () => {
    let expected =
    {
      root: null,
    };
    let result = new Tree(1234);
    expect(expected).toEqual(result);
  });
});

describe('tree add method', () => {

  it('can add a first node', () => {
    let node1 = {
      value: 5,
      next: null,
    };
    let expected =
    {
      root: node1,
    };

    let result = new Tree();
    result.add(5);
    expect(expected).toEqual(result);
  });

  it('can be added to twice', () => {
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
      root: node1,
    };

    let result = new Tree();
    result.add(5);
    result.add(10);
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
      root: node1,
    };

    let result = new Tree();
    result.add(5);
    result.add(null);
    expect(expected).toEqual(result);
  });

  it('can accept no parameters', () => {
    let node1 = {
      value: undefined,
      next: null,
    };
    let expected =
    {
      root: node1,
    };

    let result = new Tree();
    result.add();
    expect(expected).toEqual(result);
  });

  it('can accept multiple parameters', () => {
    let node1 = {
      value: 5,
      next: null,
    };
    let expected =
    {
      root: node1,
    };

    let result = new Tree();
    result.add(5, 10);
    expect(expected).toEqual(result);
  });
});

describe('tree includes method', () => {

  it('can handle an empty tree', () => {
    let expected = false;

    let tree = new Tree();
    let result = tree.includes(5);
    expect(expected).toEqual(result);
  });

  it('returns true correctly', () => {
    let expected = true;

    let tree = new Tree();
    tree.insert(5);
    tree.insert(10);
    let result = tree.includes(5);
    expect(expected).toEqual(result);
  });

  it('returns false correctly', () => {
    let expected = false;

    let tree = new Tree();
    tree.insert(5);
    tree.insert(10);
    let result = tree.includes(11);
    expect(expected).toEqual(result);
  });

  it('handles single item trees', () => {
    let expected = true;

    let tree = new Tree();
    tree.insert(5);
    let result = tree.includes(5);
    expect(expected).toEqual(result);
  });

  it('handles multiple item trees', () => {
    let expected = true;

    let tree = new Tree();
    tree.insert(null);
    tree.insert(10);
    let result = tree.includes(null);
    expect(expected).toEqual(result);
  });

  it('handles no parameters', () => {
    let expected = false;

    let tree = new Tree();
    tree.insert(2);
    tree.insert(10);
    let result = tree.includes();
    expect(expected).toEqual(result);
  });

  it('can handle multiple parameters', () => {
    let expected = true;

    let tree = new Tree();
    tree.insert(2);
    tree.insert(10);
    let result = tree.includes(2,100);
    expect(expected).toEqual(result);
  });
});



