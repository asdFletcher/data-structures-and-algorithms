'ust strict';

let mergeLists = require('../ll-merge.js');
let LinkedList = require('../../../../data-structures/linked-list/linked-list.js');

describe('linked list merge function', () => {

  it('can merge two lists', () => {
    let listOne = new LinkedList();
    listOne.append(1);
    listOne.append(2);
    listOne.append(3);

    let listTwo = new LinkedList();
    listTwo.append(11);
    listTwo.append(12);
    listTwo.append(13);

    let listThree = new LinkedList();
    listThree.append(1);
    listThree.append(11);
    listThree.append(2);
    listThree.append(12);
    listThree.append(3);
    listThree.append(13);
    
    let result = mergeLists(listOne, listTwo);
    let expected = listThree.head;

    expect(result).toEqual(expected);
  });

  it('handles no parameters', () => {
   
    let result = mergeLists();
    let expected = null;

    expect(result).toEqual(expected);
  });

  it('handles 1 parameter', () => {
   
    let listOne = new LinkedList();
    listOne.append(1);
    listOne.append(2);
    listOne.append(3);
    
    let result = mergeLists(listOne);
    let expected = listOne.head;

    expect(result).toEqual(expected);
  });

  it('handles list 1 longer than list 2', () => {
   
    let listOne = new LinkedList();
    listOne.append(1);
    listOne.append(2);
    listOne.append(3);
    listOne.append(4);

    let listTwo = new LinkedList();
    listTwo.append(11);
    listTwo.append(12);


    let listThree = new LinkedList();
    listThree.append(1);
    listThree.append(11);
    listThree.append(2);
    listThree.append(12);
    listThree.append(3);
    listThree.append(4);
    
    let result = mergeLists(listOne, listTwo);
    let expected = listThree.head;

    expect(result).toEqual(expected);
  });

  it('handles list 2 longer than list 1', () => {
   
    let listOne = new LinkedList();
    listOne.append(1);
    listOne.append(2);

    let listTwo = new LinkedList();
    listTwo.append(11);
    listTwo.append(12);
    listTwo.append(13);
    listTwo.append(14);


    let listThree = new LinkedList();
    listThree.append(1);
    listThree.append(11);
    listThree.append(2);
    listThree.append(12);
    listThree.append(13);
    listThree.append(14);
    
    let result = mergeLists(listOne, listTwo);
    let expected = listThree.head;

    expect(result).toEqual(expected);
  });

  xit('handles 1 element long lists', () => {
    let listOne = new LinkedList();
    listOne.append(1);

    let listTwo = new LinkedList();
    listTwo.append(11);

    let listThree = new LinkedList();
    listThree.append(1);
    listThree.append(11);
    
    let result = mergeLists(listOne, listTwo);
    let expected = listThree.head;

    expect(result).toEqual(expected);
  });

  it('handles empty lists for listOne', () => {
    let listOne = new LinkedList();
    listOne.append(1);

    let listTwo = new LinkedList();

    let listThree = new LinkedList();
    listThree.append(1);
    
    let result = mergeLists(listOne, listTwo);
    let expected = listThree.head;

    expect(result).toEqual(expected);
  });

  it('handles empty lists for listTwo', () => {
    let listOne = new LinkedList();

    let listTwo = new LinkedList();
    listTwo.append(10);

    let listThree = new LinkedList();
    listThree.append(10);
    
    let result = mergeLists(listOne, listTwo);
    let expected = listThree.head;

    expect(result).toEqual(expected);
  });

});
