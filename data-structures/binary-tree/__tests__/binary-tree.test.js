'ust strict';

let BinaryTree = require('../binary-tree.js');
let Node = require('../binary-tree-node.js');

describe('tree constructor', () => {

  it('can be constructed with default value of null', () => {
    let expected =
    {
      root: null,
      left: null,
      right: null,
    };
    let result = new BinaryTree();
    expect(result).toEqual(expected);
  });

  it('can handle arguments in the constructor', () => {
    let expected =
    {
      root: null,
      left: null,
      right: null,
    };
    let result = new BinaryTree(1234);
    expect(result).toEqual(expected);
  });
});

describe('tree includes method', () => {
  // tree:
  //       (5)
  //       / \
  //     (2) (15)
  //    /  \    \
  // (-3)   (4)  (6)

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
    expect(logSpy).toHaveBeenCalled();

    logSpy.mockRestore();
  });

  it('handles a larger tree', () => {
    let expected = false;

    let tree = new BinaryTree();
    let result = tree.includes(5);
    expect(result).toEqual(expected);
  });

});
