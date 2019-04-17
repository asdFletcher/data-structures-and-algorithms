'use strict';

let PseudoQueue = require('../queue-with-stacks.js');

describe('pseudoQueue class', () => {
  it('throws when removing from an empty queue', () => {
    const myQueue = new PseudoQueue();
    expect( () => {
      myQueue.deuqueue();
    }).toThrow();
  });

  it('can enqueue to an empty queue', () => {
    const myQueue = new PseudoQueue();
    myQueue.enqueue(5);

    expect(myQueue.dequeue()).toEqual(5);
    expect(myQueue).toBeInstanceOf(PseudoQueue);
  });

  it('can dequeue from a single length queue', () => {
    const myQueue = new PseudoQueue();
    myQueue.enqueue(5);

    expect(myQueue.dequeue()).toEqual(5);
    expect(myQueue).toBeInstanceOf(PseudoQueue);
  });

  it('can enqueue to a multiple length queue', () => {
    const myQueue = new PseudoQueue();
    myQueue.enqueue(5);
    myQueue.enqueue(6);
    myQueue.enqueue(7);

    expect(myQueue.dequeue()).toEqual(5);
    expect(myQueue.dequeue()).toEqual(6);
    expect(myQueue.dequeue()).toEqual(7);
    expect( () => {
      myQueue.deuqueue();
    }).toThrow();
    expect(myQueue).toBeInstanceOf(PseudoQueue);
  });
});

