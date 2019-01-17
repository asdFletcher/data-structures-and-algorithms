'use strict';

'use strict';

const BinaryTree = require('./../tree.js').BinaryTree;
const Node = require('./../tree.js').Node;
const findMaximumValue = require('./../find-maximum-value.js');

describe('tree max value', ()=> {
  it('can handle an empty tree', ()=> {
    const myTree = new BinaryTree();    
    expect( () => {
      findMaximumValue(myTree);
    }).not.toThrow();
  });

  it('can handle an empty tree', ()=> {
    const myTree = new BinaryTree();
    let result = findMaximumValue(myTree); 
    expect(result).toEqual(undefined);
  });

  it('can handle a tree with 1 node', ()=> {
    const myTree = new BinaryTree();
    const a = new Node(1);
    myTree.root = a;

    let result = findMaximumValue(myTree);  
    expect(result).toEqual(1);
  });

  it('can handle a tree with more nodes', ()=> {
    const myTree = new BinaryTree();
    const a = new Node(1);
    const b = new Node(2);
    const c = new Node(3);
    const d = new Node(4);
    const e = new Node(5);
    const f = new Node(6);
    myTree.root = a;
    a.left = b;
    a.right = c;
    b.left = d;
    b.right = e;
    e.left = f;
    let expected = 6;
    let result = findMaximumValue(myTree);
    expect(result).toEqual(expected);
  });

  it('can handle a tree with all negative values', ()=> {
    const myTree = new BinaryTree();
    const a = new Node(-1);
    const b = new Node(-2);
    const c = new Node(-3);
    const d = new Node(-4);
    const e = new Node(-5);
    const f = new Node(-6);
    myTree.root = a;
    a.left = b;
    a.right = c;
    b.left = d;
    b.right = e;
    e.left = f;
    let expected = -1;
    let result = findMaximumValue(myTree);
    expect(result).toEqual(expected);
  });

});




