'use strict';

function calculateMaxNodeDepth(tree) {
  const depths = new Map();

  let currentDepth = 0;
  let maxDepth = 0;
  const _go = (node) => {
    if (depths.has(currentDepth)) {
      const count = depths.get(currentDepth);
      depths.set(currentDepth, count + 1);
    } else {
      depths.set(currentDepth, 1);
    }
    currentDepth++;
    if (currentDepth > maxDepth) {
      maxDepth = currentDepth;
    }
    if (node.left) { _go(node.left); }
    if (node.right) { _go(node.right); }
    currentDepth--;
  };

  _go(tree.root);

  return maxDepth
}

module.exports = calculateMaxNodeDepth;
