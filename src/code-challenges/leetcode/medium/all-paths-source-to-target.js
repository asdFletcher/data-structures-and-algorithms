/*
Given a directed, acyclic graph of N nodes.  Find all possible paths from node 0 to node N-1, and return them in any order.

The graph is given as follows:  the nodes are 0, 1, ..., graph.length - 1.  graph[i] is a list of all nodes j for which the edge (i, j) exists.

Example:
Input: [[1,2], [3], [3], []] 
Output: [[0,1,3],[0,2,3]] 
Explanation: The graph looks like this:
0--->1
|    |
v    v
2--->3
There are two paths: 0 -> 1 -> 3 and 0 -> 2 -> 3.
Note:

The number of nodes in the graph will be in the range [2, 15].
You can print different paths in any order, but you should keep the order of nodes inside one path.
*/

/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
var allPathsSourceTarget = function(graph) {
  let paths = [];
  let currentPath = [];
  
  let sink = graph.length - 1;

  // depth first seach
  const go = (node, neighbors) => {
    currentPath.push(node);
    
    // base case
    if (node === sink) {
      let pathCopy = [...currentPath];
      paths.push(pathCopy);
      return;
    }

    // go thru each neighbor, pop when branch is fully explored
    for (let i = 0; i < neighbors.length; i++) {
      let nextNode = neighbors[i];
      go(nextNode, graph[nextNode]);
      currentPath.pop();
    }
  }

  go(0, graph[0]);

  return paths;
};

let input = [[1,2], [3], [3], []];

console.log(`allPathsSourceTarget: `, allPathsSourceTarget(input));

