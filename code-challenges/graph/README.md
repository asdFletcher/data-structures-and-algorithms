![CF](http://i.imgur.com/7v5ASc8.png)
=================================================

### Graphs

### Author: Fletcher LaRue

### Links and Resources

[![Build Status](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms.svg?branch=master)](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms/graph)

* [repo](https://github.com/asdFletcher/data-structures-and-algorithms/tree/master/code-challenges/graph)
* [travis](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms)

---

# Implemented a graph class

---
### Files
#### `graph.js`
#### `graph.test.js`

---
##### Exported Values and Methods for the following files:

#### `graph.js`
`graph.js` exports the `depthFirstGraphTraversal` function.

---

##### Using the `depthFirstGraphTraversal` function:

- #### `Graph` `constructor()`
```JavaScript

// create the graph and all the edges
let myGraph = new Graph();

let a = myGraph.addNode('A');
let b = myGraph.addNode('B');
let c = myGraph.addNode('C');
let d = myGraph.addNode('D');
let e = myGraph.addNode('E');
let f = myGraph.addNode('F');
let g = myGraph.addNode('G');
let h = myGraph.addNode('H');

myGraph.addDoubleEdge(a,b);
myGraph.addDoubleEdge(a,d);
myGraph.addDoubleEdge(b,d);
myGraph.addDoubleEdge(b,c);
myGraph.addDoubleEdge(c,g);
myGraph.addDoubleEdge(d,e);
myGraph.addDoubleEdge(d,h);
myGraph.addDoubleEdge(d,f);

// extract the adjacency list ( a map where the nodes are keys, and values are a list of neighbors)
let nodeList = myGraph.getNodes();

// feed that list to the traversal function
let answer = depthFirstGraphTraversal(nodeList);


```
## Efficiency
  * `depthFirstGraphTraversal()`
    * This returns an array of the graph nodes traversed depth-first given a list of all the nodes. Since the first node is not specified, the first node in the list is the start. Iterates through each neighbor in the order seen, and adds those nodes to a `seen` Set. If the node has already been seen, it does not re-visit the node. Adding the nodes to the set is O(1). Adding the nodes to the `seen` and `result` array could be said to be O(n) depending on the implementation, but in reality we should be using a hashmap (anything with constant time insertion AND lookup).

    Iterating through each node is O(n) where n is the number of nodes in the graph.
    
    - Time complexity: O(n)
    - Space complexity: constant





