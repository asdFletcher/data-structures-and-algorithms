// Input: s = "codeleet", indices = [4,5,6,7,0,2,1,3]
// Output: "leetcode"
// O(n) time, O(n) space
const restoreString = (s, indices) => {
  let res = [];

  for (let i = 0; i < s.length; i++) {
    const toIndex = indices[i];
    const char = s[i];
    res[toIndex] = char;
  }
  return res.join('');
};

// console.log(restoreString('codeleet', [4, 5, 6, 7, 0, 2, 1, 3]));
