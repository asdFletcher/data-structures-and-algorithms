/*
Given an array nums. We define a running sum of an array as runningSum[i] = sum(nums[0]…nums[i]).

Return the running sum of nums.
Example 1:

Input: nums = [1,2,3,4]
Output: [1,3,6,10]
Explanation: Running sum is obtained as follows: [1, 1+2, 1+2+3, 1+2+3+4].

Example 2:
Input: nums = [1,1,1,1,1]
Output: [1,2,3,4,5]
Explanation: Running sum is obtained as follows: [1, 1+1, 1+1+1, 1+1+1+1, 1+1+1+1+1].
Example 3:

Input: nums = [3,1,2,10,1]
Output: [3,4,6,16,17]

Constraints:

1 <= nums.length <= 1000
-10^6 <= nums[i] <= 10^6
*/

// create new array
// loop over each item in the  given  array
// don't need a current max num
// watch out for i-1 on first index
// add the number at previous index to current index

"use strict";

/**
 * @param {number[]} nums
 * @return {number[]}
 */
const runningSum = (nums) => {
  if (!nums) {
    return [];
  }
  if (nums.length === 0) {
    return [];
  }

  const result = [];

  result[0] = nums[0];
  for (let i = 1; i < nums.length; i++) {
    result[i] = nums[i] + result[i - 1];
  }

  return result;
};

const arraysEqual = (a1, a2) => {
  /* WARNING: arrays must not contain {objects} or behavior may be undefined */
  return JSON.stringify(a1) === JSON.stringify(a2);
};

// tests
const runTest = (input, expected) => {
  const result = runningSum(input);
  if (arraysEqual(expected, result)) {
    console.log("pass on test case: ", input);
  } else {
    console.log("fail on test case: ", input);
    console.log("expected: ", expected);
    console.log("got: ", result);
  }
};

runTest([], []);
runTest([1], [1]);
runTest([1, 2, 3], [1, 3, 6]);
runTest([1, 2, 3, 4, 100], [1, 3, 6, 10, 110]);
