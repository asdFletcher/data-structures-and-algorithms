// Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.

// Input: "babad", Output: "bab", Note: "aba" is also a valid answer.
// Input: "cbbd", Output: "bb"
// Linear time solution: Manachers algorithm (not implemented here)
// This implementation is probably n^2 as it searches thru each existing palindrome for each new letter
// This should be a small factor of n since it is culled, but still a factor of n^2

function longestPalindrome(str) {
  if (!str) { return str; }
  if (str.length <= 1) { return str[0]; }
  let dromes = new Set();
  let maxDrome;

  for (let i = 0; i < str.length; i++) {
    handleNewDrome(dromes, i, str);
    dromes.forEach( drome => {
      updateDrome(drome, i, str);
      maxDrome = updateLongestDrome(dromes, drome, maxDrome);

      // if not expandable and not longest, delete it
      if (!drome.isExpandable && drome !== maxDrome) {
        dromes.delete(drome);
      }
    });
  }

  if (!maxDrome) {
    return str[0];
  }
  let result = str.slice(maxDrome.start, maxDrome.end + 1);
  return result;
}

const handleNewDrome = (dromes, i, str) => {
  let newDrome;
  let a = str[i - 2];
  let b = str[i - 1];
  let current = str[i];
  let firstAndThird = (current === a);
  let twoInARow = (current === b);
  if (firstAndThird) {
    newDrome = {
      start: i - 2,
      end: i,
      isExpandable: true,
      length: 3,
      allTheSame: false,
    };
  } else if (twoInARow) {
    newDrome = {
      start: i - 1,
      end: i,
      isExpandable: true,
      length: 2,
      allTheSame: true,
    };
  }
  if (newDrome) { dromes.add(newDrome); }
}

const updateLongestDrome = (dromes, newDrome, currentMaxDrome) => {
  if (newDrome === currentMaxDrome) {
    return currentMaxDrome;
  }
  if (!currentMaxDrome) {
    return newDrome;
  }
  if (newDrome.length > currentMaxDrome.length) {
    if (!currentMaxDrome.isExpandable) {
      dromes.delete(currentMaxDrome);
    }
    return newDrome;
  }
  return currentMaxDrome;
}

const updateDrome = (currentDrome, i, str) => {
  // freshly made drome, no more info to add
  if (i === currentDrome.end) {
    return;
  }

  if (i === currentDrome.end + 1) {

    let newStart = str[currentDrome.start -1];
    let newEnd = str[i];
    let currentEnd = str[i - 1];
    if (newEnd !== currentEnd) {
      currentDrome.allTheSame = false;
    }
    if (newStart === newEnd) {
      currentDrome.end += 1;
      currentDrome.start -= 1;
      currentDrome.length += 2;
    } else if (currentDrome.allTheSame && newEnd === currentEnd) {
      currentDrome.end += 1;
      currentDrome.length += 1;
    } else {
      currentDrome.isExpandable = false;
      currentDrome.allTheSame = false;
    }
  }
}

// console.log(`aaaa: `, longestPalindrome('aaaa'));
// console.log(`a: `, longestPalindrome('a'));
// console.log(`aa: `, longestPalindrome('aa'));
// console.log(`aba: `, longestPalindrome('aba'));
// console.log(`abba: `, longestPalindrome('abba'));
// console.log(`abbas: `, longestPalindrome('abbas'));
// console.log(`aasabba: `, longestPalindrome('aasabba'));
// console.log(`aasabbasaa: `, longestPalindrome('aasabbasaa'));
// console.log(`bab: `, longestPalindrome('babad'));
// console.log(`bb: `, longestPalindrome('cbbd'));
// console.log(`abcdedcbabcdedcbabc: `, longestPalindrome('abcdedcbabcdedcbabc'));
// console.log(`kwwk: `, longestPalindrome('vfkwwkkfy'));


