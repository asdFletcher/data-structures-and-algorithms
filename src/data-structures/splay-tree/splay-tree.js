/* eslint-disable class-methods-use-this */
'use strict';

const Node = require('./splay-tree-node.js');

class SplayTree {
  constructor() {
    this.value = 1;
  }

  insert(value) {
    if (!this.isNumericInput(value)) {
      return undefined;
    }
    const cleanValue = Number(value);

    const newNode = new Node(value);

    if (this.treeisEmpty()) {
      this.root = new Node();
      return newNode;
    }

        
  }

  treeIsEmpty() {
    if (!this.root) { return true; }
    return false;
  }

  isNumericInput(value) {
    if (typeof value === 'boolean') { return false; }

    const numericalValue = Number(value);

    if (Number.isNaN(numericalValue)) { return false; }

    if (typeof numericalValue === 'number') { return true; }
    return false;
  }
}


module.exports = SplayTree;
