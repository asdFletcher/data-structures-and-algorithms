'use strict';

// let BinaryTree = require('./tree.js').BinaryTree;
// let Node = require('./tree.js').Node;
let Queue = require('../stacksAndQueues/stacks-and-queues.js').Queue;

function findMaximumValue(tree){
  if (!tree){ return; }
  if (!tree.root){ return; }

  let max = tree.root.value;

  let queue = new Queue();

  queue.enqueue(tree.root);
  while(queue.front){
    let node = queue.dequeue();
    if(max < node.value){
      max = node.value;
    }
    if (node.left){ queue.enqueue(node.left); }
    if (node.right){ queue.enqueue(node.right); }
  }
  return max;
}

module.exports = findMaximumValue;
