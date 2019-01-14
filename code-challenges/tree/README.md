![CF](http://i.imgur.com/7v5ASc8.png) Lab 15
=================================================

### Trees

### Author: Fletcher LaRue

### Links and Resources

[![Build Status](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms.svg?branch=master)](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms)

* [repo](https://github.com/asdFletcher/data-structures-and-algorithms/tree/master/code-challenges/llMerge)
* [travis](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms)

--- 

---

# Implemented a tree class


---
### Files
#### `tree.js`

---
##### Exported Values and Methods for the following files:

#### `tree.js`
`tree.js` exports the `Tree` and `Node` class, which have methods for adding and removing elements that follow the traditional data structure scheme for trees. Including a `preOrder`, `postOrder`, and `inOrder` traversal.


* `Tree` class
    * Methods:
        * `constructor()`
        * `preOrder()`
        * `postOrder()`
        * `inOrder()`
        * `add()`
        * `contains()`

---

##### Using the `Tree` class methods:

- #### `Tree` `constructor()`
```JavaScript
const myTree = new Tree();
```
* Creates a new tree that is empty
* Accepts no arguments
* If arguments are passed in they will be ignored
* The `root` value of a new empty tree is `null`

- #### `Tree.prototype.add(<value>)`
```JavaScript
const myTree = new Tree();
myTree.add(5);
myTree.add(10);
```
* Adds the value to the tree
* Accepts 1 argument
* If the method is called with no argument, the value will default to `undefined`
* If the method is called with more than 1 argument, only the first argument will be accepted


---

### Testing

All testing for this class was done with Jest: 
* [Jest docs](https://jestjs.io/docs/en/getting-started)

Instructions for replicating the tests for this project are as follows:

* Clone the repo.
* Create a node runtime environment

    ```JavaScript
    npm init
    ```
    This will create a `package.json` file, a `package-lock.json` file.

* Install Jest

    ```JavaScript
    npm i jest
    ```
* Run jest
    ```JavaScript
    npm jest --verbose --coverage
    ```
    It is useful to bind this to the command:
    ```JavaScript
    npm test
    ```
    To do this, manually edit your package.json to include the following under the "scripts" attribute:
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
