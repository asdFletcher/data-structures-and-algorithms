![CF](http://i.imgur.com/7v5ASc8.png) Zipper 2 Linked Lists 
=================================================


### Author: Fletcher LaRue and Heather Cherewaty

### Links and Resources

[![Build Status](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms.svg?branch=master)](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms)

* [repo](https://github.com/asdFletcher/data-structures-and-algorithms/tree/master/code-challenges/llMerge)
* [travis](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms)

--- 

---

# Implemented a stack and queue class


---
### Files
#### `stacks-and-queues.js`

---
##### Exported Values and Methods for the following files:

#### `stacks-and-queues.js`
`stacks-and-queues.js` exports the `Stack` and `Queue` class, which have methods for adding and removing elements that follow the traditional data structure scheme for stacks and queues. 

**Queues** take elements in on one end and emit them on the other, just like a queue at the grocery store. It stores a pointer to the front and back of the queue. It can only add elements at the back. A queue can peek at the `front` element without removing it. It is said to have FIFO (**F**irst **i**n **f**irst **O**ut) ordering.

**Stacks** take elements in on one end and emit them on the same end, just like people getting in an elevator (assuming they all are polite and get off on the same floor). A stack can peek at the top element without removing it. It is said to have FILO (**F**irst **i**n **l**ast **O**ut) ordering.

* `Stack` class
    * Methods:
        * `constructor()`
        * `push(<value>)`
        * `pop()`
        * `peek()`

* `Queue` class
    * Methods:
        * `constructor()`
        * `enqueue(<value>)`
        * `dequeue(<value>)`
        * `peek()`
---

##### Using the `Stack` class methods:

- #### `Stack` `constructor()`
```JavaScript
const myStack = new Stack();
```
* Creates a new stack that is empty
* Accepts no arguments
* If arguments are passed in they will be ignored
* The `top` value of a new empty stack is `null`

- #### `Stack.prototype.push(<value>)`
```JavaScript
const myStack = new Stack();
myStack.push(5);
myStack.push(10);
// results in Top: 5 --> 10
```
* Pushes the value to the top of the stack
* Accepts 1 argument
* If the method is called with no argument, the value will default to `undefined`
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

--- 



---

### To-do list
- [x] Read all of these instructions carefully
- [x] All work in repo: `data-structures-and-algorithms`
- [x] Work on branch: `stack_and_queue`
- [x] Work in folder: `stacksAndQueues`
- [x] Work in file: `stacks-and-queues.js`
- [x] Create the `queue` and `stack` and `node` class
- [x] Write at least three test assertions for each method that you define.
- [x] Ensure your tests are passing before you submit your solution.
- [x] Document your implementation with a README.md
- [x] Create a pull request from your branch to your master branch
- [x] In your open pull request, leave as a comment a checklist
- [ ] Submitting your completed work to Canvas (soon)
- [ ] Merge your branch into master (soon)
