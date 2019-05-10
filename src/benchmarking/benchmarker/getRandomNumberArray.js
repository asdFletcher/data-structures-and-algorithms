'use strict';

function getRandomNumberArray(count) {
  return Array.from(getRandomNumberSet(count))
}

module.exports = getRandomNumberArray;