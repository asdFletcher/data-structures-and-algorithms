'use strict';

const addTwoNumbers = require('./add-two-numbers.js');

// leet-code definition for singly-linked list.
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

const generateNodeList = num => {
  let resultHead;
  let resultCurrent;

  let string = Number(num).toString();
  for (let i = string.length - 1; i >= 0; i -= 1) {
    if (i === string.length - 1) {
      resultHead = new ListNode(Number(string[i]));
      resultCurrent = resultHead;
    } else {
      let node = new ListNode(Number(string[i]));
      resultCurrent.next = node;
      resultCurrent = resultCurrent.next;
    }
  }
  return resultHead;
}

describe('add 2 numbers leet-code style' , () => {
  it('succeeds on lists of 1 digit sum < 10', () => {
    let numA = 4;
    let numB = 3;

    let listA = generateNodeList(numA);
    let listB = generateNodeList(numB);
    let expected = generateNodeList(numA + numB);

    let result = addTwoNumbers(listA, listB);
    expect(result).toEqual(expected);
  });
  it('succeeds on lists of 1 digit sum = 10', () => {
    let numA = 7;
    let numB = 3;

    let listA = generateNodeList(numA);
    let listB = generateNodeList(numB);
    let expected = generateNodeList(numA + numB);

    let result = addTwoNumbers(listA, listB);
    expect(result).toEqual(expected);
  });
  it('succeeds on lists of 1 and 2 digits sum < 10', () => {
    let numA = 17;
    let numB = 2;

    let listA = generateNodeList(numA);
    let listB = generateNodeList(numB);
    let expected = generateNodeList(numA + numB);

    let result = addTwoNumbers(listA, listB);
    expect(result).toEqual(expected);
  });
  it('succeeds on lists of 1 and 2 digits sum < 10', () => {
    let numA = 2;
    let numB = 11;

    let listA = generateNodeList(numA);
    let listB = generateNodeList(numB);
    let expected = generateNodeList(numA + numB);

    let result = addTwoNumbers(listA, listB);
    expect(result).toEqual(expected);
  });
  it('succeeds on lists of 1 and 2 digits sum > 10', () => {
    let numA = 9;
    let numB = 11;

    let listA = generateNodeList(numA);
    let listB = generateNodeList(numB);
    let expected = generateNodeList(numA + numB);

    let result = addTwoNumbers(listA, listB);
    expect(result).toEqual(expected);
  });
  it('succeeds on lists of 2 and 2 digits sum > 10', () => {
    let numA = 19;
    let numB = 19;

    let listA = generateNodeList(numA);
    let listB = generateNodeList(numB);
    let expected = generateNodeList(numA + numB);

    let result = addTwoNumbers(listA, listB);
    expect(result).toEqual(expected);
  });
  it('succeeds on lists of 3 and 3 digits sum > 10', () => {
    let numA = 342;
    let numB = 465;

    let listA = generateNodeList(numA);
    let listB = generateNodeList(numB);
    let expected = generateNodeList(numA + numB);

    let result = addTwoNumbers(listA, listB);
    expect(result).toEqual(expected);
  });
  it('succeeds on lists of 3 and 1 digits sum > 10', () => {
    let numA = 999;
    let numB = 2;

    let listA = generateNodeList(numA);
    let listB = generateNodeList(numB);
    let expected = generateNodeList(numA + numB);

    let result = addTwoNumbers(listA, listB);
    expect(result).toEqual(expected);
  });
});
