
var maxDepth = function(root) {
  if (!root) {
    return 0;
  }
  let max = 0;
  let currentDepth = 0;
  const go = (node) => {
    currentDepth++;
    if (currentDepth > max) {
      max = currentDepth;
    }
    if(node.left) { go(node.left); }
    if(node.right) { go(node.right); }
    currentDepth--;
  }

  go(root);

  return max;
};

// initiate max as 0
// 
// every recursive level
  // counter ++
  // if counter > max,
    // max = counter
  // go left
  // go right
  // counter --

  // return max
