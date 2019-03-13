'use strict';

class QueueNode {
  constructor(value){
    this.value = value;
    this.next = null;
  }
}

module.exports = QueueNode;
