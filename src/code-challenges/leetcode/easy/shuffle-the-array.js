/* eslint-disable prefer-const */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-empty */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable strict */
/*
Given the array nums consisting of 2n elements in the form [x1,x2,...,xn,y1,y2,...,yn].

Return the array in the form [x1,y1,x2,y2,...,xn,yn].

Example 1:

Input: nums = [2,5,1,3,4,7], n = 3
Output: [2,3,5,4,1,7]
Explanation: Since x1=2, x2=5, x3=1, y1=3, y2=4, y3=7 then the answer is [2,3,5,4,1,7].
*/

// length will always be even
// 0, 1, 2, 3, 4, 5
// 0, 1, 2, 3
// 0, 1
// index: 0 is paired with index: length/2
// numPairs = length / 2

// return existing array (less space, more complex?)
// attempt at O(1) space solution, doesn't work because intenral loops in swapping occur
// const shuffle = (nums, n) => {
//   let fromIndex = 1;
//   let temp = nums[1];

//   for (let i = 1; i < nums.length - 2; i++) {
//     const toIndex = getToIndex(n, fromIndex);
//     let holder = nums[toIndex];
//     nums[toIndex] = temp;
//     temp = holder;
//     fromIndex = toIndex;
//   }

//   nums[1] = temp;
//   return nums;
// };

const getToIndex = (n, fromIndex) => {
  if (fromIndex < n) {
    return fromIndex * 2;
  }
  return -1 * (2 * n - 1) + 2 * fromIndex;
};

const shuffle = (nums, n) => {
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    const toIndex = getToIndex(n, i);
    res[toIndex] = nums[i];
  }
  return res;
};

// Input: nums = [2,5,1,3,4,7], n = 3
// Output: [2,3,5,4,1,7]
console.log(shuffle([2, 5, 1, 3, 4, 7], 3));
