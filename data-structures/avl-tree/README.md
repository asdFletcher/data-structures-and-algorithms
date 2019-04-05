## Implementation of an `AVL tree` class

### Author: Fletcher LaRue 
[LinkedIn](https://www.linkedin.com/in/fletcher-larue/)

### Links and Resources

[![Build Status](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms.svg?branch=master)](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms)

* [repo](https://github.com/asdFletcher/data-structures-and-algorithms/tree/master/data-structures/avl-tree)
* [travis](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms)


---
### Files
#### `avl-tree.js`
#### `avl-tree-node.js`

#### `avl-tree.test.js`
---
##### Exported Values and Methods for the following files:

#### `avl-tree.js`
`avl-tree.js` exports the `AVLTree` class, which has methods for adding and removing elements that follow the traditional data structure scheme for an AVL tree. [Wikipedia article on AVL trees](https://en.wikipedia.org/wiki/AVL_tree).

An `AVL Tree` is similar to a Binary Search Tree in that it is a "sorted" tree, where the left nodes are less than their parents and the right nodes are greater than their parents. However, the AVL tree insert/remove methods modify the tree in order to maintain balance. If 2 children become too imbalanced (height difference greater than 1) then a re-balancing is performed. These are classified as either single or double rotations, and can occur to the "left" or the "right" depending on which side of the tree is lopsided.

The stricter rules on tree structure that enforce balance lets us more easily predict the time complexity of all the tree operations. Because the tree is guaranteed to be balanced (or at least fairly well balanced). Insert, delete, contains, findMin, findMax, are all O(log(n)), where n is the number of nodes in the tree.

This particular implementation requires that all values stored in the nodes are numbers. Although presumably one could create a BST to store any data, as long as there was a consistent way of comparing any 2 node "values". Strings based on alphabetic order, for example. 

Some trees are implemented where multiple nodes with the same value are allowed, and some have a node class that stores a counter. This particular implementation does not allow for duplicate values, nor does it keep track of a count for each value. One key difference from the Binary Search Tree is that the AVL tree stores height information about each node so that it can make decisioins on when to rebalance.


* `AVLTree` class
    * Methods:
        * `constructor()`
        * `insert(<value>)`
        * `remove(<value>)`
        * `contains(<value>)`
        * `findMax()`
        * `findMin()`
        * `printPreOrder()`
        * `printInOrder()`
        * `printPostOrder()`

---


##### Using the `AVLTree` class methods:

#### `AVLTree` `constructor()`
```JavaScript
const AVLTree = require('<path to file exporting AVLTree>');
const myTree = new AVLTree();
```
* Creates a new tree that is empty
* Accepts no arguments
* If arguments are passed in they will be ignored
* The `root` attribute of a new tree is `undefined`


#### `AVLTree.prototype.insert(<value>)`
```JavaScript
const myTree = new AVLTree();
myTree.insert(5);
myTree.insert(10);
myTree.insert(2.2);
myTree.insert("3");
let result = myTree.insert(-1); 
// gives tree:
//           5
//     2.2      10
//  -1    3

// result: a reference to the node with value of -1

```
* Inserts the value into the tree, at a leaf, to the left of all larger values, and to the right of all smaller values
* If the value already exists in the tree it will not be inserted
* Accepts 1 argument
* If the method is called with no argument, the node will not be inserted
* If the method is called with more than 1 argument, only the first argument will be accepted
* Acceptable input includes:
    * Strings that can be converted to numbers
    * Negative numbers
    * Floats
    * Integers
    * Any combination of the above
* Returns `undefined` on unsuccessfull insert
* Returns a pointer to the inserted node if successful

#### `AVLTree.prototype.remove(<value>)`
```JavaScript
const myTree = new AVLTree();
myTree.insert(5);
myTree.insert(10);
myTree.insert(2);
myTree.insert(3);
// gives tree:
//         5
//     2       10
//      3

let result = myTree.remove(5);
// gives tree:
//         10
//     2      
//       3

// result: a reference to the removed node

```
* Removes the value from the tree, if it exists
* Accepts 1 argument
* If the method is called with no argument, `undefined` is returned
* If the method is called with more than 1 argument, only the first argument will be accepted
* Acceptable input includes:
    * Strings that can be converted to numbers
    * Negative numbers
    * Floats
    * Integers
    * Any combination of the above
* Returns `undefined` on unsuccessfull remove
* Returns a pointer to the removed node if successful
* When a non-leaf node is removed, the replacement node comes from the child with greater height. If the child nodes have the same height the right child is chosen.
    * If chosen from the left child, the max value of that tree will take the place of the node.
    * If chosen from the right child, the min value of that tree will take the place of the node.

---

#### `AVLTree.prototype.contains(<value>)`

```JavaScript
const myTree = new AVLTree();
myTree.insert(5);
myTree.insert(10);
myTree.insert(2);
myTree.insert(3);
myTree.insert(8);
// gives tree:
//         5
//     2       10
//      3     8

let result = myTree.contains(2); // true

```
* Checks to see if the value is contained in the tree
* Accepts 1 argument
* If the method is called with no argument, `undefined` is returned
* If the method is called with more than 1 argument, only the first argument will be accepted
* Acceptable input includes:
    * Strings that can be converted to numbers
    * Negative numbers
    * Floats
    * Integers
    * Any combination of the above
* Returns `true` if the value exists in the tree, and `false` if it does not

#### `AVLTree.prototype.findMax()`

```JavaScript
const myTree = new AVLTree();
myTree.insert(5);
myTree.insert(10);
myTree.insert(2);
myTree.insert(3);
myTree.insert(8);
// gives tree:
//         5
//     2       10
//      3     8

let result = myTree.findMax(); // 10

```
* Returns the maximum value contained in the tree
* Accepts no arguments
* If the method is called with arguments, they are ignored

#### `AVLTree.prototype.findMin()`

```JavaScript
const myTree = new AVLTree();
myTree.insert(5);
myTree.insert(10);
myTree.insert(2);
myTree.insert(3);
myTree.insert(8);
// gives tree:
//         5
//     2       10
//      3     8

let result = myTree.findMin(); // 2

```
* Returns the minimum value contained in the tree
* Accepts no arguments
* If the method is called with arguments, they are ignored



#### `AVLTree.prototype.printPreOrder()`

```JavaScript
const myTree = new AVLTree();
myTree.insert(5);
myTree.insert(10);
myTree.insert(2);
myTree.insert(3);
myTree.insert(8);
// gives tree:
//         5
//     2       10
//      3     8

let result = myTree.printPreOrder(); // [5, 2, 3, 10, 8]

```
* Returns an array representing the pre-order traversal of the tree
* Accepts no arguments
* If the method is called with arguments, they are ignored

#### `AVLTree.prototype.printInOrder()`

```JavaScript
const myTree = new AVLTree();
myTree.insert(5);
myTree.insert(10);
myTree.insert(2);
myTree.insert(3);
myTree.insert(8);
// gives tree:
//         5
//     2       10
//      3     8

let result = myTree.printInOrder(); // [2, 3, 5, 8, 10]

```
* Returns an array representing the in-order traversal of the tree
* Accepts no arguments
* If the method is called with arguments, they are ignored

#### `AVLTree.prototype.printPostOrder()`

```JavaScript
const myTree = new AVLTree();
myTree.insert(5);
myTree.insert(10);
myTree.insert(2);
myTree.insert(3);
myTree.insert(8);
// gives tree:
//         5
//     2       10
//      3     8

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
