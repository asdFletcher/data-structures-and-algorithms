'use strict';

const fs = require('fs');

const AVLTree = require('../../data-structures/avl-tree/avl-tree.js');
const BST = require('../../data-structures/binary-search-tree/binary-search-tree.js');
const SplayTree = require('../../data-structures/splay-tree/splay-tree.js');

const getEmptyTree = require('./getEmptyTree.js');
const getRandomNumberSet = require('./getRandomNumberSet.js');
const getRandomNumberArray = require('./getRandomNumberArray.js');
const getBlankDataset = require('./getBlankDataset.js');
const removeUndef = require('./removeUndef.js');
const getMaxNodeDepth = require('./getMaxNodeDepth.js');
const getAvgNodeDepth = require('./getAvgNodeDepth.js');
const singleRunInsert = require('./singleRunInsert.js');
const singleRunRemove = require('./singleRunRemove.js');
const getLogNData = require('./getLogNData.js');
const getExpData = require('./getExpData.js');

function runTheTest_Dependent_Tree_Size(numberOfRuns, n, sampleRate, method) {
  let opacity = 50;
  const dataset = getBlankDataset(numberOfRuns, opacity);
  const times = [];
  for (let i = 0; i < numberOfRuns; i += 1) {
    if (method === 'insert') {
      times = singleRunInsert(n, sampleRate);
    }
    if (method === 'remove') {
      times = singleRunRemove(n, sampleRate);
    }

    // dataset index is the arbitrary run number
    dataset[i].data = removeUndef(times);
  }

  return dataset;
}

