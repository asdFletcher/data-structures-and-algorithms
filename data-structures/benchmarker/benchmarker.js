'use strict';

const fs = require('fs');
let now = require('performance-now');

const AVLTree = require('../avl-tree/avl-tree.js');

const BST = require ('../binary-search-tree/binary-search-tree.js');

let n = 100;
let manyRandomNumbers = new Set();
const numberOfRuns = 10;

// for fixed tree size tests (insert, delete)

function runTheTest_Dependent_Tree_Size(){
  let dataset = createBlankDataset(numberOfRuns);

  for(let i = 0; i < numberOfRuns; i++){
    // let times = runSingleTest_Insert_Counter();
    let times = runSingleTest_Remove_Counter();
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
    showLine: true,
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

  // const myTree = new BST();
  const myTree = new AVLTree();
  let i = 0;
  
  let randomNumbers = generateRandomNumberSet(n);
  randomNumbers.forEach( val => {
    myTree.insert(val);
    times[i] = myTree.insertComputations;
    i++;
  });
  return times;
}

async function runSingleTest_Remove_Counter(){
  let times = new Array(n);

  // const myTree = new BST();
  const myTree = new AVLTree();
  
  let numbers = [];
  
  // build tree with random numbers
  let randomNumbers = generateRandomNumberSet(n);
  randomNumbers.forEach( async val => {
    await myTree.insert(val);
    numbers.push(val);
  });

  // remove them in a random order
  let i = 0;
  while (myTree.root){
    let randomIndex = Math.floor(Math.random() * randomNumbers.size);
    let randomNodeValue = numbers[randomIndex];

    let success = await myTree.remove(randomNodeValue);
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

function writeResultsToFile(data){

  let stringData = JSON.stringify(data);

  fs.writeFile('temp.json', stringData, function(err, data) {
    if (err) console.log(err);
  });
}

function doStuff(){

  console.log(`running the test 🥕`);
  let output = runTheTest_Dependent_Tree_Size();
  // let output = runTheTest_Variable_Tree_Size();

  console.log(`Test complete, 🍌`);
  
  writeResultsToFile(output);
}

doStuff();
