'use strict';

const Queue = require('../../data-structures/queue/queue.js');

class AnimalShelter {
  constructor() {
    this.dog = new Queue();
    this.cat = new Queue();  
  }
  enQ(animal) {
    if (animal.species === 'dog') {
      this.dog.enqueue(animal);
      this.counter++;
    }
    if (animal.species === 'cat') {
      this.cat.enqueue(animal);
      this.counter++;
    }
  }

  deQ(preference) {
    if(preference === 'dog') {
      if (!this.dog.front){
        throw new Error('no dogs');
      }
      return this.dog.dequeue();
    }
    if(preference === 'cat') {
      if(!this.cat.front){
        throw new Error('no cats');
      }
      return this.cat.dequeue();
    }
  }
}

module.exports = AnimalShelter;
