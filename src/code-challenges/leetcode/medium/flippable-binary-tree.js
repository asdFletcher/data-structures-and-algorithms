

/*
For a binary tree T, we can define a flip operation as follows: choose any node, and swap the left and right child subtrees.

A binary tree X is flip equivalent to a binary tree Y if and only if we can make X equal to Y after some number of flip operations.

Write a function that determines whether two binary trees are flip equivalent.  The trees are given by root nodes root1 and root2.

Input: root1 = [1,2,3,4,5,6,null,null,null,7,8], root2 = [1,3,2,null,6,4,5,null,null,null,null,8,7]
Output: true
Explanation: We flipped at nodes with values 1, 3, and 5.
*/

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

var flipEquiv = function(root1, root2) {
  if (!sameValue(root1, root2)) { return false; }

  let result = true;

  const go = (node1, node2) => {
    if (!areIdentical(node1, node2)) {
      flip(node2);
      if (!areIdentical(node1, node2)) {
        result = false;
        return;
      }
    }
    
    if (node1 && node1.left) { go(node1.left, node2.left);; }
    if (node1 && node1.right) { go(node1.right, node2.right);; }
  }
  go(root1, root2);
  return result;
};

const areIdentical = (node1, node2) => {
  if (node1 === null && node2 === null) { return true; }
  if (node1 === null || node2 === null) { return false; }
  if (node1.val !== node2.val) { return false; }
  
  return (sameValue(node1.left, node2.left) && sameValue(node1.right, node2.right));
}

const sameValue = (node1, node2) => {
  if (node1 === null && node2 === null) { return true; }
  if (node1 === null || node2 === null) { return false; }
  if (node1.val !== node2.val) { return false; }
  return true;
};

const bothNull = (node1, node2) => (node1 === null && node2 === null);

const flip = (node) => {
  if (!node) {
    return null;
  }
  let temp = node.left;
  node.left = node.right;
  node.right = temp;
  return node;
}


// let a = new TreeNode(0);
// let aa = new TreeNode(1);
// console.log(`flipEquiv: `, flipEquiv(a,aa));

// let a = new TreeNode(0);
// let b = new TreeNode(3);
// let c = new TreeNode(1);
// let d = new TreeNode(2);
// a.left = b;
// a.right = c;
// c.right = d;

// let aa = new TreeNode(0);
// let bb = new TreeNode(3);
// let cc = new TreeNode(1);
// let dd = new TreeNode(2);
// aa.left = bb;
// aa.right = cc;
// bb.left = dd;

// console.log(`flipEquiv: `, flipEquiv(a,aa));

let a = new TreeNode(1);
let b = new TreeNode(2);
let c = new TreeNode(3);
let d = new TreeNode(4);
let e = new TreeNode(5);
let f = new TreeNode(6);
let j = new TreeNode(7);
let k = new TreeNode(8);
a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.left = f;
e.left = j;
e.right = k;

let aa = new TreeNode(1);
let bb = new TreeNode(3);
let cc = new TreeNode(2);
let ee = new TreeNode(5);
let ff = new TreeNode(6);
let gg = new TreeNode(2);
let hh = new TreeNode(2);
let ii = new TreeNode(2);

aa.left = bb;
aa.right = cc;
bb.right = ee;
cc.left = ff;
cc.right = gg;
gg.left = hh;
gg.right = ii;

console.log(`flipEquiv: `, flipEquiv(a,aa));
