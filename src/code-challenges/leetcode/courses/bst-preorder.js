
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
  if(!root) {
    return [];
  }

  let result = [];
  const go = (node) => {
    if (node.left) { go(node.left); }
    if (node.right) { go(node.right); }
    result.push(node.val);
  }
  go(root);
  return result;
};

const BST =  require('../datastructures/bst.js');


let myTree = new BST();
myTree.insertMany([1,2,3]);

console.log(`preorderTraversal`, preorderTraversal(myTree.root));