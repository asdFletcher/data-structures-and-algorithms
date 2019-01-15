'ust strict';

let FizzBuzzTree = require('../fizz-buzz-tree.js');
let Tree = require('../../tree/tree.js').Tree;
let Node = require('../../tree/tree.js').Node;


describe('fizz-buzz-tree', () => {
  let a = new Node(5);
  let b = new Node(2);
  let c = new Node(15);
  let d = new Node(-3);
  let e = new Node(4);
  let f = new Node(6);

  const myTree = new Tree();
  myTree.root = a;
  
  a.left = b;
  a.right = c;
  b.left = d;
  b.right = e;
  c.right = f;

  it('can handle no parameters without errors', () => {
    expect( ()=> {
      FizzBuzzTree();
    }).not.toThrow();
  });

  it('correctly changes a tree', () => {
    FizzBuzzTree(myTree);
    expect(a.value).toEqual('Buzz');
    expect(b.value).toEqual(2);
    expect(c.value).toEqual('FizzBuzz');
    expect(d.value).toEqual('Fizz');
    expect(e.value).toEqual(4);
    expect(f.value).toEqual('Fizz');
  });

  it('correctly changes a tree', () => {
    const myTree2 = new Tree();

    expect( ()=> {
      FizzBuzzTree(myTree2);
    }).not.toThrow();
  });

});



