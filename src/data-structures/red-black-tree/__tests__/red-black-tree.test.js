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


  describe('insert edge cases', () => {
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

  describe('insert', () => {
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
      let insertOrder = [7, 4, 14, 3, 12, 15];
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
      let insertOrder = [7, 4, 14, 1, 12, 15];
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
      let insertOrder = [7, 4, 14, 3, 5, 17];
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
      let insertOrder = [7, 4, 14, 3, 5, 17];
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
      let insertOrder = [7, 4, 14, 3, 5, 12, 15];
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

    it('recolor causes single left rotation at root ', () => {
      const myTree = new RedBlackTree();
      //          7b                                 14b
      //     4b        14r                        7r       16r
      //  3r   5r    12b   16b         =>      4b       15b   18b
      //                  15r   18r          3r   5r         17r
      //                       17r
      let insertOrder = [4, 7, 12, 15, 3, 5, 14, 18, 16];
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
    xit('recolor causes single left rotation at root ', () => {
      const myTree = new RedBlackTree();
      //          7b                                 14b
      //     4b        14r                        7r       16r
      //  3r   5r    12b   16b         =>      4b       15b   18b
      //                  15r   18r          3r   5r           17r
      //                       17r

      let insertOrder = [4, 7, 12, 15, 3, 5, 14, 18, 16, 17];
      for (let i = 0; i < insertOrder.length; i += 1) {
        myTree.insert(insertOrder[i]);
      }

      expect(myTree.root.value).toEqual(14);
      expect(myTree.root.color).toEqual('black');
      expect(myTree.root.left.value).toEqual(7);
      expect(myTree.root.left.color).toEqual('red');
      expect(myTree.root.right.value).toEqual(16);
      expect(myTree.root.right.color).toEqual('red');

      expect(myTree.root.left.left.value).toEqual(4);
      expect(myTree.root.left.left.color).toEqual('black');
      expect(myTree.root.left.right).toBeNull();
      expect(myTree.root.right.left.value).toEqual(15);
      expect(myTree.root.right.left.color).toEqual('black');
      expect(myTree.root.right.right.value).toEqual(18);
      expect(myTree.root.right.right.color).toEqual('black');

      expect(myTree.root.left.left.left.value).toEqual(3);
      expect(myTree.root.left.left.left.color).toEqual('red');
      expect(myTree.root.left.left.right.value).toEqual(5);
      expect(myTree.root.left.left.right.color).toEqual('red');
      expect(myTree.root.right.right.right.value).toEqual(17);
      expect(myTree.root.right.right.right.color).toEqual('red');

      expect(myTree.allPathsAreValid()).toBe(true);
      expect(myTree.allParentPointersAreValid()).toBe(true);

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

  describe('getAllPaths helper function', () => {
    it('returns correct paths', () => {
      let myTree = new RedBlackTree();
      //          7     
      //        4   8  
      //      1   5  
      let a = new Node(7);
      let b = new Node(4);
      let c = new Node(8);
      let d = new Node(1);
      let e = new Node(5);

      myTree.root = a;
      a.left = b;
      a.right = c;
      b.left = d;
      b.right = e;

      const expected = [
        [a,b,d],
        [a,b,d],
        [a,b,e],
        [a,b,e],
        [a,c],
        [a,c],
      ];
      expect(myTree.generateAllPaths()).toEqual(expected);
    });
  });

  describe('allPathsAreValid helper function', () => {
    it('returns true on empty tree', () => {
      let myTree = new RedBlackTree();
      expect(myTree.allPathsAreValid()).toBe(true);
    });
    it('correctly returns false on invalid tree', () => {
      let myTree = new RedBlackTree();
      //          7aB     
      //        4bR   8cR  
      //      1dB
      let a = new Node(7);
      let b = new Node(4);
      let c = new Node(8);
      let d = new Node(1);

      a.color = 'black';
      b.color = 'red';
      c.color = 'red';
      d.color = 'black';

      myTree.root = a;
      a.left = b;
      a.right = c;
      b.left = d;

      const expected = false;
      expect(myTree.allPathsAreValid()).toBe(expected);
    });
    it('returns true on valid tree', () => {
      let myTree = new RedBlackTree();
      //          7aB     
      //        4bR   8cB  
      //      1dB   5eB  
      let a = new Node(7);
      let b = new Node(4);
      let c = new Node(8);
      let d = new Node(1);
      let e = new Node(5);

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
      let myTree = new RedBlackTree();
      expect(myTree.allParentPointersAreValid()).toBe(true);
    });
    it('returns true on valid tree', () => {
      let myTree = new RedBlackTree();
      //          7aB     
      //        4bR   8cR  
      //      1dB
      let a = new Node(7);
      let b = new Node(4);
      let c = new Node(8);
      let d = new Node(1);

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
      let myTree = new RedBlackTree();
      //          7aB     
      //        4bR   8cR  
      //      1dB
      let a = new Node(7);
      let b = new Node(4);
      let c = new Node(8);
      let d = new Node(1);

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
  });
});

