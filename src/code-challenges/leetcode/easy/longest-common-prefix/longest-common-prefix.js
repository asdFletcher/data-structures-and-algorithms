// Write a function to find the longest common prefix string amongst an array of strings.
// If there is no common prefix, return an empty string "".
// Input: ["flower","flow","flight"], Output: "fl"
// Input: ["dog","racecar","car"], Output: "", Explanation: There is no common prefix among the input strings.
// All given inputs are in lowercase letters a-z.

function longestCommonPrefix(arr) {
  let result = '';
  if (!arr || arr.length === 0) { return ''; }
  for (let i = 0; i < arr[0].length; i++){
    let newLetter = arr[0][i];

    for (let j = 0; j < arr.length; j++){
      let testLetter = arr[j][i];
      if (testLetter !== newLetter) {
        return result;
      }
    }
    result += newLetter;
  }
  return result;
}

let input = ["flower","flow","flight"];
console.log(`flo: `, longestCommonPrefix(input));
