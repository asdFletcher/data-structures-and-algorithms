/*
The Hamming distance between two integers is the number of positions at which the corresponding bits are different.

Given two integers x and y, calculate the Hamming distance.

Note:
0 ≤ x, y < 231.

Example:

Input: x = 1, y = 4

Output: 2

Explanation:
1   (0 0 0 1)
4   (0 1 0 0)
       ↑   ↑

The above arrows point to positions where the corresponding bits are different.
30 min
*/

/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function(x, y) {
  let xStr = convertToBinary(x);
  let yStr = convertToBinary(y);

  if (xStr.length > yStr.length) {
    let dif = xStr.length - yStr.length;
    for (let i = 0; i < dif; i++) {
      yStr += '0';
    }
  } else {
    let dif = yStr.length - xStr.length;
    for (let i = 0; i < dif; i++) {
      xStr += '0';
    }
  }

  let count = 0;
  let max = Math.max(xStr.length, yStr.length)
  for (let i = 0; i < xStr.length; i++) {
    if (xStr[i] !== yStr[i]) {
      count ++;
    }
  }
  return count;
};

const convertToBinary = (num) => {
  let res = [];
  while (num >= 1) {
    let remainder = num % 2;
    if (remainder === 1) {
      res.push('1');
      num -= 1;
    } else {
      res.push('0');
    }
    num = num / 2;
  }
  res = res.join("");
  return res;
}

let res = convertToBinary(12)

console.log(hammingDistance(12, 1));