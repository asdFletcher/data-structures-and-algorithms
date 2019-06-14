/*
A string S of lowercase letters is given. We want to partition this string into as many parts as possible so that each letter appears in at most one part, and return a list of integers representing the size of these parts.

Example 1:
Input: S = "ababcbacadefegdehijhklij"
Output: [9,7,8]
Explanation:
The partition is "ababcbaca", "defegde", "hijhklij".
This is a partition so that each letter appears in at most one part.
A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits S into less parts.
*/

/**
 * @param {string} S
 * @return {number[]}
 */

 // improved
var partitionLabels = function(S) {
  let result = [];

  // build hash of index of last occurance, O(n)
  let lastOccurance = new Map();
  for (let i = 0; i < S.length; i++) {
    lastOccurance.set(S[i], i);
  }

  // for each letter in the string
  // update the maximum ending index (the closest possible partition)
  // if i catches up to closest partition, add it to result
  let minDistToPartition = 0;
  let start = 0;
  for (let current = 0; current < S.length; current++) {
    let currentLetterEnding = lastOccurance.get(S[current]);
    if (currentLetterEnding > minDistToPartition) {
      minDistToPartition = currentLetterEnding;
    }

    // i has caught up, add and reset start index
    if (current === minDistToPartition) {
      result.push(current - start + 1);
      start = current + 1;
    }
  }

  return result;
}
// var partitionLabels = function(S) {
//   let letters = new Map();

//   for (let i = 0; i < S.length; i++) {
//     if (!letters.has(S[i])) {
//       letters.set(S[i], {start: i, end: i});
//     } else {
//       letters.get(S[i]).end = i;
//     }
//   }

//   // a b a c     // 0 1 2 3
//   //xaxbxaxcx    //012345678
//   let partitions = [];
//   for (let i = 0; i < (S.length * 2) + 1; i++){
//     partitions.push(0);
//   }

//   let letterArray = Array.from(letters.values());
//   for (let i = 0; i < letterArray.length; i++) {
//     let start = letterArray[i].start;
//     let end = letterArray[i].end;
//     let startPartitionIndex = (start * 2) + 1;
//     let endPartitionIndex = (end * 2) + 1;

//     for (let i = 0; i < partitions.length; i++) {
//       let a = i;
//       let b = i < endPartitionIndex;
//       let c = i > startPartitionIndex;
//       if ( i <= endPartitionIndex && i >= startPartitionIndex) {
//         partitions[i] = 1;
//       }
//     }
//   }

//   let result = [];
//   for (let i = 0; i < partitions.length; i++) {
//     if (partitions[i] === 0) {
//       let convertedIndex = (i - 1) / 2;
//       result.push(convertedIndex);
//     }
//   }

//   for (let i = result.length - 1; i > 0; i--) {
//     result[i] = result[i] - result[i - 1];
//   }
//   result.shift();
//   return result;
// };

let input = "ababcbacadefegdehijhklij";
console.log(`result: `, partitionLabels(input));
