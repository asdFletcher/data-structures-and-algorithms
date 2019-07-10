/*Given preorder and inorder traversal of a tree, construct the binary tree.

Note:
You may assume that duplicates do not exist in the tree.

For example, given

preorder = [3,9,20,15,7]
inorder = [9,3,15,20,7]
Return the following binary tree:

    3
   / \
  9  20
    /  \
   15   7
*/

function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}
 
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
  if (!preorder || !inorder) { return null; }
  if (preorder.length === 0 || inorder.length === 0) { return null; }
  // keys: the value of the element
  // values: the index in the preorder traversal
  let preorderMap = new Map();
  for(let i = 0; i < inorder.length; i++) {
    preorderMap.set(preorder[i], i);
  }

  return getRoot(0, inorder.length - 1, inorder, preorderMap);
};

const getRoot = (beginIO, endIO, IO, preorderMap) => {
  // base cases
  if (beginIO > endIO) { return null; }
  if (beginIO === endIO) { return new TreeNode(IO[beginIO]); }
  
  // find new root
  let newRootVal = IO[beginIO];
  let newRootIndex = beginIO;
  for (let i = beginIO + 1; i <= endIO; i++) {
    let current = preorderMap.get(IO[i]);
    let min = preorderMap.get(newRootVal);
    if (current < min) {
      newRootVal = IO[i];
      newRootIndex = i;
    }
  }

  // construct new tree
  let newRoot = new TreeNode(newRootVal);
  newRoot.left = getRoot(beginIO, newRootIndex - 1, IO, preorderMap);
  newRoot.right = getRoot(newRootIndex + 1, endIO, IO, preorderMap);
  return newRoot;
}

let preorder = [3,9,20,15,7]
let inorder = [9,3,15,20,7]
// let preorder = [-1];
// let inorder = [-1];

console.log(`🍊: `, buildTree(preorder, inorder));
