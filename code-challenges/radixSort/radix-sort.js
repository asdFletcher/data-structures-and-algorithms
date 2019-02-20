'use strict';

function sortRadix(arr){
  let max = findMax(arr);
  for(let i = 0; i < max; i++){
    let buckets = makeBuckets(10);
    for(let j = 0; j < arr.length; j++){
      let value = findValue(arr[j], i);
      buckets[value].push(arr[j]);
    }
    arr = [].concat(...buckets);
  }
  return arr;
}

function findMax(arr) {
  let max = 0;
  for(let i = 0; i < arr.length; i++){
    let len = arr[i].toString().length;
    if( max < len ){
      max = len;
    }
  }
  return max;
}

function makeBuckets(num){
  let result = new Array(num);
  for(let i = 0; i < num; i++){
    result[i] = [];
  }
  return result;
}

function findValue(num, place){
  let str = num.toString();
  let val = str[place] ? str[place] : 0;
  return parseInt(val);
}

module.exports = sortRadix;
