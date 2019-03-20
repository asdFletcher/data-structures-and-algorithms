'use strict';

const fs = require('fs');
let now = require('performance-now');

const AVLTree = require('../avl-tree/avl-tree.js');

const BST = require ('../binary-search-tree/binary-search-tree.js');

const n = 15;
const sampleRate = 1;
let manyRandomNumbers = new Set();
const numberOfRuns = 5;
const dataset = [];
const showLine = false;

function generateRandomNumbers(){
  manyRandomNumbers = new Set();
  while (manyRandomNumbers.size < n){
    let num = Math.floor(Math.random() * 1024 * 1024 * 128);
    manyRandomNumbers.add(num);
  }
}

function createBlankDataset(){
  let colors = ['red', 'blue', 'green', 'orange', 'black', 'purple', 'violet', 'brown', 'aquamarine', 'yellow'];
  
  for(let i = 0; i < numberOfRuns; i++){
    dataset.push({
      // label: i,
      pointBorderColor: 'rgba(0, 0, 0, 0)',
      pointBackgroundColor: 'rgba(0, 0, 0, 0.01)',
      pointRadius: '2',
      showLine: showLine,
      labels: {
        display: false,
      },
    });
  }
}

function runSingleTest_WallClock(){
  let times = new Array(n);
  const myTree = new BST();
  
  let i = 0;
  manyRandomNumbers.forEach( val => {
    // do the insertion with timing
    if (i % sampleRate === 0 && i !== 0) {
      let ti = now();
      myTree.insert(val);
      let tf = now();
      let elapsed = (tf-ti).toFixed(3);
      times[i] = elapsed;
    } else {
      // do the insertion w o timing
      myTree.insert(val);
    }
    i++;
  });
  return times;
}

function runSingleTest_Counter(){
  let times = new Array(n);
  const myTree = new BST();
  
  let i = 0;
  manyRandomNumbers.forEach( val => {
    // do the insertion with timing
    if (i % sampleRate === 0 && i !== 0) {
      myTree.insert(val);

      times[i] = myTree.insertComputations;
    } else {
      // do the insertion w o timing
      myTree.insert(val);
    }
    i++;
  });
  return times;
}

function runTheTest(){
  for(let i = 0; i < numberOfRuns; i++){
    // console.log(`generating numbers 🥩`);
    generateRandomNumbers();

    let totalStart = now();
    let times = runSingleTest_Counter();
    let totalEnd = now();

    let elapsed = (totalEnd-totalStart).toFixed(3);

    // console.log(`total Time for test ${i}: `, elapsed);
    let resultA = postProcessA(times);
        
    dataset[i].data = resultA;
  }

  


}

function postProcessA(arr){
  let result = [];
  for(let i = 0 ; i < arr.length; i++){
    if (arr[i] !== undefined) {
      result.push({x: i, y: arr[i]});
    }
  }

  return result;
}

function postProcessB(){
  const newDataSets = [];
  for(let i = 0; i < numberOfRuns; i++){
    newDataSets.push({
      // label: i,
      // pointBorderColor: 'rgba(0, 0, 0, 0)',
      // pointBackgroundColor: 'rgba(0, 0, 0, 0.01)',
      // pointRadius: '2',
      // showLine: showLine,
      data: [],
      // labels: {
      //   display: false,
      // },
      // runNumber: i,
    });

    // console.log(`new data sets: `, newDataSets);
    for(let j = 0; j < n-1; j++){
      console.log(`dataset[${i}].data[${j}]: `, newDataSets[i].data[j]);
      if (newDataSets[0].data[j] === undefined){
        newDataSets[0].data[j] = {x:i, y:j, count: 0};
        console.log(`initial detected i: ${i}, j:${j}, count: ${newDataSets[0].data[j].count}`);
      } else {
        newDataSets[0].data[j].count++;
        console.log(`duplicate i: ${i}, j:${j}, count: ${newDataSets[0].data[j].count}`);
      }
    }
  }

  // if (dataset[i].data[j] !== undefined){
  // }

  return newDataSets;
}


function writeResultsToFile(){

  let resultB = postProcessB();

  // let stringData = JSON.stringify(dataset);
  // let stringData = JSON.stringify(resultB);
  let a = [...dataset , ...resultB];
  let stringData = JSON.stringify(a);

  fs.writeFile('temp.json', stringData, function(err, data) {
    if (err) console.log(err);
  });
}

function doStuff(){

  createBlankDataset();
  console.log(`running the test 🥕`);
  runTheTest();
  console.log(`Test complete, 🍌`);
  
  console.log(`Post processing complete 🥦!`);
  // console.log(JSON.stringify(plotPoints))
  // console.log(dataset);
  // console.log(`${data[data.length-1].y - data[0].y} ms`);
  writeResultsToFile();
}

doStuff();
