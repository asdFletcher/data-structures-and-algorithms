'use strict';

const SplayTree = require('../splay-tree.js');

describe('splay tree', () => {
  describe('constructor', () => {
    it('creates empty tree without error', () => {
      expect( () => {
        const myTree = new SplayTree();
      }).not.toThrow();
    });
    it('new tree is of correct instance type', () => {
        const myTree = new SplayTree();
        expect(myTree).toBeInstanceOf(SplayTree);
    });
    it('root is null', () => {
        const myTree = new SplayTree();
        expect(myTree.root).toBeNull();
    });
    it('arguments are ignored', () => {
        const myTree = new SplayTree(2);
        expect(myTree).toBeInstanceOf(SplayTree);
        expect(myTree.root).toBeNull();
    });
  });

  describe('insert', () => {
    it('fails on no arguments', () => {
      const myTree = new SplayTree();
      let result = myTree.insert();

      expect(myTree.root).toBeNull();
      expect(result).toBeUndefined();
    });
    it('fails on boolean input', () => {
      const myTree = new SplayTree();
      myTree.insert(true);
      let result = myTree.insert(false);

      expect(myTree.root).toBeNull();
      expect(result).toBeUndefined();
    });
    it('fails on string input', () => {
      const myTree = new SplayTree();
      myTree.insert('string');
      let result = myTree.insert('true');

      expect(myTree.root).toBeNull();
      expect(result).toBeUndefined();
    });
    it('succeeds on integer input', () => {
      const myTree = new SplayTree();
      let result = myTree.insert(1);

      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toEqual(1);
      expect(result).toBeInstanceOf(Node);
      expect(result.value).toBe(1);
    });
    it('succeeds on float input', () => {
      const myTree = new SplayTree();
      let result = myTree.insert(1.1);

      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toEqual(1.1);
      expect(result).toBeInstanceOf(Node);
      expect(result.value).toBe(1.1);
    });
    it('succeeds on negative number input', () => {
      const myTree = new SplayTree();
      let result = myTree.insert(-5);

      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toEqual(-5);
      expect(result).toBeInstanceOf(Node);
      expect(result.value).toBe(-5);
    });
    it('succeeds on integer input as string', () => {
      const myTree = new SplayTree();
      let result = myTree.insert('2');

      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toEqual(2);
      expect(result).toBeInstanceOf(Node);
      expect(result.value).toBe(2);
    });
    it('succeeds on float input as string', () => {
      const myTree = new SplayTree();
      let result = myTree.insert('2.2');

      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toEqual(2.2);
      expect(result).toBeInstanceOf(Node);
      expect(result.value).toBe(2.2);
    });
    it('succeeds on negative input as string', () => {
      const myTree = new SplayTree();
      let result = myTree.insert('-2');

      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toEqual(-2);
      expect(result.value).toBe(-2);
    });

  });
});

