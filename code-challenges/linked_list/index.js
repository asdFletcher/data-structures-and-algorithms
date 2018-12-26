'use strict';

const util = require('util');
const LinkedList = require('./linked-list.js').LinkedList;

console.log('~~~~~~~~~~~~~')

let test = new LinkedList();
// console.log('1: ', util.inspect(test));

test.add(5);
// console.log('2: ', util.inspect(test));

test.add(6);
// console.log('3: ', util.inspect(test));

test.add(10);
// console.log('4: ', util.inspect(test));

test.print();

let test2 = new LinkedList();
test2.print();

console.log('includes 2? ', test.includes(2));
console.log('includes 10? ', test.includes(10));
console.log('includes 5? ', test.includes(5));
console.log('includes 6? ', test.includes(6));

test.insert(123);
console.log('5: ', util.inspect(test));
console.log('includes 2? ', test.includes(2));
console.log('includes 10? ', test.includes(10));
console.log('includes 5? ', test.includes(5));
console.log('includes 6? ', test.includes(6));
console.log('includes 123? ', test.includes(123));
test.print();