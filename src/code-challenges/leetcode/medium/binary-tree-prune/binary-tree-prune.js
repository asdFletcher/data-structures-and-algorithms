const util = require('util');
/*
We are given the head node root of a binary tree, where additionally every node's value is either a 0 or a 1.

Return the same tree where every subtree (of the given tree) not containing a 1 has been removed.

(Recall that the subtree of a node X is X, plus every node that is a descendant of X.)

Example 1: Input: [1,null,0,0,1] Output: [1,null,0,null,1] 
Explanation: 
Only the red nodes satisfy the property "every subtree not containing a 1".
The diagram on the right represents the answer.

Example 2: Input: [1,0,1,0,0,0,1] Output: [1,null,1,null,1]
Example 3: Input: [1,1,0,1,1,0,1,0] Output: [1,1,0,1,1,null,1]


Note:

The binary tree will have at most 100 nodes.
The value of each node will only be 0 or 1.
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var pruneTree = function(root) {

  const go = (node) => {
    if (!node) { return true; }
    if (isLeafAndZero(node)) { return true; }

    let removeLeft = go(node.left);
    let removeRight = go(node.right);

    if (removeLeft) { node.left = null; }
    if (removeRight) { node.right = null; }

    return isLeafAndZero(node);
  }

  go(root)
  return root;
};

function isLeafAndZero(node) {
  if (!node.left && !node.right && node.val === 0) {
    return true;
  }
  return false;
}

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

let a = new TreeNode(1)
let b = new TreeNode(0)
let c = new TreeNode(1)
let d = new TreeNode(0)
let e = new TreeNode(0)
let f = new TreeNode(0)
let g = new TreeNode(1)

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.left = f;
c.right = g;

let res = pruneTree(a);
console.log(`res: `, util.inspect(res,true,10));



