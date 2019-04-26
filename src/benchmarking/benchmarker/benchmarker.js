'use strict';

const fs = require('fs');

const AVLTree = require('../../data-structures/avl-tree/avl-tree.js');
const BST = require('../../data-structures/binary-search-tree/binary-search-tree.js');
const SplayTree = require('../../data-structures/splay-tree/splay-tree.js');

function getEmptyTree() {
  if (treeType === 'AVLTree') {
    return new AVLTree();
  }
  if (treeType === 'BST') {
    return new BST();
  }
  if (treeType === 'SplayTree') {
    return new SplayTree();
  }
}

function runTheTest_Dependent_Tree_Size() {
  const dataset = createBlankDataset(numberOfRuns);

  for (let i = 0; i < numberOfRuns; i += 1) {
    // const times = runSingleTest_Insert_Counter();
    let times = runSingleTest_Remove_Counter();
    // let times = runSingleTest_Contains_Counter();

    // dataset index is the arbitrary run number
    dataset[i].data = postProcess(times);
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

      const myTree = getEmptyTree();

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

function generateRandomNumberSet(count) {
  const randomNumbers = new Set();
  while (randomNumbers.size < count) {
    const num = Math.floor(Math.random() * 1024 * 1024 * 128);
    randomNumbers.add(num);
  }
  return randomNumbers;
}

function createBlankDataset(count) {
  const colors = ['red', 'blue', 'green', 'orange', 'black', 'purple', 'violet', 'brown', 'aquamarine', 'yellow'];

  const dataset = [];

  for (let i = 0; i < count; i += 1) {
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

function runSingleTest_Insert_Counter() {
  const times = new Array(n);

  const myTree = getEmptyTree();
  let i = 0;

  let sum = 0;
  const counterCallback = () => { sum += 1; }

  // generate n random numbers
  const randomNumbers = generateRandomNumberSet(n);
  randomNumbers.forEach((val) => {
    
    if (i % sampleRate === 0) {
      sum = 0;
      // console.log(`in the cb`)

      myTree.insert(val, counterCallback);
      // times index correlates to tree size
      // times[i] = myTree.insertComputations;
      times[i] = sum;
    } else {
      myTree.insert(val, undefined);
    }
    i += 1;
  });
  // return array of insert computations for each tree size
  return times;
}

function runSingleTest_Remove_Counter() {
  const times = new Array(n);

  const myTree = getEmptyTree();
  const numbers = [];

  // build tree with random numbers
  const randomNumbers = generateRandomNumberSet(n);
  randomNumbers.forEach((val) => {
    myTree.insert(val);
    numbers.push(val);
  });

  let sum = 0;
  const counterCallback = () => { sum += 1; }

  // remove them in a random order
  let i = 0;
  while (myTree.root) {
    const randomIndex = Math.floor(Math.random() * randomNumbers.size);
    const randomNodeValue = numbers[randomIndex];

    sum = 0;
    const success = myTree.remove(randomNodeValue, counterCallback);
    if (success) {
      i += 1;
      if (i % sampleRate === 0) {
        times[i] = sum;
      }
    }
  }

  return times;
}

function runSingleTest_Contains_Counter(treesize) {
  const times = new Array(n);
  const myTree = getEmptyTree();
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

function postProcess(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] !== undefined) {
      result.push({ x: i, y: arr[i] });
    }
  }

  return result;
}

function calculateAverageNodeDepth(tree) {
  const depths = new Map();

  let currentDepth = 0;
  const _go = (node) => {
    if (depths.has(currentDepth)) {
      const count = depths.get(currentDepth);
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
    numberOfNodes += val;
    totalDepth += key*val;
  });

  const avg = totalDepth / numberOfNodes;

  return avg;
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

function createLogNData() {
  n = 1000;
  const data = [];
  for (let i = 1; i <= n; i += 1) {
    let y = 2 * Math.log2(i);
    data.push({ x: 1000 - i, y: y });
  }
  // console.log(`data: `, data);

  const formattedData = {
    label: 'Average',
    pointBorderColor: 'rgba(255, 0, 0, 1)',
    pointBackgroundColor: `rgba(255, 0, 0, ${100 / 100})`,
    pointRadius: '2',
    borderColor: 'rgba(255, 70, 0, 1)',
    showLine: true,
    fill: false,
    labels: {
      display: true,
    },
    data,
  };

  writeResultsToFile([formattedData], 'lognto1000.json');
}

function createDataRaw() {
  n = 1000;
  numberOfRuns = 100;
  const output = runTheTest_Dependent_Tree_Size();
  // let output = runTheTest_Variable_Tree_Size();
  writeResultsToFile(output, 'data1.json');
}

function createDataAverage() {
  n = 1000;
  numberOfRuns = 10000;
  const output = runTheTest_Dependent_Tree_Size();
  // let output = runTheTest_Variable_Tree_Size();
  const averageData = calculateAverageFromSingleDataSet(output);
  writeResultsToFile(averageData, 'data2.json');
}

let n;
let numberOfRuns;
const manyRandomNumbers = new Set();
// let treeType = "AVLTree";
// let treeType = 'BST';
let treeType = 'SplayTree';
let sampleRate = 1;

createDataRaw();
createDataAverage();

// createLogNData();

module.exports = {
  calculateAverageFromSingleDataSet,
};
