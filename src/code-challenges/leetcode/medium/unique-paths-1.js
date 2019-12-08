/*
A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

How many possible unique paths are there?

BFS ?
- ensures all paths are taken
- result is the number of times that the sink is reached

- generate graph: Time: O(n*m)
- traverse the graph: Time: O(?)

*/

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
class GraphNode {
  constructor() {
    this.neighbors = [];
  }
}

class Graph {
  constructor() {
    this.root = null;
  }
}

const buildRectangularGraph = (m, n) => {
  let graph = new Graph();

  // build nodes in arrays
  let nArr = [];
  for (let i = 0 ; i < n; i++) {
    let mArr = [];
    for (let j = 0; j < m; j++) {
      mArr.push(new GraphNode());
    }
    nArr.push(mArr);
  }

  // traverse nodes and add pointers
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let node = nArr[i][j];
      let bottom = nArr[i + 1] && nArr[i + 1][j];
      let right = nArr[i] && nArr[i][j + 1];
      if (bottom) { node.neighbors.push(bottom); }
      if (right) { node.neighbors.push(right); }
    }
  }

  graph.root = nArr[0][0];
  return graph;
}

const uniquePaths = (m, n) => {
  if (m === 0) { return n; }
  if (n === 0) { return m; }

  let myGraph = buildRectangularGraph(m, n);
  let numPaths = 0;
  let q = [];
  q.push(myGraph.root);

  while(q.length) {
    let current = q.shift();
    for (let i = 0; i < current.neighbors.length; i++) {
      q.push(current.neighbors[i]);
    }
    if (current.neighbors.length === 0) {
      numPaths++;
    }
  }
  return numPaths;
};

let res = uniquePaths(9,11)
console.log(`res: `, res);
