'use strict';

const SplayTree = require('../splay-tree.js');
const Node = require('../splay-tree-node.js');

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
    // it('fails on no arguments', () => {
    //   const myTree = new SplayTree();
    //   let result = myTree.insert();

    //   expect(myTree.root).toBeNull();
    //   expect(result).toBeUndefined();
    // });
    // it('fails on boolean input', () => {
    //   const myTree = new SplayTree();
    //   myTree.insert(true);
    //   let result = myTree.insert(false);

    //   expect(myTree.root).toBeNull();
    //   expect(result).toBeUndefined();
    // });
    // it('fails on string input', () => {
    //   const myTree = new SplayTree();
    //   myTree.insert('string');
    //   let result = myTree.insert('true');

    //   expect(myTree.root).toBeNull();
    //   expect(result).toBeUndefined();
    // });
    // it('succeeds on integer input', () => {
    //   const myTree = new SplayTree();
    //   let result = myTree.insert(1);

    //   expect(myTree.root).toBeInstanceOf(Node);
    //   expect(myTree.root.value).toEqual(1);
    //   expect(result).toBeInstanceOf(Node);
    //   expect(result.value).toBe(1);
    // });
    // it('succeeds on float input', () => {
    //   const myTree = new SplayTree();
    //   let result = myTree.insert(1.1);

    //   expect(myTree.root).toBeInstanceOf(Node);
    //   expect(myTree.root.value).toEqual(1.1);
    //   expect(result).toBeInstanceOf(Node);
    //   expect(result.value).toBe(1.1);
    // });
    // it('succeeds on negative number input', () => {
    //   const myTree = new SplayTree();
    //   let result = myTree.insert(-5);

    //   expect(myTree.root).toBeInstanceOf(Node);
    //   expect(myTree.root.value).toEqual(-5);
    //   expect(result).toBeInstanceOf(Node);
    //   expect(result.value).toBe(-5);
    // });
    // it('succeeds on integer input as string', () => {
    //   const myTree = new SplayTree();
    //   let result = myTree.insert('2');

    //   expect(myTree.root).toBeInstanceOf(Node);
    //   expect(myTree.root.value).toEqual(2);
    //   expect(result).toBeInstanceOf(Node);
    //   expect(result.value).toBe(2);
    // });
    // it('succeeds on float input as string', () => {
    //   const myTree = new SplayTree();
    //   let result = myTree.insert('2.2');

    //   expect(myTree.root).toBeInstanceOf(Node);
    //   expect(myTree.root.value).toEqual(2.2);
    //   expect(result).toBeInstanceOf(Node);
    //   expect(result.value).toBe(2.2);
    // });
    // it('succeeds on negative input as string', () => {
    //   const myTree = new SplayTree();
    //   let result = myTree.insert('-2');

    //   expect(myTree.root).toBeInstanceOf(Node);
    //   expect(myTree.root.value).toEqual(-2);
    //   expect(result.value).toBe(-2);
    // });

    it('classes allow manual tree construction', () => {
      //   5
      //  2
      const myTree = new SplayTree();
      let a = new Node(5);
      myTree.root = a;

      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toEqual(5);
    });

    it('correctly splays on 2 node tree, add left leaf', () => {
      //   5        2
      //  2    =>     5
      const myTree = new SplayTree();
      let a = new Node(5);
      myTree.root = a;

      let result = myTree.insert(2);

      expect(myTree.root.value).toEqual(2);
      expect(myTree.root.left).toBeNull();
      expect(myTree.root.right.value).toEqual(5);
    });
    it('correctly splays on 2 node tree, add right leaf', () => {
      //   5         7
      //     7  => 5    
      const myTree = new SplayTree();
      let a = new Node(5);
      myTree.root = a;

      let result = myTree.insert(7);

      expect(myTree.root.value).toEqual(7);
      expect(myTree.root.right).toBeNull();
      expect(myTree.root.left.value).toEqual(5);
    });

    it('correctly splays on 3 node tree, at root, zig zig left', () => {
      //   5         1
      //  2    =>     2 
      // 1             5
      const myTree = new SplayTree();
      let a = new Node(5);
      let b = new Node(2);
      a.left = b;
      myTree.root = a;

      let result = myTree.insert(1);

      expect(myTree.root.value).toEqual(1);
      expect(myTree.root.left).toBeNull();
      expect(myTree.root.right.value).toEqual(2);
      expect(myTree.root.right.right.value).toEqual(5);
    });
    it('correctly splays on 3 node tree, at root, zig zig right', () => {
      //  1          5
      //   2   =>   2 
      //    5      1   
      const myTree = new SplayTree();
      let a = new Node(1);
      let b = new Node(2);
      a.right = b;
      myTree.root = a;

      let result = myTree.insert(5);

      expect(myTree.root.value).toEqual(5);
      expect(myTree.root.right).toBeNull();
      expect(myTree.root.left.value).toEqual(2);
      expect(myTree.root.left.left.value).toEqual(1);
    });
    it('correctly splays on 3 node tree, at root, double left', () => {
      //   5          3
      //  2    =>   2   5
      //   3             
      const myTree = new SplayTree();
      let a = new Node(5);
      let b = new Node(2);
      a.left = b;
      myTree.root = a;

      let result = myTree.insert(3);

      expect(myTree.root.value).toEqual(3);
      expect(myTree.root.left.value).toEqual(2);
      expect(myTree.root.right.value).toEqual(5);
    });
    it('correctly splays on 3 node tree, at root, double right', () => {
      //   5            6
      //     7   =>   5   7
      //    6             
      const myTree = new SplayTree();
      let a = new Node(5);
      let b = new Node(7);
      a.right = b;
      myTree.root = a;

      let result = myTree.insert(6);

      expect(myTree.root.value).toEqual(6);
      expect(myTree.root.left.value).toEqual(5);
      expect(myTree.root.right.value).toEqual(7);
    });

    it('correctly splays on multi node tree, non root, zig zig left', () => {
      //        7         1
      //       6    =>        6 
      //      5            4     7
      //     4           2   5 
      //    3             3   
      //   2             
      //  1
      const myTree = new SplayTree();
      let a = new Node(7);
      let b = new Node(6);
      let c = new Node(5);
      let d = new Node(4);
      let e = new Node(3);
      let f = new Node(2);
      a.left = b;
      b.left = c;
      c.left = d;
      d.left = e;
      e.left = f;

      myTree.root = a;

      let result = myTree.insert(1);

      expect(myTree.root.value).toEqual(1);
      expect(myTree.root.left).toBeNull();
      expect(myTree.root.right.value).toEqual(6);

      expect(myTree.root.right.left.value).toEqual(4);
      expect(myTree.root.right.right.value).toEqual(7);

      expect(myTree.root.right.left.left.value).toEqual(2);
      expect(myTree.root.right.left.right.value).toEqual(5);

      expect(myTree.root.right.left.left.right.value).toEqual(3);
    });
    it('correctly splays on multi node tree, non root, double left', () => {
      //        7           2
      //       6    =>  1       6 
      //      5               4   7
      //     4               3  5 
      //    3               
      //   1             
      //    2
      const myTree = new SplayTree();
      let a = new Node(7);
      let b = new Node(6);
      let c = new Node(5);
      let d = new Node(4);
      let e = new Node(3);
      let f = new Node(1);
      a.left = b;
      b.left = c;
      c.left = d;
      d.left = e;
      e.left = f;

      myTree.root = a;

      let result = myTree.insert(2);

      expect(myTree.root.value).toEqual(2);

      expect(myTree.root.left.value).toEqual(1);
      expect(myTree.root.right.value).toEqual(6);

      expect(myTree.root.right.left.value).toEqual(4);
      expect(myTree.root.right.right.value).toEqual(7);

      expect(myTree.root.right.left.left.value).toEqual(3);
      expect(myTree.root.right.left.right.value).toEqual(5);
    });
    it('correctly splays on multi node tree, non root, double right', () => {
      //        7           2
      //       6    =>  1       6 
      //      5               4   7
      //     4               3  5 
      //    1               
      //      3             
      //     2
      const myTree = new SplayTree();
      let a = new Node(7);
      let b = new Node(6);
      let c = new Node(5);
      let d = new Node(4);
      let e = new Node(1);
      let f = new Node(3);
      a.left = b;
      b.left = c;
      c.left = d;
      d.left = e;
      e.right = f;

      myTree.root = a;

      let result = myTree.insert(2);

      expect(myTree.root.value).toEqual(2);

      expect(myTree.root.left.value).toEqual(1);
      expect(myTree.root.right.value).toEqual(6);

      expect(myTree.root.right.left.value).toEqual(4);
      expect(myTree.root.right.right.value).toEqual(7);

      expect(myTree.root.right.left.left.value).toEqual(3);
      expect(myTree.root.right.left.right.value).toEqual(5);
    });
    it('correctly splays on multi node tree, non root, zig zig right', () => {
      //        7           3
      //       6    =>   2     6 
      //      5        1     4   7
      //     4                5 
      //    1               
      //      2             
      //        3
      const myTree = new SplayTree();
      let a = new Node(7);
      let b = new Node(6);
      let c = new Node(5);
      let d = new Node(4);
      let e = new Node(1);
      let f = new Node(2);
      a.left = b;
      b.left = c;
      c.left = d;
      d.left = e;
      e.right = f;

      myTree.root = a;

      let result = myTree.insert(3);

      expect(myTree.root.value).toEqual(3);

      expect(myTree.root.left.value).toEqual(2);
      expect(myTree.root.right.value).toEqual(6);

      expect(myTree.root.left.left.value).toEqual(1);
      expect(myTree.root.right.left.value).toEqual(4);
      expect(myTree.root.right.right.value).toEqual(7);

      expect(myTree.root.right.left.right.value).toEqual(5);
    });

    
    it('correctly splays on multi node tree, non root, zig zig left', () => {
      //        7           2
      //       6    =>   1      6 
      //      5               5   7
      //     4              3    
      //    3                4   
      //   2             
      //  1
      const myTree = new SplayTree();
      let a = new Node(7);
      let b = new Node(6);
      let c = new Node(5);
      let d = new Node(1);
      let e = new Node(4);
      let f = new Node(3);
      a.left = b;
      b.left = c;
      c.left = d;
      d.right = e;
      e.left = f;

      myTree.root = a;

      let result = myTree.insert(2);

      expect(myTree.root.value).toEqual(2);
      expect(myTree.root.left.value).toEqual(1);
      expect(myTree.root.right.value).toEqual(6);

      expect(myTree.root.right.left.value).toEqual(5);
      expect(myTree.root.right.right.value).toEqual(7);

      expect(myTree.root.right.left.left.value).toEqual(3);

      expect(myTree.root.right.left.left.right.value).toEqual(4);
    });
    it('correctly splays on multi node tree, non root, double left', () => {
      //          5                3
      //       1                1     5
      //         4       =>      2   4   
      //        2               
      //         3             

      const myTree = new SplayTree();
      let a = new Node(5);
      let b = new Node(1);
      let c = new Node(4);
      let d = new Node(2);
      a.left = b;
      b.right = c;
      c.left = d;

      myTree.root = a;

      let result = myTree.insert(3);

      expect(myTree.root.value).toEqual(3);

      expect(myTree.root.left.value).toEqual(1);
      expect(myTree.root.right.value).toEqual(5);

      expect(myTree.root.left.right.value).toEqual(2);
      expect(myTree.root.right.left.value).toEqual(4);
    });
    it('correctly splays on multi node tree, non root, double left', () => {
      //     5                  8
      //       6              6   9  
      //         7    =>     5 7                
      //           9                       
      //          8                      

      const myTree = new SplayTree();
      let a = new Node(5);
      let b = new Node(6);
      let c = new Node(7);
      let d = new Node(9);
      a.right = b;
      b.right = c;
      c.right = d;

      myTree.root = a;

      let result = myTree.insert(8);

      expect(myTree.root.value).toEqual(8);

      expect(myTree.root.left.value).toEqual(6);
      expect(myTree.root.right.value).toEqual(9);

      expect(myTree.root.left.left.value).toEqual(5);
      expect(myTree.root.left.right.value).toEqual(7);
    });
    it('correctly splays on multi node tree, non root, double left', () => {
      //     5                  9
      //       6              6     
      //         7    =>    5   8                
      //           8           7             
      //             9                      

      const myTree = new SplayTree();
      let a = new Node(5);
      let b = new Node(6);
      let c = new Node(7);
      let d = new Node(8);
      a.right = b;
      b.right = c;
      c.right = d;

      myTree.root = a;

      let result = myTree.insert(9);

      expect(myTree.root.value).toEqual(9);

      expect(myTree.root.left.value).toEqual(6);
      expect(myTree.root.right).toBeNull();

      expect(myTree.root.left.left.value).toEqual(5);
      expect(myTree.root.left.right.value).toEqual(8);
      
      expect(myTree.root.left.right.left.value).toEqual(7);
    });
  });
});

