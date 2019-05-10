'use strict';

function getEmptyTree(treeType) {
  if (treeType === 'AVLTree') {
    return new this.AVLTree();
  }
  if (treeType === 'BST') {
    return new this.BST();
  }
  if (treeType === 'SplayTree') {
    return new this.SplayTree();
  }
}

module.exports = getEmptyTree;
