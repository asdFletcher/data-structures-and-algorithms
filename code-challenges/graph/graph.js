'use strict';

class Node{
  constructor(value){
    this.value = value;
  }
}

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
}

module.exports = {
  Graph,
  Node,
};
