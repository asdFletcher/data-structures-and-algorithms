// Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.

// Input: 121, Output: true
// Input: -121, Output: false, Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
// Input: 10, Output: false, Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
// Follow up:

// Coud you solve it without converting the integer to a string?

function palindromeNumber(int) {
  let str = int + '';

  for (i = 0; i < str.length; i++) {
    let start = str[i];
    let end = str[str.length - 1 - i];
    if (str[i] !== end) {
      return false;
    }
  }
  return true;
}

console.log(`121: `, palindromeNumber(121));
console.log(`-121: `, palindromeNumber(-121));
console.log(`10: `, palindromeNumber(10));
console.log(`5: `, palindromeNumber(5));
console.log(`-5: `, palindromeNumber(-5));
