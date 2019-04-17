'use strict';

const Graph = require('./../graph.js');
const util = require('util');

function depthFirstGraphTraversal(adjacencyList){
  let result = [];
  let seen = new Set();

  let list = adjacencyList.keys();
  let listArr = [];
  for( let node of list){
    listArr.push(node);
  }

  let startNode = listArr[0];

  let _go = (node) => {
    result.push(node);
    seen.add(node);

    let neighborList = adjacencyList.get(node);
    for(let neighbor of neighborList.keys()){
      if(!seen.has(neighbor)){
        _go(neighbor);
      }
    }
  };

  _go(startNode);

  return result;
}

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

let nodeList = myGraph.getNodes();


let answer = depthFirstGraphTraversal(nodeList);
console.log(`The answer: ${util.inspect(answer)}`);



module.exports = depthFirstGraphTraversal;
