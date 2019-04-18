'use strict';

const insertionSort = require('../insertion-sort.js');

describe('insertion sort', () => {
  it('returns undefined on no input', () => {
    const arr = undefined;
    const result = insertionSort(arr);

    expect(result).toBeUndefined();
  });
  it('returns undefined on null input', () => {
    const arr = null;
    const result = insertionSort(arr);

    expect(result).toBeUndefined();
  });
  it('returns undefined on boolean input', () => {
    const arr = true;
    const result = insertionSort(arr);

    expect(result).toBeUndefined();
  });
  it('returns undefined on string input', () => {
    const arr = 'test';
    const result = insertionSort(arr);

    expect(result).toBeUndefined();
  });
  it('returns undefined on integer input', () => {
    const arr = 5;
    const result = insertionSort(arr);

    expect(result).toBeUndefined();
  });
  it('returns undefined on array as a string input', () => {
    const arr = '[1,7,3]';
    const result = insertionSort(arr);

    expect(result).toBeUndefined();
  });
  it('returns undefined on array with string elements, and does not modify the array', () => {
    const arr = [2, 1, '7', 3, 2];
    const result = insertionSort(arr);

    expect(result).toBeUndefined();
    expect(arr).toEqual([2, 1, '7', 3, 2]);
  });

  it('handles empty array', () => {
    const arr = [];
    const result = insertionSort(arr);

    expect(result).toEqual([]);
  });

  it('handles 1 element array', () => {
    const arr = [4];
    const result = insertionSort(arr);

    expect(result).toEqual([4]);
  });
  it('handles 2 element sorted array', () => {
    const arr = [4, 5];
    const result = insertionSort(arr);

    expect(result).toEqual([4, 5]);
  });
  it('handles 2 element unsorted array', () => {
    const arr = [4, 2];
    const result = insertionSort(arr);

    expect(result).toEqual([2, 4]);
  });
  it('handles 3 element sorted array', () => {
    const arr = [4, 10, 20];
    const result = insertionSort(arr);

    expect(result).toEqual([4, 10, 20]);
  });
  it('handles 3 element reversed array', () => {
    const arr = [5, 4, 3];
    const result = insertionSort(arr);

    expect(result).toEqual([3, 4, 5]);
  });
  it('handles 3 element scrambled array', () => {
    const arr = [5, 3, 4];
    const result = insertionSort(arr);

    expect(result).toEqual([3, 4, 5]);
  });
  it('handles larger scrambled array', () => {
    const arr = [5, 78, 0, 2, 27, 38, 45, 4, 3];
    const result = insertionSort(arr);

    expect(result).toEqual([0, 2, 3, 4, 5, 27, 38, 45, 78]);
  });
  it('handles duplicates in 2 element array', () => {
    const arr = [5, 5];
    const result = insertionSort(arr);

    expect(result).toEqual([5, 5]);
  });
  it('handles triplicates in 3 element array', () => {
    const arr = [5, 5, 5];
    const result = insertionSort(arr);

    expect(result).toEqual([5, 5, 5]);
  });
  it('handles duplicates in larger array', () => {
    const arr = [5, 2, 78, 4, 0, 2, 27, 38, 45, 4, 3, 0];
    const result = insertionSort(arr);

    const expected = [0, 0, 2, 2, 3, 4, 4, 5, 27, 38, 45, 78];
    expect(result).toEqual(expected);
  });
  it('array is modified in-place', () => {
    const arr = [2, 1, 10, 7, 0];
    const result = insertionSort(arr);

    const expected = [0, 1, 2, 7, 10];
    expect(result).toEqual(expected);
    expect(arr).toBe(result);
  });
});
