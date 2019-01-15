'use strict';

function FizzBuzzTree(tree){
  if (!tree) {return; }
  if(!tree.root){
    return;
  }
  recursivePostOrderTraversal(tree.root);
  function recursivePostOrderTraversal(node){
    if(node.left){
      recursivePostOrderTraversal(node.left);
    }
    if(node.right){
      recursivePostOrderTraversal(node.right);
    }
    if(node.value !== 0){
      if(node.value % 3 === 0 && node.value % 5 === 0 && node.value){
        node.value = 'FizzBuzz';
      }
      if(node.value % 3 === 0 && node.value){
        node.value = 'Fizz';
      }
      if(node.value % 5 === 0 && node.value){
        node.value = 'Buzz';
      }
    }

  }
  return;
}

module.exports = FizzBuzzTree;



