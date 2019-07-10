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
  let current;
  if (!root) { return null; }
  if (!root.left && !root.right) { return root; }
  if (root.left) {
    linkRow(root.left, root);
    current = root.left;
  } else {
    linkRow(root.right, root);
    current = root.right;
  }

  let nextRoot = scan(current);

  connect(nextRoot);

  return root;
};

const linkRow = (node, parent) => {
  let nextParent;
  if (parent.left && parent.left.val === node.val) {
    if (parent.right) {
      node.next = parent.right;
      nextParent = parent;
    }
  } else {
    let res = scan(parent.next);
    if (res) {
      node.next = res.nextNode;
      nextParent = res.nextParent;
    }
  }
  if (node.next) {
    linkRow(node.next, nextParent);
  }
}

const scan = (node) => {
  if (!node) { return null; }
  if (node.left) {
    return {nextNode: node.left, nextParent: node};
  }
  if (node.right) {
    return {nextNode: node.left, nextParent: node};
  }
  scan(node.next);
}



const VBT =  require('../datastructures/vbt.js');
let myTree = new VBT();
// myTree.insert([1,2,3,4,5,null,7]);
// myTree.insert([1,2,3,4,null,null,5, null, 7, null, null, null, null, null, 8]);
// myTree.insert([1]);
// myTree.insert([1,2,3]);
myTree.insert([1,2,3,4]);

console.log(`🍊: `, connect(myTree.root));