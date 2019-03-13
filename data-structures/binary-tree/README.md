## Implementation of a `binary tree` class

### Author: Fletcher LaRue

### Links and Resources

[![Build Status](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms.svg?branch=master)](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms)

* [repo](https://github.com/asdFletcher/data-structures-and-algorithms/)
* [travis](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms)

---

### Binary tree class
```js
// tree:
//       (1)
//       / \
//     (3) (5)
//    /  \    \
// (2)   (6)  (15)
```
---
### Files
#### `binary-tree.js`
#### `binary-tree-node.js`

---
##### Exported Values and Methods for the following files:

#### `binary-tree.js`
`binary-tree.js` exports the `BinaryTree` class, which has methods traversing including a `pre order`, `post order`, `in order`, and `breadth first` traversal.


* `BinaryTree` class
    * Methods:
        * `constructor()`
        * `preOrder()`
        * `postOrder()`
        * `breadthFirst()`

---

##### Using the `Tree` class methods:

- #### `BinaryTree` `constructor()`
```JavaScript
const myTree = new BinaryTree();
```
* Creates a new tree that is empty
* Accepts no arguments
* If arguments are passed in they will be ignored
* The `root` value of a new empty tree is `null`

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

--- 
