'use strict';

function getEmptyTree(treeType) {
  if (treeType === 'AVLTree') {
    return new AVLTree();
  }
  if (treeType === 'BST') {
    return new BST();
  }
  if (treeType === 'SplayTree') {
    return new SplayTree();
  }
}

module.exports = getEmptyTree;
