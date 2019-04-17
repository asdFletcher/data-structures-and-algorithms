# Implementation of a `hashtable` class

### Author: Fletcher LaRue

### Links and Resources

[![Build Status](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms.svg?branch=master)](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms)

* [repo](https://github.com/asdFletcher/data-structures-and-algorithms/tree/master/code-challenges/hashtable)
* [travis](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms)

--- 

# Implementation of a hashtable 

O(1) insertion (average)
O(1) lookup (average)

* The `Hashtable` class holds inserted key value pairs in an array. There is a hashing function to turn keys (any string) into numbers in the range of the size of the array. There is a method to insert new values, find existing values given a key, and a method to determine if the key is contained in the table. Each element in the hash table is instantiated with an empty Linked List, when a unique key is added to the table, it becomes the value of the head node of that linked list. When two dissimilar keys hash to the same array index, a collision occurs, and the newest addition is appended to the front of the linked list.

---
### Files
#### `hashtable.js`
---
##### Exported Values and Methods for the following files:

#### `hashtable.js`
`hashtable.js` exports the Hashtable class, which has methods available for adding elements, testing for the existence of a value, retrieving values, and getting the hash value from the hash function.
* `Hashtable` class
    * Methods:
        * `constructor()`
        * `add(<value>)`
        * `find(<value>)`
        * `contains()`
        * `getHash(<value>)`
---

##### Using the `Hashtable` class methods:

- #### `Hashtable` `constructor()`
```JavaScript
const myHashtable = new Hashtable(10);
```
* Creates a new hashtable that is of the size specified
* Accepts one or no arguments
* If a number is not specified, or a number less than 1 is specified, the default value of size will be used
* The default size is 31 elements

- #### `Hashtable.prototype.add(<key>, <value>)`
```JavaScript
const myHashtable = new Hashtable(40);
myHashtable.add('key', 'value');
myHashtable.add('key two', 'value two');
```
* Given a `key` and `value` as argumennts, adds the value to the hashtable
* Accepts 2 arguments
  * a key, whuch must be a string
  * a value, which can be any data type
* If the method is called with no argument, an error is thrown
* If the key is not a string, an error is thrown
* If the method is called with more than 2 arguments, they will be ignored

- #### `Hashtable.prototype.find(<key>)`
```JavaScript
const myHashtable = new Hashtable();
myHashtable.add('key', 'value');
let result = myHashtable.find('key');

// result: 'value' 
```
* Given a `key`, returns the corresponding `value` in constant time
* Accepts 1 argument
* If the method is called with no argument, an error will be thrown
* If the method is called with any additional arguments, they will be ignored

- #### `Hashtable.prototype.contains(<value>)`
```JavaScript
const myHashtable = new Hashtable();
myHashtable.contains('key'); // returns false

myHashtable.add('key', 'value');
myHashtable.contains('key'); // returns true
```
* Returns `true` if the value exists in the hashtable
* Returns `false` if the value does not exist in the hashtable
* Accepts 1 argument, the key
* If the method is called with no argument, an error will be thrown
* If the method is called with any additional arguments, they will be ignored

- #### `Hashtable.prototype.getHash()`
```JavaScript
const myHashtable = new Hashtable();

let hashValue = myHashtable.getHash('key');

// hashValue = some number within the size of the hash
```
* Puts the given key through the hash function and returns the resulting number
* Accepts 1 argument, the key
* If the method is called with no argument, an error will be thrown
* If the method is called with any additional arguments, they will be ignored

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
