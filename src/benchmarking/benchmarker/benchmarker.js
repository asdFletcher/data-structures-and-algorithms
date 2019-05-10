'use strict';

const fs = require('fs');
const util = require('util');

class Runner {
  constructor(){
    this.AVLTree = require('../../data-structures/avl-tree/avl-tree.js');
    this.BST = require('../../data-structures/binary-search-tree/binary-search-tree.js');
    this.SplayTree = require('../../data-structures/splay-tree/splay-tree.js');
    this.getEmptyTree = require('./getEmptyTree.js');
    this.getRandomNumberSet = require('./getRandomNumberSet.js');
    this.getRandomNumberArray = require('./getRandomNumberArray.js');
    this.getBlankDataset = require('./getBlankDataset.js');
    this.removeUndef = require('./removeUndef.js');
    this.getMaxNodeDepth = require('./getMaxNodeDepth.js');
    this.getAvgNodeDepth = require('./getAvgNodeDepth.js');
    this.singleRunInsert = require('./singleRunInsert.js');
    this.singleRunRemove = require('./singleRunRemove.js');
    this.getLogNData = require('./getLogNData.js');
    this.getExpData = require('./getExpData.js');
  }

  runTheTest_Dependent_Tree_Size(numberOfRuns, sampleRate) {
    let opacity = 5;
    const dataset = this.getBlankDataset(numberOfRuns, opacity);
    let times = [];
    for (let i = 0; i < numberOfRuns; i += 1) {
      if (this.method === 'insert') {
        times = this.singleRunInsert(sampleRate);
      }
      if (this.method === 'remove') {
        times = this.singleRunRemove(sampleRate);
      }
  
      // dataset index is the arbitrary run number
      dataset[i].data = this.removeUndef(times);
    }
  
    return dataset;
  }
  
  runTheTest_Variable_Tree_Size() {
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
        const randomNumbers = this.getRandomNumberSet(treeSize);
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
  
  compositeTest_Ins_Del(numberOfRuns) {
    // empty data container
    let opacity = 50;
    const dataset = createBlankDataset(numberOfRuns, opacity);
  
    for(let r = 0; r < numberOfRuns; r++){
      let myTree = getEmptyTree(treeType);
      let treeSize = 0;
      // generate random numbers
      let numArray = getRandomNumberArray(1000000);
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
        let avgDepth = getAvgNodeDepth(myTree);
        data[i] = maxDepth;
      }
      
      dataset[r].data = removeUndef(data);
    }
    return dataset;
  }
  
  runSingleTest_Contains_Counter(treesize) {
    const times = new Array(n);
    const myTree = getEmptyTree(treeType);
    const numbers = [];
  
    const randomNumbers = this.getRandomNumberSet(n);
  
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
  
  calculateAverageFromSingleDataSet(dataset) {
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
  
  writeResultsToFile(data, filename) {
    const stringData = JSON.stringify(data);
  
    fs.writeFile(filename, stringData, (err, data) => {
      if (err) console.log(err);
    });
  }
  
  createDataRaw(rawRuns, rawSampleRate) {
    const output = this.runTheTest_Dependent_Tree_Size(rawRuns, rawSampleRate);
    // let output = runTheTest_Variable_Tree_Size(runs);
    // let output = compositeTest_Ins_Del(runs);
    // writeResultsToFile(output, 'data1.json');
    return output;
  }
  
  createDataAverage(avgRuns, avgSampleRate) {
    const output = this.runTheTest_Dependent_Tree_Size(avgRuns, avgSampleRate);
    // let output = runTheTest_Variable_Tree_Size(runs);
    const averageData = this.calculateAverageFromSingleDataSet(output);
    return averageData;
  }

  //
  // main runner
  // 
  createData() {
    this.treeType = 'SplayTree'; // BST , AVLTree , SplayTree
    this.method = 'remove'; // insert , remove
    this.start = 100;
    this.end = 0;
    this.n = Math.abs(this.end - this.start);
    this.fileName = 'data1.json';
    // raw data params
    this.rawRuns = 100;
    this.rawSampleRate = 1;
    // avg data params (use more runs to get smoother avg plot)
    this.avgRuns = 1000;
    this.avgSampleRate = 1;

    let datasets = [
      ...this.createDataRaw(this.rawRuns, this.rawSampleRate),
      ...this.createDataAverage(this.avgRuns, this.avgSampleRate),
      this.getLogNData(this.start, this.end, {r: 25, g:150, b:0, a:1}),
      this.getExpData(this.start, this.end, {r: 150, g:25, b:0, a:1}, 0.5),
    ];
  
    this.writeResultsToFile(datasets, this.fileName);
  }
}

let myRunner = new Runner();
myRunner.createData();

