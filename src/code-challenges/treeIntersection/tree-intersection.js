'use strict';

const BinaryTree = require('../../data-structures/binary-tree/binary-tree.js');


function tree_intersection(treeA, treeB){
  let seenValues = {};
  let duplicates = {};

  if(!treeA){ return duplicates; }
  if(!treeB){ return duplicates; }
  if(!treeA.root){ return duplicates; }
  if(!treeB.root){ return duplicates; }
  if(!(treeA instanceof BinaryTree)){ return duplicates; }
  if(!(treeB instanceof BinaryTree)){ return duplicates; }

  const _go = (node,cb) => {
    
    if(node.left){ _go(node.left,cb); }
    if(node.right){ _go(node.right, cb); }

    cb(seenValues,node.value, duplicates);
  };

  function addToHash(obj, key) {
    obj[key] = true;
  }

  function hashContains(obj, key, dupes){
    if(obj[key]){
      dupes[key] = true;
    }
  }
  _go(treeA.root, addToHash);
  _go(treeB.root, hashContains);

  return duplicates;
}


module.exports = tree_intersection;
