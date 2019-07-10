
var levelOrder = function(root) {
  let q = [];
  let result = [];

  if(!root) { return []; }

  q.push(root);
  q.push(null);
  
  let currentLevel = [];
  while (q.length > 0) {
    let current = q.shift(); // deQ
    
    if (current) {
      currentLevel.push(current);
    } else if (currentLevel.length > 0) {
      result.push(currentLevel.map( a => a.val));
      for (let i = 0; i < currentLevel.length; i++) {
        let node = currentLevel[i];
        if (node.left) {q.push(node.left); }
        if (node.right) {q.push(node.right); }
      }
      q.push(null);
      currentLevel = [];
    } else {
      break;
    }
  }
  return result;
};

const BST =  require('../datastructures/bst.js');

let myTree = new BST();
myTree.insertMany([10,6,15,3,7,20]);
// myTree.insertMany([]);
// myTree.insertMany([3,9,20,7]);

console.log(`levelOrder`, levelOrder(myTree.root));
