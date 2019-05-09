'use strict';

/* There are two sorted arrays nums1 and nums2 of size m and n respectively.
Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).
You may assume nums1 and nums2 cannot be both empty.

nums1 = [1, 3], nums2 = [2], The median is 2.0

nums1 = [1, 2], nums2 = [3, 4], The median is (2 + 3)/2 = 2.5 */

const getMiddleIndex = (length) => {
  // returns the lower of the 2 middle indexes if length is even
  // 7 --> 3 , 8 --> 3
  return Math.floor((length - 1) / 2);
}

const redefineMiddleIndex = (start, end) => Math.floor((start + end) / 2);

const getIndexOfValue = (target, arr) => {
  let start = 0;
  let end = arr.length - 1;
  let midIndex = redefineMiddleIndex(start, end);
  let midValue = arr[midIndex];

  let count = 0;
  while (true && count < 100) {
    if (midValue === target) { // case: match
      return midIndex;
    }
    if (arr[midIndex + 1] === target) {
      return midIndex + 1;
    }
    if (midValue > target) {
      if (arr[midIndex - 1] < target) { // case: value doesn't exist
        return midIndex - 1;
      }
      // search left half
      end = midIndex;
      midIndex = redefineMiddleIndex(start, end);
      midValue = arr[midIndex];
      count ++;
    }
    if (midValue < target) {
      if (arr[midIndex + 1] > target) { // case: value doesn't exist
        return midIndex;
      }
      // search right half
      start = midIndex;
      midIndex = redefineMiddleIndex(start, end);
      midValue = arr[midIndex];
      count ++;
    }
  count ++;
  }
}

// num elements below
// _ _ x _ _
// 0 1 2 3 4 --> if odd, index
// _ x _ _ 
// 0 1 2 3   --> if even, index
// num elements above
// _ _ x _ _
// 0 1 2 3 4 --> if odd, length - 1 - index: 5-1-2 = 2
// _ x _ _
// 0 1 2 3   --> if even, length - 1 - index: 4-1-1 = 2
const getAboveCount = (array, index) => array.length - 1 - index;

