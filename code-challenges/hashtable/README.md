# Hashtable Implementation

### Author: Fletcher LaRue

### Links and Resources

[![Build Status](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms.svg?branch=master)](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms)

* [repo](https://github.com/asdFletcher/data-structures-and-algorithms/tree/master/code-challenges/hashtable)
* [travis](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms)

--- 


# Implementation a hashtable data structure
A class that has the same functionality as a linked list.

O(1) insertion
O(1) lookup

* The `Hashtable` class holds inserted key value pairs in an array. There is a hash method to turn keys into numbers in the range of the size of the table. There is a method to insert new values, find existing values given a key, and a method to determine if the key is contained in the table. Each element in the hash table array is instantiated with an empty Linked List. When the add value generates a collision, the additional values are added to the front of the linked list.

    * A method called `add` which takes a `key` and `value` as an argument and adds it to the array in constant time.

    * A method called `find` which takes a `key` and returns the corresponding `value` in constant time.

    * A method called `getHash` which takes a `key` and returns a number generated by the hashing function.

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
* adds the value to the hashtable
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
* Returns the value from the list corresponding to the key
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
* puts the key through the hash function and returns the resulting number
* Accepts 1 argument, the key
* If the method is called with no argument, an error will be thrown
* If the method is called with any additional arguments, they will be ignored

### Testing

Tests are located in the `__tests__` folder.

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