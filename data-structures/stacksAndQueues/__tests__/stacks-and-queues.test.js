'use strict';

const Stack = require ('./../stacks-and-queues.js').Stack;
const Queue = require ('./../stacks-and-queues.js').Queue;

describe('stack class', () => {

  describe('constructor', () => {
    it('can create a new empty stack', ()=>{
      const expected =
      {
        top: null,
      };
  
      const result = new Stack();
      expect(result).toEqual(expected);
      expect(result.top).toBeNull();
      expect(result).toBeInstanceOf(Stack);
    });
  
    it('can ignore arguments', () => {
      const expected =
      {
        top: null,
      };
  
      const result = new Stack('junk');
      expect(result).toEqual(expected);
      expect(result).toBeInstanceOf(Stack);
    });
  });

  describe('push method', () => {
    it('creates node with undefined value when given no parameters', ()=>{
      const node1 = {
        next: null,
        value: undefined,
      };
      const expected =
      {
        top: node1,
      };
  
      const myStack = new Stack();
      myStack.push();

      const result = myStack;
      expect(result).toEqual(expected);
      expect(result).toBeInstanceOf(Stack);
    });
  
    it('correctly pushes to an empty stack', () => {
      const node1 = {
        next: null,
        value: 5,
      };
      const expected =
      {
        top: node1,
      };
  
      const myStack = new Stack();
      myStack.push(5);

      const result = myStack;
      expect(result).toEqual(expected);
      expect(result).toBeInstanceOf(Stack);
    });

    it('correctly pushes to a non-empty stack', () => {
      const node2 = {
        next: null,
        value: 5,
      };
      const node1 = {
        next: node2,
        value: 6,
      };
      const expected =
      {
        top: node1,
      };
  
      const myStack = new Stack();
      myStack.push(5);
      myStack.push(6);

      const result = myStack;
      expect(result).toEqual(expected);
      expect(result).toBeInstanceOf(Stack);
    });

    it('ignores more than 1 argument', () => {
      const node2 = {
        next: null,
        value: 5,
      };
      const node1 = {
        next: node2,
        value: 6,
      };
      const expected =
      {
        top: node1,
      };
  
      const myStack = new Stack();
      myStack.push(5);
      myStack.push(6, null, myStack, 'lol');

      const result = myStack;
      expect(result).toEqual(expected);
      expect(result).toBeInstanceOf(Stack);
    });
  });

  describe('pop method', () => {
    it('throws error if the stack is empty', ()=>{
      const myStack = new Stack();
      
      expect(() => {
        myStack.pop();
      }).toThrow();
    });

    it('correctly pops from a non-empty stack', () => {
      const myStack = new Stack();
      myStack.push(5);
      myStack.push(6);

      const result = myStack.pop();
      expect(result).toEqual(6);
      expect(result).not.toBeInstanceOf(Node);
    });

    it('ignores arguments', () => {
      const myStack = new Stack();
      myStack.push(5);
      myStack.push(6);

      const result = myStack.pop(5, null, 'foo');
      expect(result).toEqual(6);
      expect(result).not.toBeInstanceOf(Node);
    });
  });

  describe('peek method', () => {
    it('throws error if the stack is empty', ()=>{
      const myStack = new Stack();
      
      expect(() => {
        myStack.peek();
      }).toThrow();
    });

    it('correctly peeks from a non-empty stack', () => {
      const myStack = new Stack();
      myStack.push(5);
      myStack.push(6);

      const result = myStack.peek();
      expect(result).toEqual(6);
      expect(result).not.toBeInstanceOf(Node);
    });

    it('ignores arguments', () => {
      const myStack = new Stack();
      myStack.push(5);
      myStack.push(6);

      const result = myStack.peek(5, null, 'foo');
      expect(result).toEqual(6);
      expect(result).not.toBeInstanceOf(Node);
    });
  });
});

