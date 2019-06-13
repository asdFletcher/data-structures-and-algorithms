/*
We are given an array A of N lowercase letter strings, all of the same length.

Now, we may choose any set of deletion indices, and for each string, we delete all the characters in those indices.

For example, if we have an array A = ["abcdef","uvwxyz"] and deletion indices {0, 2, 3}, then the final array after deletions is ["bef", "vyz"], and the remaining columns of A are ["b","v"], ["e","y"], and ["f","z"].  (Formally, the c-th column is [A[0][c], A[1][c], ..., A[A.length-1][c]].)

Suppose we chose a set of deletion indices D such that after deletions, each remaining column in A is in increasing sorted order.

Return the minimum possible value of D.length.


Input: ["cba","daf","ghi"]
Output: 1
Explanation: 
After choosing D = {1}, each column ["c","d","g"] and ["a","f","i"] are in increasing sorted order.
If we chose D = {}, then a column ["b","a","h"] would not be in increasing sorted order.

Input: ["a","b"]
Output: 0
Explanation: D = {}

Input: ["zyx","wvu","tsr"]
Output: 3
Explanation: D = {0, 1, 2}
 

Note:

1 <= A.length <= 100
1 <= A[i].length <= 1000
start: 537
*/

/**
 * @param {string[]} A
 * @return {number}
 */
var minDeletionSize = function(A) {
    let columnsToDelete = [];

    if(!A) { return 0; }
    if(A.length === 0) { return 0; }
    let letters = A[0].length
    for (let i = 0; i < letters; i++) {
      if (!columnInOrder(A, i)) { columnsToDelete.push(i); }
    }

    return columnsToDelete.length;
};

const columnInOrder = (array, columnIndex) => {
  for (let j = 1; j < array.length; j++) {
    let previousLetter = array[j - 1][columnIndex];
    let currentLetter = array[j][columnIndex];

    if (currentLetter < previousLetter) {
      return false;
    }
  }
  return true;
}



// let input = [ "cba", "daf", "ghi"];
// let input = ["zyx","wvu","tsr"];
let input = ["rrjk","furt","guzm"]
console.log(minDeletionSize(input));