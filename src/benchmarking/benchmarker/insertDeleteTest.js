
function compositeTest_Ins_Del(numberOfRuns) {
  // empty data container
  const opacity = 50;
  const dataset = createBlankDataset(numberOfRuns, opacity);

  for(let r = 0; r < numberOfRuns; r++){
    const myTree = getEmptyTree(treeType);
    let treeSize = 0;
    // generate random numbers
    const numArray = getRandomNumberArray(1000000);
    const data = [];
    const numbersInTree = [];

    // build tree
    const n = 100;
    for (let i = 0; i < n; i++){
      const randomNumber = numArray.shift();
      myTree.insert(randomNumber);
      numbersInTree.push(randomNumber);
      treeSize++;
    }

    for (let i = 0; i < n * n; i++){
      for(let j = 0; j < 1; j++){
        // select a random number
        const randomNumber = numArray.shift();
        myTree.insert(randomNumber);
        numbersInTree.push(randomNumber);
        treeSize++;
      }
      for(let k = 0; k < 1; k++){
        //generate random number between 1 and numbersInTree.length
        const randomIndex = Math.floor(Math.random() * numbersInTree.length);
        const randomNumber = numbersInTree[randomIndex];
        myTree.remove(randomNumber);
        numArray.push(randomNumber);
        numbersInTree.splice(randomIndex, 1);
        treeSize--;
      }

      // measure tree height and save data {x: tree size (number of nodes), y: average height}
      const maxDepth = getMaxNodeDepth(myTree);
      const avgDepth = getAvgNodeDepth(myTree);
      data[i] = maxDepth;
    }

    dataset[r].data = removeUndef(data);
  }
  return dataset;
}
