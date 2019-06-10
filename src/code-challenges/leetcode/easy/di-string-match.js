/*
Given a string S that only contains "I" (increase) or "D" (decrease), let N = S.length.

Return any permutation A of [0, 1, ..., N] such that for all i = 0, ..., N-1:

If S[i] == "I", then A[i] < A[i+1]
If S[i] == "D", then A[i] > A[i+1]

Input: "IDID"
Output: [0,4,1,3,2]

Input: "III"
Output: [0,1,2,3]

Input: "DDI"
Output: [3,2,0,1]
 

Note:

1 <= S.length <= 10000
S only contains characters "I" or "D".*/

/**
 * @param {string} S
 * @return {number[]}
 */
var diStringMatch = function(S) {
  let result = [];
  let min = 0;
  let max = S.length;
  for (let i = 0; i < S.length; i++) {
    if (S[i] === "D") {
      result.push(max);
      max--;
    } else {
      result.push(min);
      min++;
    }
  }
  result.push(min);
  
  return result;
};


console.log(diStringMatch("IDID"));
console.log(diStringMatch("III"));
console.log(diStringMatch("DDI"));
