'ust strict';

let BinaryTree = require('../tree.js').BinaryTree;

describe('tree constructor', () => {

  it('can be constructed with default value of null', () => {
    let expected =
    {
      root: null,
    };
    let result = new BinaryTree();
    expect(expected).toEqual(result);
  });

  it('can handle arguments in the constructor', () => {
    let expected =
    {
      root: null,
    };
    let result = new BinaryTree(1234);
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

    let result = new BinaryTree();
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

    let result = new BinaryTree();
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

    let result = new BinaryTree();
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

    let result = new BinaryTree();
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

    let result = new BinaryTree();
    result.add(5, 10);
    expect(expected).toEqual(result);
  });
});

describe('tree includes method', () => {

  it('can handle an empty tree', () => {
    let expected = false;

    let tree = new BinaryTree();
    let result = tree.includes(5);
    expect(expected).toEqual(result);
  });

  it('returns true correctly', () => {
    let expected = true;

    let tree = new BinaryTree();
    tree.insert(5);
    tree.insert(10);
    let result = tree.includes(5);
    expect(expected).toEqual(result);
  });

  it('returns false correctly', () => {
    let expected = false;

    let tree = new BinaryTree();
    tree.insert(5);
    tree.insert(10);
    let result = tree.includes(11);
    expect(expected).toEqual(result);
  });

  it('handles single item trees', () => {
    let expected = true;

    let tree = new BinaryTree();
    tree.insert(5);
    let result = tree.includes(5);
    expect(expected).toEqual(result);
  });

  it('handles multiple item trees', () => {
    let expected = true;

    let tree = new BinaryTree();
    tree.insert(null);
    tree.insert(10);
    let result = tree.includes(null);
    expect(expected).toEqual(result);
  });

  it('handles no parameters', () => {
    let expected = false;

    let tree = new BinaryTree();
    tree.insert(2);
    tree.insert(10);
    let result = tree.includes();
    expect(expected).toEqual(result);
  });

  it('can handle multiple parameters', () => {
    let expected = true;

    let tree = new BinaryTree();
    tree.insert(2);
    tree.insert(10);
    let result = tree.includes(2,100);
    expect(expected).toEqual(result);
  });
});


describe('tree includes method', () => {

  let a = new Node(5);
  let b = new Node(2);
  let c = new Node(15);
  let d = new Node(-3);
  let e = new Node(4);
  let f = new Node(6);

  const myTree = new BinaryTree();
  myTree.root = a;
  
  a.left = b;
  a.right = c;
  b.left = d;
  b.right = e;
  c.right = f;

  it('can handle an empty tree', () => {
    const logSpy = jest.spyOn(console, 'log');
    let tree = new BinaryTree();
    tree.breadthFirst();
    expect(logSpy).not.toHaveBeenCalled();

    logSpy.mockRestore();
  });

  it('handles a 1-node tree', () => {
    const logSpy = jest.spyOn(console, 'log');
    let tree = new BinaryTree();
    tree.breadthFirst();
    console.log('hi');
    expect(logSpy).toHaveBeenCalled();

    logSpy.mockRestore();
  });

  it('handles a larger tree', () => {
    let expected = false;

    let tree = new BinaryTree();
    let result = tree.includes(5);
    expect(expected).toEqual(result);
  });

});


