'use strict';

const Node = require('./graph-node.js');

class Graph {
  constructor(){
    this.nodeCount = 0;
    this.nodeList = new Map();
  }

  addNode(value) {
    let node = new Node(value);
    this.nodeList.set(node, new Map());
    this.nodeCount++;
    return node;
  }

  addEdge(startNode, endNode, weight = 0) {
    this._addEdge(startNode, endNode, weight);
  }

  addDoubleEdge(startNode, endNode, weight = 0){
    this._addEdge(startNode, endNode, weight, true);
  }

  _addEdge(startNode, endNode, weight = 0, isDouble){
    let startNodeMap = this.nodeList.get(startNode);
    let endNodeMap = this.nodeList.get(endNode);

    if(!startNodeMap || !endNodeMap){
      throw new Error(`__ERROR__ invalid nodes`);
    }

    startNodeMap.set(endNode, weight);
    
    if(isDouble){
      endNodeMap.set(startNode, weight);
    }
  }

  getNodes(){
    return this.nodeList;
  }

  getNeighbors(node){
    let neighborMap = this.nodeList.get(node);
    if (!neighborMap){
      throw new Error(`__ERROR__ invalid nodes`);
    }
    return neighborMap;
  }

  size(){
    return this.nodeCount;
  }

  breadthFirst(startNode){
    if (this.nodeCount === 0) {return; }

    let result = [];
    let queue = [];
    let seen = new Set();

    this._storeNode(startNode, result, queue, seen);
    this._processQueue(result, queue, seen);

    return result;
  }

  _processQueue(result, queue, seen){
    while(queue.length > 0){
      let neighborMap = this.getNeighbors(queue[0]);
      this._enqueueNeighbors(neighborMap, result, queue, seen);
      queue.shift();
    }
  }

  _enqueueNeighbors(map, result, queue, seen){
    for(let neighbor of map){
      let node = neighbor[0];
      if(seen.has(node)){
        continue;
      }
      this._storeNode(node, result, queue, seen);
    }
  }

  _storeNode(node, result, queue, seen){
    result.push(node);
    queue.push(node);
    seen.add(node);
  }

}
module.exports = Graph;

const myGraph = new Graph();

let a = myGraph.addNode(1);
let b = myGraph.addNode(2);
let c = myGraph.addNode(3);

myGraph.addEdge(a,b,1);
myGraph.addEdge(b,c,1);

let result = myGraph.breadthFirst(a);

console.log(result);
