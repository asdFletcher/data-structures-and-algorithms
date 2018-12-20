'use strict';

function BinarySearch(arr,key){
  let mid = Math.ceil(arr.length/2) - 1;
  if (arr[mid] > key){
    for(let i = mid; i >= 0; i--){
      if( arr[i] === key) { return i;}
    }
  } else if(arr[mid] < key) {
    for(let i = mid; i <= arr.length; i++){
      if( arr[i] === key) { return i;}
    }
  } else if(arr[mid] === key){ 
    return mid;
  }
  return -1;
}


module.exports = {BinarySearch};
  