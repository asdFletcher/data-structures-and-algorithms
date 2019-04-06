'use strict';

const fs = require('fs');

const AVLTree = require('../avl-tree/avl-tree.js');
const BST = require ('../binary-search-tree/binary-search-tree.js');

function getEmptyTree(){
  if(treeType === 'AVLTree'){
    return new AVLTree();
  }
  if(treeType === 'BST'){
    return new BST();
  }
}

function runTheTest_Dependent_Tree_Size(){
  let dataset = createBlankDataset(numberOfRuns);

  for(let i = 0; i < numberOfRuns; i++){
    let times = runSingleTest_Insert_Counter();
    // let times = runSingleTest_Remove_Counter();
    // let times = runSingleTest_Contains_Counter();

    dataset[i].data = postProcess(times);
  }
  
  return dataset;
}

function runTheTest_Variable_Tree_Size(){

  let output = {
    // label: i,
    pointBorderColor: 'rgba(0, 0, 0, 0)',
    pointBackgroundColor: `rgba(0, 0, 0, ${5 / 100})`,
    pointRadius: '2',
    showLine: false,
    labels: {
      display: false,
    },
    data: [],
  };

  for(let i = 0; i < 100; i++){
    for(let j = 0; j < 1000; j++){
      let treeSize = i;

      const myTree = getEmptyTree();

      // generate random number set
      let randomNumbers = generateRandomNumberSet(treeSize);
      let numbers = [];
    
      // build tree with random numbers
      randomNumbers.forEach( val => {
        myTree.insert(val);
        numbers.push(val);
      });

      // pick a random one
      let randomIndex = Math.floor(Math.random() * randomNumbers.size);
      let randomNodeValue = numbers[randomIndex];

      // perform operation and save data

      myTree.contains(randomNodeValue);
      output.data.push({x: treeSize, y: myTree.containsComputations});

      // myTree.findMax();
      // output.data.push({x: treeSize, y: myTree.findMaxComputations});

      // myTree.findMin();
      // output.data.push({x: treeSize, y: myTree.findMinComputations});
    }
  }
  return [output];
}

function generateRandomNumberSet(count){
  let randomNumbers = new Set();
  while (randomNumbers.size < count){
    let num = Math.floor(Math.random() * 1024 * 1024 * 128);
    randomNumbers.add(num);
  }
  return randomNumbers;
}

function createBlankDataset(count){
  let colors = ['red', 'blue', 'green', 'orange', 'black', 'purple', 'violet', 'brown', 'aquamarine', 'yellow'];
  
  let dataset = [];

  for(let i = 0; i < count; i++){
    dataset.push({
      // label: i,
      pointBorderColor: 'rgba(0, 0, 0, 0)',
      pointBackgroundColor: `rgba(0, 0, 0, ${5 / 100})`,
      pointRadius: '2',
      showLine: false,
      labels: {
        display: false,
      },
    });
  }

  return dataset;
}

function runSingleTest_Insert_Counter(){
  let times = new Array(n);

  const myTree = getEmptyTree();
  let i = 0;
  
  let randomNumbers = generateRandomNumberSet(n);
  randomNumbers.forEach( val => {
    myTree.insert(val);
    if(i%sampleRate === 0){
      times[i] = myTree.insertComputations;
    }
    i++;
  });
  return times;
}

function runSingleTest_Remove_Counter(){
  let times = new Array(n);

  const myTree = getEmptyTree();
  let numbers = [];
  
  // build tree with random numbers
  let randomNumbers = generateRandomNumberSet(n);
  randomNumbers.forEach( val => {
    myTree.insert(val);
    numbers.push(val);
  });

  // remove them in a random order
  let i = 0;
  while (myTree.root){
    let randomIndex = Math.floor(Math.random() * randomNumbers.size);
    let randomNodeValue = numbers[randomIndex];

    let success = myTree.remove(randomNodeValue);
    if(success){
      i++;
      times[i] = myTree.removeComputations;
    }
  }

  return times;
}

