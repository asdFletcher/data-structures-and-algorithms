/* eslint-disable no-param-reassign */

'use strict';

const insertionSort = (arr, cb) => {
  if (!Array.isArray(arr)) { return undefined; }

  // type check all array elements without type coersion
  for (let i = 0; i < arr.length; i += 1) {
    cb(); // for purposes of timing
    if (!Number.isFinite(arr[i])) { return undefined; }
  }

  for (let i = 1; i < arr.length; i += 1) {
    cb(); // for purposes of timing
    const sortVal = arr[i];
    let sortIdx = i;

    while (sortVal < arr[sortIdx - 1] || sortIdx === 0) {
      cb(); // for purposes of timing
      arr[sortIdx] = arr[sortIdx - 1];
      if (sortIdx === 1) {
        arr[0] = sortVal;
        break;
      }
      if (sortVal >= arr[sortIdx - 2]) {
        arr[sortIdx - 1] = sortVal;
      }
      sortIdx -= 1;
    }
  }

  return arr;
};

module.exports = insertionSort;
