/* eslint-disable no-param-reassign */

'use strict';

/* There are two sorted arrays nums1 and nums2 of size m and n respectively.
Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).
You may assume nums1 and nums2 cannot be both empty.

nums1 = [1, 3], nums2 = [2], The median is 2.0

nums1 = [1, 2], nums2 = [3, 4], The median is (2 + 3)/2 = 2.5 */

const getMedianIndex = (arr) => {
  if (arr.length % 2 === 0) {
    const lowerIdx = (arr.length / 2) - 1;
    const upperIdx = arr.length / 2;
    const avg = (lowerIdx + upperIdx) / 2;
    return avg;
  }
  return Math.floor(arr.length / 2);
};

const getMedianValue = (arr) => {
  if (arr.length % 2 === 1) {
    const idx = Math.floor(arr.length / 2);
    return arr[idx]; // 3 --> 1, 1--> 0
  }
  // 0 1 2 7 --> 1.5
  const lowerIdx = (arr.length / 2) - 1;
  const upperIdx = arr.length / 2;
  const avg = (arr[lowerIdx] + arr[upperIdx]) / 2;
  return avg;
};

const getLeftRightArray = (arr1, arr2) => {
  if (arr1[0] < arr2[0]) {
    return { leftArray: arr1, rightArray: arr2 };
  }
  return { leftArray: arr2, rightArray: arr1 };
};

const handleNoOverlap = (arr1, arr2, extraLeft, extraRight) => {
  const { leftArray, rightArray } = getLeftRightArray(arr1, arr2);
  const l = new Array(extraLeft);
  const r = new Array(extraRight);
  const allArrays = [...l, ...leftArray, ...rightArray, ...r];
  const result = getMedianValue(allArrays);
  return result;
};

const redefineMiddleIndex = (start, end) => Math.floor((start + end) / 2);

const getIndexOfValue = (target, arr) => {
  let start = 0;
  let end = arr.length - 1;
  let midIndex = redefineMiddleIndex(start, end);
  let midValue = arr[midIndex];

  // too small or too large
  if (target > arr[end]) {
    return end;
  }
  if (target < arr[start]) {
    return start;
  }

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
        return (midIndex + (midIndex - 1)) / 2;
      }
      // search left half
      end = midIndex;
      midIndex = redefineMiddleIndex(start, end);
      midValue = arr[midIndex];
      count += 1;
    } else if (midValue < target) {
      if (arr[midIndex + 1] > target) { // case: value doesn't exist
        return (midIndex + (midIndex + 1)) / 2;
      }
      // search right half
      start = midIndex;
      midIndex = redefineMiddleIndex(start, end);
      midValue = arr[midIndex];
      count += 1;
    }
    count += 1;
  }
  return undefined;
};

const getLeftTrim = lowerIdx => lowerIdx;

const getRightTrim = (upperIdx, arr) => arr.length - 1 - upperIdx;

const trimArray = (arr, homeIndex, awayIndex) => {
  let leftTrim = 0;
  let rightTrim = 0;
  const newArr = [];
  if (awayIndex < homeIndex) {
    const lowerIdx = Math.ceil(Number(awayIndex));
    const upperIdx = Math.floor(Number(homeIndex));
    for (let i = lowerIdx; i <= upperIdx; i += 1) {
      newArr.push(arr[i]);
    }
    leftTrim += getLeftTrim(lowerIdx, arr);
    rightTrim += getRightTrim(upperIdx, arr);
  } else if (homeIndex < awayIndex) {
    const lowerIdx = Math.ceil(Number(homeIndex));
    const upperIdx = Math.floor(Number(awayIndex));
    for (let i = lowerIdx; i <= upperIdx; i += 1) {
      newArr.push(arr[i]);
    }
    leftTrim += getLeftTrim(arr, lowerIdx);
    rightTrim += getRightTrim(arr, upperIdx);
  }
  return { newArr, leftTrim, rightTrim };
};

const findMedianSortedArrays = (arr1, arr2, extraLeft = 0, extraRight = 0) => {
  const min1 = arr1[0];
  const min2 = arr2[0];
  const max1 = arr1[arr1.length - 1];
  const max2 = arr2[arr2.length - 1];

  if (min1 > max2 || min2 > max1) {
    return handleNoOverlap(arr1, arr2, extraLeft, extraRight);
  }
  if (arr1.length + arr2.length === 3) {
    // base case 3 total elements
    if (arr1.length === 1) {
      return arr1[0];
    }
    return arr2[0];
  }

  const medianIndex1 = getMedianIndex(arr1);
  const medianIndex2 = getMedianIndex(arr2);
  const medianValue1 = getMedianValue(arr1);
  const medianValue2 = getMedianValue(arr2);

  const index1InArr2 = getIndexOfValue(medianValue1, arr2);
  const index2InArr1 = getIndexOfValue(medianValue2, arr1);

  if (medianValue1 === medianValue2) {
    return medianValue1;
  }
  const resultsTrim1 = trimArray(arr1, medianIndex1, index2InArr1);
  const newArr1 = resultsTrim1.newArr;
  extraLeft += resultsTrim1.leftTrim;
  extraRight += resultsTrim1.rightTrim;

  const resultsTrim2 = trimArray(arr2, medianIndex2, index1InArr2);
  const newArr2 = resultsTrim2.newArr;
  extraLeft += resultsTrim2.leftTrim;
  extraRight += resultsTrim2.rightTrim;

  return findMedianSortedArrays(newArr1, newArr2, extraLeft, extraRight);
};

module.exports = {
  findMedianSortedArrays,
  getIndexOfValue,
};
