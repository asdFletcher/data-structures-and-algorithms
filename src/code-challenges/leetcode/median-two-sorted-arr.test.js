'use strict';

const findMedianSortedArrays = require('./median-two-sorted-arr.js').findMedianSortedArrays;
const getIndexOfValue = require('./median-two-sorted-arr.js').getIndexOfValue;

const calculateExpected = (arrA, arrB) => {
  let allNums = [...arrA, ...arrB];
  let allNumsSorted = allNums.sort( (a,b) => a - b);
  
  let median;
  if (allNumsSorted.length % 2 === 0) {
    let a = Math.floor((allNumsSorted.length - 1) / 2);
    let b = a + 1;

    let aVal = allNumsSorted[a];
    let bVal = allNumsSorted[b];

    median = (aVal + bVal) / 2;
  } else {
    median = allNumsSorted[Math.floor(allNumsSorted.length / 2)];
  }
  return median;
}

describe('binary search', () => {
  it('works all indecies of base odd length array, len 5', () => {
    let arr = [1, 2, 3, 4, 5];
    for (let i = 0; i < arr.length; i++) {
      let result = getIndexOfValue(arr[i], arr);
      let expected = i;
      expect(result).toEqual(expected);
    }
  });
  it('works all indecies of base even length array, len 6', () => {
    let arr = [1, 2, 3, 4, 5, 6];
    for (let i = 0; i < arr.length; i++) {
      let result = getIndexOfValue(arr[i], arr);
      let expected = i;
      expect(result).toEqual(expected);
    }
  });
});

describe('calculate expected', () => {
  it('works with even total length no overlap', () => {
    let a = [1, 2, 3];
    let b = [7, 8, 9];
    let result = calculateExpected(a,b);
    let expected = 5;
    expect(result).toEqual(expected);
  });
  it('works with even total length, overlap', () => {
    let a = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140];
    let b = [10, 11, 12, 13, 14, 15, 16, 140];
    let result = calculateExpected(a,b);
    let expected = 45;
    expect(result).toEqual(expected);
  });
});

describe('median value finder', () => {
  it('works with total length = even, same length, no overlap', () => {
    let a = [1, 2, 3];
    let b = [7, 8, 9];
    let result = findMedianSortedArrays(a,b);

    let expected = calculateExpected(a,b);

    expect(result).toEqual(expected);
  });
  it('works with total length = even, same length, no overlap, reverse order', () => {
    let a = [1, 2, 3];
    let b = [7, 8, 9];
    let result = findMedianSortedArrays(b,a);

    let expected = calculateExpected(a,b);

    expect(result).toEqual(expected);
  });
  it('works with total length = odd, diff length, no overlap', () => {
    let a = [1, 2, 3, 4];
    let b = [7, 8, 9];
    let result = findMedianSortedArrays(b,a);

    let expected = calculateExpected(a,b);

    expect(result).toEqual(expected);
  });
  it('works with total length = even, same length, identical arrays', () => {
    let a = [1, 2, 3, 4, 5];
    let b = [1, 2, 3, 4, 5];
    let result = findMedianSortedArrays(b,a);

    let expected = calculateExpected(a,b);

    expect(result).toEqual(expected);
  });
  it('works with total length = even, same length, overlap', () => {
    let a = [1, 2, 3, 5, 6];
    let b = [1, 2, 4, 5, 6];
    let result = findMedianSortedArrays(b,a);

    let expected = calculateExpected(a,b);

    expect(result).toEqual(expected);
  });
  it('works with total length = odd, overlap', () => {
    let a = [1, 2, 2, 5, 6];
    let b = [1, 3, 7, 9];
    let result = findMedianSortedArrays(b,a);

    let expected = calculateExpected(a,b);

    expect(result).toEqual(expected);
  });
  it('works with total length = odd, overlap', () => {
    let a = [1, 2, 2, 5, 6];
    let b = [1, 3, 7, 9];
    let result = findMedianSortedArrays(b,a);

    let expected = calculateExpected(a,b);

    expect(result).toEqual(expected);
  });
  it('works with total length = even, overlap', () => {
    let a = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140];
    let b = [10, 11, 12, 13, 14, 15, 16, 140];
    let result = findMedianSortedArrays(b,a);

    let expected = calculateExpected(a,b);

    expect(result).toEqual(expected);
  });

});


