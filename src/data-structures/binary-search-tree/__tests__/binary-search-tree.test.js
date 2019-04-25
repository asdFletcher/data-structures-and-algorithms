'use strict';

const BST = require('../binary-search-tree.js');
const Node = require('../binary-search-tree-node.js');


function setCountersToZero(tree) {
  tree.insertComputations = 0;
  tree.removeComputations = 0;
  tree.containsComputations = 0;
  tree.findMaxComputations = 0;
  tree.findMinComputations = 0;
  tree.printComputations = 0;
}

describe('BST', () => {
  describe('constructor', () => {
    it('ignores additional arguments', () => {
      const myTree = new BST(1);
      expect(myTree.root).toBeNull();
    });
    it('succeeds on no arguments', () => {
      const myTree = new BST();
      expect(myTree).toBeInstanceOf(BST);
      expect(myTree.root).toBeNull();
    });
  });

  describe('insert', () => {
    it('fails on no arguments', () => {
      const myTree = new BST();
      const result = myTree.insert();

      expect(myTree.root).toBeNull();
      expect(result).toBeUndefined();
    });
    it('fails on boolean input', () => {
      const myTree = new BST();
      myTree.insert(true);
      const result = myTree.insert(false);

      expect(myTree.root).toBeNull();
      expect(result).toBeUndefined();
    });
    it('fails on string input', () => {
      const myTree = new BST();
      myTree.insert('string');
      const result = myTree.insert('true');

      expect(myTree.root).toBeNull();
      expect(result).toBeUndefined();
    });
    it('succeeds on integer input', () => {
      const myTree = new BST();
      const result = myTree.insert(1);

      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toEqual(1);
      expect(result).toBeInstanceOf(Node);
      expect(result.value).toBe(1);
    });
    it('succeeds on float input', () => {
      const myTree = new BST();
      const result = myTree.insert(1.1);

      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toEqual(1.1);
      expect(result).toBeInstanceOf(Node);
      expect(result.value).toBe(1.1);
    });
    it('succeeds on negative number input', () => {
      const myTree = new BST();
      const result = myTree.insert(-5);

      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toEqual(-5);
      expect(result).toBeInstanceOf(Node);
      expect(result.value).toBe(-5);
    });
    it('succeeds on integer input as string', () => {
      const myTree = new BST();
      const result = myTree.insert('2');

      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toEqual(2);
      expect(result).toBeInstanceOf(Node);
      expect(result.value).toBe(2);
    });
    it('succeeds on float input as string', () => {
      const myTree = new BST();
      const result = myTree.insert('2.2');

      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toEqual(2.2);
      expect(result).toBeInstanceOf(Node);
      expect(result.value).toBe(2.2);
    });
    it('succeeds on negative input as string', () => {
      const myTree = new BST();
      const result = myTree.insert('-2');

      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toEqual(-2);
      expect(result.value).toBe(-2);
    });

    it('succeeds on 2nd node to the left', () => {
      const myTree = new BST();
      myTree.insert(5);
      myTree.insert(3);

      expect(myTree.root.value).toEqual(5);
      expect(myTree.root.left.value).toEqual(3);
    });

    it('succeeds on 2nd node to the right', () => {
      const myTree = new BST();
      myTree.insert(5);
      myTree.insert(7);

      expect(myTree.root.value).toEqual(5);
      expect(myTree.root.right.value).toEqual(7);
    });

    it('succeeds on multiple nodes', () => {
      const myTree = new BST();
      myTree.insert(10);
      const a = myTree.insert(5);
      const b = myTree.insert(15);
      const c = myTree.insert(0);
      const d = myTree.insert(7);
      const e = myTree.insert(12);
      const f = myTree.insert(18);

      expect(myTree.root.value).toEqual(10);

      expect(myTree.root.left.value).toEqual(5);
      expect(myTree.root.right.value).toEqual(15);

      expect(myTree.root.left.left.value).toEqual(0);
      expect(myTree.root.left.right.value).toEqual(7);
      expect(myTree.root.right.left.value).toEqual(12);
      expect(myTree.root.right.right.value).toEqual(18);

      expect(a.value).toBe(5);
      expect(b.value).toBe(15);
      expect(c.value).toBe(0);
      expect(d.value).toBe(7);
      expect(e.value).toBe(12);
      expect(f.value).toBe(18);
    });
  });

  describe('remove', () => {
    it('fails given no parameters', () => {
      const myTree = new BST();

      myTree.insert(5);

      const result = myTree.remove();
      expect(result).toBeUndefined();
      expect(myTree.root.value).toBe(5);
    });
    it('fails on empty tree', () => {
      const myTree = new BST();

      const result = myTree.remove();
      expect(result).toBeUndefined();
      expect(myTree.root).toBeNull();
    });
    it('succeeds on remove root of 1 node tree', () => {
      const myTree = new BST();
      myTree.insert(2);

      const result = myTree.remove(2);
      const expected = new Node(2);

      expect(result).toEqual(expected);
      expect(myTree.root).toBeNull();
    });
    it('succeeds on remove root of 2 node tree, leaf to left', () => {
      const myTree = new BST();
      myTree.insert(2);
      myTree.insert(1);

      const result = myTree.remove(2);
      const expected = new Node(2);

      expect(result).toEqual(expected);
      expect(myTree.root.value).toBe(1);
    });
    it('succeeds on remove root of 2 node tree, leaf to right', () => {
      const myTree = new BST();
      myTree.insert(2);
      myTree.insert(3);

      const result = myTree.remove(2);
      const expected = new Node(2);

      expect(result).toEqual(expected);
      expect(myTree.root.value).toBe(3);
    });
    it('succeeds on remove root of 3 node tree, balanced, random left', () => {
      global.Math.random = () => 0.75;

      const myTree = new BST();
      myTree.insert(2);
      myTree.insert(1);
      myTree.insert(3);

      const result = myTree.remove(2);
      const expected = new Node(2);

      const expectedTree = new BST();
      expectedTree.insert(1);
      expectedTree.insert(3);

      expect(result).toEqual(expected);
      expect(myTree).toEqual(expectedTree);
    });
    it('succeeds on remove root of 3 node tree, balanced, random right', () => {
      global.Math.random = () => 0.25;

      const myTree = new BST();
      myTree.insert(2);
      myTree.insert(1);
      myTree.insert(3);

      const result = myTree.remove(2);
      const expected = new Node(2);

      const expectedTree = new BST();
      expectedTree.insert(3);
      expectedTree.insert(1);

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result).toEqual(expected);
      expect(myTree).toEqual(expectedTree);
    });

    it('succeeds on remove leaf of 2 node tree, leaf to left', () => {
      const myTree = new BST();
      myTree.insert(2);
      myTree.insert(1);

      const result = myTree.remove(1);
      const expected = new Node(1);

      const expectedTree = new BST();
      expectedTree.insert(2);

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result).toEqual(expected);
      expect(myTree).toEqual(expectedTree);
    });
    it('succeeds on remove leaf of 2 node tree, leaf to right', () => {
      const myTree = new BST();
      myTree.insert(2);
      myTree.insert(3);

      const result = myTree.remove(3);
      const expected = new Node(3);

      const expectedTree = new BST();
      expectedTree.insert(2);

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result).toEqual(expected);
      expect(myTree).toEqual(expectedTree);
    });

    it('succeeds on remove leaf of 3 node tree, leaf to left', () => {
      const myTree = new BST();
      myTree.insert(2);
      myTree.insert(1);
      myTree.insert(3);

      const result = myTree.remove(1);
      const expected = new Node(1);

      const expectedTree = new BST();
      expectedTree.insert(2);
      expectedTree.insert(3);

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result).toEqual(expected);
      expect(myTree).toEqual(expectedTree);
    });
    it('succeeds on remove leaf of 3 node tree, leaf to right', () => {
      const myTree = new BST();
      myTree.insert(2);
      myTree.insert(1);
      myTree.insert(3);

      const result = myTree.remove(3);
      const expected = new Node(3);

      const expectedTree = new BST();
      expectedTree.insert(2);
      expectedTree.insert(1);

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result).toEqual(expected);
      expect(myTree).toEqual(expectedTree);
    });

    it('succeeds on remove leaf, a 2 deep single child to the left', () => {
      const myTree = new BST();
      myTree.insert(5);
      myTree.insert(3);
      myTree.insert(7);
      myTree.insert(2);

      //       5
      //     3   7
      //   2
      const result = myTree.remove(2);
      const expected = new Node(2);

      const expectedTree = new BST();
      const expectedTreeValues = [5, 3, 7];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(myTree).toEqual(expectedTree);
      expect(result).toEqual(expected);
    });
    it('succeeds on remove leaf, a 2 deep single child to the right', () => {
      const myTree = new BST();
      myTree.insert(5);

      myTree.insert(3);
      myTree.insert(7);

      myTree.insert(4);
      //       5
      //     3   7
      //      4
      const result = myTree.remove(4);
      const expected = new Node(4);


      const expectedTree = new BST();
      const expectedTreeValues = [5, 3, 7];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(myTree).toEqual(expectedTree);
      expect(result).toEqual(expected);
    });


    it('succeeds on remove node with 2 leaf-children, random left', () => {
      global.Math.random = () => 0.75;

      const myTree = new BST();
      const values = [5, 3, 7, 2, 4];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insert(values[i]);
      }

      const result = myTree.remove(3);
      const expected = new Node(3);

      const expectedTree = new BST();
      const expectedTreeValues = [5, 2, 7, 4];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(expectedTree).toEqual(myTree);
      expect(result).toEqual(expected);
    });
    it('succeeds on remove node with 2 leaf-children, random right', () => {
      global.Math.random = () => 0.25;

      const myTree = new BST();
      const values = [5, 3, 7, 2, 4];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insert(values[i]);
      }

      const result = myTree.remove(3);
      const expected = new Node(3);

      const expectedTree = new BST();
      const expectedTreeValues = [5, 4, 7, 2];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(expectedTree).toEqual(myTree);
      expect(result).toEqual(expected);
    });

    it('succeeds on remove node with 2 children, random left, left child has 2 leaf children', () => {
      global.Math.random = () => 0.75;

      const myTree = new BST();
      //       10
      //     5    12
      //   3   8
      //  1 4 7 9
      const values = [10, 5, 12, 3, 8, 1, 4, 7, 9];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insert(values[i]);
      }

      const removedValue = 5;
      const result = myTree.remove(removedValue);
      const expected = new Node(removedValue);

      //       10
      //     4    12
      //   3   8
      //  1   7 9
      const expectedTree = new BST();
      const expectedTreeValues = [10, 4, 12, 3, 8, 1, 7, 9];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(expectedTree).toEqual(myTree);
      expect(result).toEqual(expected);
    });
    it('succeeds on remove node with 2 children, random right, right child has 2 leaf children', () => {
      global.Math.random = () => 0.25;

      const myTree = new BST();
      //       10
      //     5    12
      //   3   8
      //  1 4 7 9
      const values = [10, 5, 12, 3, 8, 1, 4, 7, 9];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insert(values[i]);
      }

      const removedValue = 5;
      const result = myTree.remove(removedValue);
      const expected = new Node(removedValue);

      //       10
      //     7    12
      //   3   8
      //  1 4   9
      const expectedTree = new BST();
      const expectedTreeValues = [10, 7, 12, 3, 8, 1, 4, 9];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(expectedTree).toEqual(myTree);
      expect(result).toEqual(expected);
    });

    it('succeeds on remove node with 2 children, random left, left child has 1 left leaf child', () => {
      global.Math.random = () => 0.75;

      const myTree = new BST();
      //       10
      //     5    12
      //   3   8
      //  1   7 9
      const values = [10, 5, 12, 3, 8, 1, 7, 9];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insert(values[i]);
      }

      const removedValue = 5;
      const result = myTree.remove(removedValue);
      const expected = new Node(removedValue);

      //       10
      //     3    12
      //   1   8
      //      7 9
      const expectedTree = new BST();
      const expectedTreeValues = [10, 3, 12, 1, 8, 7, 9];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(expectedTree).toEqual(myTree);
      expect(result).toEqual(expected);
    });
    it('succeeds on remove node with 2 children, random right, right child has 1 right leaf child', () => {
      global.Math.random = () => 0.25;

      const myTree = new BST();
      //       10
      //     5    12
      //   3   8
      //  1 4    9
      const values = [10, 5, 12, 3, 8, 1, 4, 9];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insert(values[i]);
      }

      const removedValue = 5;
      const result = myTree.remove(removedValue);
      const expected = new Node(removedValue);

      //       10
      //     8    12
      //   3   9
      //  1 4
      const expectedTree = new BST();
      const expectedTreeValues = [10, 8, 12, 3, 9, 1, 4];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(expectedTree).toEqual(myTree);
      expect(result).toEqual(expected);
    });

    it('succeeds on remove node with 2 children, random left, left child has 1 right leaf child', () => {
      global.Math.random = () => 0.75;

      const myTree = new BST();
      //       10
      //     5    12
      //   3   8
      //    4 7 9
      const values = [10, 5, 12, 3, 8, 4, 7, 9];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insert(values[i]);
      }

      const removedValue = 5;
      const result = myTree.remove(removedValue);
      const expected = new Node(removedValue);

      //       10
      //     4    12
      //   3   8
      //      7 9
      const expectedTree = new BST();
      const expectedTreeValues = [10, 4, 12, 3, 8, 7, 9];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(expectedTree).toEqual(myTree);
      expect(result).toEqual(expected);
    });
    it('succeeds on remove node with 2 children, random right, right child has 1 left leaf child', () => {
      global.Math.random = () => 0.25;

      const myTree = new BST();
      //       10
      //     5    12
      //   3   8
      //  1 4 7
      const values = [10, 5, 12, 3, 8, 1, 4, 7];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insert(values[i]);
      }

      const removedValue = 5;
      const result = myTree.remove(removedValue);
      const expected = new Node(removedValue);

      //       10
      //     7    12
      //   3   8
      //  1 4
      const expectedTree = new BST();
      const expectedTreeValues = [10, 7, 12, 3, 8, 1, 4];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(expectedTree).toEqual(myTree);
      expect(result).toEqual(expected);
    });

    it('succeeds on remove node with 2 children, random left, left child is a full sub tree h=2', () => {
      global.Math.random = () => 0.75;

      const myTree = new BST();
      //                               20
      //             10                              25
      //       5            15
      //    1    7       12      17
      //  0  2  6  8   11  14  16   18
      const values = [20, 10, 25, 5, 15, 1, 7, 12, 17, 0, 2, 6, 8, 11, 14, 16, 18];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insert(values[i]);
      }

      const removedValue = 10;
      const result = myTree.remove(removedValue);
      const expected = new Node(removedValue);

      //                               20
      //             8                              25
      //       5            15
      //    1    7       12      17
      //  0  2  6      11  14  16   18
      const expectedTree = new BST();
      const expectedTreeValues = [20, 8, 25, 5, 15, 1, 7, 12, 17, 0, 2, 6, 11, 14, 16, 18];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(expectedTree).toEqual(myTree);
      expect(result).toEqual(expected);
    });
    it('succeeds on remove node with 2 children, random right, right child is a full sub tree h=2', () => {
      global.Math.random = () => 0.25;

      const myTree = new BST();
      //                               20
      //             10                              25
      //       5            15
      //    1    7       12      17
      //  0  2  6  8   11  14  16   18
      const values = [20, 10, 25, 5, 15, 1, 7, 12, 17, 0, 2, 6, 8, 11, 14, 16, 18];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insert(values[i]);
      }

      const removedValue = 10;
      const result = myTree.remove(removedValue);
      const expected = new Node(removedValue);

      //                               20
      //             11                              25
      //       5            15
      //    1    7       12      17
      //  0  2  6  8       14  16   18
      const expectedTree = new BST();
      const expectedTreeValues = [20, 11, 25, 5, 15, 1, 7, 12, 17, 0, 2, 6, 8, 14, 16, 18];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(expectedTree).toEqual(myTree);
      expect(result).toEqual(expected);
    });

    it('succeeds on remove node with 2 children, random left, left child is a sub tree h=3, replacement node has child', () => {
      global.Math.random = () => 0.75;

      const myTree = new BST();
      //                               20
      //             10                              25
      //       5            15
      //    1    7       12      17
      //  0  2  6  9   11  14  16   18
      //          8
      const values = [20, 10, 25, 5, 15, 1, 7, 12, 17, 0, 2, 6, 9, 11, 14, 16, 18, 8];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insert(values[i]);
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
      const expectedTree = new BST();
      const expectedTreeValues = [20, 9, 25, 5, 15, 1, 7, 12, 17, 0, 2, 6, 8, 11, 14, 16, 18];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(expectedTree).toEqual(myTree);
      expect(result).toEqual(expected);
    });
    it('succeeds on remove node with 2 children, random right, right child is a sub tree h=3, replacement node has child', () => {
      global.Math.random = () => 0.25;

      const myTree = new BST();
      //                               20
      //             10                              25
      //       5            15
      //    1    7       13      17
      //  0  2  6  9   11  14  16   18
      //                 12
      const values = [20, 10, 25, 5, 15, 1, 7, 13, 17, 0, 2, 6, 9, 11, 14, 16, 18, 12];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insert(values[i]);
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
      const expectedTree = new BST();
      const expectedTreeValues = [20, 11, 25, 5, 15, 1, 7, 13, 17, 0, 2, 6, 9, 12, 14, 16, 18];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(expectedTree).toEqual(myTree);
      expect(result).toEqual(expected);
    });

    it('succeeds on remove node (depth=2) with 2 children, random left, left child is a sub tree', () => {
      global.Math.random = () => 0.75;

      const myTree = new BST();
      //                               20
      //             10                              25
      //       5            15
      //    1    7       12      17
      //  0  2  6  9   11  14  16   18
      const values = [20, 10, 25, 5, 15, 1, 7, 12, 17, 0, 2, 6, 9, 11, 14, 16, 18];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insert(values[i]);
      }

      const removedValue = 5;
      const result = myTree.remove(removedValue);
      const expected = new Node(removedValue);

      //                               20
      //             10                              25
      //       2            15
      //    1    7       12      17
      //  0     6  9   11  14  16   18
      const expectedTree = new BST();
      const expectedTreeValues = [20, 10, 25, 2, 15, 1, 7, 12, 17, 0, 6, 9, 11, 14, 16, 18];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(expectedTree).toEqual(myTree);
      expect(result).toEqual(expected);
    });
    it('succeeds on remove node (depth=2) with 2 children, random right, right child is a sub tree', () => {
      global.Math.random = () => 0.25;

      const myTree = new BST();
      //                               20
      //             10                              25
      //       5            15
      //    1    7       12      17
      //  0  2  6  9   11  14  16   18
      const values = [20, 10, 25, 5, 15, 1, 7, 12, 17, 0, 2, 6, 9, 11, 14, 16, 18];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insert(values[i]);
      }

      const removedValue = 5;
      const result = myTree.remove(removedValue);
      const expected = new Node(removedValue);

      //                               20
      //             10                              25
      //       6            15
      //    1    7       12      17
      //  0  2     9   11  14  16   18
      const expectedTree = new BST();
      const expectedTreeValues = [20, 10, 25, 6, 15, 1, 7, 12, 17, 0, 2, 9, 11, 14, 16, 18];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(expectedTree).toEqual(myTree);
      expect(result).toEqual(expected);
    });

    it('succeeds on remove node (depth=2) with 2 children, random left, left child is a sub tree, replacement node has right child', () => {
      global.Math.random = () => 0.75;

      const myTree = new BST();
      //                               20
      //             10                              25
      //       4            15
      //    1    7       12      17
      //  0  3  5  9   11  14  16   18
      //    2    6
      const values = [20, 10, 25, 4, 15, 1, 7, 12, 17, 0, 3, 5, 9, 11, 14, 16, 18, 2, 6];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insert(values[i]);
      }

      const removedValue = 4;
      const result = myTree.remove(removedValue);
      const expected = new Node(removedValue);

      //                               20
      //             10                              25
      //       3            15
      //    1    7       12      17
      //  0  2  5  9   11  14  16   18
      //         6
      const expectedTree = new BST();
      const expectedTreeValues = [20, 10, 25, 3, 15, 1, 7, 12, 17, 0, 2, 5, 9, 11, 14, 16, 18, 6];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(expectedTree).toEqual(myTree);
      expect(result).toEqual(expected);
    });
    it('succeeds on remove node (depth=2) with 2 children, random right, right child is a sub tree, replacement node has right child', () => {
      global.Math.random = () => 0.25;

      const myTree = new BST();
      //                               20
      //             10                              25
      //       4            15
      //    1    7       12      17
      //  0  2  5  9   11  14  16   18
      //         6
      const values = [20, 10, 25, 4, 15, 1, 7, 12, 17, 0, 2, 5, 9, 11, 14, 16, 18, 6];
      for (let i = 0; i < values.length; i += 1) {
        myTree.insert(values[i]);
      }

      const removedValue = 4;
      const result = myTree.remove(removedValue);
      const expected = new Node(removedValue);

      //                               20
      //             10                              25
      //       5            15
      //    1    7       12      17
      //  0  2  6  9   11  14  16   18
      const expectedTree = new BST();
      const expectedTreeValues = [20, 10, 25, 5, 15, 1, 7, 12, 17, 0, 2, 6, 9, 11, 14, 16, 18];
      for (let i = 0; i < expectedTreeValues.length; i += 1) {
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(expectedTree).toEqual(myTree);
      expect(result).toEqual(expected);
    });
  });
});