const findMedianSortedArrays = function(numsA, numsB) {
  // assign A to longer array
  if (numsB.length > numsA.length) {
    let temp = numsA;
    numsA = numsB;
    numsB = temp;
  }

  let minA = numsA[0];
  let minB = numsB[0];
  let maxA = numsA[numsA.length - 1];
  let maxB = numsB[numsB.length - 1];
  
  // case: arrays have no overlap
  if (minA > maxB || minB > maxA) { 
    if (numsA.length === numsB.length) { // case: no overlap, same size
      // median value is average of max lower and min upper
      let average;
      if (minA > maxB) { average = (minA + maxB) / 2; }
      if (minB > maxA) { average = (minB + maxA) / 2; }
      return average;
    } else { // case: no overlap, diff size
      let lengthTotal = numsA.length + numsB.length;
      if (lengthTotal % 2 === 0) { // even total length
        // if even length total, median value = average of (L1 + L2)/2 and (L1 + L2)/2 + 1
        let indexLower = lengthTotal / 2 - 1;
        let indexUpper = lengthTotal / 2 + 1 - 1;
        if (numsA.length > numsB.length) {
          let average = (numsA[indexLower] + numsA[indexUpper]) / 2;
          return average;
        } else {
          let average = (numsB[indexLower] + numsB[indexUpper]) / 2;
          return average;
        }
      } else { // odd total length
        // if odd length total, median element = floor(L1 + L2 /2), [1, 2, 3, 4], [7, 8, 9] --> 4
        let targetIndex = Math.floor((numsA.length + numsB.length) / 2);
        if (numsA.length > numsB.length) {
          return numsA[targetIndex];
        } else {
          return numsB[targetIndex];
        }
      }
    }
  }

  // case: arrays have overlap
  let lengthTotal = numsA.length + numsB.length;
  let targetIndex = getMiddleIndex(lengthTotal);

  let medianAIndex = getMiddleIndex(numsA.length);

  while (true) {
    let medianAValue = numsA[medianAIndex];
    let indexOfAValueInB = getIndexOfValue(medianAValue, numsB);

    let aboveCountA = getAboveCount(numsA, medianAIndex);
    let aboveCountB = getAboveCount(numsB, indexOfAValueInB);
    let belowCountA = medianAIndex;
    let belowCountB = indexOfAValueInB;
    let totalAbove = aboveCountA + aboveCountB;
    let totalBelow = belowCountA + belowCountB;
    
    let difference = Math.abs(totalAbove - totalBelow);

    if (difference === 0 && lengthTotal % 2 === 0) { // dead on for even case
      // pick max 2 digits of the lower portions
      let a = numsA[medianAIndex];
      let b = numsA[medianAIndex - 1];
      let c = numsB[indexOfAValueInB];
      let d = numsB[indexOfAValueInB - 1];
      let topFourValues = [a, b, c, d];
      let topFourValuesInOrder = topFourValues.sort((a, b) => b - a);
      return (topFourValuesInOrder[0] + topFourValuesInOrder[1]) / 2;
    }

    if (difference === 1 && lengthTotal % 2 === 1) { // as close as possible with odd total
      if (totalBelow > totalAbove) {
        return Math.min(numsA[medianAIndex], numsB[indexOfAValueInB]);
      }
      if (totalAbove < totalBelow) {
        return Math.max(numsA[medianAIndex], numsB[indexOfAValueInB]);
      }
      return numsA[medianAIndex];
    };

    // off by 1 position
    // choose next highest number, if average
    // if lengthTotal is even, we'll need to average 2 numbers
    // target index, and target index + 1
    // if lengthTotal is even, target below = target index (and average with next highest number)
    // if lengthTotal is odd, target below = target index


    if (difference <= 2 && totalAbove > totalBelow) { 
      let neighborA = numsA[medianAIndex + 1];
      let neighborB = numsB[indexOfAValueInB + 1];
      if (neighborA > neighborB) {
        indexOfAValueInB += 1;
      } else if (neighborB > neighborA) { // include the smaller of the 2 neighbors
        medianAIndex += 1;
      } else {  // neighbors are equal, take A
        medianAIndex += 1;
      }
      return (numsA[medianAIndex] + numsB[indexOfAValueInB]) / 2;
    }
    if (difference <= 2 && totalBelow > totalAbove) {
      let neighborA = numsA[medianAIndex - 1];
      let neighborB = numsB[indexOfAValueInB - 1];
      if (neighborA > neighborB) {
        medianAIndex -= 1;
      } else if (neighborB > neighborA) { // include the larger of the 2 neighbors
        indexOfAValueInB -= 1;
      } else {  // neighbors are equal, take A
        medianAIndex -= 1;
      }
      return (numsA[medianAIndex] + numsB[indexOfAValueInB]) / 2;
    }

    // move indexA
    // repeat
    if (totalAbove > totalBelow) { // more above
      medianAIndex = medianAIndex + Math.floor((numsA.length - medianAIndex) / 2);;
    }
    if (totalBelow > totalAbove) { // more below 
      medianAIndex = Math.floor(medianAIndex / 2);;
    }
    // console.log(`totalAbove ${totalAbove} === totalBelow ${totalBelow}`);

    //   if overlap
    //   get total number of elements, identify target index
    //   find median element in A
    // find corresponding index in B
    // identify how many elements below, and above
      // if more elements below, find middle element in left half of A
      // if more elements above, find middle element in right half of A
      // find corresponding index in B
      // repeat until there's an equal number of elements above and below (if target is odd)
      // or _(off by 1?_ if it's even
  }
};

module.exports = {
  findMedianSortedArrays,
  getIndexOfValue
}