function runTheTest_Variable_Tree_Size() {
  const output = {
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

  for (let i = 0; i < 100; i += 1) {
    for (let j = 0; j < 1000; j += 1) {
      const treeSize = i;

      const myTree = getEmptyTree(treeType);

      // generate random number set
      const randomNumbers = generateRandomNumberSet(treeSize);
      const numbers = [];

      // build tree with random numbers
      randomNumbers.forEach((val) => {
        myTree.insert(val);
        numbers.push(val);
      });

      // pick a random one
      const randomIndex = Math.floor(Math.random() * randomNumbers.size);
      const randomNodeValue = numbers[randomIndex];

      // perform operation and save data

      myTree.contains(randomNodeValue);
      output.data.push({ x: treeSize, y: myTree.containsComputations });

      // myTree.findMax();
      // output.data.push({x: treeSize, y: myTree.findMaxComputations});

      // myTree.findMin();
      // output.data.push({x: treeSize, y: myTree.findMinComputations});
    }
  }
  return [output];
}

function compositeTest_Ins_Del(numberOfRuns) {
  // empty data container
  let opacity = 50;
  const dataset = createBlankDataset(numberOfRuns, opacity);

  for(let r = 0; r < numberOfRuns; r++){
    let myTree = getEmptyTree(treeType);
    let treeSize = 0;
    // generate random numbers
    let numArray = generateRandomNumberArray(1000000);
    let data = [];
    let numbersInTree = [];

    // build tree
    let n = 100;
    for (let i = 0; i < n; i++){
      let randomNumber = numArray.shift();
      myTree.insert(randomNumber);
      numbersInTree.push(randomNumber);
      treeSize++;
    }

    for (let i = 0; i < n * n; i++){
      for(let j = 0; j < 1; j++){
        // select a random number
        let randomNumber = numArray.shift();
        myTree.insert(randomNumber);
        numbersInTree.push(randomNumber);
        treeSize++;
      }
      for(let k = 0; k < 1; k++){
        //generate random number between 1 and numbersInTree.length
        let randomIndex = Math.floor(Math.random() * numbersInTree.length);
        let randomNumber = numbersInTree[randomIndex];
        myTree.remove(randomNumber);
        numArray.push(randomNumber);
        numbersInTree.splice(randomIndex, 1);
        treeSize--;
      }

      // measure tree height and save data {x: tree size (number of nodes), y: average height}
      let maxDepth = getMaxNodeDepth(myTree);
      let maxDepth = getAvgNodeDepth(myTree);
      data[i] = maxDepth;
    }
    
    dataset[r].data = removeUndef(data);
  }
  return dataset;
}

function runSingleTest_Contains_Counter(treesize) {
  const times = new Array(n);
  const myTree = getEmptyTree(treeType);
  const numbers = [];

  const randomNumbers = generateRandomNumberSet(n);

  // build tree with random numbers
  randomNumbers.forEach((val) => {
    myTree.insert(val);
    numbers.push(val);
  });

  // access them in a random order
  let i = 0;
  while (i < n) {
    const randomIndex = Math.floor(Math.random() * randomNumbers.size);
    const randomNodeValue = numbers[randomIndex];

    const success = myTree.contains(randomNodeValue);
    if (success) {
      times[treesize] = myTree.containsComputations;
      i += 1;
    }
  }

  return times;
}

function calculateAverageFromSingleDataSet(dataset) {
  const xValues = new Map();

  for (let i = 0; i < dataset.length; i += 1) {
    const subData = dataset[i];
    const {data} = subData;

    for (let j = 0; j < data.length; j += 1) {
      const {x} = data[j];
      if (xValues.has(x)) {
        const oldYTotal = xValues.get(x).yTotal;
        const oldCount = xValues.get(x).count;
        xValues.set(x, { yTotal: oldYTotal + data[j].y, count: oldCount + 1 });
      } else {
        xValues.set(x, { yTotal: data[j].y, count: 1 });
      }
    }
  }
  const newDataSet = [];
  xValues.forEach((val, key) => {
    newDataSet.push({ x: key, y: val.yTotal / val.count });
  });

  const formattedData = {
    label: 'Average',
    pointBorderColor: 'rgba(255, 0, 0, 1)',
    pointBackgroundColor: `rgba(255, 0, 0, ${100 / 100})`,
    pointRadius: '2',
    borderColor: 'rgba(255, 0, 0, 1)',
    showLine: true,
    fill: false,
    labels: {
      display: true,
    },
    data: newDataSet,
  };
  return [formattedData];
}

function writeResultsToFile(data, filename) {
  const stringData = JSON.stringify(data);

  fs.writeFile(filename, stringData, (err, data) => {
    if (err) console.log(err);
  });
}

function createDataRaw(runs, n, sampleRate, method) {
  const output = runTheTest_Dependent_Tree_Size(runs, n, sampleRate, method);
  // let output = runTheTest_Variable_Tree_Size(runs);
  // let output = compositeTest_Ins_Del(runs);
  // writeResultsToFile(output, 'data1.json');
  return output;
}

function createDataAverage(runs, n, sampleRate, method) {
  // const output = runTheTest_Dependent_Tree_Size(runs, n, sampleRate, method);
  // let output = runTheTest_Variable_Tree_Size(runs);
  const averageData = calculateAverageFromSingleDataSet(output);
}

//
// main runner
// 
function createData() {
  // SplayTree, AVLTree, BST
  let treeType = 'BST';
  let method = 'insert';
  let start = 0;
  let end = 100;
  let n = Math.abs(end - start);
  
  // raw data params
  let rawRuns = 100;
  let rawSampleRate = 1;
  // avg data params (use more runs to get smoother avg plot)
  let avgRuns = 1000;
  let avgSampleRate = 1;

  let datasets = [
    ...createDataRaw(rawRuns, n, rawSampleRate, method),
    ...createDataAverage(avgRuns, n, avgSampleRate, method),
    // getLogNData(0, 100, {r: 25, g:150, b:0, a:1}),
    // getLogNData(100, 0, {r: 150, g:25, b:0, a:1}),
    // getExpData(start, end, {r: 150, g:25, b:0, a:1}, 0.5),
    // getExpData(start, end, {r: 150, g:25, b:0, a:1}, 1),
    // getExpData(start, end, {r: 150, g:25, b:0, a:1}, 2),
    // getExpData(start, end, {r: 150, g:25, b:0, a:1}, 0.5),
    // getExpData(start, end, {r: 150, g:25, b:0, a:1}, 1),
    // getExpData(start, end, {r: 150, g:25, b:0, a:1}, 2),
  ];

  writeResultsToFile(datasets, 'data1.json');
}

createData();

module.exports = {
  calculateAverageFromSingleDataSet,
};

