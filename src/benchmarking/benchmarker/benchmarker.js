/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
'use strict';

const fs = require('fs');
const util = require('util');

const AVLTree = require('../../data-structures/avl-tree/avl-tree.js');
const BST = require('../../data-structures/binary-search-tree/binary-search-tree.js');
const SplayTree = require('../../data-structures/splay-tree/splay-tree.js');
const RedBlackTree = require('../../data-structures/red-black-tree/red-black-tree.js');
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


class Runner {
  constructor(options) {
    this.AVLTree = AVLTree;
    this.BST = BST;
    this.SplayTree = SplayTree;
    this.RedBlackTree = RedBlackTree;
    this.getEmptyTree = getEmptyTree;
    this.getRandomNumberSet = getRandomNumberSet;
    this.getRandomNumberArray = getRandomNumberArray;
    this.getBlankDataset = getBlankDataset;
    this.removeUndef = removeUndef;
    this.getMaxNodeDepth = getMaxNodeDepth;
    this.getAvgNodeDepth = getAvgNodeDepth;
    this.singleRunInsert = singleRunInsert;
    this.singleRunRemove = singleRunRemove;
    this.getLogNData = getLogNData;
    this.getExpData = getExpData;

    for (const key in options) {
      this[key] = options[key];
    }

    this.n = Math.abs(this.end - this.start);
  }

  runTheTest_Dependent_Tree_Size(numberOfRuns, sampleRate) {
    const opacity = 5;
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
      const { data } = subData;

      for (let j = 0; j < data.length; j += 1) {
        const { x } = data[j];
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
    const { r, g, b, a } = this.avgColor;

    const formattedData = {
      label: 'Average',
      pointBorderColor: `rgba(${r}, ${g}, ${b}, ${a})`,
      pointBackgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`,
      pointRadius: '2',
      borderColor: `rgba(${r}, ${g}, ${b}, ${a})`,
      showLine: true,
      fill: false,
      labels: {
        display: true,
      },
      data: newDataSet,
    };
    return [formattedData];
  }

  static writeResultsToFile(data, filename) {
    const stringData = JSON.stringify(data);

    fs.writeFile(filename, stringData, (err, data) => {
      if (err) console.log(err);
    });
  }

  createDataRaw() {
    const datasets = [
      ...this.runTheTest_Dependent_Tree_Size(this.rawRuns, this.rawSampleRate),
    ];
    return datasets;
  }

  createDataAvg() {
    let data = this.runTheTest_Dependent_Tree_Size(this.avgRuns, this.rawSampleRate);
    let avg = this.calculateAverageFromSingleDataSet(data);
    const datasets = [
      ...avg,
    ];
    return datasets;
  }
}

// BST , AVLTree , SplayTree, RedBlackTree
// insert , remove
const options1 = {
  treeType: 'RedBlackTree',
  method: 'remove',
  start: 100,
  end: 0,
  rawRuns: 100,
  rawSampleRate: 1,
  avgRuns: 10000,
  avgSampleRate: 1,
  avgColor: {r:255, g:0, b:0, a:1},
  ptColor: {r:0, g:0, b:255, a:0.05},
};
const options2 = {
  treeType: 'BST',
  method: 'insert',
  start: 10,
  end: 0,
  rawRuns: 2,
  rawSampleRate: 1,
  avgRuns: 2,
  avgSampleRate: 1,
  avgColor: {r:0, g:255, b:0, a:1},
  ptColor: {r:0, g:255, b:0, a:0.05},
};
const options3 = {
  treeType: 'AVLTree',
  method: 'insert',
  start: 100,
  end: 0,
  rawRuns: 100,
  rawSampleRate: 1,
  avgRuns: 1000,
  avgSampleRate: 1,
  avgColor: {r:0, g:0, b:255, a:1},
  ptColor: {r:0, g:0, b:255, a:0.05},
};

// ~~~~

let runners = [
  new Runner(options1),
  // new Runner(options2),
  // new Runner(options3),
];
const allData = [];
for (let i = 0; i < runners.length; i++) {
  allData.push(...runners[i].createDataRaw());
  allData.push(...runners[i].createDataAvg());
}

allData.push(runners[0].getLogNData(100, 0, {r: 25, g:150, b:0, a:1}));
allData.push(runners[0].getExpData(100, 0, {r: 150, g:25, b:0, a:1}, 0.5));

Runner.writeResultsToFile(allData, `data1.json`);
