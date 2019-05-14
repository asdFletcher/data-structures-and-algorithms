'use strict';

class Node {
 constructor(value) {
  this.value = value;
  this.left = null;
  this.right = null;
  this.parent = null;
  this.color = 'red';
 }
}

module.exports = Node;
