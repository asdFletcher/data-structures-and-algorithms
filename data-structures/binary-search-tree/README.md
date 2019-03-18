## Implementation of a `binary search tree` class

### Author: Fletcher LaRue

### Links and Resources

[![Build Status](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms.svg?branch=master)](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms)

* [repo](https://github.com/asdFletcher/data-structures-and-algorithms)
* [travis](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms)


---
### Files
#### `binary-search-tree.js`
#### `binary-search-tree.test.js`

---
##### Exported Values and Methods for the following files:

#### `binary-search-tree.js`
`binary-search-tree.js` exports the `BinarySearchTree` class, which has methods for adding and removing elements that follow the traditional data structure scheme for a binary serach tree. 

A binary search tree is a binary tree that is "sorted", where the left nodes are less than their parents and the right nodes are greater than their parents. Knowing this, we can find values stored in this type of tree quickly. Search time complexity for a binary search tree is O(log(n)), where n is the number of nodes in the tree. The insertion method compares the incoming value with the values in the tree and inserts a new node into the appropriate leaf: to the left if it is smaller, and to the right if it is larger.

Other considerations: 
- How to handle duplicate values? 
- How to store and compare values that aren't simply numbers?



* `BinarySearchTree` class
    * Methods:
        * `constructor()`
        * `insert(<value>)`
        * `delete(<value>)`
        * `contains(<value>)`
        * `findMax()`
        * `findMin()`
        * `print()`

---
---
---
---


##### Using the `BinarySearchTree` class methods:

- #### `Stack` `constructor()`
```JavaScript
const myStack = new Stack();
```
* Creates a new stack that is empty
* Accepts no arguments
* If arguments are passed in they will be ignored
* The `top` value of a new stack is `null`

- #### `Stack.prototype.push(<value>)`
```JavaScript
const myStack = new Stack();
myStack.push(5);
myStack.push(10);
// results in Top: 10 --> 5
```
* Pushes the value to the top of the stack
* Accepts 1 argument
* If the method is called with no argument, the value of the node will default to `undefined`
* If the method is called with more than 1 argument, only the first argument will be accepted

- #### `Stack.prototype.pop()`
```JavaScript
const myStack = new Stack();
myStack.push(5);
myStack.push(10);
myStack.pop();
// results 10
```
* Returns the value of the node at the `top` of the stack
* Removes that node from the stack
* The `top` of the stack is set to the next node down. Or null if there are no nodes left.
* If the method is called with arguments, they will be ignored

- #### `Stack.prototype.peek(<value>)`
```JavaScript
const myStack = new Stack();
myStack.push(5);
myStack.push(10);

myStack.peek(); // returns 10
```
* Returns the value of the node at the `top` of the stack
* **Does not** remove that node from the stack
* The `top` of the stack remains unchanged.
* If the method is called with arguments, they will be ignored


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
