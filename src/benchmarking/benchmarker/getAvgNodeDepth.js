'use strict';

function calculateAvgNodeDepth(tree) {
  const depths = new Map();

  let currentDepth = 0;
  const _go = (node) => {
    if (depths.has(currentDepth)) {
      const count = depths.get(currentDepth);
      depths.set(currentDepth, count + 1);
    } else {
      depths.set(currentDepth, 1);
    }
    currentDepth++;
    if (node.left) { _go(node.left); }
    if (node.right) { _go(node.right); }
    currentDepth--;
  };

  _go(tree.root);

  let numberOfNodes = 0;
  let totalDepth = 0;
  depths.forEach((val, key) => {
    numberOfNodes += val;
    totalDepth += key*val;
  });

  const avg = totalDepth / numberOfNodes;

  return avg;
}


module.exports = calculateAvgNodeDepth;
