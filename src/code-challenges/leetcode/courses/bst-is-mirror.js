/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
  if (!root) { return true; }
  let preOrderLeft = [];
  let preOrderRight = [];

  const goLeft = (node) => {
    if (node) {
      preOrderLeft.push(node.val);
    } else {
      preOrderLeft.push(null);
    }
    if (node) {
      goLeft(node.left);
      goLeft(node.right);
    }
  }
  const goRight = (node) => {
    if (node) {
      preOrderRight.push(node.val);
    } else {
      preOrderRight.push(null);
    }
    if (node) {
      goRight(node.right);
      goRight(node.left);
    }
  }

  goLeft(root);
  goRight(root);

  if (preOrderLeft.length !== preOrderRight.length) { return false; }
  for (let i = 0; i < preOrderLeft.length; i++) {
    if (preOrderLeft[i] !== preOrderRight[i]) {
      return false
    }
  }
  return true;
};

const VBT = require('../datastructures/vbt.js');

let myTree = new VBT();
// myTree.insert([1,2,2,null,3,null,3]);
myTree.insert([1,2,2,3,4,4,3]);
console.log(`myTree: `, myTree);

console.log(`isSymmetric: `, isSymmetric(myTree.root));
