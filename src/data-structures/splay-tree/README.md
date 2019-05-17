## Implementation of a `splay tree` class

### Author: Fletcher LaRue 
[LinkedIn](https://www.linkedin.com/in/fletcher-larue/)

### Links and Resources

[![Build Status](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms.svg?branch=master)](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms)

* [repo](https://github.com/asdFletcher/data-structures-and-algorithms/tree/master/src/data-structures/splay-tree)
* [travis](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms)

---
### Files
#### `splay-tree.js`
#### `splay-tree-node.js`

#### `splay-tree.test.js`
---
##### Exported Values and Methods for the following files:

#### `splay-tree.js`
`splay-tree.js` exports the `SplayTree` class, which has methods for adding and removing elements that follow the traditional data structure scheme for a binary search tree.

A `Splay Tree` is a special type of binary search tree that changes the structure of the tree to bring recently accessed/inserted/removed items to the root of the tree. A regular binary search tree is "sorted", where the left nodes are less than their parents and the right nodes are greater than their parents. Knowing this, we can find values stored in this type of tree quickly. Access, search, insert, and remove time complexity for a binary search tree is O(log(n)), where n is the number of nodes in the tree. These methods compare the incoming value with the values in the tree and navigates left or right based on a comparison with the existing node values. Depending on the operation this is done until a leaf is found where a new node can inserted or the desired value is found.

The specialty of the splay tree means that recently accessed items are brough to the root making subsequent accesses to the same elements much faster. Items are brought to the root of the tree though a series of `zig-zig` and `zig-zag` rotations, the `zig-zag` rotation is identical to the `AVL Tree` double rotation, and the `zig-zig` is similar to two `AVL Tree` single rotations, but not quite the same. Because every insert/access/remove to the tree changes its structure, it is difficult to know the state of the tree at any given time! This makes testing and writing examples.

This particular implementation requires that all values stored in the nodes are numbers. Although presumably one could create a Splay Tree to store any data, as long as there was a consistent way of comparing any 2 node "values". Strings based on alphabetic order, for example. 

Some trees are implemented where multiple nodes with the same value are allowed, and some have a node class that stores a counter. This particular implementation does not allow for duplicate values, nor does it keep track of a count for each value.

Read more about the Splay tree on [Wikipedia](https://en.wikipedia.org/wiki/Splay_tree).

* `SplayTree` class
    * Methods:
        * `constructor()`
        * `insert(<value> [, <callback>])`
        * `insertWithoutSplay(<value>)`
        * `remove(<value> [, <callback>])`
        * `contains(<value> [, <callback>])`
        * `containsWithoutSplay(<value> [, <callback>])`
        * `findMax([<callback>])`
        * `findMin([<callback>])`
        * `printPreOrder()`
        * `printInOrder()`
        * `printPostOrder()`

Note: parameters in square brackets i.e.:`[<parameter>]` are optional.

---

##### Using the `SplayTree` class methods:

#### `SplayTree` `constructor()`
```JavaScript
const SplayTree = require('<path to file with BST exported>');
const myTree = new SplayTree();
```
* Creates a new tree that is empty
* Accepts no arguments
* If arguments are passed in they will be ignored
* The `root` attribute of a new tree is `null`

---

#### `SplayTree.prototype.insert(<value> [, <callback>])`
```JavaScript
const myTree = new SplayTree();
let result = myTree.insert(5);
// gives tree:
//           5

// result: a reference to node with value of 5

myTree.insert(10);
// gives tree:
//           10
//        5

myTree.insert(6);
// gives tree:
//           10
//        5

myTree.insert(7);
// gives tree:
//           7
//        5    10
```
* Inserts the value into the tree, at a leaf, to the left of all larger values, and to the right of all smaller values. Then performs rotations until that node is the root of the tree.
* If the value already exists in the tree it will not be inserted
* Accepts 1 required argument, and 1 optional argument
    * The first parameter is required: the value of the node to be inserted
    * The second parameter is an optional callback that is called on all recursive functions and loops for the purposes of estimating the performance of the class (allows incrementing a counter)
* If the method is called with no arguments, the node will not be inserted
* If the method is called with additional arguments they will be ignored
* Acceptable input includes:
    * Strings that can be converted to numbers
    * Negative numbers
    * Floats
    * Integers
    * Any combination of the above
* Returns `undefined` on unsuccessfull insert
* Returns a pointer to the inserted node if successful

---

#### `SplayTree.prototype.insertWithoutSplay(<value>)`
```JavaScript
const myTree = new SplayTree();
myTree.insert(5);
myTree.insert(10);
let result = myTree.insert(7);
// gives tree:
//           5
//               10
//             7
// result: a reference to node with value of 7
```
* Exactly the same as `insert` except without any splaying. This allows the predictable building of test trees.

---

#### `SplayTree.prototype.remove(<value> [, <callback>])`
```JavaScript
const myTree = new SplayTree();
myTree.insertWithoutSplay(5);
myTree.insertWithoutSplay(10);
myTree.insertWithoutSplay(2);
myTree.insertWithoutSplay(3);
// gives tree:
//         5
//     2       10
//      3

let result = myTree.remove(3);
// gives tree:
//         2
//            5
//               10

// result: a reference to the removed node

```
* Removes the value from the tree, if it exists. Then moves the **parent** of the deleted node to the root.
* Accepts 1 required argument, and 1 optional argument
    * The first parameter is required: the value of the node to be removed
    * The second parameter is an optional callback that is called on all recursive functions and loops for the purposes of estimating the performance of the class (allows incrementing a counter)
* If the method is called with no arguments, `undefined` is returned
* If the method is called with more than 2 arguments, the 3rd+ will be ignored
* Acceptable input includes:
    * Strings that can be converted to numbers
    * Negative numbers
    * Floats
    * Integers
    * Any combination of the above
* Returns `undefined` on unsuccessfull remove
* Returns a pointer to the removed node if successful
* When a non-leaf node is removed, the left/right direction that the replacement node comes from is determined at random.
    * If chosen from the left sub tree, the max value of that tree will take the place of the node.
    * If chosen from the right sub tree, the min value of that tree will take the place of the node.

---

#### `SplayTree.prototype.contains(<value> [, <callback>])`

```JavaScript
const myTree = new SplayTree();
myTree.insertWithoutSplay(5);
myTree.insertWithoutSplay(10);
myTree.insertWithoutSplay(2);
myTree.insertWithoutSplay(3);
myTree.insertWithoutSplay(8);
// gives tree:
//         5
//     2       10
//      3     8

let result = myTree.contains(2); // true
// gives tree:
//      2
//           5
//        3     10
//             8
```
* Checks to see if the value is contained in the tree. If it is, that node is moved to the root.
* Accepts 1 required argument, and 1 optional argument
    * The first parameter is required: the value of the node to be removed
    * The second parameter is an optional callback that is called on all recursive functions and loops for the purposes of estimating the performance of the class (allows incrementing a counter)
* If the method is called with no arguments, `undefined` is returned
* If the method is called with more than 2 arguments, the 3rd+ will be ignored
* Acceptable input includes:
    * Strings that can be converted to numbers
    * Negative numbers
    * Floats
    * Integers
    * Any combination of the above
* Returns `true` if the value exists in the tree, and `false` if it does not

---

#### `SplayTree.prototype.findMax([<callback>])`

```JavaScript
const myTree = new SplayTree();
myTree.insertWithoutSplay(5);
myTree.insertWithoutSplay(10);
myTree.insertWithoutSplay(2);
myTree.insertWithoutSplay(3);
myTree.insertWithoutSplay(8);
// gives tree:
//         5
//     2       10
//      3     8

let result = myTree.findMax(); // 10
// gives tree:
//         10
//      5
//   2     8
//     3

```
* Returns the maximum value contained in the tree, and moves that node to the root.
* Accepts 1 optional argument
    * An optional callback that is called on all recursive functions and loops for the purposes of estimating the performance of the class (allows incrementing a counter)
* If the method is called with additional arguments, they are ignored

---

#### `SplayTree.prototype.findMin()`

```JavaScript
const myTree = new SplayTree();
myTree.insertWithoutSplay(5);
myTree.insertWithoutSplay(10);
myTree.insertWithoutSplay(2);
myTree.insertWithoutSplay(3);
myTree.insertWithoutSplay(8);
// gives tree:
//         5
//     2       10
//      3     8

let result = myTree.findMin(); // 2
// gives tree:
//      2
//           5
//        3     10
//             8

```
* Returns the minimum value contained in the tree
* Accepts 1 optional argument
    * An optional callback that is called on all recursive functions and loops for the purposes of estimating the performance of the class (allows incrementing a counter)
* If the method is called with additional arguments, they are ignored

---

#### `SplayTree.prototype.printPreOrder()`

```JavaScript
const myTree = new SplayTree();
myTree.insertWithoutSplay(5);
myTree.insertWithoutSplay(10);
myTree.insertWithoutSplay(2);
myTree.insertWithoutSplay(3);
myTree.insertWithoutSplay(8);
// gives tree:
//         5
//     2       10
//      3     8

let result = myTree.printPreOrder(); // [5, 2, 3, 10, 8]

```
* Returns an array representing the pre-order traversal of the tree
* Does not change the structure of the tree
* Accepts no arguments
* If the method is called with arguments, they are ignored

---

#### `SplayTree.prototype.printInOrder()`

```JavaScript
const myTree = new SplayTree();
myTree.insertWithoutSplay(5);
myTree.insertWithoutSplay(10);
myTree.insertWithoutSplay(2);
myTree.insertWithoutSplay(3);
myTree.insertWithoutSplay(8);
// gives tree:
//         5
//     2       10
//      3     8

let result = myTree.printInOrder(); // [2, 3, 5, 8, 10]

```
* Returns an array representing the in-order traversal of the tree
* Does not change the structure of the tree
* Accepts no arguments
* If the method is called with arguments, they are ignored

---

#### `SplayTree.prototype.printPostOrder()`

```JavaScript
const myTree = new SplayTree();
myTree.insertWithoutSplay(5);
myTree.insertWithoutSplay(10);
myTree.insertWithoutSplay(2);
myTree.insertWithoutSplay(3);
myTree.insertWithoutSplay(8);
// gives tree:
//         5
//     2       10
//      3     8

let result = myTree.printInOrder(); // [3, 2, 8, 10, 5]

```
* Returns an array representing the post-order traversal of the tree
* Does not change the structure of the tree
* Accepts no arguments
* If the method is called with arguments, they are ignored

---

### Testing

Tests are written for the class methods and can be found in the `__tests__` folder.

All testing for this class was done with Jest: 
* [Jest docs](https://jestjs.io/docs/en/getting-started)

Instructions for replicating the tests for this project are as follows:

* Clone the repo from github.
* Install dependencies  (including `Jest`)

    ```
    npm i
    ```

* Run `Jest`
    ```
    npm jest --verbose --coverage
    ```
    This command is bound to:
    ```
    npm test
    ```
    The binding for this is in the package.json file:
    ```Javascript
    "scripts": {
        "test": "jest --verbose --coverage",
        "test-watch": "jest --watchAll --verbose --coverage"
    }
    ```
    `test-watch` will re-run tests when the file is saved

---

### Dependencies

* jest: `npm i jest`


### Setup
#### `.env` requirements
* n/a
