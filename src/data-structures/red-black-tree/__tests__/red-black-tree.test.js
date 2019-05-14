'use strict';

const RedBlackTree = require('../red-black-tree.js');
const Node = require('../red-black-tree-node.js');
const util = require('util');

describe('redblack tree', () => {
  describe('constructor', () => {
    it('creates empty tree without error', () => {
      expect(() => {
        const myTree = new RedBlackTree();
      }).not.toThrow();
    });
    it('new tree is of correct instance type', () => {
      const myTree = new RedBlackTree();
      expect(myTree).toBeInstanceOf(RedBlackTree);
    });
    it('root is null', () => {
      const myTree = new RedBlackTree();
      expect(myTree.root).toBeNull();
    });
    it('arguments are ignored', () => {
      const myTree = new RedBlackTree(2);
      expect(myTree).toBeInstanceOf(RedBlackTree);
      expect(myTree.root).toBeNull();
    });
  });

  describe('insert', () => {
    it('fails on no arguments', () => {
      const myTree = new RedBlackTree();
      const result = myTree.insert();

      expect(myTree.root).toBeNull();
      expect(result).toBeUndefined();
    });
    it('fails on boolean input', () => {
      const myTree = new RedBlackTree();
      myTree.insert(true);
      const result = myTree.insert(false);

      expect(myTree.root).toBeNull();
      expect(result).toBeUndefined();
    });
    it('fails on string input', () => {
      const myTree = new RedBlackTree();
      myTree.insert('string');
      const result = myTree.insert('true');

      expect(myTree.root).toBeNull();
      expect(result).toBeUndefined();
    });
  });

  describe('parental helper functions', () => {
    it('get uncle returns null when GP, but no uncle', () => {
      let myTree = new RedBlackTree();
      //          5          GP
      //        2          P    
      //       1         N
      let n = new Node(1);
      let p = new Node(2);
      let gp = new Node(5);

      gp.left = p;
      p.left = n;

      p.parent = gp;
      n.parent = p;

      expect(myTree.getParent(n)).toBe(p);
      expect(myTree.getGrandParent(n)).toBe(gp);
      expect(myTree.getUncle(n)).toBeNull();
    });
    it('get uncle returns undefined when no GP', () => {
      let myTree = new RedBlackTree();
      //          5          P
      //        2   7      N 

      let n = new Node(1);
      let p = new Node(2);
      p.left = n;
      n.parent = p;

      expect(myTree.getParent(n)).toBe(p);
      expect(myTree.getGrandParent(n)).toBeUndefined();
      expect(myTree.getUncle(n)).toBeUndefined();
    });
    it('get parent returns fasly when no parent', () => {
      let myTree = new RedBlackTree();
      //          5          GP
      let n = new Node(1);

      expect(myTree.getParent(n)).toBeFalsy();
    });
    it('get grandparent returns fasly when no parent', () => {
      let myTree = new RedBlackTree();
      //          5          P
      //        2   7      N 

      let n = new Node(1);
      let p = new Node(2);
      p.left = n;
      n.parent = p;

      expect(myTree.getParent(n)).toBe(p);
      expect(myTree.getGrandParent(n)).toBeFalsy();
    });
    it('correctly retuns parents, config 1', () => {
      let myTree = new RedBlackTree();
      //          5          GP
      //        2   7      P    U
      //       1         N
      let n = new Node(1);
      let p = new Node(2);
      let gp = new Node(5);
      let u = new Node(7);

      gp.left = p;
      gp.right = u;
      p.left = n;

      p.parent = gp;
      u.parent = gp;
      n.parent = p;

      expect(myTree.getParent(n)).toBe(p);
      expect(myTree.getGrandParent(n)).toBe(gp);
      expect(myTree.getUncle(n)).toBe(u);
    });
    it('correctly retuns parents, config 2', () => {
      let myTree = new RedBlackTree();
      //          5          GP
      //        2   7      P    U
      //         3          N
      let n = new Node(3);
      let p = new Node(2);
      let gp = new Node(5);
      let u = new Node(7);

      gp.left = p;
      gp.right = u;
      p.right = n;

      p.parent = gp;
      u.parent = gp;
      n.parent = p;

      expect(myTree.getParent(n)).toBe(p);
      expect(myTree.getGrandParent(n)).toBe(gp);
      expect(myTree.getUncle(n)).toBe(u);
    });
    it('correctly retuns parents, config 3', () => {
      let myTree = new RedBlackTree();
      //          5          GP
      //        2   7      U    P
      //           6           N
      let n = new Node(6);
      let p = new Node(7);
      let gp = new Node(5);
      let u = new Node(2);

      gp.left = u;
      gp.right = p;
      p.left = n;

      p.parent = gp;
      u.parent = gp;
      n.parent = p;

      expect(myTree.getParent(n)).toBe(p);
      expect(myTree.getGrandParent(n)).toBe(gp);
      expect(myTree.getUncle(n)).toBe(u);
    });
  });

});

