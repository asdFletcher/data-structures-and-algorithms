## Implementation of a `binary search tree` class

### Author: Fletcher LaRue 
[LinkedIn](https://www.linkedin.com/in/fletcher-larue/)

### Links and Resources

[![Build Status](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms.svg?branch=master)](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms)

* [repo](https://github.com/asdFletcher/data-structures-and-algorithms/tree/master/data-structures/binary-search-tree)
* [travis](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms)


---
### Files
#### `binary-search-tree.js`
#### `binary-search-tree-node.js`

#### `binary-search-tree.test.js`
---
##### Exported Values and Methods for the following files:

#### `binary-search-tree.js`
`binary-search-tree.js` exports the `BinarySearchTree` class, which has methods for adding and removing elements that follow the traditional data structure scheme for a binary serach tree. 

A `Binary Search Tree` ('BST') is a binary tree that is "sorted", where the left nodes are less than their parents and the right nodes are greater than their parents. Knowing this, we can find values stored in this type of tree quickly. Access, search, insert, and remove time complexity for a binary search tree is O(log(n)), where n is the number of nodes in the tree. These methods compare the incoming value with the values in the tree and navigates left or right based on a comparison with the existing node values. Depending on the operation this is done until a leaf is found where a new node can inserted or the desired value is found.

This particular implementation requires that all values stored in the nodes are numbers. Although presumably one could create a BST to store any data, as long as there was a consistent way of comparing any 2 node "values". Strings based on alphabetic order, for example. 

Some trees are implemented where multiple nodes with the same value are allowed, and some have a node class that stores a counter. This particular implementation does not allow for duplicate values, nor does it keep track of a count for each value.


* `BinarySearchTree` class
    * Methods:
        * `constructor()`
        * `insert(<value>)`
        * `remove(<value>)`
        * `remove_bad(<value>)`
        * `contains(<value>)`
        * `findMax()`
        * `findMin()`
        * `printPreOrder()`
        * `printInOrder()`
        * `printPostOrder()`

---


##### Using the `BinarySearchTree` class methods:

#### `BST` `constructor()`
```JavaScript
const BST = require('<path to file with BST exported>');
const myTree = new BST();
```
* Creates a new tree that is empty
* Accepts no arguments
* If arguments are passed in they will be ignored
* The `root` attribute of a new tree is `undefined`


#### `BST.prototype.insert(<value>)`
```JavaScript
const myTree = new BST();
myTree.insert(5);
myTree.insert(10);
myTree.insert(2.2);
myTree.insert("3");
let result = myTree.insert(-1); 
// gives tree:
//           5
//     2.2      10
//  -1    3

// result: a reference to node with value of -1

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

#### `BST.prototype.remove(<value>)`
```JavaScript
const myTree = new BST();
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
//         3
//     2       10
// or:
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
* When a non-leaf node is removed, the left/right direction that the replacement node comes from is determined at random.
    * If chosen from the left sub tree, the max value of that tree will take the place of the node.
    * If chosen from the right sub tree, the min value of that tree will take the place of the node.

---




#### `BST.prototype.remove_bad(<value>)`

An nieve implementation

```JavaScript
const myTree = new BST();
myTree.insert(5);
myTree.insert(10);
myTree.insert(2);
myTree.insert(3);
myTree.insert(8);
// gives tree:
//         5
//     2       10
//      3     8

let result = myTree.remove(5);
// gives tree:
//         2
//            3
//              10
//             8
// or:
//         10
//       8
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
* When a non-leaf node is removed, the entire left (or right) child is attached to the max (or min) node of the right (or left) child. This is not a great algorithm and is kept preserved for demonstration purposes. (See graph showing imbalances and increased removal times after many removals).


#### `BST.prototype.contains(<value>)`

```JavaScript
const myTree = new BST();
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

#### `BST.prototype.findMax()`

```JavaScript
const myTree = new BST();
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

#### `BST.prototype.findMin()`

```JavaScript
const myTree = new BST();
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



#### `BST.prototype.printPreOrder()`

```JavaScript
const myTree = new BST();
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

#### `BST.prototype.printInOrder()`

```JavaScript
const myTree = new BST();
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

#### `BST.prototype.printPostOrder()`

```JavaScript
const myTree = new BST();
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
