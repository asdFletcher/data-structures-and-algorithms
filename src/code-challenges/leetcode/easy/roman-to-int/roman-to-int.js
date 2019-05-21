// Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

// Symbol       Value
// I             1
// V             5
// X             10
// L             50
// C             100
// D             500
// M             1000
// For example, two is written as II in Roman numeral, just two one's added together. Twelve is written as, XII, which is simply X + II. The number twenty seven is written as XXVII, which is XX + V + II.

// Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. 

// There are six instances where subtraction is used:
// I can be placed before V (5) and X (10) to make 4 and 9. 
// X can be placed before L (50) and C (100) to make 40 and 90. 
// C can be placed before D (500) and M (1000) to make 400 and 900.
// Given a roman numeral, convert it to an integer. Input is guaranteed to be within the range from 1 to 3999.
// Input: "III" , Output: 3
// Input: "IV" , Output: 4
// Input: "IX" , Output: 9
// Input: "LVIII" , Output: 58 , Explanation: L = 50, V= 5, III = 3.
// Input: "MCMXCIV" , Output: 1994 , Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
// I             1
// V             5
// X             10
// L             50
// C             100
// D             500
// M             1000

// I can be placed before V (5) and X (10) to make 4 and 9. 
// X can be placed before L (50) and C (100) to make 40 and 90. 
// C can be placed before D (500) and M (1000) to make 400 and 900.

function romanToInt(roman) {
  let sum = 0;
  for (let i = roman.length - 1; i >= 0; i -= 1) {
    let n = roman[i];
    let prev = roman[i + 1];
    sum += getVal(n);
    if (n === 'I' && (prev === 'V' || prev === 'X')) { sum -= 1 * 2; }
    if (n === 'X' && (prev === 'L' || prev === 'C')) { sum -= 10 * 2; }
    if (n === 'C' && (prev === 'D' || prev === 'M')) { sum -= 100 * 2; }
  }
  return sum;
}

function getVal(romanLetter) {
  if (romanLetter === 'I') { return 1; }
  if (romanLetter === 'V') { return 5; }
  if (romanLetter === 'X') { return 10; }
  if (romanLetter === 'L') { return 50; }
  if (romanLetter === 'C') { return 100; }
  if (romanLetter === 'D') { return 500; }
  if (romanLetter === 'M') { return 1000; }
}



// console.log(`III 3`, romanToInt(`III`));
// console.log(`IV 4`, romanToInt(`IV`));
// console.log(`IX 9`, romanToInt(`IX`));
// console.log(`LVIII 58`, romanToInt(`LVIII`));
// console.log(`MCMXCIV 1994`, romanToInt(`MCMXCIV`));


// Input: "III" , Output: 3
// Input: "IV" , Output: 4
// Input: "IX" , Output: 9
// Input: "LVIII" , Output: 58 , Explanation: L = 50, V= 5, III = 3.
// Input: "MCMXCIV" , Output: 1994 , Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
