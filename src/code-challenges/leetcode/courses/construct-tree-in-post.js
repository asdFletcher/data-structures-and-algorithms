/*
Given inorder and postorder traversal of a tree, construct the binary tree.

Note:
You may assume that duplicates do not exist in the tree.

inorder = [9,3,15,20,7]
postorder = [9,15,7,20,3]
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
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
const buildTree = (inorder, postorder) => {
    if (inorder.length === 0 || postorder.length === 0) {
      return null;
    }
    
    // key: node value
    // value: index in the postorder array
    const postorderMap = new Map();
    for (let i = 0; i < postorder.length; i++) {
      postorderMap.set(postorder[i], i);
    }

    // recursively build tree
    return getRoot(0, inorder.length - 1, inorder, postorderMap);
};

const getRoot = (beginIO, endIO, inorder, postorderMap) => {
  // base cases
  if (beginIO > endIO) { return null; }
  if (beginIO === endIO) {
    return new TreeNode(inorder[beginIO]);
  }

  // identify new root
  let newRootIndex = beginIO;
  let newRootVal = inorder[beginIO];
  for (let i = beginIO + 1; i <= endIO; i++) {
    let current = postorderMap.get(inorder[i]);
    let max = postorderMap.get(newRootVal);
    if (current > max) {
      newRootVal = inorder[i];
      newRootIndex = i;
    }
  }

  // construct sub tree
  let newRoot = new TreeNode(newRootVal);
  newRoot.left = getRoot(beginIO, newRootIndex - 1, inorder, postorderMap);
  newRoot.right = getRoot(newRootIndex + 1, endIO, inorder, postorderMap);
  return newRoot;
}

// let inorder = [9,3,15,20,7];
// let postorder = [9,15,7,20,3];
let inorder = [-1];
let postorder = [-1];

console.log(`🍊: `, buildTree(inorder, postorder));


