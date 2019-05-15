'use strict';

const Node = require('../red-black-tree-node.js');

describe('redblack node', () => {
  it('defaults to null left, right', () => {
    let myNode = new Node(2);
    expect(myNode.left).toBeNull();
    expect(myNode.right).toBeNull();
  });
  it('defaults color to red', () => {
    let myNode = new Node(2);
    expect(myNode.color).toEqual('red');
  });
  it('correctly assigns value when given one', () => {
    let myNode = new Node(2);
    expect(myNode.value).toEqual(2);
  });
  it('assigns undefined when given no value', () => {
    let myNode = new Node();
    expect(myNode.value).toBeUndefined();
  });
  it('default parent is null', () => {
    let myNode = new Node(2);
    expect(myNode.parent).toBeNull();
  });
});
