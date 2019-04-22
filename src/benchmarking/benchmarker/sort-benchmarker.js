'use strict';

const insertionSort = require('../../code-challenges/insertionSort/insertion-sort.js');
const fs = require('fs');

let n;
let numberOfRuns;
const manyRandomNumbers = new Set();
// let sortType = "insertionSort";
let sampleRate = 1000;

function postProcess(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] !== undefined) {
      result.push({ x: i, y: arr[i] });
    }
  }

  return result;
}

function createBlankDataset(count) {
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
      data: undefined,
    });
  }

  return dataset;
}

function generateRandomNumberArray(count) {
  const randomNumbers = [];
  while (randomNumbers.length < count) {
    const num = Math.floor(Math.random() * 1024 * 1024 * 128);
    randomNumbers.push(num);
  }
  
  return randomNumbers;
}

function sortSingleArray(length){
  const numbers = generateRandomNumberArray(length);
  
  // sort the array
  let counter = 0;
  const cb = () => {
    counter += 1;
  }
  let sortedNumbers = insertionSort(numbers, cb);

  return counter;
}

function runSingleTestSeries() {
  // create array of length n
  const times = new Array(n);

  // for 0 to n times
  for (let i = 0; i < n; i += 1) {
    // sort the array, store the count
    times[i] = sortSingleArray(i);
  }

  // array index has the count for the index size
  // example: element 10 took 47 counts to sort
  return times;
}

function runMultipleTestSeries() {
  const dataset = createBlankDataset(numberOfRuns);

  for (let i = 0; i < numberOfRuns; i += 1) {
    const times = runSingleTestSeries();

    // dataset index is the arbitrary run number
    dataset[i].data = postProcess(times);
  }

  return dataset;
}

function writeResultsToFile(data, filename) {
  const stringData = JSON.stringify(data);

  fs.writeFile(filename, stringData, (err, data) => {
    if (err) console.log(err);
  });
}

function createNSquaredData() {
  n = 100;
  const data = [];
  for (let i = 1; i <= n; i += 1) {
    let y = Math.pow(i, 2) / 4
    data.push({ x: i, y: y });
  }
  // console.log(`data: `, data);

  const formattedData = {
    // label: '',
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

  writeResultsToFile([formattedData], 'nSquaredTo100.json');
}

function createDataRaw() {
  n = 16;
  numberOfRuns = 100000;
  const output = runMultipleTestSeries();
  writeResultsToFile(output, 'data1.json');
}


createDataRaw();
createNSquaredData();
