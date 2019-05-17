## Implementation of a `red black tree` class

### Author: Fletcher LaRue 
[LinkedIn](https://www.linkedin.com/in/fletcher-larue/)

### Links and Resources

[![Build Status](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms.svg?branch=master)](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms)

* [repo](https://github.com/asdFletcher/data-structures-and-algorithms/tree/master/src/data-structures/red-black-tree)
* [travis](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms)

---
### Files
#### `red-black-tree.js`
#### `red-black-tree-node.js`

#### `red-black-tree.test.js`
#### `red-black-tree-node.test.js`
---
##### Exported Values and Methods for the following files:

#### `red-black-tree.js`
`red-black-tree.js` exports the `RedBlackTree` class, which has methods for adding and removing elements that follow the traditional data structure scheme for a binary search tree, with additional special rules.

A `Red Black Tree` (`RBT`) is a special type of self-balancing binary search tree that changes the structure of the tree when nodes are inserted or removed to maintain a relatively balanced tree. A regular binary search tree is "sorted", where the left nodes are less than their parents and the right nodes are greater than their parents. Knowing this, we can find values stored in this type of tree quickly. Access, search, insert, and remove time complexity for a binary search tree is O(log(n)), where n is the number of nodes in the tree. These methods compare the incoming value with the values in the tree and navigates left or right based on a comparison with the existing node values. Depending on the operation this is done until a leaf is found where a new node can inserted or the desired value is found.

The specialty of the `red-black-tree` is that it maintains balance, guaranteeing a worst case time complexity that is better than a regular `binary search tree` O(log n) vs O(n). However, on average a regular BST is still O(log n). The `red-black-tree` maintains balance through a set of rules that require classing each node with a color. In reality this can be coded as 1 bit true/false but for ease this implementation uses strings `red` and `black`.

Perhaps the biggest difference between an RBT and other trees is the importance of having a `parent` property on each node that stores a pointer to that node's parent, this greatly simplifies the coding of the class, which is an important factor that shouldn't be overlooked. Storing a parent pointer does increase the the required memory. Apparently it is possible to store node ancestor information on a call stack - but I would argue against this implementation due to complexity of implementation. Implementing all of the methods is much simpler with this parent pointer.

The coloring rules for an RBT seem unclear when first encountered, but they are what enforce the tree balance - they key rule being that the black path length can't be different for any given node-to-leaf path. 

`Remove` Implementing the 8 main remove cases is fairly complex and would be very difficult to come up with without being shown.

This particular implementation requires that all values stored in the nodes are numbers. Although presumably one could create a Splay Tree to store any data, as long as there was a consistent way of comparing any 2 node "values". Strings based on alphabetic order, for example. 

Some trees are implemented where multiple nodes with the same value are allowed, and some have a node class that stores a counter. This particular implementation does not allow for duplicate values, nor does it keep track of a count for each value.

Read more about the `red-black-tree` tree on [Wikipedia](https://en.wikipedia.org/wiki/Splay_tree). However, I found this video to be much clearer: [helpful youtube video](https://www.youtube.com/watch?v=CTvfzU_uNKE).

* `RedBlackTree` class
    * Methods:
        * `constructor()`
        * `insert(<value> [, <callback>])`
        * `remove(<value> [, <callback>])`
        * `contains(<value> [, <callback>])`
        * `findMax([<callback>])`
        * `findMin([<callback>])`
        * `printPreOrder()`
        * `printInOrder()`
        * `printPostOrder()`

Note: parameters in square brackets i.e.:`[<parameter>]` are optional.

---
##### Using the `RedBlackTree` class methods:

#### `RedBlackTree` `constructor()`
```JavaScript
const RedBlackTree = require('<path to file exporting RedBlackTree>');
const myTree = new RedBlackTree();
```
* Creates a new tree that is empty
* Accepts no arguments
* If arguments are passed in they will be ignored
* The `root` attribute of a new tree is `null`

---

#### `RedBlackTree.prototype.insert(<value> [, <callback>])`
```JavaScript
const myTree = new RedBlackTree();
myTree.insert(5);
// gives tree:
//           5b

myTree.insert(10);
// gives tree:
//           5b
//              10r

myTree.insert(2.2);
// gives tree:
//           5b
//     2.2r     10r

myTree.insert("3");
// gives tree:
//           5b
//     2.2b     10b
//         3r

let result = myTree.insert(-1); 
// gives tree:
//           5b
//     2.2b      10b
//  -1r    3r

// result: a reference to the node with value of -1

```
* Inserts the value into the tree, at a leaf, to the left of all larger values, and to the right of all smaller values
* If the value already exists in the tree it will not be inserted
* Accepts 1 required argument, and 1 optional argument
    * The first parameter is required: the value of the node to be inserted
    * The second parameter is an optional callback that is called on all recursive functions and loops for the purposes of estimating the performance of the class (allows incrementing a counter)
* If the method is called with no arguments, `undefined` is returned
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

#### `RedBlackTree.prototype.remove(<value> [, <callback>])`
```JavaScript
const myTree = new RedBlackTree();
myTree.insert(5);
myTree.insert(10);
myTree.insert(2);
myTree.insert(3);
// gives tree:
//         5b
//     2b       10b
//       3r

let result = myTree.remove(5);
// gives tree:
//         3b
//     2b      10b

// result: a reference to the removed node

```
* Removes the value from the tree, if it exists
* Accepts 1 required argument, and 1 optional argument
    * The first parameter is required: the value of the node to be inserted
    * The second parameter is an optional callback that is called on all recursive functions and loops for the purposes of estimating the performance of the class (allows incrementing a counter)
* If the method is called with no arguments, `undefined` is returned
* If the method is called with additional arguments they will be ignored
* Acceptable input includes:
    * Strings that can be converted to numbers
    * Negative numbers
    * Floats
    * Integers
    * Any combination of the above
* Returns `undefined` on unsuccessfull remove
* Returns the value of the removed node if successful
* When a node with 2 children is removed, it is replaced with a node from one of the left or right sub trees, randomly selected. The replacement node is then removed and the tree-repair routine runs.
    * If chosen from the left child, the max value of that tree will take the place of the node.
    * If chosen from the right child, the min value of that tree will take the place of the node.

Note: predicting the resulting tree due to rotations is difficult and can vary depending on the coin flip.
---

#### `RedBlackTree.prototype.contains(<value> [, <callback>])`

```JavaScript
const myTree = new RedBlackTree();
myTree.insert(5);
myTree.insert(10);
myTree.insert(2);

// gives tree:
//         5b
//     2r       10r

let result = myTree.contains(2); // true

```
* Checks to see if the value is contained in the tree
* Returns `true` if the value exists in the tree, and `false` if it does not
* Accepts 1 required argument, and 1 optional argument
    * The first parameter is required: the value of the node to be inserted
    * The second parameter is an optional callback that is called on all recursive functions and loops for the purposes of estimating the performance of the class (allows incrementing a counter)
* If the method is called with no arguments, `undefined` is returned
* If the method is called with additional arguments they will be ignored
* Acceptable input includes:
    * Strings that can be converted to numbers
    * Negative numbers
    * Floats
    * Integers
    * Any combination of the above

---

#### `RedBlackTree.prototype.findMax([<callback>])`

```JavaScript
const myTree = new RedBlackTree();
myTree.insert(5);
myTree.insert(10);
myTree.insert(2);
myTree.insert(3);
myTree.insert(8);
// gives tree:
//         5b
//     2b       10b
//       3r    8r

let result = myTree.findMax(); // 10

```
* Returns the maximum value contained in the tree
* Accepts 1 optional argument
    * An optional callback that is called on all recursive functions and loops for the purposes of estimating the performance of the class (allows incrementing a counter)
* If the method is called with additional arguments they will be ignored

---

#### `RedBlackTree.prototype.findMin([<callback>])`

```JavaScript
const myTree = new RedBlackTree();
myTree.insert(5);
myTree.insert(10);
myTree.insert(2);
myTree.insert(3);
myTree.insert(8);
// gives tree:
//         5b
//     2b       10b
//       3r    8r

let result = myTree.findMin(); // 2

```
* Returns the minimum value contained in the tree
* Accepts 1 optional argument
    * An optional callback that is called on all recursive functions and loops for the purposes of estimating the performance of the class (allows incrementing a counter)
* If the method is called with additional arguments they will be ignored

---

#### `RedBlackTree.prototype.printPreOrder()`

```JavaScript
const myTree = new RedBlackTree();
myTree.insert(5);
myTree.insert(10);
myTree.insert(2);
myTree.insert(3);
myTree.insert(8);
// gives tree:
//         5b
//     2b       10b
//       3r    8r

let result = myTree.printPreOrder(); // [5, 2, 3, 10, 8]

```
* Returns an array representing the pre-order traversal of the tree
* Accepts no arguments
* If the method is called with arguments, they are ignored

---

#### `RedBlackTree.prototype.printInOrder()`

```JavaScript
const myTree = new RedBlackTree();
myTree.insert(5);
myTree.insert(10);
myTree.insert(2);
myTree.insert(3);
myTree.insert(8);
// gives tree:
//         5b
//     2b       10b
//       3r    8r

let result = myTree.printInOrder(); // [2, 3, 5, 8, 10]

```
* Returns an array representing the in-order traversal of the tree
* Accepts no arguments
* If the method is called with arguments, they are ignored

---

#### `RedBlackTree.prototype.printPostOrder()`

```JavaScript
const myTree = new RedBlackTree();
myTree.insert(5);
myTree.insert(10);
myTree.insert(2);
myTree.insert(3);
myTree.insert(8);
// gives tree:
//         5b
//     2b       10b
//       3r    8r

let result = myTree.printInOrder(); // [3, 2, 8, 10, 5]

```
* Returns an array representing the post-order traversal of the tree
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
