## Implementation of a queue class

![CF](http://i.imgur.com/7v5ASc8.png)
=================================================

### Author: Fletcher LaRue

### Links and Resources

[![Build Status](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms.svg?branch=master)](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms)

* [repo](https://github.com/asdFletcher/data-structures-and-algorithms)
* [travis](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms)


---
### Files
#### `queue.js`
#### `queue-node.js`

---
##### Exported Values and Methods for the following files:

#### `queue.js`
`queue.js` exports the `Queue` class, which has methods for adding and removing elements that follow the traditional data structure scheme for a queue. 

**Queues** take elements in on one end and emit them on the other, just like a queue at the grocery store. It stores a pointer to the front and back of the queue. It can only add elements at the back. A queue can peek at the `front` element without removing it. It is said to have FIFO (**F**irst **i**n **f**irst **O**ut) ordering.

* `Queue` class
    * Methods:
        * `constructor()`
        * `enqueue(<value>)`
        * `dequeue(<value>)`
        * `peek()`

---

##### Using the `Queue` class methods:

- #### `Queue` `constructor()`
```JavaScript
const myQueue = new Queue();
```
* Creates a new queue that is empty
* Accepts no arguments
* If arguments are passed in they will be ignored
* The `front` and `back` of a new empty queue is `null`

- #### `Queue.prototype.enqueue(<value>)`
```JavaScript
const myQueue = new Queue();
myQueue.enqueue(5);
myQueue.enqueue(10);
myQueue.enqueue(12);
myQueue.enqueue(15);
// results in Front: 5 --> 10 --> 12 -->  Back: 15
```
* Enqueues the value to the front of the Queue
* If it is the only element in the queue, both the `front` and `back` will point to it
* Accepts 1 argument
* If the method is called with no argument, the value will default to `undefined`
* If the method is called with more than 1 argument, only the first argument will be accepted

- #### `Queue.prototype.dequeue()`
```JavaScript
const myQueue = new Queue();
myQueue.enqueue(5);
myQueue.enqueue(10);
myQueue.enqueue(12);
myQueue.enqueue(15);

myQueue.dequeue();
// returns 5
// results in Front: 10 --> 12 -->  Back: 15
```
* Returns the value of the node at the `front` of the queue
* Removes that node from the Queue
* The `front` of the queue is set to the next node. Or null if there are no nodes left.
* If the method is called with arguments, they will be ignored

- #### `Queue.prototype.peek(<value>)`
```JavaScript
const myQueue = new Queue();
myQueue.enqueue(5);
myQueue.enqueue(10);

myQueue.peek(); // returns 5
```
* Returns the value of the node at the `front` of the queue
* **Does not** remove that node from the queue
* The `front` of the Queue remains unchanged.
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
