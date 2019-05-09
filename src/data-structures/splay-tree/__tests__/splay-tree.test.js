/* eslint-disable no-unused-vars */

'use strict';

const util = require('util');

const SplayTree = require('../splay-tree.js');
const Node = require('../splay-tree-node.js');

describe('splay tree delete stress test', () => {
  it('succeeds on many random deletes', () => {

    // generate random numbers
    console.log(`test`);
    let nums = [];
    while (nums.length < 10) {
      let num = Math.floor(Math.random()*100);
      if(!nums.includes(num)) {
        nums.push(num);
      }
    }
    console.log(`nums: `, nums);

    // insert tree and keep track of insert order
    const myTree = new SplayTree();
    const values = nums;
    let insertOrder = [];
    while (insertOrder.length < 10) {
      let randomIndex = Math.floor(Math.random()*10);
      if (myTree.insertWithoutSplay(values[randomIndex])) {
        insertOrder.push(values[randomIndex]);
      }
    }
    console.log(`insert order: `, insertOrder);

    expect( () => {
      let removeCount = 0;
      let removeOrder = [];
      while (myTree.root) {
        // pick a random value
        let randomIndex = Math.floor(Math.random()*10);
        let randomNumber = values[randomIndex];
        // remove it
        // if it doens't have the right amount of nodes, throw an error
        const result = myTree.remove(randomNumber);
        removeOrder.push(randomNumber);
        removeCount++;
        let inOrder = myTree.printInOrder();
        if (inOrder.length !== values.length - removeCount) {
          console.log(`insertOrder: `, insertOrder );
          console.log(`removeOrder: `, removeOrder );
          throw new Error;
        }
      }
    }).not.toThrow();
  });

  it('succeeds on remove non-root, non-leaf, random left, has no left child', () => {
    global.Math.random = () => 0.75;

    const myTree = new SplayTree();
    const values = [ 33, 51, 70, 5, 63, 20, 44, 36, 34, 80 ];
    for (let i = 0; i < values.length; i += 1) {
      myTree.insertWithoutSplay(values[i]);
    }
    console.log(`starter tree myTree.root: `, util.inspect(myTree.root, true, 10, true));

    const removedValues = [36, 44, 34, 34];

    for(let i = 0; i < removedValues.length; i++) {
      myTree.remove(removedValues[i]);
      console.log(`myTree.root: `, util.inspect(myTree.root, true, 10, true));
    }
  });

})

