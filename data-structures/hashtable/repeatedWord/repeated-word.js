'use strict';

const HashTable = require('./../hashtable.js');

function firstRepeatedWord(string){
  let myHashTable = new HashTable(100);

  let wordArray = string.split(/\b/).filter( (w) => w.match(/[\w]/));
  for (let i = 0; i < wordArray.length; i++){
    let word = wordArray[i].toLowerCase();
    if (myHashTable.contains(word)){
      return word;
    }
    myHashTable.add(word);
  }
}


module.exports = firstRepeatedWord;
