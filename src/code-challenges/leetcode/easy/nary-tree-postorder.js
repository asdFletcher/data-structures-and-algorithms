/*
Given an n-ary tree, return the postorder traversal of its nodes' values.

For example, given a 3-ary tree:
      1
   3  2  4
 5 6  
   
Return its postorder traversal as: [5,6,3,2,4,1].

Note: Recursive solution is trivial, could you do it iteratively?
*/

function Node(val,children) {
   this.val = val;
   this.children = children;
};

// recursive solution:
// var postorder = function(root) {
//   let result = [];

//   const go = (node) => {
//     if (!node) { return; }
//     for (let i = 0;  i< node.children.length; i++) {
//       go(node.children[i]);
//     }
//     result.push(node.val);
//   }
//   go(root);
//   return result;
// };


// iterative solution
var postorder = function(root) {
  let result = [];
  let stack = [];

  if (!root) { return []; }
  stack.push(root);
  while (stack.length > 0) {
    let current = stack.pop();
    result.push(current.val);

    for (let i = 0; i < current.children.length; i++) {
      stack.push(current.children[i]);
    }
  }

  return result.reverse();
};


let a = new Node(1, []);
let b = new Node(3, []);
let c = new Node(2, []);
let d = new Node(4, []);
let e = new Node(5, []);
let f = new Node(6, []);

a.children = [b, c, d];
b.children = [e, f];

postorder(a);
