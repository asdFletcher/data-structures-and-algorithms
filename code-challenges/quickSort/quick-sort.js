function qSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  
  let left = [];
  let right = [];
  let pivot = arr.shift();

  for(let i = 0; i < arr.length; i++){
    if(arr[i] < pivot){ left.push(arr[i]); }
    if(arr[i] >= pivot){ right.push(arr[i]); }
  }
  return [...qSort(left), pivot, ...qSort(right)];
}

module.exports = qSort;