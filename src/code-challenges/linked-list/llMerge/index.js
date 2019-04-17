'ust strict';

let mergeLists = require('./ll-merge.js');
let LinkedList = require('./../linked_list/linked-list.js').LinkedList;
const util = require('util');
// console.log(mergeLists);
// console.log(LinkedList);


let listOne = new LinkedList();
listOne.append(1);
listOne.append(2);
console.log('~~~~~~~~ listOne ~~~~~~~~~~');
listOne.print();

let listTwo = new LinkedList();
listTwo.append(11);
listTwo.append(12);
listTwo.append(13);
listTwo.append(14);
console.log('~~~~~~~~ listTwo ~~~~~~~~~~');
listTwo.print();

// let listThree = new LinkedList();
// listThree.append(1);
// listThree.append(11);
// listThree.append(2);
// listThree.append(12);
// console.log('~~~~~~~~ listThree ~~~~~~~~~~');
// listThree.print();

console.log('~~~~~~~~ calling the function ~~~~~~~~~~');
mergeLists(listOne, listTwo);
// let expected = listThree.head;

// console.log('~~~~~~~~ mergeLists(listOne, listTwo) ~~~~~~~~~~');


// console.log({result});
// console.log({expected});


console.log('~~~~~~~~ listOne! ~~~~~~~~~~');
listOne.print();


console.log(util.inspect(listOne, {depth: 10}));