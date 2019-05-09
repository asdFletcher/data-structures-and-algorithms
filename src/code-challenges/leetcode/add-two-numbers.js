// https://leetcode.com/problems/add-two-numbers/
/*
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list. You may assume the two numbers do not contain any leading zero, except the number 0 itself.
Input: (2 -> 4 -> 3) + (5 -> 6 -> 4) , Output: 7 -> 0 -> 8
Explanation: 342 + 465 = 807.
*/

//Thoughts: 
  // 1. go thru lists, turn into array, add, re-reate reversed list
  // 2. 1 pass reverse on both lists (bad), go thru in order to store sum, re-create reversed list
  // 3. recursive solution
  // 4. simple 1 pass thru both lists, advance 2 pointers, 

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function addTwoNumbers(l1, l2) {
  let currentA = l1;
  let currentB = l2;

  let resultHeadNode;
  let resultCurrent;

  let carryover = 0;
  while (currentA || currentB || carryover === 1) {
    let sum = 0;
    if (currentA && currentB) {
      sum = currentA.val + currentB.val;
    } else if (currentA) {
      sum = currentA.val;
    } else if (currentB) {
      sum = currentB.val;
    } else if (carryover === 1) {
      resultCurrent.next = new ListNode(1);
      return resultHeadNode;
    }

    // 5 + 5 --> 10 , digit = 0, carryover = 1
    let digit;
    if (sum + carryover >= 10) {
      digit = sum + carryover - 10;
      carryover = 1;
    } else {
      digit = sum + carryover;
      carryover = 0;
    }

    if (!resultHeadNode) {
      resultHeadNode = new ListNode(digit);
      resultCurrent = resultHeadNode;
    } else {
      resultCurrent.next = new ListNode(digit);
      resultCurrent = resultCurrent.next;
    }

    // advance digit pointers
    if (currentA) { currentA = currentA.next; }
    if (currentB) { currentB = currentB.next; }
  }
  return resultHeadNode;
}

module.exports = addTwoNumbers;
