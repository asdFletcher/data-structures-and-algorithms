/*Let's call an array A a mountain if the following properties hold:

A.length >= 3
There exists some 0 < i < A.length - 1 such that A[0] < A[1] < ... A[i-1] < A[i] > A[i+1] > ... > A[A.length - 1]
Given an array that is definitely a mountain, return any i such that A[0] < A[1] < ... A[i-1] < A[i] > A[i+1] > ... > A[A.length - 1].

Input: [0,1,0]
Output: 1

Input: [0,2,1,0]
Output: 1

3 <= A.length <= 10000
0 <= A[i] <= 10^6
A is a mountain, as defined above.
28 min
*/

/**
 * @param {number[]} A
 * @return {number}
 */
var peakIndexInMountainArray = function(A) {
  if (A.length <= 4) {
    for (let i = 0; i < A.length; i++) {
      if (A[i] > A[i + 1] && A[i] > A[i - 1]) {
        return i;
      }
    }
  }

  let left = 0;
  let right = A.length - 1;
  let mid = Math.floor((left + right) / 2);
  while (true) {
    if (right - left <= 4) {
      for (let i = left; i <= right; i++) {
        if (A[i] > A[i + 1] && A[i] > A[i - 1]) {
          return i;
        }
      }
    }
    let decreasing = A[mid] > A[mid + 1];
    let increasing = A[mid] > A[mid - 1];
    if (decreasing && increasing) {
      return mid;
    } else if (decreasing) {
      right = mid;
      mid = Math.floor((mid + left) / 2);
    } else {
      left = mid;
      mid = Math.floor((mid + right) / 2);
    }
  }
};


// var res = peakIndexInMountainArray([0,5,10,15,3,2,1]);
// console.log(`res: `, res);

var res = peakIndexInMountainArray([24,69,100,99,79,78,67,36,26,19]); // should be 2
console.log(`res: `, res);

// var res = peakIndexInMountainArray([0,2,1,0]);
// console.log(`res: `, res);
