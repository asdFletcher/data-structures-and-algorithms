'use strict';

function getRandomNumberSet(count) {
  const randomNumbers = new Set();
  while (randomNumbers.size < count) {
    const num = Math.floor(Math.random() * 1024 * 1024 * 128);
    randomNumbers.add(num);
  }
  return randomNumbers;
}

module.exports = getRandomNumberSet;