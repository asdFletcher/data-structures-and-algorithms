/*
Given an array with n integers, your task is to check if it could become non-decreasing by modifying at most 1 element.

We define an array is non-decreasing if array[i] <= array[i + 1] holds for every i (1 <= i < n).

Example 1:
Input: [4,2,3]
Output: True
Explanation: You could modify the first 4 to 1 to get a non-decreasing array.
Example 2:
Input: [4,2,1]
Output: False
Explanation: You can't get a non-decreasing array by modify at most one element.
Note: The n belongs to [1, 10,000].
*/

/**
 * @param {number[]} nums
 * @return {boolean}
 */

var checkPossibility = function(nums) {
  // edge cases
  if (!nums) { return null; }
  if (nums.length === 0) { return null; }
  if (nums.length === 1) { return true; }

  let count = 0;
  let firstOutOfOrderIndex;
  for (let i = 1; i < nums.length; i++) {
    // edge case, 2nd element is out of order
    if (i === 1 && isOutOfOrder(nums, i)) {
      firstOutOfOrderIndex = 0;
      count++;
      continue;
    }

    if (count === 1) {
      if (isOutOfOrder(nums, i)) {
        return false;
      }
    } else {
      // set out of order
      if (isOutOfOrder(nums, i)) {
        firstOutOfOrderIndex = i;
        count++;
      }
    }

    if (firstOutOfOrderIndex === i - 1) {
      let indexToRemove = handleOutOfOrder(nums, i);
      if (indexToRemove === -1) { return false; } // must remove 2+
    }

    if (count === 2) {
      return false;
    }

  }
  return true;
};


const handleOutOfOrder = (nums, i) => {
  // A = i - 3
  // B = i - 2
  // C = i - 1
  // D = i
  let a = nums[i - 3];
  let b = nums[i - 2];
  let c = nums[i - 1];
  let d = nums[i];

  // always true: c is < d

  if (d > b) { return i - 1; } // remove c
  if (c > a) { return i - 2; } // remove b

  if (d < b) { return -1; } // impossible scenario, return false
  if (c < a) { return -1; } // impossible scenario, return false
}

const isOutOfOrder = (arr, index) => {
  if (arr[index - 1] > arr[index]) {
    return true;
  }
  return false;
}

// console.log(checkPossibility([3,4,2,3]));
// console.log(checkPossibility([4,2,3]));
console.log(checkPossibility([4,2,1]));
