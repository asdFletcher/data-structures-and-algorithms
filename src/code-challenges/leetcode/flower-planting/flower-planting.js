/*
You have N gardens, labelled 1 to N.  In each garden, you want to plant one of 4 types of flowers.

paths[i] = [x, y] describes the existence of a bidirectional path from garden x to garden y.

Also, there is no garden that has more than 3 paths coming into or leaving it.

Your task is to choose a flower type for each garden such that, for any two gardens connected by a path, they have different types of flowers.

Return any such a choice as an array answer, where answer[i] is the type of flower planted in the (i+1)-th garden.  The flower types are denoted 1, 2, 3, or 4.  It is guaranteed an answer exists.

Input: N = 3, paths = [[1,2],[2,3],[3,1]]
Output: [1,2,3]

Input: N = 4, paths = [[1,2],[3,4]]
Output: [1,2,1,2]

Input: N = 4, paths = [[1,2],[2,3],[3,4],[4,1],[1,3],[2,4]]
Output: [1,2,3,4]
 

Note:

1 <= N <= 10000
0 <= paths.size <= 20000
No garden has 4 or more paths coming into or leaving it.
It is guaranteed an answer exists.
*/

// if any garden has 0 paths, it doesn't matter
// if any test case has fewer than 4 gardens, assign any flower

// select random node, paint color 1
// go to neighbor, paint color 2,
// depth first traversal

// enqueue node
// loop:
  // dequeue it, color it first unused color
  // enqueue all neighbors

function getPaths(gardenNumber, paths) {
  let returnedPaths = [];

  for (let i = 0; i < paths.length; i++){
    let path = paths[i];
    if (path[0] === gardenNumber || path[1] === gardenNumber) {
      returnedPaths.push(paths[i]);
    }
  }
  return returnedPaths;
}

function generateGraph(paths) {
  let created = [];
  for (let i = 0; i < paths.length; i++) {
    let newNode = new GraphNode(i);
  }
  
}

class GraphNode {
  constructor(number) {
    this.number = number;
    this.flower = null;
    this.links = [];
  }
}

var gardenNoAdj = function(N, paths) {
  let queue = [];
  let visited = [];

  let i = 1;
  while (i < N) {
    while (queue.length > 0) {
      queue.push(i);
      let current = queue.shift; // bring off front
      let currentPaths = getPaths(i);
      // for each of the current paths
      // if it has not been visited
      // add it to the queue
      // assign current a flower visited[current] = 1 2 3 or 4
      // 
    }
    i++;
  }
};


