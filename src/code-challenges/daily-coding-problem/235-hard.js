// Difficulty hard
// Given an array of numbers of length N, find both the minimum and maximum using less than:
// 2 * (N - 2) comparisons.

// ~~~~~~~~~~~~~~~~~~~~ Approach 1 ~~~~~~~~~~~~~~~~~~~~
// Naive approach
// O(1) space, O(n) time
// 2n comparisons

function findMinMax_approach_one(arr) { // 2n comparisons
  let max = arr[0];
  let min = arr[0];
  for (let i = 0; i < arr.length; i += 1) {
    let current = arr[i];
    if (current > max) { max = current; } // n comparisons
    if (current < min) { min = current; } // n comparisons
  }
  return [min, max];
}
const inputA = [11,22,3,81,3,-1];
const resultA = findMinMax_approach_one(inputA);
console.log(`result 1: `, resultA);

// ~~~~~~~~~~~~~~~~~~~~ Approach 2 ~~~~~~~~~~~~~~~~~~~~
// Bin sort into array indexes, doesn't account for negatives
// up to O(n) space, O(3n) time
// 0 comparisons

function findMinMax_approach_two(arr) {
  let dataBins = new Array(arr.length);

  for (let i = 0; i < arr.length; i += 1) {
    dataBins[arr[i]] = arr[i];
  }

  let min;
  let max;

  let i = 0;
  while (min === undefined) {
    if (dataBins[i] !== undefined){
      min = dataBins[i]
    }
    i += 1;
  }
  let j = dataBins.length - 1;
  while (max === undefined) {
    if (dataBins[j] !== undefined){
      max = dataBins[j]
    }
    j -= 1;
  }
  return [min, max];
}
const inputB = [11,22,3,81,3,0];
const resultB = findMinMax_approach_two(inputB);
console.log(`result 2: `, resultB);


// ~~~~~~~~~~~~~~~~~~~~ Approach 3 ~~~~~~~~~~~~~~~~~~~~
// Find min using n comparisons, add min to all numbers (if negative) THEN bin sort into array indexes
// up to O(n) space, O(3n) time
// n comparisons

function findMinMax_approach_three(arr) {
  let min = arr[0];
  for (let i = 0; i < arr.length; i++) { // n comparisons
    if (arr[i] < min) {
      min = arr[i];
    }
  }

  let dataBins = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (min < 0) {
      let newNum = arr[i] + (-1 * min);
      dataBins[newNum] = newNum;
    } else {
      dataBins[arr[i]] = arr[i];
    }
  }

  let max;
  let j = dataBins.length - 1;
  while (max === undefined) {
    if (dataBins[j] !== undefined){
      max = dataBins[j]
    }
    j -= 1;
  }

  if (min < 0) {
    max = max + min;
  }
  return [min, max];
}
const inputC = [11,22,3,81,3,-1];
const resultC = findMinMax_approach_three(inputC);
console.log(`result 3: `, resultC);


// ~~~~~~~~~~~~~~~~~~~~ Approach 4 ~~~~~~~~~~~~~~~~~~~~
// Find max, min for first 2 elements
// compute mid and delta
// If difference between next number and mid is greater than the max to mid
// It is either a new min or max, perform 1 comparison to determine which
// O(1) space, O(n) time
// 1 comparison for first 2 elements, Then 1 comparison for each element
// 2 + 1n comparisons

const isPositive = (int) => Number(int).toString()[0] !== '-'

function findMinMax_approach_four(arr) {
  let min = arr[0];
  let max = arr[0];
  if (arr[1] < min) { // 1 comparison
    min = arr[1];
  } else {
    max = arr[1];
  }

  let mid = (min + max) / 2;
  let delta = max - mid;

  for (let i = 2; i < arr.length; i += 1) {
    if (Math.abs(arr[i] - mid) > delta) { // n comparisons
      if (isPositive(arr[i] - max)) {
        max = arr[i];
      } else {
        min = arr[i];
      }
    }
  }
  return [min, max];
}
const inputD = [11,22,3,81,3,-1];
const resultD = findMinMax_approach_four(inputD);
console.log(`result 4: `, resultD);