function runSingleTest_Contains_Counter(treesize){
  let times = new Array(n);
  const myTree = getEmptyTree();
  let numbers = [];

  let randomNumbers = generateRandomNumberSet(n);

  // build tree with random numbers
  randomNumbers.forEach( val => {
    myTree.insert(val);
    numbers.push(val);
  });

  // access them in a random order
  let i = 0;
  while (i < n){
    let randomIndex = Math.floor(Math.random() * randomNumbers.size);
    let randomNodeValue = numbers[randomIndex];

    let success = myTree.contains(randomNodeValue);
    if(success){
      times[treesize] = myTree.containsComputations;
      i++;
    }
  }

  return times;
}

function postProcess(arr){
  let result = [];
  for(let i = 0 ; i < arr.length; i++){
    if (arr[i] !== undefined) {
      result.push({x: i, y: arr[i]});
    }
  }

  return result;
}

function calculateAverageNodeDepth(tree){
  let depths = new Map();

  let currentDepth = 0;
  const _go = (node) => {
    if(depths.has(currentDepth)){
      let count = depths.get(currentDepth);
      depths.set(currentDepth, count + 1);
    } else {
      depths.set(currentDepth, 1);
    }
    currentDepth++;
    if (node.left) { _go(node.left); }
    if (node.right) { _go(node.right); }
    currentDepth--;
  };

  _go(tree.root);
  
  let numberOfNodes = 0;
  let totalDepth = 0;
  depths.forEach((val, key) => {
    numberOfNodes+= val;
    totalDepth = totalDepth + key*val;
  });

  let avg = totalDepth / numberOfNodes;

  return avg;
}

function calculateAverageFromSingleDataSet(dataset){
  let xValues = new Map();

  for(let i = 0; i < dataset.length; i++){
    let subData = dataset[i];
    let data = subData.data;

    for(let j = 0; j < data.length; j++){
      let x = data[j].x;
      if (xValues.has(x)){
        let oldYTotal = xValues.get(x).yTotal;
        let oldCount = xValues.get(x).count;
        xValues.set(x, {yTotal: oldYTotal + data[j].y, count: oldCount + 1});
      } else {
        xValues.set(x, {yTotal: data[j].y, count: 1});
      }
    }
  }
  let newDataSet = [];
  xValues.forEach( (val, key) => {
    newDataSet.push({x: key, y: val.yTotal/val.count}) ;
  });

  let formattedData = {
    label: 'Average',
    pointBorderColor: 'rgba(255, 0, 0, 1)',
    pointBackgroundColor: `rgba(255, 0, 0, ${100 / 100})`,
    pointRadius: '2',
    borderColor:'rgba(255, 0, 0, 1)',
    showLine: true,
    fill: false,
    labels: {
      display: true,
    },
    data: newDataSet,
  };
  return [formattedData];
}

function writeResultsToFile(data, filename){

  let stringData = JSON.stringify(data);

  fs.writeFile(filename, stringData, function(err, data) {
    if (err) console.log(err);
  });
}

function createLogNData(){
  n = 100;
  let data = [];
  for(let i = 1; i <= n; i++){
    data.push({ x: 100-i, y: Math.log2(i) });
  }
  // console.log(`data: `, data);

  let formattedData = {
    label: 'Average',
    pointBorderColor: 'rgba(255, 0, 0, 1)',
    pointBackgroundColor: `rgba(255, 0, 0, ${100 / 100})`,
    pointRadius: '2',
    borderColor:'rgba(255, 70, 0, 1)',
    showLine: true,
    fill: false,
    labels: {
      display: true,
    },
    data: data,
  };

  writeResultsToFile([formattedData], 'lognto1000.json');
}

function createDataRaw(){
  n = 500000;
  numberOfRuns = 100;
  let output = runTheTest_Dependent_Tree_Size();
  // let output = runTheTest_Variable_Tree_Size();
  writeResultsToFile(output, 'data1.json');
}

function createDataAverage(){
  n = 100;
  numberOfRuns = 1;
  let output = runTheTest_Dependent_Tree_Size();
  // let output = runTheTest_Variable_Tree_Size();
  let averageData = calculateAverageFromSingleDataSet(output);
  writeResultsToFile(averageData, 'data2.json');
}

let n;
let numberOfRuns;
let manyRandomNumbers = new Set();
// let treeType = "AVLTree";
let treeType = "BST";
let sampleRate = 1000;

createDataRaw();
// createDataAverage();

// createLogNData();

module.exports = {
  calculateAverageFromSingleDataSet,
  
};