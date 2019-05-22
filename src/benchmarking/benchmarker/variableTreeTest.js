runTheTest_Variable_Tree_Size() {
  const output = {
    // label: i,
    pointBorderColor: 'rgba(0, 0, 0, 0)',
    pointBackgroundColor: `rgba(0, 0, 0, ${5 / 100})`,
    pointRadius: '2',
    showLine: false,
    labels: {
      display: false,
    },
    data: [],
  };

  for (let i = 0; i < 100; i += 1) {
    for (let j = 0; j < 1000; j += 1) {
      const treeSize = i;

      const myTree = getEmptyTree(treeType);

      // generate random number set
      const randomNumbers = this.getRandomNumberSet(treeSize);
      const numbers = [];

      // build tree with random numbers
      randomNumbers.forEach((val) => {
        myTree.insert(val);
        numbers.push(val);
      });

      // pick a random one
      const randomIndex = Math.floor(Math.random() * randomNumbers.size);
      const randomNodeValue = numbers[randomIndex];

      // perform operation and save data

      myTree.contains(randomNodeValue);
      output.data.push({ x: treeSize, y: myTree.containsComputations });

      // myTree.findMax();
      // output.data.push({x: treeSize, y: myTree.findMaxComputations});

      // myTree.findMin();
      // output.data.push({x: treeSize, y: myTree.findMinComputations});
    }
  }
  return [output];
}