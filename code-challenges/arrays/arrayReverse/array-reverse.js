'use strict';

const test1 = [1,2,3];
const test2 = [];
const test3 = 'string';

const reverseArray = (arr) => {

  if(Array.isArray(arr) === false){
    return 'not an array'
  }
  if(arr.length === 0){
    return arr;
  }
  let reverse = [];
  let counter = 0;
  for(let i = arr.length-1; i>=0; i--){
    reverse[counter] = arr[i];
    counter ++;
  }
  return reverse;
};

console.log('expect [3,2,1]: ' + reverseArray(test1));
console.log('expect []: ' + reverseArray(test2));
console.log('expect ‘not an array’: ' + reverseArray(test3));