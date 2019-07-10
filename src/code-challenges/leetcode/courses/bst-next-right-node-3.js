/*
Given a binary tree
Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.
Initially, all next pointers are set to NULL.
*/

function Node(val,left,right,next) {
  this.val = val;
  this.left = left;
  this.right = right;
  this.next = next;
};

var connect = function(root) {
  if (!root) { return null; }
  if (!root.left && !root.right) { return root; }

  let current = root;
  let front = null;
  let first = null;
  while (current) {
    if (!front && current.left) {
      front = current.left;
      first = front;
    }
    if (!front && current.right) {
      front = current.right;
      first = front;
    }
    if (front && current.left && front.val !== current.left.val) {
      front.next = current.left
      front = front.next;
    }
    if (front && current.right && front.val !== current.right.val) {
      front.next = current.right
      front= front.next;
    }
    current = current.next
  }
  connect(first);

  return root;
};
