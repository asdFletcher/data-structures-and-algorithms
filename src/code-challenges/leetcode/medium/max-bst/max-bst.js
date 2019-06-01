/*
Given an integer array with no duplicates. A maximum tree building on this array is defined as follow:

The root is the maximum number in the array.
The left subtree is the maximum tree constructed from left part subarray divided by the maximum number.
The right subtree is the maximum tree constructed from right part subarray divided by the maximum number.
Construct the maximum tree by the given array and output the root node of this tree.

Example 1:
Input: [3,2,1,6,0,5]
Output: return the tree root node representing the following tree:

      6
    /   \
   3     5
    \    / 
     2  0   
       \
        1
Note:
The size of the given array will be in the range [1,1000].
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var constructMaximumBinaryTree = function(nums) {
  if (nums.length === 0 || !nums ) { return undefined; }
  return helper(0, nums.length - 1, nums);
};

const helper = (start, end, nums) => {
  // base case
  if (end < start) { return null; }
  if (start === end) {
    let val = nums[start];
    let node = new TreeNode(val);
    return node;
  }
  let maxIndex = getMaxIndex(start, end, nums);
  let maxValue = nums[maxIndex];

  let node = new TreeNode(maxValue);
  node.left = helper(start, maxIndex - 1, nums);
  node.right = helper(maxIndex + 1, end, nums);
  return node;
}

const getMaxIndex = (start, end, arr) => {
  let max = arr[start];
  let maxIndex = start;
  for (let i = start; i <= end; i++) {
    if (arr[i] > max) {
      max = arr[i];
      maxIndex = i;
    }
  }
  return maxIndex;
}

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

let input = [3, 2, 1, 6, 0, 5];
let res = constructMaximumBinaryTree(input);

console.log(`res: `, res);