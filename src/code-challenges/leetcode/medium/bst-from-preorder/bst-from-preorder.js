/*
  Return the root node of a binary search tree that matches the given preorder traversal.

  (Recall that a binary search tree is a binary tree where for every node, any descendant of node.left has a value < node.val, and any descendant of node.right has a value > node.val.  Also recall that a preorder traversal displays the value of the node first, then traverses node.left, then traverses node.right.)

  Example 1:

  Input: [8,5,1,7,10,12]
  Output: [8,5,10,1,7,null,12]

  Note: 
  1 <= preorder.length <= 100
  The values of preorder are distinct.
*/

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

var bstFromPreorder = function(preorder) {
  let nodeStack = [];
  let root = new TreeNode(preorder[0]);
  let maxVal = root.val;
  nodeStack.push(root);
  let current = root;
  for (let i = 1; i < preorder.length; i++) {
    let newVal = preorder[i];
    let newNode = new TreeNode(newVal);
    if (newVal < current.val) { // if less than current => .left
      current.left = newNode;
    } else {
      let last;
      while (nodeStack.length > 0 && newVal > nodeStack[nodeStack.length - 1].val) {
        last = nodeStack.pop();
      }
      last.right = newNode;
    }

    nodeStack.push(newNode);
    current = newNode;
  }

  return root;
};

// let input = [8,5,1,7,10,12];
// let input = [8, 5, 1, 7, 10, 12];
// let input = [1, 3];
let input = [19,4,8,11];

let res = bstFromPreorder(input);

console.log(res);
