'use strict';

const exported = require('../array-shift.js');
const arrayShift = exported.insertShiftArray; 

describe('insert shift function', () => {

    it('insets values correctly', () => {
        let inputArr = [4,3,2,1]
        let inputVal = 100;

        let expected = [4,3,100,2,1];
        let shifted = arrayShift(inputArr, inputVal);
        expect(expected).toEqual(shifted);
    });

    it('handles empty arrays', () => {
        let inputArr = []
        let inputVal = 100;
        
        let expected = [100];
        let shifted = arrayShift(inputArr, inputVal);
        expect(expected).toEqual(shifted);
    });

    it('handles negative numbers', () => {
        let inputArr = [4,8,15,23,42,1];
        let inputVal = -100;

        let expected = [4,8,15,-100,23,42,1];
        let shifted = arrayShift(inputArr, inputVal);
        expect(expected).toEqual(shifted);
    });

});