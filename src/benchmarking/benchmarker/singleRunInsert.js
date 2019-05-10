'use strict';

function singleRunInsert(sampleRate) {
  let times = [];
  const myTree = this.getEmptyTree(this.treeType);
  let i = 0;

  let sum = 0;
  const counterCallback = () => { sum += 1; }

  // generate n random numbers
  const randomNumbers = this.getRandomNumberSet(this.n);
  randomNumbers.forEach((val) => {
    
    if (i % sampleRate === 0) {
      sum = 0;

      let a = myTree.insert(val, counterCallback);
      // times index correlates to tree size
      times[i] = sum;
    } else {
      myTree.insert(val, undefined);
    }
    i += 1;
  });
  // return array of insert computations for each tree size
  return times;
}

module.exports = singleRunInsert;
