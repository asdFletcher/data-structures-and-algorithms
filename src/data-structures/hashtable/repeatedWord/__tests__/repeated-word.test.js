'use strict';

const firstRepeatedWord = require('./../repeated-word.js');

describe('firstRepeatedWord', () => {
  it('works for empty string', ()=> {
    let str = '';

    let result = firstRepeatedWord(str);
    let expected = undefined;
    expect(result).toEqual(expected);
  });

  it('works for repeated words string', ()=> {
    let str = 'Once upon a time, there was a brave princess who...';

    let result = firstRepeatedWord(str);
    let expected = 'a';
    expect(result).toEqual(expected);
  });

  it('is non case sensitive', ()=> {
    let str = 'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way – in short, the period was so far like the present period, that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only...';

    let result = firstRepeatedWord(str);
    let expected = 'it';
    expect(result).toEqual(expected);
  });

  it('is non case sensitive', ()=> {
    let str = 'It was a queer, sultry summer, the summer they electrocuted the Rosenbergs, and I didn’t know what I was doing in New York...';

    let result = firstRepeatedWord(str);
    let expected = 'summer';
    expect(result).toEqual(expected);
  });

});