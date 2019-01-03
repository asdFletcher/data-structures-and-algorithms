'use strict';

function mergeLists(listOne, listTwo) {

  if (!listOne){ return null; }
  if (!listTwo || !listTwo.head){ return listOne.head; }
  if (!listOne.head) {
    listOne.head = listTwo.head;
    return listOne.head;
  }

  let currentOne = listOne.head;
  let currentTwo = listTwo.head;

  let tempOne = currentOne.next;
  let tempTwo = currentTwo.next;

  while(tempOne && tempTwo) {
    currentOne.next = currentTwo;
    currentTwo.next = tempOne;

    currentOne = tempOne;
    currentTwo = tempTwo;

    if(tempOne.next) { tempOne = tempOne.next;} else {tempOne = null;}
    if(tempTwo.next) { tempTwo = tempTwo.next;} else {tempTwo = null;}

    if(currentTwo.next === null) {
      currentTwo.next = tempOne;
    }
    currentOne.next = currentTwo;
  }
  return listOne.head;
}

module.exports = mergeLists;



