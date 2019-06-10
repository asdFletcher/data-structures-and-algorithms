/*
Given an array of integers A sorted in non-decreasing order, return an array of the squares of each number, also in sorted non-decreasing order.

Example 1:
Input: [-4,-1,0,3,10]
Output: [0,1,9,16,100]

Example 2:
Input: [-7,-3,2,3,11]
Output: [4,9,9,49,121]
 
Note:
1 <= A.length <= 10000
-10000 <= A[i] <= 10000
A is sorted in non-decreasing order.
*/

/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortedSquares = function(A) {
  let negativeStack = [];
  let result = [];

  let i = 0;
  while (A[i] < 0) {
    negativeStack.push(A[i]**2);
    i++;
  }
  
  while (i <= A.length - 1 || negativeStack.length > 0) {
    let negative = negativeStack[negativeStack.length - 1];
    let original = A[i]**2;

    if (original < negative || negative === undefined) {
      result.push(original);
      i++;
    } else {
      result.push(negative);
      negativeStack.pop();
    }
  }
  return result;
};

var input = [-4,-1,0,3,10];
var res = sortedSquares(input);
console.log(`res: `, res);

var input = [-4,-1, -1, -1, -1, 0,3,10];
var res = sortedSquares(input);
console.log(`res: `, res);

var input = [-4,-2, -2, -2, -2, 0,3,10];
var res = sortedSquares(input);
console.log(`res: `, res);

var input = [0,3,10];
var res = sortedSquares(input);
console.log(`res: `, res);

var input = [-4,-2, -2, -2, -2];
var res = sortedSquares(input);
console.log(`res: `, res);


