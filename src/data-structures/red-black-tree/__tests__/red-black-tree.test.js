/* eslint-disable no-unused-vars */

'use strict';

const RedBlackTree = require('../red-black-tree.js');
const Node = require('../red-black-tree-node.js');

const generateRandomNumber = () => Math.floor(Math.random()*100);

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
    it('returns undefined on duplicate value', () => {
      const myTree = new RedBlackTree();
      myTree.insert('string');
      const a = myTree.insert(2);
      const b = myTree.insert(3);
      const c = myTree.insert(3);

      expect(c).toBeUndefined();
    });

    it('succeeds at adding a root node', () => {
      const myTree = new RedBlackTree();
      const result = myTree.insert(2);

      expect(myTree.root).toBe(result);
      expect(myTree.root.value).toEqual(2);
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });

    it('succeeds at adding a left child to root node', () => {
      const myTree = new RedBlackTree();
      const a = myTree.insert(2);
      const b = myTree.insert(1);

      expect(myTree.root).toBe(a);
      expect(myTree.root.value).toEqual(2);
      expect(myTree.root.left.value).toEqual(1);
      expect(myTree.root.right).toBeNull();
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });

    it('succeeds at adding a right child to root node', () => {
      const myTree = new RedBlackTree();
      const a = myTree.insert(2);
      const b = myTree.insert(3);

      expect(myTree.root).toBe(a);
      expect(myTree.root.value).toEqual(2);
      expect(myTree.root.right.value).toEqual(3);
      expect(myTree.root.left).toBeNull();
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });

    it('adds a left child to trigger single right at root', () => {
      const myTree = new RedBlackTree();
      //       3b           2b
      //     2r     =>    1r   3r
      //   1r
      const a = myTree.insert(3);
      const b = myTree.insert(2);
      const c = myTree.insert(1);

      expect(myTree.root).toBe(b);
      expect(myTree.root.value).toEqual(2);
      expect(myTree.root.left).toBe(c);
      expect(myTree.root.right).toBe(a);
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });
    it('adds a right child to trigger single left at root', () => {
      const myTree = new RedBlackTree();
      //  3b                 4b
      //     4r     =>    3r    5r
      //        5r
      const a = myTree.insert(3);
      const b = myTree.insert(4);
      const c = myTree.insert(5);

      expect(myTree.root).toBe(b);
      expect(myTree.root.value).toEqual(4);
      expect(myTree.root.left).toBe(a);
      expect(myTree.root.right).toBe(c);
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });

    it('adds a right child to trigger double right at root', () => {
      const myTree = new RedBlackTree();
      //       7b           6b
      //   5r       =>   5r    7r
      //     6r
      const a = myTree.insert(7);
      const b = myTree.insert(5);
      const c = myTree.insert(6);

      expect(myTree.root).toBe(c);
      expect(myTree.root.value).toEqual(6);
      expect(myTree.root.left).toBe(b);
      expect(myTree.root.right).toBe(a);
      expect(a.color).toEqual('red');
      expect(b.color).toEqual('red');
      expect(c.color).toEqual('black');
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });
    it('adds a left child to trigger double left at root', () => {
      const myTree = new RedBlackTree();
      //       7b              8b
      //           9r  =>   7r    9r
      //         8r
      const a = myTree.insert(7);
      const b = myTree.insert(9);
      const c = myTree.insert(8);

      expect(myTree.root).toBe(c);
      expect(myTree.root.value).toEqual(8);
      expect(myTree.root.left).toBe(a);
      expect(myTree.root.right).toBe(b);
      expect(a.color).toEqual('red');
      expect(b.color).toEqual('red');
      expect(c.color).toEqual('black');
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });

    it('adds 4th node, left left, succeds at recolor, recolors root', () => {
      const myTree = new RedBlackTree();
      //       8b             8b
      //    7r    9r   =>   7b   9b
      //  5r              5r
      const a = myTree.insert(8);
      const b = myTree.insert(7);
      const c = myTree.insert(9);
      const d = myTree.insert(5);

      expect(myTree.root).toBe(a);
      expect(myTree.root.value).toEqual(8);
      expect(myTree.root.left).toBe(b);
      expect(myTree.root.right).toBe(c);
      expect(myTree.root.left.left).toBe(d);
      expect(a.color).toEqual('black');
      expect(b.color).toEqual('black');
      expect(c.color).toEqual('black');
      expect(d.color).toEqual('red');
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });
    it('adds 4th node, left right, succeds at recolor, recolors root', () => {
      const myTree = new RedBlackTree();
      //       8b             8b
      //    7r    9r   =>   7b   9b
      //      7.5r              7.5r
      const a = myTree.insert(8);
      const b = myTree.insert(7);
      const c = myTree.insert(9);
      const d = myTree.insert(7.5);

      expect(myTree.root).toBe(a);
      expect(myTree.root.value).toEqual(8);
      expect(myTree.root.left).toBe(b);
      expect(myTree.root.right).toBe(c);
      expect(myTree.root.left.right).toBe(d);
      expect(a.color).toEqual('black');
      expect(b.color).toEqual('black');
      expect(c.color).toEqual('black');
      expect(d.color).toEqual('red');
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });
    it('adds 4th node, right left, succeds at recolor, recolors root', () => {
      const myTree = new RedBlackTree();
      //        8b                 8b
      //    7r       9r   =>   7b      9b
      //          8.5r               8.5r
      const a = myTree.insert(8);
      const b = myTree.insert(7);
      const c = myTree.insert(9);
      const d = myTree.insert(8.5);

      expect(myTree.root).toBe(a);
      expect(myTree.root.value).toEqual(8);
      expect(myTree.root.left).toBe(b);
      expect(myTree.root.right).toBe(c);
      expect(myTree.root.right.left).toBe(d);
      expect(a.color).toEqual('black');
      expect(b.color).toEqual('black');
      expect(c.color).toEqual('black');
      expect(d.color).toEqual('red');
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });
    it('adds 4th node, right right, succeds at recolor, recolors root', () => {
      const myTree = new RedBlackTree();
      //        8b                 8b
      //    7r       9r   =>   7b      9b
      //                10r               10r
      const a = myTree.insert(8);
      const b = myTree.insert(7);
      const c = myTree.insert(9);
      const d = myTree.insert(10);

      expect(myTree.root).toBe(a);
      expect(myTree.root.value).toEqual(8);
      expect(myTree.root.left).toBe(b);
      expect(myTree.root.right).toBe(c);
      expect(myTree.root.right.right).toBe(d);
      expect(a.color).toEqual('black');
      expect(b.color).toEqual('black');
      expect(c.color).toEqual('black');
      expect(d.color).toEqual('red');
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });

    it('insertion causes single right non root rotation', () => {
      const myTree = new RedBlackTree();
      //          7b                     7b
      //       4b     14b     =>     3b        14b
      //     3r     12r 15r        1r  4r    12r  15r
      //   1r
      const insertOrder = [7, 4, 14, 3, 12, 15];
      for (let i = 0; i < insertOrder.length; i += 1) {
        myTree.insert(insertOrder[i]);
      }
      myTree.insert(1);

      expect(myTree.root.value).toEqual(7);
      expect(myTree.root.left.value).toEqual(3);
      expect(myTree.root.right.value).toEqual(14);

      expect(myTree.root.left.left.value).toEqual(1);
      expect(myTree.root.left.right.value).toEqual(4);
      expect(myTree.root.right.left.value).toEqual(12);
      expect(myTree.root.right.right.value).toEqual(15);

      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });
    it('insertion causes double right non root rotation', () => {
      const myTree = new RedBlackTree();
      //          7b                     7b
      //       4b     14b     =>     3b        14b
      //     1r     12r 15r        1r  4r    12r  15r
      //       3r
      const insertOrder = [7, 4, 14, 1, 12, 15];
      for (let i = 0; i < insertOrder.length; i += 1) {
        myTree.insert(insertOrder[i]);
      }
      myTree.insert(3);

      expect(myTree.root.value).toEqual(7);
      expect(myTree.root.left.value).toEqual(3);
      expect(myTree.root.right.value).toEqual(14);

      expect(myTree.root.left.left.value).toEqual(1);
      expect(myTree.root.left.right.value).toEqual(4);
      expect(myTree.root.right.left.value).toEqual(12);
      expect(myTree.root.right.right.value).toEqual(15);

      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });

    it('insertion causes single left non root rotation', () => {
      const myTree = new RedBlackTree();
      //            7b                         7b
      //       4b        14b       =>     4b        17b
      //     3r   5r        17r         3r  5r    14r  20r
      //                       20r
      const insertOrder = [7, 4, 14, 3, 5, 17];
      for (let i = 0; i < insertOrder.length; i += 1) {
        myTree.insert(insertOrder[i]);
      }
      myTree.insert(20);

      expect(myTree.root.value).toEqual(7);
      expect(myTree.root.left.value).toEqual(4);
      expect(myTree.root.right.value).toEqual(17);

      expect(myTree.root.left.left.value).toEqual(3);
      expect(myTree.root.left.right.value).toEqual(5);
      expect(myTree.root.right.left.value).toEqual(14);
      expect(myTree.root.right.right.value).toEqual(20);

      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });
    it('insertion causes double left non root rotation', () => {
      const myTree = new RedBlackTree();
      //            7b                         7b
      //       4b        14b       =>     4b        16b
      //     3r   5r        17r         3r  5r    14r  17
      //                   16r
      const insertOrder = [7, 4, 14, 3, 5, 17];
      for (let i = 0; i < insertOrder.length; i += 1) {
        myTree.insert(insertOrder[i]);
      }
      myTree.insert(16);

      expect(myTree.root.value).toEqual(7);
      expect(myTree.root.left.value).toEqual(4);
      expect(myTree.root.right.value).toEqual(16);

      expect(myTree.root.left.left.value).toEqual(3);
      expect(myTree.root.left.right.value).toEqual(5);
      expect(myTree.root.right.left.value).toEqual(14);
      expect(myTree.root.right.right.value).toEqual(17);

      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });

    it('insertion causes non root recolor', () => {
      const myTree = new RedBlackTree();
      //           7b                          7b
      //       4b        14b        =>     4b        14r
      //     3r  5r    12r  15r          3r  5r    12b  15b
      //                       18r                         18r
      const insertOrder = [7, 4, 14, 3, 5, 12, 15];
      for (let i = 0; i < insertOrder.length; i += 1) {
        myTree.insert(insertOrder[i]);
      }
      myTree.insert(18);

      expect(myTree.root.value).toEqual(7);
      expect(myTree.root.color).toEqual('black');
      expect(myTree.root.left.value).toEqual(4);
      expect(myTree.root.left.color).toEqual('black');
      expect(myTree.root.right.value).toEqual(14);
      expect(myTree.root.right.color).toEqual('red');

      expect(myTree.root.left.left.value).toEqual(3);
      expect(myTree.root.left.left.color).toEqual('red');
      expect(myTree.root.left.right.value).toEqual(5);
      expect(myTree.root.left.right.color).toEqual('red');
      expect(myTree.root.right.left.value).toEqual(12);
      expect(myTree.root.right.left.color).toEqual('black');
      expect(myTree.root.right.right.value).toEqual(15);
      expect(myTree.root.right.right.color).toEqual('black');

      expect(myTree.root.right.right.right.value).toEqual(18);
      expect(myTree.root.right.right.right.color).toEqual('red');

      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });

    it('recolor causes single left rotation at root', () => {
      const myTree = new RedBlackTree();
      //          7b                                 14b
      //     4b        14r                        7r       16r
      //  3r   5r    12b   16b         =>      4b       15b   18b
      //                  15r   18r          3r   5r         17r
      //                       17r
      const insertOrder = [4, 7, 12, 15, 3, 5, 14, 18, 16];
      for (let i = 0; i < insertOrder.length; i += 1) {
        myTree.insert(insertOrder[i]);
      }
      myTree.insert(17);

      expect(myTree.root.value).toEqual(14);
      expect(myTree.root.left.value).toEqual(7);
      expect(myTree.root.right.value).toEqual(16);

      expect(myTree.root.left.left.value).toEqual(4);
      expect(myTree.root.right.left.value).toEqual(15);
      expect(myTree.root.right.right.value).toEqual(18);

      expect(myTree.root.left.left.left.value).toEqual(3);
      expect(myTree.root.left.left.right.value).toEqual(5);
      expect(myTree.root.right.right.left.value).toEqual(17);

      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });
    it('recolor causes single right rotation at root', () => {
      const myTree = new RedBlackTree();
      //               20b                            15b
      //        15r          25b                10r           20b
      //     10b   17b    23r   27r    =>     8b   12b     17b    25b
      //   8r   12r                            9r              23r  27r
      //     9r
      const insertOrder = [20, 15, 25, 10, 17, 23, 27, 8, 12];
      for (let i = 0; i < insertOrder.length; i += 1) {
        myTree.insert(insertOrder[i]);
      }
      myTree.insert(9);

      expect(myTree.root.value).toEqual(15);
      expect(myTree.root.color).toEqual('black');
      expect(myTree.root.left.value).toEqual(10);
      expect(myTree.root.left.color).toEqual('red');
      expect(myTree.root.right.value).toEqual(20);
      expect(myTree.root.right.color).toEqual('red');

      expect(myTree.root.left.left.value).toEqual(8);
      expect(myTree.root.left.left.color).toEqual('black');
      expect(myTree.root.left.right.value).toEqual(12);
      expect(myTree.root.left.right.color).toEqual('black');
      expect(myTree.root.right.left.value).toEqual(17);
      expect(myTree.root.right.left.color).toEqual('black');
      expect(myTree.root.right.right.value).toEqual(25);
      expect(myTree.root.right.right.color).toEqual('black');

      expect(myTree.root.left.left.right.value).toEqual(9);
      expect(myTree.root.left.left.right.color).toEqual('red');
      expect(myTree.root.right.right.left.value).toEqual(23);
      expect(myTree.root.right.right.left.color).toEqual('red');
      expect(myTree.root.right.right.right.value).toEqual(27);
      expect(myTree.root.right.right.right.color).toEqual('red');

      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });

    it('recolor causes single left rotation, non root', () => {
      const myTree = new RedBlackTree();

      const insertOrder = [50, 40, 60, 30, 45, 55, 70, 20, 35, 42, 48, 80, 46, 49];
      for (let i = 0; i < insertOrder.length; i += 1) {
        myTree.insert(insertOrder[i]);
      }
      myTree.insert(47);

      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);

      expect(myTree.root.value).toEqual(50);
      expect(myTree.root.color).toEqual('black');

      expect(myTree.root.left.value).toEqual(45);
      expect(myTree.root.left.color).toEqual('black');
      expect(myTree.root.right.value).toEqual(60);
      expect(myTree.root.right.color).toEqual('black');

      expect(myTree.root.left.left.value).toEqual(40);
      expect(myTree.root.left.left.color).toEqual('red');
      expect(myTree.root.left.right.value).toEqual(48);
      expect(myTree.root.left.right.color).toEqual('red');
      expect(myTree.root.right.left.value).toEqual(55);
      expect(myTree.root.right.left.color).toEqual('black');
      expect(myTree.root.right.right.value).toEqual(70);
      expect(myTree.root.right.right.color).toEqual('black');

      expect(myTree.root.left.left.left.value).toEqual(30);
      expect(myTree.root.left.left.left.color).toEqual('black');
      expect(myTree.root.left.left.right.value).toEqual(42);
      expect(myTree.root.left.left.right.color).toEqual('black');
      expect(myTree.root.left.right.left.value).toEqual(46);
      expect(myTree.root.left.right.left.color).toEqual('black');
      expect(myTree.root.left.right.right.value).toEqual(49);
      expect(myTree.root.left.right.right.color).toEqual('black');
      expect(myTree.root.right.right.right.value).toEqual(80);
      expect(myTree.root.right.right.right.color).toEqual('red');

      expect(myTree.root.left.left.left.left.value).toEqual(20);
      expect(myTree.root.left.left.left.left.color).toEqual('red');
      expect(myTree.root.left.left.left.right.value).toEqual(35);
      expect(myTree.root.left.left.left.right.color).toEqual('red');
      expect(myTree.root.left.right.left.right.value).toEqual(47);
      expect(myTree.root.left.right.left.right.color).toEqual('red');
    });
  });

  describe('remove edge cases', () => {
    it('fails given no parameters', () => {
      const myTree = new RedBlackTree();

      myTree.insert(5);

      const result = myTree.remove();
      expect(result).toBeUndefined();
      expect(myTree.root.value).toBe(5);
    });
    it('fails on empty tree', () => {
      const myTree = new RedBlackTree();

      const result = myTree.remove(2);
      expect(result).toBeUndefined();
      expect(myTree.root).toBeNull();
    });
    it('returns undefined if value is not in the tree', () => {
      const myTree = new RedBlackTree();

      myTree.insert(5);
      myTree.insert(10);
      myTree.insert(2);
      myTree.insert(4);
      myTree.insert(12);

      const result = myTree.remove(3);
      expect(result).toBeUndefined();
    });
    it('returns undefined if value is not in the tree', () => {
      const myTree = new RedBlackTree();

      myTree.insert(5);
      myTree.insert(10);
      myTree.insert(2);
      myTree.insert(4);
      myTree.insert(12);

      const result = myTree.remove(20);
      expect(result).toBeUndefined();
    });
    xit('returns undefined when value is not in the tree', () => {
      const myTree = new RedBlackTree();

      myTree.insert(5);
      myTree.insert(10);
      myTree.insert(2);
      myTree.insert(4);
      myTree.insert(12);

      myTree.remove(5);
      const result = myTree.remove(5);
      expect(result).toBeUndefined();
    });
  });

  describe('remove', () => {
    it('removes the root sucessfully on 1 node tree', () => {
      const myTree = new RedBlackTree();

      const a = myTree.insert(5);

      const result = myTree.remove(5);
      expect(result).toEqual(5);
      expect(myTree.root).toBeNull();
    });

    it('removes single left leaf sucessfully, parent is root', () => {
      const myTree = new RedBlackTree();
      //    5             5
      //  3   7   ->        7
      const a = myTree.insert(5);
      const b = myTree.insert(3);
      const c = myTree.insert(7);

      const result = myTree.remove(3);
      expect(result).toEqual(3);
      expect(myTree.root.value).toEqual(5);
      expect(myTree.root.right).toBe(c);
      expect(myTree.root.left).toBeNull();
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });
    it('removes single right leaf sucessfully, parent is root', () => {
      const myTree = new RedBlackTree();
      //    5             5
      //  3   7   ->    3
      const a = myTree.insert(5);
      const b = myTree.insert(3);
      const c = myTree.insert(7);

      const result = myTree.remove(7);

      expect(result).toEqual(7);
      expect(myTree.root.value).toEqual(5);
      expect(myTree.root.left.value).toEqual(3);
      expect(myTree.root.right).toBeNull();
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });
    it('removes root node with 2 leaf children, random left', () => {
      global.Math.random = () => 0.75;

      const myTree = new RedBlackTree();
      //    5             3
      //  3   7   ->        7
      const a = myTree.insert(5);
      const b = myTree.insert(3);
      const c = myTree.insert(7);

      const result = myTree.remove(5);

      expect(result).toEqual(5);
      expect(myTree.root.value).toEqual(3);
      expect(myTree.root.left).toBeNull();
      expect(myTree.root.right.value).toEqual(7);
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });
    it('removes root node with 2 leaf children, random right', () => {
      global.Math.random = () => 0.25;

      const myTree = new RedBlackTree();
      //    5              7
      //  3   7   ->     3
      const a = myTree.insert(5);
      const b = myTree.insert(3);
      const c = myTree.insert(7);

      const result = myTree.remove(5);

      expect(result).toEqual(5);
      expect(myTree.root.value).toEqual(7);
      expect(myTree.root.right).toBeNull();
      expect(myTree.root.left.value).toEqual(3);
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });

    it('removes root node with full tree of h=2, random left', () => {
      global.Math.random = () => 0.75;

      const myTree = new RedBlackTree();
      //          10b                    7b
      //      5b       15b      ->     5b      15b
      //   2r   7r  12r   20r        2r      12r   20r
      //
      const insertOrder = [10, 5, 15, 2, 7, 12, 20];
      for (let i = 0; i < insertOrder.length; i += 1) {
        myTree.insert(insertOrder[i]);
      }
      const result = myTree.remove(10);

      const expectedTree = new RedBlackTree();
      const expectedTreeValues = [7, 5, 15, 2, 12, 20];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insert(expectedTreeValues[i]);
      }

      expect(result).toEqual(10);
      expect(myTree).toEqual(expectedTree);
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });
    it('removes root node with full tree of h=2, random right', () => {
      global.Math.random = () => 0.25;

      const myTree = new RedBlackTree();
      //        10                    12
      //     5      15      ->     5      15
      //   2   7  12   20        2  7        20
      //
      const insertOrder = [10, 5, 15, 2, 7, 12, 20];
      for (let i = 0; i < insertOrder.length; i += 1) {
        myTree.insert(insertOrder[i]);
      }
      const result = myTree.remove(10);

      const expectedTree = new RedBlackTree();
      const expectedTreeValues = [12, 5, 15, 2, 7, 20];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insert(expectedTreeValues[i]);
      }

      expect(result).toEqual(10);
      expect(myTree).toEqual(expectedTree);
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });
    it('removes root node with full tree of h=2, random left, replacement has child', () => {
      global.Math.random = () => 0.75;

      const myTree = new RedBlackTree();
      //          10b                        7b
      //      5r       15b      ->      5r        15b
      //   2b   7b  12r   20r        2b   6b   12r   20r
      //      6r
      const insertOrder = [10, 5, 15, 2, 7, 12, 20, 6];
      for (let i = 0; i < insertOrder.length; i += 1) {
        myTree.insert(insertOrder[i]);
      }
      const result = myTree.remove(10);

      const expectedTree = new RedBlackTree();
      const expectedTreeValues = ['7b', '5r', '15b', '2b', '6b', '12r', '20r'];
      expectedTree.constructTestTree(expectedTreeValues);

      expect(result).toEqual(10);
      expect(myTree).toEqual(expectedTree);
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });

    it('remove root, single red left leaf, random left', () => {
      global.Math.random = () => 0.75;
      //         8b             4b
      //    4r        -->
      const myTree = new RedBlackTree();
      const myTreeValues = ['8b', '4r'];
      myTree.constructTestTree(myTreeValues);

      const removedValue = 8;
      const result = myTree.remove(removedValue);

      const expectedTree = new RedBlackTree();
      const expectedTreeValues = ['4b'];
      expectedTree.constructTestTree(expectedTreeValues);

      expect(result).toEqual(removedValue);
      expect(myTree).toEqual(expectedTree);
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });
    it('remove root, single red right leaf, random left', () => {
      global.Math.random = () => 0.75;
      //         8b             9b
      //             9r  -->
      const myTree = new RedBlackTree();
      const myTreeValues = ['8b', '9r'];
      myTree.constructTestTree(myTreeValues);

      const removedValue = 8;
      const result = myTree.remove(removedValue);

      const expectedTree = new RedBlackTree();
      const expectedTreeValues = ['9b'];
      expectedTree.constructTestTree(expectedTreeValues);

      expect(result).toEqual(removedValue);
      expect(myTree).toEqual(expectedTree);
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });

    it('removes black non-root node with 1 red child to left', () => {
      global.Math.random = () => 0.75;

      const myTree = new RedBlackTree();
      //          10b                        10b
      //      5r       15b      ->      5r        15b
      //   2b   7b  12r   20r        2b   6b   12r   20r
      //      6r
      const insertOrder = [10, 5, 15, 2, 7, 12, 20, 6];
      for (let i = 0; i < insertOrder.length; i += 1) {
        myTree.insert(insertOrder[i]);
      }
      const result = myTree.remove(7);

      const expectedTree = new RedBlackTree();
      const expectedTreeValues = ['10b', '5r', '15b', '2b', '6b', '12r', '20r'];
      expectedTree.constructTestTree(expectedTreeValues);

      expect(result).toEqual(7);
      expect(myTree).toEqual(expectedTree);
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });
    it('removes black non-root node with 1 red child to right', () => {
      global.Math.random = () => 0.75;

      const myTree = new RedBlackTree();
      //          10b                        10b
      //      5r       15b      ->      5r        15b
      //   2b   7b  12r   20r        2b   6b   12r   20r
      //          8r
      const insertOrder = [10, 5, 15, 2, 7, 12, 20, 8];
      for (let i = 0; i < insertOrder.length; i += 1) {
        myTree.insert(insertOrder[i]);
      }
      const result = myTree.remove(7);

      const expectedTree = new RedBlackTree();
      const expectedTreeValues = ['10b', '5r', '15b', '2b', '8b', '12r', '20r'];
      expectedTree.constructTestTree(expectedTreeValues);

      expect(result).toEqual(7);
      expect(myTree).toEqual(expectedTree);
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });

    it('case 4, left', () => {
      // P is red, S is black w/ 2 black children

      //           10b                      10b
      //        0b       30r      ->     0b       30b
      //              20b   38b                      38r
      //
      const myTree = new RedBlackTree();
      const myTreeValues = ['10b', '0b', '30r', '20b', '38b'];
      myTree.constructTestTree(myTreeValues);

      const result = myTree.remove(20);

      const expectedTree = new RedBlackTree();
      const expectedTreeValues = ['10b', '0b', '30b', '38r'];
      expectedTree.constructTestTree(expectedTreeValues);

      expect(result).toEqual(20);
      expect(myTree).toEqual(expectedTree);
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });
    it('case 4, right', () => {
      // P is red, S is black w/ 2 black children
      //           8b                       8b
      //       5r     9b      ->         5r    9b
      //    1b   7b                   1r
      const myTree = new RedBlackTree();
      const myTreeValues = ['8b', '5r', '9b', '1b', '7b'];
      myTree.constructTestTree(myTreeValues);

      const result = myTree.remove(7);

      const expectedTree = new RedBlackTree();
      const expectedTreeValues = ['8b', '5b', '9b', '1r'];
      expectedTree.constructTestTree(expectedTreeValues);

      expect(result).toEqual(7);
      expect(myTree).toEqual(expectedTree);
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });
    it('case 6, rotate left, black parent, red niece', () => {
      // case 6: S is black, S has red right child
      //           10b                      30b
      //        0b       30b      ->     10b     40b
      //              25r   40r             25r
      const myTree = new RedBlackTree();
      const myTreeValues = ['10b', '0b', '30b', '25r', '40r'];
      myTree.constructTestTree(myTreeValues);

      const result = myTree.remove(0);

      const expectedTree = new RedBlackTree();
      const expectedTreeValues = ['30b', '10b', '40b', '25r'];
      expectedTree.constructTestTree(expectedTreeValues);

      expect(result).toEqual(0);
      expect(myTree).toEqual(expectedTree);
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });
    it('case 6, rotate right, black parent, red niece', () => {
      // case 6: S is black, S has red right child
      //            8b                 5b
      //         5b    9b     ->    4b     8b
      //      4r   6r                     6r
      const myTree = new RedBlackTree();
      const myTreeValues = ['8b', '5b', '9b', '4r', '6r'];
      myTree.constructTestTree(myTreeValues);

      const result = myTree.remove(9);

      const expectedTree = new RedBlackTree();
      const expectedTreeValues = ['5b', '4b', '8b', '6r'];
      expectedTree.constructTestTree(expectedTreeValues);

      expect(result).toEqual(9);
      expect(myTree).toEqual(expectedTree);
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });
    it('case 6, rotate left, red parent, red niece', () => {
      // case 6: S is black, S has red right child
      //             50b                             50b
      //     10r             70b              30r            70b
      //  0b     30b                  ->   10b     40b
      //       25r  40r                       25r
      const myTree = new RedBlackTree();
      const myTreeValues = ['50b', '10r', '70b', '0b', '30b', '25r', '40r'];
      myTree.constructTestTree(myTreeValues);

      const result = myTree.remove(0);

      const expectedTree = new RedBlackTree();
      const expectedTreeValues = ['50b', '30r', '70b', '10b', '40b', '25r'];
      expectedTree.constructTestTree(expectedTreeValues);


      expect(result).toEqual(0);
      expect(myTree).toEqual(expectedTree);
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });
    it('case 6, rotate right, red parent, red niece', () => {
      // case 6: S is black, S has red right child
      //         50b                          50b
      //   40b           70r           40b            60r
      //             60b     80b   ->             55b     70b
      //           55r 65r                              65r
      const myTree = new RedBlackTree();
      const myTreeValues = ['50b', '40b', '70r', '60b', '80b', '55r', '65r'];
      myTree.constructTestTree(myTreeValues);

      const result = myTree.remove(80);

      const expectedTree = new RedBlackTree();
      const expectedTreeValues = ['50b', '40b', '60r', '55b', '70b', '65r'];
      expectedTree.constructTestTree(expectedTreeValues);

      expect(result).toEqual(80);
      expect(myTree).toEqual(expectedTree);
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });
    it('case 2 --> case 4, random right (rotate left)', () => {
      // case2: P is black, S is red w/ 2 black children
      global.Math.random = () => 0.25;

      //         10b                             20b
      //    -10b      40b          -->     -10b       60b
      //  -20b -5b  20b    60r           -20b -5b  40b    80b
      //                 50b    80b                  50r
      const myTree = new RedBlackTree();
      const myTreeValues = ['10b', '-10b', '40b', '-20b', '-5b', '20b', '60r', '50b', '80b'];
      myTree.constructTestTree(myTreeValues);

      const result = myTree.remove(10);

      const expectedTree = new RedBlackTree();
      const expectedTreeValues = ['20b', '-10b', '60b', '-20b', '-5b', '40b', '80b', '50r'];
      expectedTree.constructTestTree(expectedTreeValues);

      expect(result).toEqual(10);
      expect(myTree).toEqual(expectedTree);
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });
    it('case 2 --> case 4, random left (rotate right)', () => {
      // case2: P is black, S is red w/ 2 black children
      global.Math.random = () => 0.75;
      //          10b                                 -5b
      //     -10b      40b          -->       -20b           40b
      //   -20r -5b  20b    60r          -30b    -10b    20b    60r
      // -30b -15b         50b  80b            -15r           50b  80b
      const myTree = new RedBlackTree();
      const myTreeValues = ['10b', '-10b', '40b', '-20r', '-5b', '20b', '60r', '-30b', '-15b', '50b', '80b'];
      myTree.constructTestTree(myTreeValues);

      const result = myTree.remove(10);

      const expectedTree = new RedBlackTree();
      const expectedTreeValues = ['-5b', '-20b', '40b', '-30b', '-10b', '20b', '60r', '-15r', '50b', '80b'];
      expectedTree.constructTestTree(expectedTreeValues);

      expect(result).toEqual(10);
      expect(myTree).toEqual(expectedTree);
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });
    it('case 3 --> case 1, remove left', () => {
      // case 3: P is black, S is black w/ 2 black children
      //         10b                       10b
      //    -10b      30b          -->          30r
      const myTree = new RedBlackTree();
      const myTreeValues = ['10b', '-10b', '30b'];
      myTree.constructTestTree(myTreeValues);

      const result = myTree.remove(-10);

      const expectedTree = new RedBlackTree();
      const expectedTreeValues = ['10b', '30r'];
      expectedTree.constructTestTree(expectedTreeValues);

      expect(result).toEqual(-10);
      expect(myTree).toEqual(expectedTree);
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });
    it('case 3 --> case 1, remove right', () => {
      // case 3: P is black, S is black w/ 2 black children
      //         10b                    10b
      //    -10b      30b    -->   -10r
      const myTree = new RedBlackTree();
      const myTreeValues = ['10b', '-10b', '30b'];
      myTree.constructTestTree(myTreeValues);

      const result = myTree.remove(30);

      const expectedTree = new RedBlackTree();
      const expectedTreeValues = ['10b', '-10r'];
      expectedTree.constructTestTree(expectedTreeValues);

      expect(result).toEqual(30);
      expect(myTree).toEqual(expectedTree);
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });
    it('case 3 --> case 5 --> case 6, regular case', () => {
      // case 3: P is black, S is black w/ 2 black children
      //           10b                           30b
      //    -30b        50b      -->       10b           50b
      //  -40b -20b  30r    70b       -30b     15b    40b    70b
      //            15b 40b              -20r
      const myTree = new RedBlackTree();
      const myTreeValues = ['10b', '-30b', '50b', '-40b', '-20b', '30r', '70b', '15b', '40b'];
      myTree.constructTestTree(myTreeValues);

      const result = myTree.remove(-40);

      const expectedTree = new RedBlackTree();
      const expectedTreeValues = ['30b', '10b', '50b', '-30b', '15b', '40b', '70b', '-20r'];
      expectedTree.constructTestTree(expectedTreeValues);

      expect(result).toEqual(-40);
      expect(myTree).toEqual(expectedTree);
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });
    it('case 3 --> case 5 --> case 6, mirror case', () => {
      // case 3: P is black, S is black w/ 2 black children
      //             30b                             30b
      //     15b           45b     -->        20b           45b
      //  10b    20r     40b  70b          15r   22b      40r
      //        18b 22b                 10b   18b

      //                   20b
      // ... ->     15b              30b
      //         10b   18b       22b     45b
      //                                40r
      const myTree = new RedBlackTree();
      const myTreeValues = ['30b', '15b', '45b', '10b', '20r', '40b', '70b', '18b', '22b'];
      myTree.constructTestTree(myTreeValues);

      const result = myTree.remove(70);

      const expectedTree = new RedBlackTree();
      const expectedTreeValues = ['20b', '15b', '30b', '10b', '18b', '22b', '45b', '40r'];
      expectedTree.constructTestTree(expectedTreeValues);

      expect(result).toEqual(70);
      expect(myTree).toEqual(expectedTree);
      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });
  });

  describe('contains', () => {
    it('returns false on empty tree', () => {
      const myTree = new RedBlackTree();

      const result = myTree.contains(7);

      expect(result).toEqual(false);
    });
    it('returns false when value isnt present in single node tree', () => {
      const myTree = new RedBlackTree();
      myTree.insert(2);

      const result = myTree.contains(3);

      expect(result).toEqual(false);
    });
    it('returns false when value isnt present in 3 node tree', () => {
      const myTree = new RedBlackTree();
      myTree.insert(2);
      myTree.insert(1);
      myTree.insert(4);

      const result = myTree.contains(3);

      expect(result).toEqual(false);
    });
    it('returns undefined no parameters', () => {
      const myTree = new RedBlackTree();
      myTree.insert(2);
      myTree.insert(1);
      myTree.insert(4);

      const result = myTree.contains();

      expect(result).toBeUndefined();
    });
    it('returns false on empty tree with valid input', () => {
      const myTree = new RedBlackTree();

      const result = myTree.contains(2);

      expect(result).toBe(false);
    });
    it('returns true on single node tree', () => {
      const myTree = new RedBlackTree();
      myTree.insert(2);

      const result = myTree.contains(2);

      expect(result).toBe(true);
    });
    it('returns true on left leaf 3 node tree', () => {
      const myTree = new RedBlackTree();
      myTree.insert(2);
      myTree.insert(1);
      myTree.insert(4);

      const result = myTree.contains(1);

      expect(result).toBe(true);
    });
    it('returns true on right leaf 3 node tree', () => {
      const myTree = new RedBlackTree();
      myTree.insert(2);
      myTree.insert(1);
      myTree.insert(4);

      const result = myTree.contains(4);

      expect(result).toBe(true);
    });
  });

  describe('findMax', () => {
    it('returns undefined given empty tree', () => {
      const myTree = new RedBlackTree();

      const result = myTree.findMax();

      expect(result).toBeUndefined();
      expect(myTree.root).toBe(null);
    });
    it('returns correctly single node tree', () => {
      const myTree = new RedBlackTree();

      myTree.insert(2);

      const result = myTree.findMax();

      expect(result).toEqual(2);
      expect(myTree.root.value).toEqual(2);
    });
    it('returns correctly on 2 node tree, left leaf', () => {
      //     2
      //    1
      const myTree = new RedBlackTree();

      myTree.insert(2);
      myTree.insert(1);

      const result = myTree.findMax();

      expect(result).toEqual(2);
    });
    it('returns correctly on 3 node tree, right leaf', () => {
      //     2
      //    1 3
      const myTree = new RedBlackTree();

      myTree.insert(2);
      myTree.insert(1);
      myTree.insert(3);

      const result = myTree.findMax();

      expect(result).toEqual(3);
    });
    it('returns correctly on 4 node tree, right w/ left child', () => {
      const myTree = new RedBlackTree();
      //       2
      //    1     4
      //         3
      const values = [2, 1, 4, 3];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insert(values[i]);
      }

      const result = myTree.findMax();

      expect(result).toEqual(4);
    });
  });

  describe('findMin', () => {
    it('returns undefined given empty tree', () => {
      const myTree = new RedBlackTree();

      const result = myTree.findMin();

      expect(result).toBeUndefined();
      expect(myTree.root).toBe(null);
    });
    it('returns correctly single node tree', () => {
      const myTree = new RedBlackTree();

      myTree.insert(2);

      const result = myTree.findMin();

      expect(result).toEqual(2);
      expect(myTree.root.value).toEqual(2);
    });
    it('returns correctly on 2 node tree, right leaf', () => {
      //     2
      //       3
      const myTree = new RedBlackTree();

      myTree.insert(2);
      myTree.insert(3);

      const result = myTree.findMin();

      expect(result).toEqual(2);
    });
    it('returns correctly on 3 node tree, right leaf', () => {
      //     2
      //    1 3
      const myTree = new RedBlackTree();

      myTree.insert(2);
      myTree.insert(1);
      myTree.insert(3);

      const result = myTree.findMin();

      expect(result).toEqual(1);
    });
    it('returns correctly on 4 node tree, right w/ left child', () => {
      const myTree = new RedBlackTree();
      //       2
      //    1     4
      //     1.5
      const values = [2, 1, 4, 1.5];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insert(values[i]);
      }

      const result = myTree.findMin();

      expect(result).toEqual(1);
    });
  });

  describe('printPreOrder', () => {
    it('returns empty array if tree is empty', () => {
      const myTree = new RedBlackTree();

      const result = myTree.printPreOrder();

      expect(result).toEqual([]);
    });

    it('correctly returns pre order traversal, single node tree', () => {
      const myTree = new RedBlackTree();
      myTree.insert(10);

      const result = myTree.printPreOrder();
      const expected = [10];

      expect(result).toEqual(expected);
    });

    it('correctly returns pre order traversal, multi node tree', () => {
      const myTree = new RedBlackTree();
      const myTreeValues = ['10', '5', '15', '3', '7', '12', '17'];
      myTree.constructTestTree(myTreeValues);
      //               10
      //            5      15
      //          3   7  12   17
      const result = myTree.printPreOrder();
      const expected = [10, 5, 3, 7, 15, 12, 17];

      expect(result).toEqual(expected);
    });
  });

  describe('printInOrder', () => {
    it('returns empty array if tree is empty', () => {
      const myTree = new RedBlackTree();

      const result = myTree.printInOrder();

      expect(result).toEqual([]);
    });

    it('correctly returns pre order traversal, single node tree', () => {
      const myTree = new RedBlackTree();
      myTree.insert(10);

      const result = myTree.printInOrder();
      const expected = [10];

      expect(result).toEqual(expected);
    });

    it('correctly returns pre order traversal, multi node tree', () => {
      const myTree = new RedBlackTree();
      const myTreeValues = ['10', '5', '15', '3', '7', '12', '17'];
      myTree.constructTestTree(myTreeValues);
      //               10
      //            5      15
      //          3   7  12   17

      const result = myTree.printInOrder();
      const expected = [3, 5, 7, 10, 12, 15, 17];

      expect(result).toEqual(expected);
    });
  });

  describe('printPostOrder', () => {
    it('returns empty array if tree is empty', () => {
      const myTree = new RedBlackTree();

      const result = myTree.printPostOrder();

      expect(result).toEqual([]);
    });

    it('correctly returns pre order traversal, single node tree', () => {
      const myTree = new RedBlackTree();
      myTree.insert(10);

      const result = myTree.printPostOrder();
      const expected = [10];

      expect(result).toEqual(expected);
    });

    it('correctly returns pre order traversal, multi node tree', () => {
      const myTree = new RedBlackTree();
      const myTreeValues = ['10', '5', '15', '3', '7', '12', '17'];
      myTree.constructTestTree(myTreeValues);
      //               10
      //            5      15
      //          3   7  12   17

      const result = myTree.printPostOrder();
      const expected = [3, 7, 5, 12, 17, 15, 10];

      expect(result).toEqual(expected);
    });
  });

  describe('get ancestor methods', () => {
    it('get uncle returns null when GP, but no uncle', () => {
      const myTree = new RedBlackTree();
      //          5          GP
      //        2          P
      //       1         N
      const n = new Node(1);
      const p = new Node(2);
      const gp = new Node(5);

      gp.left = p;
      p.left = n;

      p.parent = gp;
      n.parent = p;

      expect(myTree.getParent(n)).toBe(p);
      expect(myTree.getGrandParent(n)).toBe(gp);
      expect(myTree.getUncle(n)).toBeNull();
    });
    it('get uncle returns undefined when no GP', () => {
      const myTree = new RedBlackTree();
      //          5          P
      //        2   7      N

      const n = new Node(1);
      const p = new Node(2);
      p.left = n;
      n.parent = p;

      expect(myTree.getParent(n)).toBe(p);
      expect(myTree.getGrandParent(n)).toBeUndefined();
      expect(myTree.getUncle(n)).toBeUndefined();
    });
    it('get parent returns fasly when no parent', () => {
      const myTree = new RedBlackTree();
      //          5          GP
      const n = new Node(1);

      expect(myTree.getParent(n)).toBeFalsy();
    });
    it('get grandparent returns fasly when no parent', () => {
      const myTree = new RedBlackTree();
      //          5          P
      //        2   7      N

      const n = new Node(1);
      const p = new Node(2);
      p.left = n;
      n.parent = p;

      expect(myTree.getParent(n)).toBe(p);
      expect(myTree.getGrandParent(n)).toBeFalsy();
    });
    it('correctly retuns parents, config 1', () => {
      const myTree = new RedBlackTree();
      //          5          GP
      //        2   7      P    U
      //       1         N
      const n = new Node(1);
      const p = new Node(2);
      const gp = new Node(5);
      const u = new Node(7);

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
      const myTree = new RedBlackTree();
      //          5          GP
      //        2   7      P    U
      //         3          N
      const n = new Node(3);
      const p = new Node(2);
      const gp = new Node(5);
      const u = new Node(7);

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
      const myTree = new RedBlackTree();
      //          5          GP
      //        2   7      U    P
      //           6           N
      const n = new Node(6);
      const p = new Node(7);
      const gp = new Node(5);
      const u = new Node(2);

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

  describe('getAllPaths helper function', () => {
    it('returns correct paths', () => {
      const myTree = new RedBlackTree();
      //          7
      //        4   8
      //      1   5
      const a = new Node(7);
      const b = new Node(4);
      const c = new Node(8);
      const d = new Node(1);
      const e = new Node(5);

      myTree.root = a;
      a.left = b;
      a.right = c;
      b.left = d;
      b.right = e;

      const expected = [
        [a, b, d],
        [a, b, d],
        [a, b, e],
        [a, b, e],
        [a, c],
        [a, c],
      ];
      expect(myTree.generateAllPaths()).toEqual(expected);
    });
  });

  describe('allPathsAreValid helper function', () => {
    it('returns true on empty tree', () => {
      const myTree = new RedBlackTree();
      expect(myTree.allPathsAreValid()).toBe(true);
    });
    it('correctly throws on black lengths not equal', () => {
      const myTree = new RedBlackTree();
      //          7aB
      //        4bR   8cR
      //      1dB
      const a = new Node(7);
      const b = new Node(4);
      const c = new Node(8);
      const d = new Node(1);

      a.color = 'black';
      b.color = 'red';
      c.color = 'red';
      d.color = 'black';

      myTree.root = a;
      a.left = b;
      a.right = c;
      b.left = d;

      expect( () => {
        myTree.allPathsAreValid()
      }).toThrow();
    });
    it('correctly throws on invalid tree, root is red', () => {
      const myTree = new RedBlackTree();
      //          7aR
      //        4bR   8cR
      //      1dB
      const a = new Node(7);
      const b = new Node(4);
      const c = new Node(8);
      const d = new Node(1);

      a.color = 'red';
      b.color = 'red';
      c.color = 'red';
      d.color = 'black';

      myTree.root = a;
      a.left = b;
      a.right = c;
      b.left = d;

      expect( () => {
        myTree.allPathsAreValid()
      }).toThrow();
    });
    it('correctly throws on invalid tree, red left children must be black', () => {
      const myTree = new RedBlackTree();
      //          7aR
      //        4bR   8cR
      //      1dR  5eB
      const a = new Node(7);
      const b = new Node(4);
      const c = new Node(8);
      const d = new Node(1);
      const e = new Node(5);

      a.color = 'black';
      b.color = 'red';
      c.color = 'red';
      d.color = 'red';
      e.color = 'black';

      myTree.root = a;
      a.left = b;
      a.right = c;
      b.left = d;
      b.right = e;

      expect( () => {
        myTree.allPathsAreValid()
      }).toThrow();
    });
    it('correctly throws on invalid tree, red right children must be black', () => {
      const myTree = new RedBlackTree();
      //          7aR
      //        4bR   8cR
      //      1dB  5eR
      const a = new Node(7);
      const b = new Node(4);
      const c = new Node(8);
      const d = new Node(1);
      const e = new Node(5);

      a.color = 'black';
      b.color = 'red';
      c.color = 'red';
      d.color = 'black';
      e.color = 'red';

      myTree.root = a;
      a.left = b;
      a.right = c;
      b.left = d;
      b.right = e;

      expect( () => {
        myTree.allPathsAreValid()
      }).toThrow();
    });
    it('returns true on valid tree', () => {
      const myTree = new RedBlackTree();
      //          7aB
      //        4bR   8cB
      //      1dB   5eB
      const a = new Node(7);
      const b = new Node(4);
      const c = new Node(8);
      const d = new Node(1);
      const e = new Node(5);

      a.color = 'black';
      b.color = 'red';
      c.color = 'black';
      d.color = 'black';
      e.color = 'black';

      myTree.root = a;
      a.left = b;
      a.right = c;
      b.left = d;
      b.right = e;

      const expected = true;
      expect(myTree.allPathsAreValid()).toBe(expected);
    });
  });

  describe('allParentPointersAreValid helper function', () => {
    it('returns true on empty tree', () => {
      const myTree = new RedBlackTree();
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });
    it('returns true on valid tree', () => {
      const myTree = new RedBlackTree();
      //          7aB
      //        4bR   8cR
      //      1dB
      const a = new Node(7);
      const b = new Node(4);
      const c = new Node(8);
      const d = new Node(1);

      a.color = 'black';
      b.color = 'black';
      c.color = 'black';
      d.color = 'red';

      myTree.root = a;
      a.left = b;
      a.right = c;
      b.left = d;

      b.parent = a;
      c.parent = a;
      d.parent = b;

      const expected = true;
      expect(myTree.allParentPointersAreValid()).toBe(expected);
    });
    it('returns false on invalid tree', () => {
      const myTree = new RedBlackTree();
      //          7aB
      //        4bR   8cR
      //      1dB
      const a = new Node(7);
      const b = new Node(4);
      const c = new Node(8);
      const d = new Node(1);

      a.color = 'black';
      b.color = 'black';
      c.color = 'black';
      d.color = 'red';

      myTree.root = a;
      a.left = b;
      a.right = c;
      b.left = d;

      b.parent = d;
      c.parent = a;
      d.parent = b;

      const expected = false;
      expect(myTree.allParentPointersAreValid()).toBe(expected);
    });
    it('returns false on invalid tree', () => {
      const myTree = new RedBlackTree();
      //          7aB
      //        4bR   8cR
      //      1dB
      const a = new Node(7);
      const b = new Node(4);
      const c = new Node(8);
      const d = new Node(1);

      a.color = 'black';
      b.color = 'black';
      c.color = 'black';
      d.color = 'red';

      myTree.root = a;
      a.left = b;
      a.right = c;
      b.left = d;

      b.parent = d;
      c.parent = b;
      d.parent = b;

      const expected = false;
      expect(myTree.allParentPointersAreValid()).toBe(expected);
    });
  });
});

xdescribe('stress test insert and remove', () => {
  it('can probabilistic error detection', () => {
    for(let j = 0; j < 100; j++) {
      let n = 100;

      // generate n numbers
      let insertOrder = [];
      while (insertOrder.length < n) {
        let num = generateRandomNumber();
        if (!insertOrder.includes(num)) {
          insertOrder.push(num);
        }
      }

      // insert them into the tree
      let myTree = new RedBlackTree();
      for (let i = 0; i < insertOrder.length; i += 1) {
        myTree.insert(insertOrder[i]);
        expect(myTree.allPathsAreValid()).toBe(true);
        expect(myTree.allParentPointersAreValid()).toBe(true);
      }
      
      // remove them at random
      let removeOrder = [];
      while (removeOrder.length > 0) {
        let randomIndex = Math.floor(Math.random() * removeOrder.length); // generate random index
        let num = insertOrder[randomIndex];
        myTree.remove(num); // remove the number from the tree
        insertOrder.splice(randomIndex); // remove the number from the bucket of numbers
        removeOrder.push(num); // add the remove order

        expect(myTree.allPathsAreValid()).toBe(true);
        expect(myTree.allParentPointersAreValid()).toBe(true);
      }
    }
  });
});
