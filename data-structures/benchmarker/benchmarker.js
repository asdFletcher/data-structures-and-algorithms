'use strict';

const fs = require('fs');
let now = require('performance-now');

const AVLTree = require('../avl-tree/avl-tree.js');

const BST = require ('../binary-search-tree/binary-search-tree.js');

let n = 1000;
const sampleRate = 1;
let manyRandomNumbers = new Set();
const numberOfRuns = 1000;
let dataset = [];
const showLine = false;

function generateRandomNumbers(){
  manyRandomNumbers = new Set();
  while (manyRandomNumbers.size < n){
    let num = Math.floor(Math.random() * 1024 * 1024 * 128);
    manyRandomNumbers.add(num);
  }
}

function generateRandomNumberSet(count){
  let randomNumbers = new Set();
  while (randomNumbers.size < count){
    let num = Math.floor(Math.random() * 1024 * 1024 * 128);
    randomNumbers.add(num);
  }
  return randomNumbers;
}

function createBlankDataset(){
  let colors = ['red', 'blue', 'green', 'orange', 'black', 'purple', 'violet', 'brown', 'aquamarine', 'yellow'];
  
  for(let i = 0; i < numberOfRuns; i++){
    dataset.push({
      // label: i,
      pointBorderColor: 'rgba(0, 0, 0, 0)',
      pointBackgroundColor: `rgba(0, 0, 0, ${5 / 100})`,
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

function runSingleTest_Insert_Counter(){
  let times = new Array(n);
  // const myTree = new BST();
  const myTree = new AVLTree();
  
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

function runSingleTest_Remove_Counter(){
  let times = new Array(n);
  const myTree = new BST();
  let numbers = [];

  // build tree with random numbers
  manyRandomNumbers.forEach( val => {
    myTree.insert(val);
    numbers.push(val);
  });

  // remove them in a random order
  let i = 0;
  while (myTree.root){
    let randomIndex = Math.floor(Math.random() * manyRandomNumbers.size);
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
  const myTree = new BST();
  let numbers = [];

  // build tree with random numbers
  manyRandomNumbers.forEach( val => {
    myTree.insert(val);
    numbers.push(val);
  });

  // access them in a random order
  let i = 0;
  while (i < n){
    let randomIndex = Math.floor(Math.random() * manyRandomNumbers.size);
    let randomNodeValue = numbers[randomIndex];

    let success = myTree.contains(randomNodeValue);
    if(success){
      i++;
      times[treesize] = myTree.containsComputations;
    }
  }

  return times;
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
    for(let j = 0; j < 100; j++){
      let treeSize = i;

      const myTree = new BST();

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
    
      // access it
      myTree.printPreOrder();

      // save the data
      output.data.push({x: treeSize, y: myTree.printComputations});
    }
  }
  return [output];
}

function runTheTest(){
  for(let i = 0; i < numberOfRuns; i++){
    generateRandomNumbers();

    let totalStart = now();
    // let times = runSingleTest_Insert_Counter();
    // let times = runSingleTest_Remove_Counter();
    let times = runSingleTest_Contains_Counter();
    let totalEnd = now();

    let elapsed = (totalEnd-totalStart).toFixed(3);

    // console.log(`total Time for test ${i}: `, elapsed);
        
    dataset[i].data = postProcessA(times);
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

function writeResultsToFile(data){

  let stringData = JSON.stringify(data);

  fs.writeFile('temp.json', stringData, function(err, data) {
    if (err) console.log(err);
  });
}

function doStuff(){

  createBlankDataset();
  console.log(`running the test 🥕`);
  // runTheTest();
  let output = runTheTest_Variable_Tree_Size();
  console.log(`Test complete, 🍌`);
  
  writeResultsToFile(output);
}

doStuff();
