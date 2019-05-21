'use strict';

// Given a 32-bit signed integer, reverse digits of an integer.
// Input: 123 Output: 321 , Input: -123 Output: -321 , Input: 120 Output: 21
// Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−2^31,  2^31 − 1]. For the purpose of this problem, assume that your function returns 0 when the reversed integer overflows.

// Thoughts: The difficulty is dealing with a super large number and a limited OS which seems secondary to algorithm design

function reverseInteger(x) {
  let str = x + '';
  let result = '';
  if (str[0] === '-') {
    result += '-';
  }
  for (let i = str.length - 1; i >= 0; i -= 1) {
    if (str[i] !== '-') {
      result += str[i];
    }
  }

  if (Number(result) <= 2147483647 && Number(result) >= -2147483648) {
    return Number(result);
  }
  return 0;
}

console.log(`should be: 521; `, reverseInteger(125));
console.log(`should be: -521; `, reverseInteger(-125));
console.log(`should be: 0; `, reverseInteger(500));
console.log(`should be: 0; `, reverseInteger(-500));
console.log(`should be: 0; `, reverseInteger(231));
console.log(`should be: 32; `, reverseInteger(230));
console.log(`should be: 900000; `, reverseInteger(900000));
console.log(`should be: 7463847412; `, reverseInteger(7463847412));
console.log(`should be: 8463847412 --> 0; `, reverseInteger(8463847412));

console.log(`should be: -8463847412; `, reverseInteger(-8463847412));
console.log(`should be: -9463847412 --> 0; `, reverseInteger(-9463847412));