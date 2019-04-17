'use strict';

let BinarySearch = require('../array-binary-search').BinarySearch;

describe('binary search', () => {
    it('works for even array length', ()=> {
        let inputArr = [-10,1,2,6,100,125];
        let key = -10;
        let expected = 0;
        let result = BinarySearch(inputArr,key);
        expect(expected).toEqual(result);
    });

    it('works for odd array length', ()=> {
        let inputArr = [-10,1,2,6,100,125,1];
        let key = 1;
        let expected = 1;
        let result = BinarySearch(inputArr,key);
        expect(expected).toEqual(result);
    });

    it('works for right half', ()=> {
        let inputArr = [-10,1,2,6,100,125,1];
        let key = 125;
        let expected = 5;
        let result = BinarySearch(inputArr,key);
        expect(expected).toEqual(result);
    });

    it('works for not found element', ()=> {
        let inputArr = [-10,1,2,6,100,125,1];
        let key = 111;
        let expected = -1;
        let result = BinarySearch(inputArr,key);
        expect(expected).toEqual(result);
    });

    it('works for mid element', ()=> {
        let inputArr = [-10,1,2];
        let key = 1;
        let expected = 1;
        let result = BinarySearch(inputArr,key);
        expect(expected).toEqual(result);
    });

});