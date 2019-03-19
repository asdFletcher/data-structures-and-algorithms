'use strict';

const AVLTreeNode = require('../avl-tree/avl-tree-node.js');
const AVLTree = require('../avl-tree/avl-tree.js');


let plotPoints = [];
const n = 60000;
// const plotPointRate = 1000;
const sampleRate = 1000;
const manyRandomNumbers = new Set();

function generateRandomNumbers(){
  while (manyRandomNumbers.size < n){
    let num = Math.floor(Math.random() * 1024 * 1024 * 128);
    manyRandomNumbers.add(num);
  }
}

let times = new Array(n);

function runTheTest(){
  const myTree = new AVLTree();
  
  let i = 0;
  let ti = new Date().getTime();
  manyRandomNumbers.forEach( val => {
    
    // do the insertion
    myTree.insert(val);

    if (i % sampleRate === 0) {
      let tf = new Date().getTime();
      let elapsed = (tf-ti);
      // console.log(`added ${sampleRate} elements in: ${elapsed} ms`);

      times[i] = elapsed;
      
      ti = new Date().getTime();
    }
    i++;
  });
}

function postProcess(){
  for(let i = 0 ; i < times.length; i++){
    if (times[i] !== undefined) {
      plotPoints.push({x: i, y: times[i]});
    }
  }

}


function doStuff(){
  console.log(`generating numbers 🥩`);
  generateRandomNumbers();
  console.log(`running the test 🥕`);
  let totalStart = new Date().getTime();
  runTheTest();
  let totalEnd = new Date().getTime();
  console.log(`Test complete, 🍌`);
  postProcess();
  console.log(`Post processing complete 🥦!`);
  // console.log(JSON.stringify(plotPoints))
  console.log(plotPoints);
  console.log(`total Time: `, totalEnd-totalStart);
  // console.log(`${data[data.length-1].y - data[0].y} ms`);
}

doStuff();

