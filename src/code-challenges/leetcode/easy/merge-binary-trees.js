/*
Given two binary trees and imagine that when you put one of them to cover the other, some nodes of the two trees are overlapped while the others are not.

You need to merge them into a new binary tree. The merge rule is that if two nodes overlap, then sum node values up as the new value of the merged node. Otherwise, the NOT null node will be used as the node of new tree.

Example 1:

Input: 
	Tree 1                     Tree 2                  
          1                         2                             
         / \                       / \                            
        3   2                     1   3                        
       /                           \   \                      
      5                             4   7                  
Output: 
Merged tree:
	     3
	    / \
	   4   5
	  / \   \ 
	 5   4   7
Note: The merging process must start from the root nodes of both trees.
40 min
*/

// tree 1
a = new TreeNode(1);
b = new TreeNode(3);
c = new TreeNode(2);
d = new TreeNode(5);

a.left = b
a.right = c
b.left = d
         
// tree 2
aa = new TreeNode(2);
bb = new TreeNode(1);
cc = new TreeNode(3);
dd = new TreeNode(4);
ee = new TreeNode(7);

aa.left = bb
aa.right = cc
bb.right = dd
cc.right = ee

function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

/**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
var mergeTrees = function(t1, t2) {

  if (!t1 && !t2) { return null; }
  let newRootVal = 0;
  let t3;
  if (t1) { newRootVal += t1.val; }
  if (t2) { newRootVal += t2.val; }
  t3 = new TreeNode(newRootVal);

  const go = (node1, node2, node3) => {
    let newLeftVal = 0;
    if (node1 && node1.left) { newLeftVal += node1.left.val; }
    if (node2 && node2.left) { newLeftVal += node2.left.val; }
    if (node1 && node1.left || node2 && node2.left) {
      node3.left = new TreeNode(newLeftVal);
    }

    let newRightVal = 0;
    if (node1 && node1.right) { newRightVal += node1.right.val; }
    if (node2 && node2.right) { newRightVal += node2.right.val; }
    if (node1 && node1.right || node2 && node2.right) {
      node3.right = new TreeNode(newRightVal);
    }

    if ((node1 && node1.left) || (node2 && node2.left)) {
      go(node1 && node1.left, node2 && node2.left, node3.left);
    }
    if (node1 && node1.right || node2 && node2.right) {
      go(node1 && node1.right, node2 && node2.right, node3.right);
    }

  }
  go(t1, t2, t3);
  return t3;
};


let res = mergeTrees(a, aa);
console.log(`res: `, res);
