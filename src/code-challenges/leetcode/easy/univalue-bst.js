/*
A binary tree is univalued if every node in the tree has the same value.

Return true if and only if the given tree is univalued.

Input: [1,1,1,1,1,null,1], Output: true

Input: [2,2,2,5,2], Output: false
*/

function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const go = (node, expected) => {
  if (!node) { return true; }

  // base case
  if (node.val !== expected) {
    return false;
  }

  if (!go(node.left, expected)) { return false; }
  if (!go(node.right, expected)) { return false; }
  return true;
}
var isUnivalTree = function(root) {
  return go(root, root.val);
};



//     8
//   8   8
//  8 8 2 8  
  
// tree 2
a = new TreeNode(8);
b = new TreeNode(8);
c = new TreeNode(8);
d = new TreeNode(2);
e = new TreeNode(8);
f = new TreeNode(8);
g = new TreeNode(8);

a.left = b;
a.right = c;
b.left = d;
c.left = f;
c.right = g;

console.log(isUnivalTree(a));
