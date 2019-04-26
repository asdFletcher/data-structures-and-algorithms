// Get product of all other elements

// Given an array of integers, return a new array such that each element at index i of the new array is the product of all the numbers in the original array except the one at i.

// For example:
// [1, 2, 3, 4, 5] --> [120,60,40,30,24]
// [3,2,1] --> [2,3,6]

function getProdOfAllOther(arr) {
  let prodAll = 1;
  for (let i = 0; i < arr.length; i++) {
    prodAll = prodAll * arr[i];
  }
  for (let i = 0; i < arr.length; i++) {
    let current = arr[i];
    arr[i] = prodAll / current;
  }
  return arr;
}

// const input = [3,2,1];
// const input = [1,2,3,4,5];
// const result = getProdOfAllOther(input);
// console.log(`~~~~~~~~~~~~~~~~~`)
// console.log(`result: `, result);
// solution: 
// time: O(n), space: O(1)
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// follow up: if we can't use division
// naive solution
function getProdOfAllOtherNoDivision_Naive(arr) {
  let result = [];

  for(let i = 0; i < arr.length; i++) {

    let prodOthers = 1;
    for (let j = 0; j < arr.length; j++) {
      // contribute to prod if index is not i
      if (j !== i) {
        prodOthers = prodOthers * arr[j];
      }
    }
    result[i] = prodOthers;
  }

  return result;
} 
// const input = [3,2,1];
// const input = [1,2,3,4,5];
// const input = [1,4,9,16,25];
// const result = getProdOfAllOtherNoDivision_Naive(input);
// console.log(`~~~~~~~~~~~~~~~~~`)
// console.log(`result: `, result);
// time: O(n^2), space: O(n)

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 
// follow up: if we can't use division
// attempt at more elegant solution
function getProdOfAllOtherNoDivision(arr) {

  const prefixProds = [];
  for (let i = 0; i < arr.length; i++){
    if (prefixProds.length === 0) {
      prefixProds.push(arr[i]);
    } else {
      prefixProds.push(prefixProds[i-1] * arr[i]);
    }
  }

  let reversedArr = arr.reverse();
  let suffixProds = [];
  for (let i = 0; i < reversedArr.length; i++){
    if (suffixProds.length === 0) {
      suffixProds.push(reversedArr[i]);
    } else {
      suffixProds.push(suffixProds[i-1] * reversedArr[i]);
    }
  }
  suffixProds = suffixProds.reverse();

  let result = [];
  for(let i = 0; i < arr.length; i++) {
    if (i === 0) {
      result.push(suffixProds[1]);
    } else if (i === arr.length - 1) {
      result.push(prefixProds[prefixProds.length - 2]);
    } else {
      result.push(prefixProds[i - 1] * suffixProds[i + 1]);
    }
  }

  return result;
} 
// const input = [3,2,1];
const input = [1,2,3,4,5];
const result = getProdOfAllOtherNoDivision(input);
console.log(`~~~~~~~~~~~~~~~~~`)
console.log(`result: `, result);