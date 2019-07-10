/*
You are given a perfect binary tree where all leaves are on the same level, and every parent has two children. The binary tree has the following definition:

struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.

Initially, all next pointers are set to NULL.
*/

/**
 * // Definition for a Node.
 * function Node(val,left,right,next) {
 *    this.val = val;
 *    this.left = left;
 *    this.right = right;
 *    this.next = next;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
  if (!root) { return null; }
  connectHelper(root, null, false);
  return root;
};

const connectHelper = (node, parent, isRight) => {
  if (parent && parent.next && isRight) {
    node.next = parent.next.left;
  }
  if (node.left) {
    node.left.next = node.right;
    connectHelper(node.left, node, false);
    connectHelper(node.right, node, true);
  }
}

