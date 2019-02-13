![CF](http://i.imgur.com/7v5ASc8.png)
=================================================

### Depth first traversal

### Author: Fletcher LaRue

### Links and Resources

[![Build Status](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms.svg?branch=master)](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms/graph)

* [repo](https://github.com/asdFletcher/data-structures-and-algorithms/tree/master/code-challenges/graph)
* [travis](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms)

---

# Implemented a depth first traversal of a graph

Create a function that accepts an adjacency list as a graph, and conducts a depth first traversal. Without utilizing any of the built-in methods available to your language, return a collection of nodes in their pre-order depth-first traversal order.
---
### Files
#### `depth-first.js`

---
##### Exported Values and Methods for the following files:

#### `depth-first.js`
`graph.js` exports the `Graph` and `Node` class, which have methods for adding and removing nodes. Including a `addNode`, `addEdge`, and `getNodes` methods.


* `Graph` class
    * Properties
      * `nodeCount` - integer that stores the total node count
      * `nodeList` - map that stores the nodes and their edges
    * Methods:
      * `constructor()`
      * `addNode(<value>)`
      * `addEdge(<startNode>, <endNode>, <weight = 0>)`
      * `getNodes()`
      * `getNeighbors(<node>)`
      * `size()`
* `Node` class
  * Properties
      * `value` - the node value
  * Methods:
      * `constructor(<value>)`

---

##### Using the `Graph` class methods:

- #### `Graph` `constructor()`
```JavaScript
const myGraph = new Graph();
```
* Creates a new graph that is empty
* Accepts no arguments
* If arguments are passed in they will be ignored
* The `nodeList` property of a new empty graph is an empty JavaScript `map` object
* The `nodeCount` property of a new empty graph is `0`

- #### `Graph.prototype.addNode(<value>)`
```JavaScript
const myGraph = new Graph();
myGraph.addNode(5);
myGraph.addNode([1,2,3]);

myGraph.getNodes();

// Map {
//   Node { value: 5 } => Map {},
//   Node { value: [ 1, 2, 3 ] } => Map {} }
```
* Creates a new `Node` with the given `value`
* Adds the node to the graph
* Accepts 1 argument
* The value of a node can be anything
* If the method is called with no argument, the value will default to `undefined`
* If the method is called with more than 1 argument, only the first argument will be accepted
* Returns a reference to the node. This is important for setting edges once the node is added.

- #### `Graph.prototype.addEdge(<startNode>, <endNode>, <weight = 0>)`
```JavaScript
const myGraph = new Graph();
let a = myGraph.addNode(5);
let b = myGraph.addNode([1,2,3]);

myGraph.addEdge(a,b,10);

myGraph.getNeighbors(a);
// Map { Node { value: [ 1, 2, 3 ] } => 10 }
```
* Creates a new 1-way edge from the 1st node to the 2nd node
* The edge can have a weight specified as a 3rd argument
* The weight defaults to 0
* Accepts 3 arguments:
  * start node
    * this node must be in the graph already
  * end node
    * this node must be in the graph already
  * edge weight
    * the edge weight can be any data type
* The weight is stored as a value in a JavaScript Map
* If either node is not in the graph or is undefined an error will be thrown
* If the method is called with more than 3 arguments, they will be ignored


- #### `Graph.prototype.getNodes()`
```JavaScript
const myGraph = new Graph();
let a = myGraph.addNode(5);
let b = myGraph.addNode([1,2,3]);
myGraph.addEdge(a,b,10);

let myNodeList = myGraph.getNodes();

// Map {
//   Node { value: 5 } => Map { Node { value: [Array] } => 10 },
//   Node { value: [ 1, 2, 3 ] } => Map {} }
```
* Returns a Map of all nodes
  * Map keys are the nodes
  * Map values is a map of that node's outgoing edges
* Internally, simply returns the Graph property `this.nodeList`
* Accepts no arguments
* If the method is called with any arguments they will be ignored
---

- #### `Graph.prototype.getNeighbors(<node>)`
```JavaScript
let myGraph = new Graph();

let a = myGraph.addNode(5);
let b = myGraph.addNode([1,2,3]);
let c = myGraph.addNode('a string');

myGraph.addEdge(a,b,10);
myGraph.addEdge(a,c,20);

console.log(myGraph.getNeighbors(a));
// Map {
//   Node { value: [ 1, 2, 3 ] } => 10,
//   Node { value: 'a string' } => 20 }
console.log(myGraph.getNeighbors(b));
// Map {}
```
* Returns a map of the node's neighbors
  * Neighbors connected via outgoing edges are included
  * Neighbors connected via incoming edges are **NOT** included
* Accepts 1 arguments, the node of interest
* If the method is called with more than 1 arguments, they will be ignored


- #### `Graph.prototype.size()`
```JavaScript
let myGraph = new Graph();

let a = myGraph.addNode(5);
let b = myGraph.addNode([1,2,3]);
let c = myGraph.addNode('a string');

console.log(myGraph.size());
// 3

```
* Returns the number of nodes in the graph as an integer
* All nodes are included, even those without neighbors
* Accepts 0 arguments
* If the method is called with any arguments they will be ignored


- #### `Graph.prototype.breadthFirst(<start node>)`
```JavaScript
const myGraph = new Graph();

let a = myGraph.addNode(1);
let b = myGraph.addNode(2);
let c = myGraph.addNode(3);

myGraph.addEdge(a,b,1);
myGraph.addEdge(b,c,1);

let result = myGraph.breadthFirst(a);

console.log(result);
// [ Node { value: 1 }, Node { value: 2 }, Node { value: 3 } ]

```
* Returns an array of nodes in the order processed by a breadth-first traversal
* Accepts 1 argument, the starting node
* If the method is called with any additional arguments they will be ignored
* Returns undefined if the graph has no nodes.

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

## Implementation and efficiency

* Methods:
  * `constructor()`
    * constant time
    
  * `addNode(<value>)`
    * All nodes are stored in a JavaScript map, so insertion, lookup, and deletion are all constant time, average case, with a possibility of O(n). For almost all cases this can be treated as constant time.

  * `addEdge(<startNode>, <endNode>, <weight = 0>)`
      * All edges are stored in a JavaScript map, so insertion, lookup, and deletion are all constant time, average case, with a possibility of O(n). For almost all cases this can be treated as constant time.
  * `getNodes()`
    * This returns the Graph property `this.nodeList` and is constant time.

  * `getNeighbors(<node>)`
    * This is a JavaScript Map object lookup, which is constant time.

  * `size()`
    * This returns the Graph property `this.nodeCount` and is constant time.

  * `breadthFirst()`
    * This returns an array of the graph traversed breadth-first given a starting node. Adds all neighbor nodes to a queue in the order that it finds them, and processes them from the front of the queue. In a connected graph this will reach all nodes. All nodes are stored in a results `Array`, a queue (which is actually an `Array`), and a seen `Set`. All nodes are pass by reference so the space complexity is the cost of storing these pointers. I'll call this O(1) since we're not copying any of the data. If the queue was an actual Queue with O(1) insertion and deletion, then all operations would be O(1). Actual time complexity depends on the Array.push and Array.shift methods. **Summary**: Time complexity is O(n), and space complexity is O(1).




