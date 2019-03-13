'use strict';

const Stack = require('../stack.js');
const Node = require('../stack-node.js');

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
