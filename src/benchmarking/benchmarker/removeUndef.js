'use strict';

function removeUndef(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] !== undefined) {
      result.push({ x: i, y: arr[i] });
    }
  }

  return result;
}

module.exports = removeUndef;
