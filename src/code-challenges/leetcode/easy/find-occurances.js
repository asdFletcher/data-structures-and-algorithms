/*Given words first and second, consider occurrences in some text of the form "first second third", where second comes immediately after first, and third comes immediately after second.

For each such occurrence, add "third" to the answer, and return the answer.

Input: text = "alice is a good girl she is a good student", first = "a", second = "good"
Output: ["girl","student"]

Input: text = "we will we will rock you", first = "we", second = "will"
Output: ["we","rock"]
 

Note:

1 <= text.length <= 1000
text consists of space separated words, where each word consists of lowercase English letters.
1 <= first.length, second.length <= 10
first and second consist of lowercase English letters.

13 min
*/

/**
 * @param {string} text
 * @param {string} first
 * @param {string} second
 * @return {string[]}
 */
var findOcurrences = function(text, first, second) {
  let result = [];
  let words = text.split(" ");
  for ( let i = 2; i < words.length; i++) {
    if (words[i - 1] === second && words[i - 2] === first) {
      result.push(words[i]);
    }
  }

  return result;
};

let text = "we will we will rock you"
let first = "we"
let second = "will"
let res = findOcurrences(text, first, second);
console.log(`res: `, res);