xdescribe('splay tree', () => {
  describe('constructor', () => {
    it('creates empty tree without error', () => {
      expect(() => {
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
      const result = myTree.insert();

      expect(myTree.root).toBeNull();
      expect(result).toBeUndefined();
    });
    it('fails on boolean input', () => {
      const myTree = new SplayTree();
      myTree.insert(true);
      const result = myTree.insert(false);

      expect(myTree.root).toBeNull();
      expect(result).toBeUndefined();
    });
    it('fails on string input', () => {
      const myTree = new SplayTree();
      myTree.insert('string');
      const result = myTree.insert('true');

      expect(myTree.root).toBeNull();
      expect(result).toBeUndefined();
    });
    it('succeeds on integer input', () => {
      const myTree = new SplayTree();
      const result = myTree.insert(1);

      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toEqual(1);
      expect(result).toBeInstanceOf(Node);
      expect(result.value).toBe(1);
    });
    it('succeeds on float input', () => {
      const myTree = new SplayTree();
      const result = myTree.insert(1.1);

      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toEqual(1.1);
      expect(result).toBeInstanceOf(Node);
      expect(result.value).toBe(1.1);
    });
    it('succeeds on negative number input', () => {
      const myTree = new SplayTree();
      const result = myTree.insert(-5);

      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toEqual(-5);
      expect(result).toBeInstanceOf(Node);
      expect(result.value).toBe(-5);
    });
    it('succeeds on integer input as string', () => {
      const myTree = new SplayTree();
      const result = myTree.insert('2');

      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toEqual(2);
      expect(result).toBeInstanceOf(Node);
      expect(result.value).toBe(2);
    });
    it('succeeds on float input as string', () => {
      const myTree = new SplayTree();
      const result = myTree.insert('2.2');

      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toEqual(2.2);
      expect(result).toBeInstanceOf(Node);
      expect(result.value).toBe(2.2);
    });
    it('succeeds on negative input as string', () => {
      const myTree = new SplayTree();
      const result = myTree.insert('-2');

      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toEqual(-2);
      expect(result.value).toBe(-2);
    });

    it('classes allow manual tree construction', () => {
      //   5
      //  2
      const myTree = new SplayTree();
      const a = new Node(5);
      myTree.root = a;

      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toEqual(5);
    });

    it('returns undefined on duplicate vaule, does not splay', () => {
      //   5
      //  2
      const myTree = new SplayTree();
      myTree.insertWithoutSplay(5);
      myTree.insertWithoutSplay(2);

      const result = myTree.insert(2);

      expect(myTree.root.value).toEqual(5);
      expect(myTree.root.left.value).toEqual(2);
      expect(myTree.root.right).toBeNull();
      expect(result).toBeUndefined();
    });

    it('correctly splays on 2 node tree, add left leaf', () => {
      //   5        2
      //  2    =>     5
      const myTree = new SplayTree();
      const a = new Node(5);
      myTree.root = a;

      const result = myTree.insert(2);

      expect(myTree.root.value).toEqual(2);
      expect(myTree.root.left).toBeNull();
      expect(myTree.root.right.value).toEqual(5);
    });
    it('correctly splays on 2 node tree, add right leaf', () => {
      //   5         7
      //     7  => 5
      const myTree = new SplayTree();
      const a = new Node(5);
      myTree.root = a;

      const result = myTree.insert(7);

      expect(myTree.root.value).toEqual(7);
      expect(myTree.root.right).toBeNull();
      expect(myTree.root.left.value).toEqual(5);
    });

    it('correctly splays on 3 node tree, at root, zig zig left', () => {
      //   5         1
      //  2    =>     2
      // 1             5
      const myTree = new SplayTree();
      const a = new Node(5);
      const b = new Node(2);
      a.left = b;
      myTree.root = a;

      const result = myTree.insert(1);

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
      const a = new Node(1);
      const b = new Node(2);
      a.right = b;
      myTree.root = a;

      const result = myTree.insert(5);

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
      const a = new Node(5);
      const b = new Node(2);
      a.left = b;
      myTree.root = a;

      const result = myTree.insert(3);

      expect(myTree.root.value).toEqual(3);
      expect(myTree.root.left.value).toEqual(2);
      expect(myTree.root.right.value).toEqual(5);
    });
    it('correctly splays on 3 node tree, at root, double right', () => {
      //   5            6
      //     7   =>   5   7
      //    6
      const myTree = new SplayTree();
      const a = new Node(5);
      const b = new Node(7);
      a.right = b;
      myTree.root = a;

      const result = myTree.insert(6);

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
      const a = new Node(7);
      const b = new Node(6);
      const c = new Node(5);
      const d = new Node(4);
      const e = new Node(3);
      const f = new Node(2);
      a.left = b;
      b.left = c;
      c.left = d;
      d.left = e;
      e.left = f;

      myTree.root = a;

      const result = myTree.insert(1);

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
      const a = new Node(7);
      const b = new Node(6);
      const c = new Node(5);
      const d = new Node(4);
      const e = new Node(3);
      const f = new Node(1);
      a.left = b;
      b.left = c;
      c.left = d;
      d.left = e;
      e.left = f;

      myTree.root = a;

      const result = myTree.insert(2);

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
      const a = new Node(7);
      const b = new Node(6);
      const c = new Node(5);
      const d = new Node(4);
      const e = new Node(1);
      const f = new Node(3);
      a.left = b;
      b.left = c;
      c.left = d;
      d.left = e;
      e.right = f;

      myTree.root = a;

      const result = myTree.insert(2);

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
      const a = new Node(7);
      const b = new Node(6);
      const c = new Node(5);
      const d = new Node(4);
      const e = new Node(1);
      const f = new Node(2);
      a.left = b;
      b.left = c;
      c.left = d;
      d.left = e;
      e.right = f;

      myTree.root = a;

      const result = myTree.insert(3);

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
      const a = new Node(7);
      const b = new Node(6);
      const c = new Node(5);
      const d = new Node(1);
      const e = new Node(4);
      const f = new Node(3);
      a.left = b;
      b.left = c;
      c.left = d;
      d.right = e;
      e.left = f;

      myTree.root = a;

      const result = myTree.insert(2);

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
      const a = new Node(5);
      const b = new Node(1);
      const c = new Node(4);
      const d = new Node(2);
      a.left = b;
      b.right = c;
      c.left = d;

      myTree.root = a;

      const result = myTree.insert(3);

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
      const a = new Node(5);
      const b = new Node(6);
      const c = new Node(7);
      const d = new Node(9);
      a.right = b;
      b.right = c;
      c.right = d;

      myTree.root = a;

      const result = myTree.insert(8);

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
      const a = new Node(5);
      const b = new Node(6);
      const c = new Node(7);
      const d = new Node(8);
      a.right = b;
      b.right = c;
      c.right = d;

      myTree.root = a;

      const result = myTree.insert(9);

      expect(myTree.root.value).toEqual(9);

      expect(myTree.root.left.value).toEqual(6);
      expect(myTree.root.right).toBeNull();

      expect(myTree.root.left.left.value).toEqual(5);
      expect(myTree.root.left.right.value).toEqual(8);

      expect(myTree.root.left.right.left.value).toEqual(7);
    });

    it('handles 100 random generic case', () => {
      const myTree = new SplayTree();

      for (let i = 0; i < 100; i += 1) {
        expect(() => {
          let insertValues = [];

          for(let i = 0; i < 100; i++) {
            let num = Math.floor(Math.random() * 10 * 10);
            insertValues.push(num);
            myTree.insert(num);
          }

          myTree.printInOrder();
        }).not.toThrow();
      }
    });
  });

  describe('insertWithoutSplay', () => {
    it('fails on no arguments', () => {
      const myTree = new SplayTree();
      const result = myTree.insert();

      expect(myTree.root).toBeNull();
      expect(result).toBeUndefined();
    });
    it('fails on boolean input', () => {
      const myTree = new SplayTree();
      myTree.insert(true);
      const result = myTree.insert(false);

      expect(myTree.root).toBeNull();
      expect(result).toBeUndefined();
    });
    it('fails on string input', () => {
      const myTree = new SplayTree();
      myTree.insert('string');
      const result = myTree.insert('true');

      expect(myTree.root).toBeNull();
      expect(result).toBeUndefined();
    });
    it('succeeds on integer input', () => {
      const myTree = new SplayTree();
      const result = myTree.insert(1);

      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toEqual(1);
      expect(result).toBeInstanceOf(Node);
      expect(result.value).toBe(1);
    });
    it('succeeds on float input', () => {
      const myTree = new SplayTree();
      const result = myTree.insert(1.1);

      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toEqual(1.1);
      expect(result).toBeInstanceOf(Node);
      expect(result.value).toBe(1.1);
    });
    it('succeeds on negative number input', () => {
      const myTree = new SplayTree();
      const result = myTree.insert(-5);

      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toEqual(-5);
      expect(result).toBeInstanceOf(Node);
      expect(result.value).toBe(-5);
    });
    it('succeeds on integer input as string', () => {
      const myTree = new SplayTree();
      const result = myTree.insert('2');

      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toEqual(2);
      expect(result).toBeInstanceOf(Node);
      expect(result.value).toBe(2);
    });
    it('succeeds on float input as string', () => {
      const myTree = new SplayTree();
      const result = myTree.insert('2.2');

      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toEqual(2.2);
      expect(result).toBeInstanceOf(Node);
      expect(result.value).toBe(2.2);
    });
    it('succeeds on negative input as string', () => {
      const myTree = new SplayTree();
      const result = myTree.insert('-2');

      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toEqual(-2);
      expect(result.value).toBe(-2);
    });
    it('works with 0 node tree', () => {
      const myTree = new SplayTree();
      const result = myTree.insertWithoutSplay(1);

      expect(myTree.root.value).toEqual(1);
      expect(myTree.root).toBe(result);
    });
    it('works with 1 node tree, left leaf', () => {
      const myTree = new SplayTree();
      myTree.insertWithoutSplay(1);
      const result = myTree.insertWithoutSplay(0);

      expect(myTree.root.value).toEqual(1);
      expect(myTree.root.left.value).toEqual(0);
      expect(myTree.root.left).toBe(result);
    });
    it('works with 1 node tree, right leaf', () => {
      const myTree = new SplayTree();
      myTree.insertWithoutSplay(1);
      const result = myTree.insertWithoutSplay(2);

      expect(myTree.root.value).toEqual(1);
      expect(myTree.root.left).toBeNull();
      expect(myTree.root.right).toBe(result);
      expect(myTree.root.right.value).toEqual(2);
    });
    it('works with multiple nodes', () => {
      //        10
      //     5      15
      //   0   7  12  18
      const myTree = new SplayTree();
      const a = myTree.insertWithoutSplay(10);
      const b = myTree.insertWithoutSplay(5);
      const c = myTree.insertWithoutSplay(15);
      const d = myTree.insertWithoutSplay(0);
      const e = myTree.insertWithoutSplay(7);
      const f = myTree.insertWithoutSplay(12);
      const g = myTree.insertWithoutSplay(18);

      expect(myTree.root).toEqual(a);

      expect(myTree.root.left).toEqual(b);
      expect(myTree.root.right).toEqual(c);

      expect(myTree.root.left.left).toEqual(d);
      expect(myTree.root.left.right).toEqual(e);
      expect(myTree.root.right.left).toEqual(f);
      expect(myTree.root.right.right).toEqual(g);

      expect(a.value).toBe(10);
      expect(b.value).toBe(5);
      expect(c.value).toBe(15);
      expect(d.value).toBe(0);
      expect(e.value).toBe(7);
      expect(f.value).toBe(12);
      expect(g.value).toBe(18);
    });
  });

  describe('remove', () => {
    it('fails given no parameters', () => {
      const myTree = new SplayTree();

      myTree.insertWithoutSplay(5);

      const result = myTree.remove();
      expect(result).toBeUndefined();
      expect(myTree.root.value).toBe(5);
    });
    it('fails on empty tree', () => {
      const myTree = new SplayTree();

      const result = myTree.remove();
      expect(result).toBeUndefined();
      expect(myTree.root).toBeNull();
    });
    it('succeeds on remove root of 1 node tree', () => {
      const myTree = new SplayTree();
      myTree.insertWithoutSplay(2);

      const result = myTree.remove(2);
      const expected = new Node(2);

      expect(result).toEqual(expected);
      expect(myTree.root).toBeNull();
    });
    it('succeeds on remove root of 2 node tree, leaf to left', () => {
      const myTree = new SplayTree();
      const a = myTree.insertWithoutSplay(2);
      const b = myTree.insertWithoutSplay(1);

      const result = myTree.remove(2);
      const expected = a;

      expect(result).toEqual(expected);
      expect(myTree.root).toBe(b);
    });
    it('succeeds on remove root of 2 node tree, leaf to right', () => {
      const myTree = new SplayTree();
      const a = myTree.insertWithoutSplay(2);
      const b = myTree.insertWithoutSplay(3);

      const result = myTree.remove(2);
      const expected = a;

      expect(result).toEqual(expected);
      expect(myTree.root).toBe(b);
    });
    it('succeeds on remove root of 3 node tree, balanced, random left', () => {
      global.Math.random = () => 0.75;

      //     2             1
      //  1     3    =>       3
      const myTree = new SplayTree();
      const a = myTree.insertWithoutSplay(2);
      const b = myTree.insertWithoutSplay(1);
      const c = myTree.insertWithoutSplay(3);

      const result = myTree.remove(2);
      const expected = a;

      const expectedTree = new SplayTree();
      expectedTree.insertWithoutSplay(1);
      expectedTree.insertWithoutSplay(3);

      expect(result).toBe(expected);
      expect(myTree).toEqual(expectedTree);
    });
    it('succeeds on remove root of 3 node tree, balanced, random right', () => {
      global.Math.random = () => 0.25;

      //     2              3
      //  1     3    =>  1
      const myTree = new SplayTree();
      const a = myTree.insertWithoutSplay(2);
      const b = myTree.insertWithoutSplay(1);
      const c = myTree.insertWithoutSplay(3);

      const result = myTree.remove(2);
      const expected = a;

      const expectedTree = new SplayTree();
      expectedTree.insertWithoutSplay(3);
      expectedTree.insertWithoutSplay(1);

      expect(result).toBe(expected);
      expect(myTree).toEqual(expectedTree);
    });

    it('succeeds on remove leaf of 2 node tree, leaf to left', () => {
      //     2              2
      //  1         =>
      const myTree = new SplayTree();
      const a = myTree.insertWithoutSplay(2);
      const b = myTree.insertWithoutSplay(1);

      const result = myTree.remove(1);
      const expected = b;

      const expectedTree = new SplayTree();
      expectedTree.insertWithoutSplay(2);

      expect(result).toEqual(expected);
      expect(myTree).toEqual(expectedTree);
    });

    it('succeeds on remove leaf of 2 node tree, leaf to right', () => {
      //     2              2
      //       3     =>
      const myTree = new SplayTree();
      const a = myTree.insertWithoutSplay(2);
      const b = myTree.insertWithoutSplay(3);

      const result = myTree.remove(3);
      const expected = b;

      const expectedTree = new SplayTree();
      expectedTree.insertWithoutSplay(2);

      expect(result).toEqual(expected);
      expect(myTree).toEqual(expectedTree);
    });

    it('succeeds on remove leaf of 3 node tree, leaf to left', () => {
      //     2              2
      //   1   3     =>       3
      const myTree = new SplayTree();
      const a = myTree.insertWithoutSplay(2);
      const b = myTree.insertWithoutSplay(1);
      const c = myTree.insertWithoutSplay(3);

      const result = myTree.remove(1);
      const expected = b;

      const expectedTree = new SplayTree();
      expectedTree.insertWithoutSplay(2);
      expectedTree.insertWithoutSplay(3);

      expect(result).toEqual(expected);
      expect(myTree).toEqual(expectedTree);
    });
    it('succeeds on remove leaf of 3 node tree, leaf to right', () => {
      //     2              2
      //   1   3     =>   1
      const myTree = new SplayTree();
      const a = myTree.insertWithoutSplay(2);
      const b = myTree.insertWithoutSplay(1);
      const c = myTree.insertWithoutSplay(3);

      const result = myTree.remove(3);
      const expected = c;

      const expectedTree = new SplayTree();
      expectedTree.insertWithoutSplay(2);
      expectedTree.insertWithoutSplay(1);

      expect(result).toEqual(expected);
      expect(myTree).toEqual(expectedTree);
    });

    it('succeeds on remove leaf, a 2 deep single child to the left', () => {
      const myTree = new SplayTree();
      const a = myTree.insertWithoutSplay(5);
      const b = myTree.insertWithoutSplay(3);
      const c = myTree.insertWithoutSplay(7);
      const d = myTree.insertWithoutSplay(2);

      //       5           3
      //     3   7  =>       5
      //   2                   7
      const result = myTree.remove(2);
      const expected = d;

      const expectedTree = new SplayTree();
      const expectedTreeValues = [3, 5, 7];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insertWithoutSplay(expectedTreeValues[i]);
      }

      expect(myTree).toEqual(expectedTree);
      expect(result).toEqual(expected);
    });
    it('succeeds on remove leaf, a 2 deep single child to the right', () => {
      const myTree = new SplayTree();
      const a = myTree.insertWithoutSplay(5);
      const b = myTree.insertWithoutSplay(3);
      const c = myTree.insertWithoutSplay(7);
      const d = myTree.insertWithoutSplay(4);
      //       5            3
      //     3   7   =>       5
      //      4                 7
      const result = myTree.remove(4);
      const expected = d;

      const expectedTree = new SplayTree();
      const expectedTreeValues = [3, 5, 7];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insertWithoutSplay(expectedTreeValues[i]);
      }

      expect(myTree).toEqual(expectedTree);
      expect(result).toEqual(expected);
    });


    it('succeeds on remove node with 2 leaf-children, random left', () => {
      global.Math.random = () => 0.75;

      //       5             5
      //     3   7   =>    2   7
      //    2 4             4
      const myTree = new SplayTree();
      const values = [5, 3, 7, 2, 4];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insertWithoutSplay(values[i]);
      }

      const result = myTree.remove(3);
      const expected = new Node(3);

      const expectedTree = new SplayTree();
      const expectedTreeValues = [5, 2, 7, 4];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insertWithoutSplay(expectedTreeValues[i]);
      }
      expect(myTree).toEqual(expectedTree);
      expect(result).toEqual(expected);
    });
    it('succeeds on remove node with 2 leaf-children, random right', () => {
      global.Math.random = () => 0.25;

      //       5             5
      //     3   7   =>    4   7
      //    2 4           2
      const myTree = new SplayTree();
      const values = [5, 3, 7, 2, 4];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insertWithoutSplay(values[i]);
      }

      const result = myTree.remove(3);
      const expected = new Node(3);

      const expectedTree = new SplayTree();
      const expectedTreeValues = [5, 4, 7, 2];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insertWithoutSplay(expectedTreeValues[i]);
      }

      expect(myTree).toEqual(expectedTree);
      expect(result).toEqual(expected);
    });

    it('succeeds on remove node with 2 children, random left, left child has 2 leaf children', () => {
      global.Math.random = () => 0.75;

      const myTree = new SplayTree();
      //       10                  10
      //     5    12   =>        4    12
      //   3   8               3   8
      //  1 4 7 9             1   7 9
      const values = [10, 5, 12, 3, 8, 1, 4, 7, 9];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insertWithoutSplay(values[i]);
      }

      const removedValue = 5;
      const result = myTree.remove(removedValue);
      const expected = new Node(removedValue);

      const expectedTree = new SplayTree();
      const expectedTreeValues = [10, 4, 12, 3, 8, 1, 7, 9];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insertWithoutSplay(expectedTreeValues[i]);
      }

      expect(myTree).toEqual(expectedTree);
      expect(result).toEqual(expected);
    });
    it('succeeds on remove node with 2 children, random right, right child has 2 leaf children', () => {
      global.Math.random = () => 0.25;

      const myTree = new SplayTree();
      //       10                  10
      //     5    12   =>        7    12
      //   3   8               3   8
      //  1 4 7 9             1 4   9
      const values = [10, 5, 12, 3, 8, 1, 4, 7, 9];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insertWithoutSplay(values[i]);
      }

      const removedValue = 5;
      const result = myTree.remove(removedValue);
      const expected = new Node(removedValue);

      const expectedTree = new SplayTree();
      const expectedTreeValues = [10, 7, 12, 3, 8, 1, 4, 9];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insertWithoutSplay(expectedTreeValues[i]);
      }

      expect(myTree).toEqual(expectedTree);
      expect(result).toEqual(expected);
    });

    it('succeeds on remove node with 2 children, random left, left child has 1 left leaf child', () => {
      global.Math.random = () => 0.75;

      const myTree = new SplayTree();
      //       10                10
      //     5    12   =>      3    12
      //   3   8             1   8
      //  1   7 9               7 9
      const values = [10, 5, 12, 3, 8, 1, 7, 9];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insertWithoutSplay(values[i]);
      }

      const removedValue = 5;
      const result = myTree.remove(removedValue);
      const expected = new Node(removedValue);

      const expectedTree = new SplayTree();
      const expectedTreeValues = [10, 3, 12, 1, 8, 7, 9];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insertWithoutSplay(expectedTreeValues[i]);
      }

      expect(myTree).toEqual(expectedTree);
      expect(result).toEqual(expected);
    });
    it('succeeds on remove node with 2 children, random right, right child has 1 right leaf child', () => {
      global.Math.random = () => 0.25;

      const myTree = new SplayTree();
      //       10
      //     5    12
      //   3   8
      //  1 4    9
      const values = [10, 5, 12, 3, 8, 1, 4, 9];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insertWithoutSplay(values[i]);
      }

      const removedValue = 5;
      const result = myTree.remove(removedValue);
      const expected = new Node(removedValue);

      //       10
      //     8    12
      //   3   9
      //  1 4
      const expectedTree = new SplayTree();
      const expectedTreeValues = [10, 8, 12, 3, 9, 1, 4];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insertWithoutSplay(expectedTreeValues[i]);
      }

      expect(myTree).toEqual(expectedTree);
      expect(result).toEqual(expected);
    });

    it('succeeds on remove node with 2 children, random left, left child has 1 right leaf child', () => {
      global.Math.random = () => 0.75;

      const myTree = new SplayTree();
      //       10                 10
      //     5    12    =>      4    12
      //   3   8              3   8
      //    4 7 9                7 9
      const values = [10, 5, 12, 3, 8, 4, 7, 9];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insertWithoutSplay(values[i]);
      }

      const removedValue = 5;
      const result = myTree.remove(removedValue);
      const expected = new Node(removedValue);

      const expectedTree = new SplayTree();
      const expectedTreeValues = [10, 4, 12, 3, 8, 7, 9];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insertWithoutSplay(expectedTreeValues[i]);
      }

      expect(myTree).toEqual(expectedTree);
      expect(result).toEqual(expected);
    });
    it('succeeds on remove node with 2 children, random right, right child has 1 left leaf child', () => {
      global.Math.random = () => 0.25;

      const myTree = new SplayTree();
      //       10
      //     5    12
      //   3   8
      //  1 4 7
      const values = [10, 5, 12, 3, 8, 1, 4, 7];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insertWithoutSplay(values[i]);
      }

      const removedValue = 5;
      const result = myTree.remove(removedValue);
      const expected = new Node(removedValue);

      //       10
      //     7    12
      //   3   8
      //  1 4
      const expectedTree = new SplayTree();
      const expectedTreeValues = [10, 7, 12, 3, 8, 1, 4];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insertWithoutSplay(expectedTreeValues[i]);
      }

      expect(myTree).toEqual(expectedTree);
      expect(result).toEqual(expected);
    });

    it('succeeds on remove node with 2 children, random left, left child is a full sub tree h=2', () => {
      global.Math.random = () => 0.75;

      const myTree = new SplayTree();
      //                               20
      //             10                              25
      //       5            15
      //    1    7       12      17
      //  0  2  6  8   11  14  16   18
      const values = [20, 10, 25, 5, 15, 1, 7, 12, 17, 0, 2, 6, 8, 11, 14, 16, 18];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insertWithoutSplay(values[i]);
      }

      const removedValue = 10;
      const result = myTree.remove(removedValue);
      const expected = new Node(removedValue);

      //                               20
      //             8                              25
      //       5            15
      //    1    7       12      17
      //  0  2  6      11  14  16   18
      const expectedTree = new SplayTree();
      const expectedTreeValues = [20, 8, 25, 5, 15, 1, 7, 12, 17, 0, 2, 6, 11, 14, 16, 18];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insertWithoutSplay(expectedTreeValues[i]);
      }

      expect(myTree).toEqual(expectedTree);
      expect(result).toEqual(expected);
    });
    it('succeeds on remove node with 2 children, random right, right child is a full sub tree h=2', () => {
      global.Math.random = () => 0.25;

      const myTree = new SplayTree();
      //                               20
      //             10                              25
      //       5            15
      //    1    7       12      17
      //  0  2  6  8   11  14  16   18
      const values = [20, 10, 25, 5, 15, 1, 7, 12, 17, 0, 2, 6, 8, 11, 14, 16, 18];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insertWithoutSplay(values[i]);
      }

      const removedValue = 10;
      const result = myTree.remove(removedValue);
      const expected = new Node(removedValue);

      //                               20
      //             11                              25
      //       5            15
      //    1    7       12      17
      //  0  2  6  8       14  16   18
      const expectedTree = new SplayTree();
      const expectedTreeValues = [20, 11, 25, 5, 15, 1, 7, 12, 17, 0, 2, 6, 8, 14, 16, 18];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insertWithoutSplay(expectedTreeValues[i]);
      }

      expect(myTree).toEqual(expectedTree);
      expect(result).toEqual(expected);
    });

    it('succeeds on remove node with 2 children, random left, left child is a sub tree h=3, replacement node has child', () => {
      global.Math.random = () => 0.75;

      const myTree = new SplayTree();
      //                               20
      //             10                              25
      //       5            15
      //    1    7       12      17
      //  0  2  6  9   11  14  16   18
      //          8
      const values = [20, 10, 25, 5, 15, 1, 7, 12, 17, 0, 2, 6, 9, 11, 14, 16, 18, 8];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insertWithoutSplay(values[i]);
      }

      const removedValue = 10;
      const result = myTree.remove(removedValue);
      const expected = new Node(removedValue);

      //                               20
      //             9                               25
      //       5            15
      //    1    7       12      17
      //  0  2  6  8   11  14  16   18
      //
      const expectedTree = new SplayTree();
      const expectedTreeValues = [20, 9, 25, 5, 15, 1, 7, 12, 17, 0, 2, 6, 8, 11, 14, 16, 18];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insertWithoutSplay(expectedTreeValues[i]);
      }

      expect(myTree).toEqual(expectedTree);
      expect(result).toEqual(expected);
    });
    it('succeeds on remove node with 2 children, random right, right child is a sub tree h=3, replacement node has child', () => {
      global.Math.random = () => 0.25;

      const myTree = new SplayTree();
      //                               20
      //             10                              25
      //       5            15
      //    1    7       13      17
      //  0  2  6  9   11  14  16   18
      //                 12
      const values = [20, 10, 25, 5, 15, 1, 7, 13, 17, 0, 2, 6, 9, 11, 14, 16, 18, 12];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insertWithoutSplay(values[i]);
      }

      const removedValue = 10;
      const result = myTree.remove(removedValue);
      const expected = new Node(removedValue);

      //                               20
      //             11                              25
      //       5            15
      //    1    7       13      17
      //  0  2  6  9   12  14  16   18
      //
      const expectedTree = new SplayTree();
      const expectedTreeValues = [20, 11, 25, 5, 15, 1, 7, 13, 17, 0, 2, 6, 9, 12, 14, 16, 18];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insertWithoutSplay(expectedTreeValues[i]);
      }

      expect(myTree).toEqual(expectedTree);
      expect(result).toEqual(expected);
    });

    it('succeeds on remove node (depth=2) with 2 children, random left, left child is a sub tree', () => {
      global.Math.random = () => 0.75;

      const myTree = new SplayTree();
      //                               20
      //             10                              25
      //       5            15
      //    1    7       12      17
      //  0  2  6  9   11  14  16   18
      const values = [20, 10, 25, 5, 15, 1, 7, 12, 17, 0, 2, 6, 9, 11, 14, 16, 18];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insertWithoutSplay(values[i]);
      }

      const removedValue = 5;
      const result = myTree.remove(removedValue);
      const expected = new Node(removedValue);

      //                        10
      //            2                          20
      //       1        7                  15        25
      //     0        6   9            12      17
      //                             11  14  16  18
      const expectedTree = new SplayTree();
      const expectedTreeValues = [10, 2, 20, 1, 7, 15, 25, 0, 6, 9, 12, 17, 11, 14, 16, 18];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insertWithoutSplay(expectedTreeValues[i]);
      }

      expect(myTree).toEqual(expectedTree);
      expect(result).toEqual(expected);
    });
    it('succeeds on remove node (depth=2) with 2 children, random right, right child is a sub tree', () => {
      global.Math.random = () => 0.25;

      const myTree = new SplayTree();
      //                               20
      //             10                              25
      //       5            15
      //    1    7       12      17
      //  0  2  6  9   11  14  16   18
      const values = [20, 10, 25, 5, 15, 1, 7, 12, 17, 0, 2, 6, 9, 11, 14, 16, 18];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insertWithoutSplay(values[i]);
      }

      const removedValue = 5;
      const result = myTree.remove(removedValue);
      const expected = new Node(removedValue);

      //                        10
      //            6                          20
      //       1        7                  15        25
      //     0  2         9            12      17
      //                             11  14  16  18
      const expectedTree = new SplayTree();
      const expectedTreeValues = [10, 6, 20, 1, 7, 15, 25, 0, 2, 9, 12, 17, 11, 14, 16, 18];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insertWithoutSplay(expectedTreeValues[i]);
      }

      expect(myTree).toEqual(expectedTree);
      expect(result).toEqual(expected);
    });

    it('succeeds on remove node (depth=2) with 2 children, random left, left child is a sub tree, replacement node has right child', () => {
      global.Math.random = () => 0.75;

      const myTree = new SplayTree();
      //                               20
      //             10                              25
      //       4            15
      //    1    7       12      17
      //  0  3  5  9   11  14  16   18
      //    2    6
      const values = [20, 10, 25, 4, 15, 1, 7, 12, 17, 0, 3, 5, 9, 11, 14, 16, 18, 2, 6];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insertWithoutSplay(values[i]);
      }

      const removedValue = 4;
      const result = myTree.remove(removedValue);
      const expected = new Node(removedValue);

      //                        10
      //            3                          20
      //       1        7                  15        25
      //     0  2      5  9            12      17
      //                6            11  14  16  18
      const expectedTree = new SplayTree();
      const expectedTreeValues = [10, 3, 20, 1, 7, 15, 25, 0, 2, 5, 9, 12, 17, 6, 11, 14, 16, 18];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insertWithoutSplay(expectedTreeValues[i]);
      }

      expect(myTree).toEqual(expectedTree);
      expect(result).toEqual(expected);
    });
    it('succeeds on remove node (depth=2) with 2 children, random right, right child is a sub tree, replacement node has right child', () => {
      global.Math.random = () => 0.25;

      const myTree = new SplayTree();
      //                               20
      //             10                              25
      //       4            15
      //    1    7       12      17
      //  0  2  5  9   11  14  16   18
      //         6
      const values = [20, 10, 25, 4, 15, 1, 7, 12, 17, 0, 2, 5, 9, 11, 14, 16, 18, 6];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insertWithoutSplay(values[i]);
      }

      const removedValue = 4;
      const result = myTree.remove(removedValue);
      const expected = new Node(removedValue);

      //                        10
      //            5                          20
      //       1        7                  15        25
      //     0  2      6  9            12      17
      //                             11  14  16  18
      const expectedTree = new SplayTree();
      const expectedTreeValues = [10, 5, 20, 1, 7, 15, 25, 0, 2, 6, 9, 12, 17, 11, 14, 16, 18];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insertWithoutSplay(expectedTreeValues[i]);
      }

      expect(myTree).toEqual(expectedTree);
      expect(result).toEqual(expected);
    });

    it('succeeds on remove non-root, non-leaf, random left, has no left child', () => {
      global.Math.random = () => 0.75;

      const myTree = new SplayTree();
      //        10              5
      //      5       =>      1   10
      //    3
      //  1
      const values = [10, 5, 3, 1];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insertWithoutSplay(values[i]);
      }

      const removedValue = 3;
      const result = myTree.remove(removedValue);
      const expected = new Node(removedValue);

      const expectedTree = new SplayTree();
      const expectedTreeValues = [5, 1, 10];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insertWithoutSplay(expectedTreeValues[i]);
      }

      expect(myTree).toEqual(expectedTree);
      expect(result).toEqual(expected);
    });
    it('succeeds on remove non-root, non-leaf, random left, has no left child', () => {
      global.Math.random = () => 0.75;

      const myTree = new SplayTree();
      //        10                      12
      //           12          =>    10    16
      //              14
      //                 16
      const values = [10, 12, 14, 16];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insertWithoutSplay(values[i]);
      }

      const removedValue = 14;
      const result = myTree.remove(removedValue);
      const expected = new Node(removedValue);

      const expectedTree = new SplayTree();
      const expectedTreeValues = [12, 10, 16];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insertWithoutSplay(expectedTreeValues[i]);
      }

      expect(myTree).toEqual(expectedTree);
      expect(result).toEqual(expected);
    });

  });

  describe('contains', () => {
    it('returns undefined given undefined', () => {
      const myTree = new SplayTree();

      const result = myTree.contains();

      expect(result).toBeUndefined();
      expect(myTree.root).toBe(null);
    });
    it('returns false on empty tree with valid input', () => {
      const myTree = new SplayTree();

      // myTree.insertWithoutSplay(2);

      const result = myTree.contains(2);

      expect(result).toBe(false);
      expect(myTree.root).toBeNull();
    });
    it('returns true on 1 node tree with valid input', () => {
      const myTree = new SplayTree();

      myTree.insertWithoutSplay(2);

      const result = myTree.contains(2);

      expect(result).toBe(true);
      expect(myTree.root.value).toEqual(2);
    });
    it('returns true on 2 node tree, find left leaf', () => {
      //     2    =>    1
      //    1             2
      const myTree = new SplayTree();

      myTree.insertWithoutSplay(2);
      myTree.insertWithoutSplay(1);

      const result = myTree.contains(1);

      expect(result).toBe(true);
      expect(myTree.root.value).toEqual(1);
      expect(myTree.root.left).toBeNull();
      expect(myTree.root.right.value).toEqual(2);
    });
    it('returns true on 2 node tree, find right leaf', () => {
      //     2    =>     3
      //      3        2
      const myTree = new SplayTree();

      myTree.insertWithoutSplay(2);
      myTree.insertWithoutSplay(3);

      const result = myTree.contains(3);

      expect(result).toBe(true);
      expect(myTree.root.value).toEqual(3);
      expect(myTree.root.right).toBeNull();
      expect(myTree.root.left.value).toEqual(2);
    });
    it('returns true on 3 node tree, find left leaf', () => {
      //     2    =>     0
      //   1               1
      // 0                   2
      const myTree = new SplayTree();

      myTree.insertWithoutSplay(2);
      myTree.insertWithoutSplay(1);
      myTree.insertWithoutSplay(0);

      const result = myTree.contains(0);

      expect(result).toBe(true);
      expect(myTree.root.value).toEqual(0);
      expect(myTree.root.left).toBeNull();
      expect(myTree.root.right.value).toEqual(1);
      expect(myTree.root.right.right.value).toEqual(2);
    });
    it('returns false on 3 node tree, find left leaf, does not splay', () => {
      //     2    =>     0
      //   1               1
      // 0                   2
      const myTree = new SplayTree();

      myTree.insertWithoutSplay(2);
      myTree.insertWithoutSplay(1);
      myTree.insertWithoutSplay(0);

      const result = myTree.contains(-1);

      expect(result).toBe(false);
      expect(myTree.root.value).toEqual(2);
      expect(myTree.root.right).toBeNull();
      expect(myTree.root.left.value).toEqual(1);
      expect(myTree.root.left.left.value).toEqual(0);
    });
    it('returns false on 3 node tree, find right leaf, does not splay', () => {
      //     2
      //   1   4
      // 0       6
      const myTree = new SplayTree();

      myTree.insertWithoutSplay(2);
      myTree.insertWithoutSplay(1);
      myTree.insertWithoutSplay(4);
      myTree.insertWithoutSplay(0);
      myTree.insertWithoutSplay(6);

      const result = myTree.contains(7);

      expect(result).toBe(false);
      expect(myTree.root.value).toEqual(2);
      expect(myTree.root.left.value).toEqual(1);
      expect(myTree.root.right.value).toEqual(4);

      expect(myTree.root.left.left.value).toEqual(0);
      expect(myTree.root.right.right.value).toEqual(6);
    });
  });

  describe('findMax', () => {
    it('returns undefined given empty tree', () => {
      const myTree = new SplayTree();

      const result = myTree.findMax();

      expect(result).toBeUndefined();
      expect(myTree.root).toBe(null);
    });
    it('returns correctly single node tree', () => {
      const myTree = new SplayTree();

      myTree.insertWithoutSplay(2);

      const result = myTree.findMax();

      expect(result).toEqual(2);
      expect(myTree.root.value).toEqual(2);
    });
    it('returns true on 2 node tree, left leaf', () => {
      //     2
      //    1
      const myTree = new SplayTree();

      myTree.insertWithoutSplay(2);
      myTree.insertWithoutSplay(1);

      const result = myTree.findMax();

      expect(result).toEqual(2);
      expect(myTree.root.value).toEqual(2);
      expect(myTree.root.left.value).toEqual(1);
      expect(myTree.root.right).toBeNull();
    });
    it('returns true on 3 node tree, right leaf, splays', () => {
      //     2
      //    1 3
      const myTree = new SplayTree();

      myTree.insertWithoutSplay(2);
      myTree.insertWithoutSplay(1);
      myTree.insertWithoutSplay(3);

      const result = myTree.findMax();

      expect(result).toEqual(3);
      expect(myTree.root.value).toEqual(3);
      expect(myTree.root.left.value).toEqual(2);
      expect(myTree.root.left.left.value).toEqual(1);
      expect(myTree.root.right).toBeNull();
    });
    it('returns true on 3 node tree, right leaf w/ left child, splays', () => {
      const myTree = new SplayTree();
      //       2                     5
      //    1     3       =>       3
      //             5           2   4
      //            4          1
      const values = [2, 1, 3, 5, 4];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insertWithoutSplay(values[i]);
      }

      const expected = 5;
      const result = myTree.findMax();

      const expectedTree = new SplayTree();
      const expectedTreeValues = [5, 3, 2, 4, 1];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insertWithoutSplay(expectedTreeValues[i]);
      }

      expect(myTree).toEqual(expectedTree);
      expect(result).toEqual(expected);
    });
  });

  describe('findMin', () => {
    it('returns undefined given empty tree', () => {
      const myTree = new SplayTree();

      const result = myTree.findMin();

      expect(result).toBeUndefined();
      expect(myTree.root).toBe(null);
    });
    it('returns correctly single node tree', () => {
      const myTree = new SplayTree();

      myTree.insertWithoutSplay(2);

      const result = myTree.findMin();

      expect(result).toEqual(2);
      expect(myTree.root.value).toEqual(2);
    });
    it('returns true on 2 node tree, right leaf', () => {
      //     2
      //       3
      const myTree = new SplayTree();

      myTree.insertWithoutSplay(2);
      myTree.insertWithoutSplay(3);

      const result = myTree.findMin();

      expect(result).toEqual(2);
      expect(myTree.root.value).toEqual(2);
      expect(myTree.root.right.value).toEqual(3);
      expect(myTree.root.left).toBeNull();
    });
    it('returns true on 3 node tree, left leaf, splays', () => {
      //     2
      //    1 3
      const myTree = new SplayTree();

      myTree.insertWithoutSplay(2);
      myTree.insertWithoutSplay(1);
      myTree.insertWithoutSplay(3);

      const result = myTree.findMin();

      expect(result).toEqual(1);
      expect(myTree.root.value).toEqual(1);
      expect(myTree.root.right.value).toEqual(2);
      expect(myTree.root.right.right.value).toEqual(3);
      expect(myTree.root.left).toBeNull();
    });
    it('returns true on 3 node tree, right leaf w/ left child, splays', () => {
      const myTree = new SplayTree();
      //       3                     0
      //    2     4       =>           2
      //  0                           1  3
      //   1                               4
      const values = [3, 2, 4, 0, 1];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insertWithoutSplay(values[i]);
      }

      const expected = 0;
      const result = myTree.findMin();

      const expectedTree = new SplayTree();
      const expectedTreeValues = [0, 2, 1, 3, 4];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insertWithoutSplay(expectedTreeValues[i]);
      }

      expect(myTree).toEqual(expectedTree);
      expect(result).toEqual(expected);
    });
  });

  describe('printPreOrder', () => {
    it('returns empty array if tree is empty', () => {
      const myTree = new SplayTree();

      const result = myTree.printPreOrder();

      expect(result).toEqual([]);
    });

    it('correctly returns pre order traversal, single node tree', () => {
      const myTree = new SplayTree();
      myTree.insertWithoutSplay(10);

      const result = myTree.printPreOrder();
      const expected = [10];

      expect(result).toEqual(expected);
    });

    it('correctly returns pre order traversal, multi node tree', () => {
      const myTree = new SplayTree();
      myTree.insertWithoutSplay(10);
      myTree.insertWithoutSplay(5);
      myTree.insertWithoutSplay(15);
      myTree.insertWithoutSplay(3);
      myTree.insertWithoutSplay(7);
      myTree.insertWithoutSplay(12);
      myTree.insertWithoutSplay(17);

      const result = myTree.printPreOrder();
      const expected = [10, 5, 3, 7, 15, 12, 17];

      expect(result).toEqual(expected);
    });
  });

  describe('printInOrder', () => {
    it('returns empty array if tree is empty', () => {
      const myTree = new SplayTree();

      const result = myTree.printInOrder();

      expect(result).toEqual([]);
    });

    it('correctly returns in order traversal, single node tree', () => {
      const myTree = new SplayTree();
      myTree.insertWithoutSplay(10);

      const result = myTree.printInOrder();
      const expected = [10];

      expect(result).toEqual(expected);
    });

    it('correctly returns in order traversal, multi node tree', () => {
      const myTree = new SplayTree();
      myTree.insertWithoutSplay(10);
      myTree.insertWithoutSplay(5);
      myTree.insertWithoutSplay(15);
      myTree.insertWithoutSplay(3);
      myTree.insertWithoutSplay(7);
      myTree.insertWithoutSplay(12);
      myTree.insertWithoutSplay(17);

      const result = myTree.printInOrder();
      const expected = [3, 5, 7, 10, 12, 15, 17];

      expect(result).toEqual(expected);
    });
  });

  describe('printPostOrder', () => {
    it('returns empty array if tree is empty', () => {
      const myTree = new SplayTree();

      const result = myTree.printPostOrder();

      expect(result).toEqual([]);
    });

    it('correctly returns post order traversal, single node tree', () => {
      const myTree = new SplayTree();
      myTree.insertWithoutSplay(10);

      const result = myTree.printPostOrder();
      const expected = [10];

      expect(result).toEqual(expected);
    });

    it('correctly returns post order traversal, multi node tree', () => {
      const myTree = new SplayTree();
      myTree.insertWithoutSplay(10);
      myTree.insertWithoutSplay(5);
      myTree.insertWithoutSplay(15);
      myTree.insertWithoutSplay(3);
      myTree.insertWithoutSplay(7);
      myTree.insertWithoutSplay(12);
      myTree.insertWithoutSplay(17);

      const result = myTree.printPostOrder();
      const expected = [3, 7, 5, 12, 17, 15, 10];

      expect(result).toEqual(expected);
    });
  });
});
