"use strict";

const kidsWithCandies = (candies, extraCandies) => {
  const res = [];

  let max = candies[0];
  // find max
  for (let i = 0; i < candies.length; i++) {
    if (candies[i] > max) {
      max = candies[i];
    }
  }

  for (let i = 0; i < candies.length; i++) {
    const maxPossible = candies[i] + extraCandies;
    if (maxPossible >= max) {
      res[i] = true;
    } else {
      res[i] = false;
    }
  }

  return res;
};

let result = kidsWithCandies([2, 3, 5, 1, 3], 3);
console.log(result);
