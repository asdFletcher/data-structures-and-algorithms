'use strict';

function singleRunRemove(n, sampleRate) {
  const myTree = getEmptyTree(treeType);
  const numbers = [];

  // build tree with random numbers
  const randomNumbers = generateRandomNumberSet(n);
  randomNumbers.forEach((val) => {
    myTree.insert(val);
    numbers.push(val);
  });

  let sum = 0;
  const counterCallback = () => { sum += 1; }

  // remove them in a random order
  let i = 0;
  while (myTree.root) {
    const randomIndex = Math.floor(Math.random() * randomNumbers.size);
    const randomNodeValue = numbers[randomIndex];

    sum = 0;
    const success = myTree.remove(randomNodeValue, counterCallback);
    if (success) {
      i += 1;
      if (i % sampleRate === 0) {
        times[i] = sum;
      }
    }
  }

  return times;
}

module.exports = singleRunRemove;
