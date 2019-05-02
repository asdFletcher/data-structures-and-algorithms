// https://leetcode.com/problems/two-sum/

/*
Given an array of integers, return indices of the two numbers such that they add up to a specific target. You may assume that each input would have exactly one solution, and you may not use the same element twice.

[2, 7, 11, 15], target = 9, return [0, 1]
*/

function twoSumA(nums, target) {
  // hash for seen { value, index }
  let seen = new Map();

  for (let i = 0; i < nums.length; i++) {
    // first element add to seen
    let desired = target - nums[i]

    if (i === 0) {
      seen.set(nums[i], i); 
    } else if (seen.has(desired)) {
      // if hit, return [current index, value (seen index)]
      return [i, seen.get(desired)];
    } else {
      // if not hit, add to seen { value, index }
      seen.set(nums[i], i); 
    }
  }
}

// let target = 9;
// let input = [2, 7, 11, 15];
let target = 6;
let input = [3,2,4];

let result = twoSumA(input, target);
console.log(`result: `, result);



