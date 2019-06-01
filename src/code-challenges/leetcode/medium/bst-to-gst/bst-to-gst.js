/*
Given the root of a binary search tree with distinct values, modify it so that every node has a new value equal to the sum of the values of the original tree that are greater than or equal to node.val.

As a reminder, a binary search tree is a tree that satisfies these constraints:

The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.

Input: [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
Output: [30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]

         4
     1        6
  0     2   5   7
          3       8
                           
              30                 
        36         21      
   36      35   26    15   
             33          8
*/

// traverse the tree (go right first, and do in order traversal)
// add the value to the sum
// replace value with the sum


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


var bstToGst = function(root) {
  let sum = 0;
  const go = (node) => {
    if (node.right) { go(node.right); }
    sum += node.val;
    node.val = sum;
    if (node.left) { go(node.left); }
  }

  go(root);
  return root;
};


class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

let a = new TreeNode(4);
let b = new TreeNode(1);
let c = new TreeNode(6);
let d = new TreeNode(0);
let f = new TreeNode(5);
let e = new TreeNode(2);
let g = new TreeNode(7);
let h = new TreeNode(3);
let i = new TreeNode(8);

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.left = f;
c.right = g;
e.right = h;
g.right = i;

bstToGst(a);
