/*
Given an array A of non-negative integers, return an array consisting of all the even elements of A, followed by all the odd elements of A.

You may return any answer array that satisfies this condition.

Input: [3,1,2,4]
Output: [2,4,3,1]
The outputs [4,2,3,1], [2,4,1,3], and [4,2,1,3] would also be accepted.

1 <= A.length <= 5000
0 <= A[i] <= 5000

20 min
*/

/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortArrayByParity = function(A) {
  let leftIndex = 0;
  let rightIndex = A.length - 1;
  while (leftIndex !== rightIndex && leftIndex < rightIndex) {
    let left = A[leftIndex];
    let right = A[rightIndex];
    if (isOdd(left) && isEven(right)) {
      // swap
      A[leftIndex] = right;
      A[rightIndex] = left;
      leftIndex += 1;
      rightIndex -= 1;
    } else if (isOdd(left) && isOdd(right)) {
      rightIndex -= 1;
    } else if (isEven(left)) {
      leftIndex += 1;
    } else {
      leftIndex += 1;
      rightIndex -= 1;
    }
  }
  return A;
};

const isEven = (num) => num % 2 === 0 ? true : false;
const isOdd = (num) => num % 2 === 1 ? true : false;

var input = [3,1,2,4];
var res = sortArrayByParity(input);
console.log(`res: `, res);

var input = [4, 2, 1, 3];
var res = sortArrayByParity(input);
console.log(`res: `, res);

var input = [3, 2, 4, 1];
var res = sortArrayByParity(input);
console.log(`res: `, res);

var input = [2, 2, 2, 2];
var res = sortArrayByParity(input);
console.log(`res: `, res);

var input = [2];
var res = sortArrayByParity(input);
console.log(`res: `, res);

var input = [1];
var res = sortArrayByParity(input);
console.log(`res: `, res);