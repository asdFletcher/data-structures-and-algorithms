/*
Given a binary matrix A, we want to flip the image horizontally, then invert it, and return the resulting image.

To flip an image horizontally means that each row of the image is reversed.  For example, flipping [1, 1, 0] horizontally results in [0, 1, 1].

To invert an image means that each 0 is replaced by 1, and each 1 is replaced by 0. For example, inverting [0, 1, 1] results in [1, 0, 0].

Example 1:

Input: [[1,1,0],[1,0,1],[0,0,0]]
Output: [[1,0,0],[0,1,0],[1,1,1]]
Explanation: First reverse each row: [[0,1,1],[1,0,1],[0,0,0]].
Then, invert the image: [[1,0,0],[0,1,0],[1,1,1]]
Example 2:

Input: [[1,1,0,0],[1,0,0,1],[0,1,1,1],[1,0,1,0]]
Output: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]
Explanation: First reverse each row: [[0,0,1,1],[1,0,0,1],[1,1,1,0],[0,1,0,1]].
Then invert the image: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]
Notes:

1 <= A.length = A[0].length <= 20
0 <= A[i][j] <= 1

36 min
*/

/**
 * @param {number[][]} A
 * @return {number[][]}
 */

const flipBit = (num) => num === 0 ? 1 : 0;

var flipAndInvertImage = function(A) {
  for (let i = 0; i < A.length; i++) {
    reverseArrayAndFlipBits(A[i]);
  }
  return A;
};

const reverseArrayAndFlipBits = (arr) => {
  let left = 0;
  let right = arr.length - 1;
  while (right - left >= 0 && left <= right) {
    if (left === right) { // just flip
      arr[left] = flipBit(arr[left]); 
    } else { // reverse and flip
      let l = arr[left];
      let r = arr[right];
      arr[left] = flipBit(r);
      arr[right] = flipBit(l);
    }
    left += 1;
    right -= 1;
  }
  return arr;
}

let input = [[1,1,0],[1,0,1],[0,0,0]]
let output = [
  [1,0,0],
  [0,1,0],
  [1,1,1]
];

let res = flipAndInvertImage(input);
console.log(`res: `, res[0]);
console.log(`res: `, res[1]);
console.log(`res: `, res[2]);

