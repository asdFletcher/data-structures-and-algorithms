![CF](http://i.imgur.com/7v5ASc8.png) LAB 05: Linked Lists
=================================================


### Author: Fletcher LaRue

### Links and Resources

[![Build Status](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms.svg?branch=master)](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms)

* [repo](https://github.com/asdFletcher/data-structures-and-algorithms/tree/master/code-challenges/linked_list)
* [travis](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms)

--- 

---

# Implemented a linked list data structure
Make a class that has the same functionality as a linked list.

## Challenge
* Create a Node class that has properties for the value stored in the Node, and a pointer to the next Node.

* Within the `LinkedList` class, include a `head` property. Upon instantiation, an empty Linked List should be created.

    * This object should be aware of a default empty value assigned to head when the linked list is instantiated.

    * Define a method called `insert` which takes any value as an argument and adds a new node with that value to the head of the list with an O(1) Time performance.

    * Define a method called `includes` which takes any value as an argument and returns a boolean result depending on whether that value exists as a Node’s value somewhere within the list.

    * Define a method called `print` which takes in no arguments and outputs all of the current Node values in the Linked List.

* At no time should an exception or stack trace be shown to the end user. Catch and handle any such exceptions and return a printed value or operation which cleanly represents the state and either stops execution cleanly, or provides the user with clear direction and output.

* Be sure to follow your language/frameworks standard naming conventions (e.g. C# uses PascalCasing for all method and class names).

## Approach & Efficiency
<!-- What approach did you take? Why? What is the Big O space/time for this approach? -->


## API
<!-- Description of each method publicly available to your Linked List -->

---
### Files
#### `linked-list.js`
---
##### Exported Values and Methods for the following files:

#### `linked-list.js`
`linked-list.js` exports the LinkedList class, which has methods available for adding elements to the list, testing for the existence of a value, and printing the values in the list.
* `LinkedList` class
    * Methods:
        * `constructor()`
        * `add(<value>)`
        * `insert(<value>)`
        * `includes(<value>)`
        * `print()`
---

##### Using the `LinkedList` class methods:

- #### `LinkedList` `constructor()`
```JavaScript
const myList = new LinkedList();
```
* Creates a new linked list that is empty
* Accepts no arguments
* If arguments are passed in they will be ignored

- #### `LinkedList.prototype.add(<value>)`
```JavaScript
const myList = new LinkedList();
myList.add(5);
myList.add(10);
// results in HEAD: 5 --> 10
```
* Adds the value to the END of the list
* Accepts 1 argument
* If the method is called with no argument, the value will default to `undefined`
* If the method is called with more than 1 argument, only the first argument will be added

- #### `LinkedList.prototype.insert(<value>)`
```JavaScript
const myList = new LinkedList();
myList.insert(5);
myList.insert(10);
// results in HEAD: 10 --> 5
```
* Adds the value to the START of the list
* Accepts 1 argument
* If the method is called with no argument, the value will default to `undefined`
* If the method is called with more than 1 argument, only the first argument will be added

- #### `LinkedList.prototype.includes(<value>)`
```JavaScript
const myList = new LinkedList();
myList.insert(5);
myList.insert(10);

myList.includes(10); // returns true
```
* Returns `true` if the value exists in the list
* Returns `false` if the value does not exist in the list
* Loops through the list once to check for the existence of the value. Returns early if the value is found.
* Accepts 1 argument
* If the method is called with no argument, the value will default to `undefined`
* If the method is called with more than 1 argument, only the first argument will be searched for

- #### `LinkedList.prototype.print()`
```JavaScript
const myList = new LinkedList();
myList.insert(5);
myList.insert(10);

myList.includes(10); 
// log output:
// > 10
// > 5
```
* Console logs the all values in the list
* List values are logged in order starting from the start
* Each list value is logged as a separate console.log command
* This method logs the string 'undefined' if the list is empty
* Method accepts no arguments
* If the method is called with more than 1 or more arguments they are ignored
---

### Testing

The linked-list folder holds all files that define the linked list class:
`/data-structures-and-algorithms/code-challenges/linked_list`

Tests are written for the LinkedList class methods and can be found here:
`/data-structures-and-algorithms/code-challenges/linked_list/__tests__/linked-list.test.js`


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

