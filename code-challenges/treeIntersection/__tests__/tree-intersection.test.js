'use strict';

const tree_intersection = require('./../tree-intersection.js');

const BinaryTree = require('../../../data-structures/binary-tree/binary-tree.js');
const Node = require('../../../data-structures/binary-tree/binary-tree-node.js');


describe('tree intersection function', () => {
  it('returns an empty object when both parameters are undefined', () => {
    let result = tree_intersection();
    let expected = {};
    expect(result).toEqual(expected);
  });

  it('returns an empty object if either parameter is not of type BinaryTree', () => {
    let result = tree_intersection(5,5);
    let expected = {};
    expect(result).toEqual(expected);
  });
  it('returns an empty object when the second parameter is missing', () => {
    let treeA = new BinaryTree();
    let a = new Node(1);
    let b = new Node(2);
    let c = new Node(3);
    let d = new Node(4);
    
    treeA.root = a;
    a.left = b;
    a.right = c;
    b.left = d;
    
    let result = tree_intersection(treeA);
    let expected = {};
    expect(result).toEqual(expected);
  });
  it('returns an empty object when either tree is empty', () => {
    let treeA = new BinaryTree();
    let a = new Node(1);
    let b = new Node(2);
    let c = new Node(3);
    let d = new Node(4);
    
    treeA.root = a;
    a.left = b;
    a.right = c;
    b.left = d;

    let treeB = new BinaryTree();

    let result = tree_intersection(treeA, treeB);
    let expected = {};
    expect(result).toEqual(expected);

  });
  it('returns an empty object when there are no matching values', () => {
    let treeA = new BinaryTree();
    let a = new Node(1);
    let b = new Node(2);
    let c = new Node(3);
    let d = new Node(4);
    
    treeA.root = a;
    a.left = b;
    a.right = c;
    b.left = d;

    let treeB = new BinaryTree();
    let q = new Node(5);
    let r = new Node(6);
    let s = new Node(7);
    let t = new Node(8);

    treeB.root = q;
    q.left = r;
    q.right = s;
    r.left = t;

    let result = tree_intersection(treeA, treeB);
    let expected = {};
    expect(result).toEqual(expected);
  });
  it('correctly returns the matching values', () => {
    let treeA = new BinaryTree();
    let a = new Node(1);
    let b = new Node(2);
    let c = new Node(3);
    let d = new Node(4);
    
    treeA.root = a;
    a.left = b;
    a.right = c;
    b.left = d;

    let treeB = new BinaryTree();
    let q = new Node(1);
    let r = new Node(2);
    let s = new Node(3);
    let t = new Node(4);

    treeB.root = q;
    q.left = r;
    q.right = s;
    r.left = t;

    let result = tree_intersection(treeA, treeB);
    let expected = {
      '1': true,
      '2': true,
      '3': true,
      '4': true,
    };
    expect(result).toEqual(expected);
  });
});