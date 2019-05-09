'use strict';

/* Given a string, find the length of the longest substring without repeating characters.
Input: "abcabcbb" , output: 3 
Input: "bbbbb",  Output: 1
Input: "pwwkew", Output: 3
Note that the answer must be a substring, "pwke" is a subsequence and not a substring. */

function lengthOfLongestSubstring(s) {
  if (s.length === 0) { return 0; }
  
  let currentLetters = new Set();
  let start = 0;
  let end = 0;
  currentLetters.add(s[0]);
  let currentLength = 1;
  let maxLength = 1;

  while (s[start + 1] && s[end + 1]) {
    end += 1;
    let endLetter = s[end];
    let startLetter = s[start];
    currentLength += 1;

    if (currentLetters.has(endLetter)) {
      // move up start letter until it isn't a duplicate of the start letter
      if (startLetter === endLetter) { // case: duplicates in a row, or both caps are same
        start += 1;
        currentLength -= 1;
      } else { // case: end plays catchup
        while (startLetter !== endLetter) {
          currentLetters.delete(startLetter);
          start += 1;
          startLetter = s[start];
          currentLength -= 1;
        }
        start += 1;
        startLetter = s[start];
        currentLength -= 1;
      }
    } else { // add new letter
      currentLetters.add(endLetter);
      if (currentLength > maxLength) { maxLength = currentLength; }
    }
  }

  return maxLength;
}

// console.log(`a: `, lengthOfLongestSubstring('a'));
// console.log(`aa: `, lengthOfLongestSubstring('aa'));
// console.log(`aaa: `, lengthOfLongestSubstring('aaa'));
// console.log(`aaaa: `, lengthOfLongestSubstring('aaaa'));
// console.log(`ab: `, lengthOfLongestSubstring('ab'));
// console.log(`ab: `, lengthOfLongestSubstring('ab'));
// console.log(`abababab: `, lengthOfLongestSubstring('abababab'));
// console.log(`abcabcbb: `, lengthOfLongestSubstring('abcabcbb'));
// console.log(`pwwkew: `, lengthOfLongestSubstring('pwwkew'));
// console.log(`aaabcaga: `, lengthOfLongestSubstring('aaabcaga'));
// console.log(`aaabcagabcd: `, lengthOfLongestSubstring('aaabcagabcd'));

module.exports = lengthOfLongestSubstring;