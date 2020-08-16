// Given an integer n and an integer start.
// Define an array nums where nums[i] = start + 2*i (0-indexed) and n == nums.length.
// Return the bitwise XOR of all elements of nums.

const xorOperation = (n, start) => {
  const nums = [];
  for (let i = 0; i < n; i++) {
    nums[i] = start + i * 2;
  }
  let result = nums[0];
  for (let i = 1; i < n; i++) {
    result = result ^ nums[i];
  }
  return result;
};

xorOperation(5, 0);

// 0000    0
// 0010    2
// 0100    4
// 0110    6
// 1000    8

// 0 ^ 2: 0000 ^ 0010 --> 0010
// 0010 ^ 4:  0010 ^ 0100 --> 0110
// 0110 ^ 6: 0110 ^ 0110 --> 0000
// 0000 ^ 8: 1000 ^ 0000 --> 1000
