'use strict';

const Graph = require('./../graph.js').Graph;

function possiblePath(graph, path){

  if(path.length <= 1) {return undefined; }
  if(!graph) { return undefined; }

  let nodes = graph.getNodes();
  let current;
  let cost = 0;
  
  // find start node
  let foundFirst = false;
  for( let node of nodes.keys() ){
    if (node.value === path[0]){
      current = node;
      foundFirst = true;
    }
  }
  if (!foundFirst) {return false; }
  
  // for each remaining city
  for(let i = 1; i < path.length; i++){
    let neighbors = graph.getNeighbors(current);
    let nextCity = path[i];
    let foundCity = false;

    // iterate thru neighbors
    for( let neighbor of neighbors.keys()) {
      if ( neighbor.value === nextCity){
        current = neighbor;
        cost += neighbors.get(neighbor);
        foundCity = true;
      }
    }
    
    if(!foundCity) { return false; }
  }
  return cost;
}



let myGraph = new Graph();

let pandora = myGraph.addNode('Pandora');
let arendelle = myGraph.addNode('Arendelle');
let metroville = myGraph.addNode('Metroville');
let monstropolis = myGraph.addNode('Monstropolis');
let naboo = myGraph.addNode('Naboo');
let narnia = myGraph.addNode('Narnia');


myGraph.addDoubleEdge(metroville,pandora,82);
myGraph.addDoubleEdge(metroville,arendelle,99);
myGraph.addDoubleEdge(metroville,monstropolis,105);
myGraph.addDoubleEdge(metroville,naboo,26);
myGraph.addDoubleEdge(metroville,narnia,37);

myGraph.addDoubleEdge(pandora,arendelle,150);
myGraph.addDoubleEdge(arendelle,monstropolis,42);
myGraph.addDoubleEdge(monstropolis,naboo,73);
myGraph.addDoubleEdge(naboo,narnia,250);

let path = ['Pandora', 'Arendelle', 'Metroville', 'Naboo'];
possiblePath(myGraph, path);

module.exports = possiblePath;