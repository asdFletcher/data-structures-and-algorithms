# Linked List

## Author Fletcher LaRue

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


![CF](http://i.imgur.com/7v5ASc8.png) LAB 05: Linked Lists
=================================================


### Author: Fletcher LaRue

### Links and Resources

[![Build Status](https://www.travis-ci.com/asdFletcher/04-buffers.svg?branch=master)](https://www.travis-ci.com/asdFletcher/04-buffers)

* [repo](https://github.com/asdFletcher/data-structures-and-algorithms/tree/master/code-challenges/linked_list)
* [travis](https://www.travis-ci.com/asdFletcher/04-buffers)

--- 

---
Description:
This project involves reading and writing data to and from files using buffers. In the first exercise data is written in string form, converted to a buffer and written to a file using Node.js file system 'fs'. The second exercise takes data from a given text file, parses it and makes changes it (in this case, adding various HTML tags), and then writes it back to the same file.

---
### Files
#### `index.js`
#### `articler.js`
---
##### Exported Values and Methods for the following files:

There are no explicitly exported modules, but the functionality can be used or changed by running the two JavaScript files:

#### `index.js`
* none
#### `articler.js`
* none
---


##### Using the following files:
The modules:




Since there are no exported modules, these files can only be used directly. For example via `node <file name>` in the terminal.

- #### `index.js` behavior is as follows:

* Generates some content as a string
* allocate a buffer (default `utf-8`)
* convert the content to a buffer via `.charCodeAt()`
* write the file using `.writeFile`

- #### `articler.js` behavior is as follows:

* Read file from a specified path (hard coded)
* call `.readFile` using Node.js's `fs`
* convert the content to a buffer via `.charCodeAt()`
* alter the data `alterData()`
* write the file using `.writeFile`
* File is over-written by any changes

---

### Testing

Test files for each module are located in the repository as follows:

// TODO: Create test files

To perform testing using jest, run the following command in the terminal from the root of a local copy of the repository:
```JavaScript
npm jest --verbose --coverage
```

It is useful to bind this command to:
```JavaScript
npm test
```

An example of the `package.json` contents that create this bind is as follows:
```Javascript
  "scripts": {
    "test": "jest --verbose --coverage",
    "test-watch": "jest --watchAll --verbose --coverage"
  }
```

To create a `package.json` file run:
```JavaScript
npm init
```

---

### Dependencies

* jest: `npm i jest`
* Node.js included filesystem: `require('fs')`



### Setup
#### `.env` requirements
* n/a


#### Tests
TODO: Fill in the following
* How do you run tests?
* What assertions were made?
* What assertions need to be / should be made?