describe('queue class', () => {

  describe('constructor', () => {
    it('can create a new empty Queue', ()=>{
      const expected =
      {
        front: null,
        back: null,
      };
  
      const result = new Queue();
      expect(result).toEqual(expected);
      expect(result.front).toBeNull();
      expect(result.back).toBeNull();
      expect(result).toBeInstanceOf(Queue);
    });
  
    it('can ignore arguments', () => {
      const expected =
      {
        front: null,
        back: null,
      };
  
      const result = new Queue('junk');
      expect(result).toEqual(expected);
      expect(result.front).toBeNull();
      expect(result.back).toBeNull();
      expect(result).toBeInstanceOf(Queue);
    });
  });

  describe('queue method', () => {
    it('creates node with undefined value when given no parameters', ()=>{
      const node1 = {
        next: null,
        value: undefined,
      };
      const expected =
      {
        front: node1,
        back: node1,
      };
  
      const myQueue = new Queue();
      myQueue.enqueue();

      const result = myQueue;
      expect(result).toEqual(expected);
      expect(result).toBeInstanceOf(Queue);
    });
  
    it('correctly queues to an empty queue', () => {
      const node1 = {
        next: null,
        value: 5,
      };
      const expected =
      {
        front: node1,
        back: node1,
      };
  
      const myQueue = new Queue();
      myQueue.enqueue(5);

      const result = myQueue;
      expect(result).toEqual(expected);
      expect(result).toBeInstanceOf(Queue);
    });

    it('correctly queues to a non-empty queue', () => {
      const node2 = {
        next: null,
        value: 5,
      };
      const node1 = {
        next: node2,
        value: 6,
      };
      const expected =
      {
        front: node1,
        back: node2,
      };
  
      const myQueue = new Queue();
      myQueue.enqueue(6);
      myQueue.enqueue(5);

      const result = myQueue;
      expect(result).toEqual(expected);
      expect(result).toBeInstanceOf(Queue);
    });

    it('ignores more than 1 argument', () => {
      const node2 = {
        next: null,
        value: 5,
      };
      const node1 = {
        next: node2,
        value: 6,
      };
      const expected =
      {
        front: node1,
        back: node2,
      };
  
      const myQueue = new Queue();
      myQueue.enqueue(6);
      myQueue.enqueue(5, null, myQueue, 'foo');

      const result = myQueue;
      expect(result).toEqual(expected);
      expect(result).toBeInstanceOf(Queue);
    });
  });

  describe('dequeue method', () => {
    it('throws error if the Queue is empty', ()=>{
      const myQueue = new Queue();
      
      expect(() => {
        myQueue.dequeue();
      }).toThrow();
    });

    it('correctly dequeues from a non-empty queue', () => {
      const node1 = {
        next: null,
        value: 6,
      };
      const expected =
      {
        front: node1,
        back: node1,
      };
      
      const myQueue = new Queue();
      myQueue.enqueue(5);
      myQueue.enqueue(6);


      const result = myQueue.dequeue();
      expect(result).toEqual(5);
      expect(myQueue).toEqual(expected);
      expect(result).not.toBeInstanceOf(Node);
    });

    it('ignores arguments', () => {
      const node1 = {
        next: null,
        value: 6,
      };
      const expected =
      {
        front: node1,
        back: node1,
      };
      
      const myQueue = new Queue();
      myQueue.enqueue(5);
      myQueue.enqueue(6);


      const result = myQueue.dequeue(6, null, 'foo');
      expect(result).toEqual(5);
      expect(myQueue).toEqual(expected);
      expect(result).not.toBeInstanceOf(Node);
    });
  });

  describe('peek method', () => {
    it('throws error if the Queue is empty', ()=>{
      const myQueue = new Queue();
      
      expect(() => {
        myQueue.peek();
      }).toThrow();
    });

    it('correctly peeks from a non-empty queue', () => {
      const node2 = {
        next: null,
        value: 6,
      };
      const node1 = {
        next: node2,
        value: 5,
      };
      const expected =
      {
        front: node1,
        back: node2,
      };
      
      const myQueue = new Queue();
      myQueue.enqueue(5);
      myQueue.enqueue(6);

      const result = myQueue.peek();
      expect(result).toEqual(5);
      expect(myQueue).toEqual(expected);
      expect(result).not.toBeInstanceOf(Node);
    });

    it('ignores arguments', () => {
      const node2 = {
        next: null,
        value: 6,
      };
      const node1 = {
        next: node2,
        value: 5,
      };
      const expected =
      {
        front: node1,
        back: node2,
      };
      
      const myQueue = new Queue();
      myQueue.enqueue(5);
      myQueue.enqueue(6);

      const result = myQueue.peek(5, null, myQueue);
      expect(result).toEqual(5);
      expect(myQueue).toEqual(expected);
      expect(result).not.toBeInstanceOf(Node);
    });
  });
});
