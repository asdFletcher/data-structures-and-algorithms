'use strict';

// stacksAndQueues/stacks-and-queues.js

const AnimalShelter = require('./../fifo-animal-shelter.js');

describe('animal shelter', () => {
  it('correctly accepts cats', () => {
    let myShelter = new AnimalShelter();

    let cat = 
    {
      species: 'cat',
    };
    myShelter.enQ(cat);

    expect(myShelter.cat.front).not.toBeNull();
    expect(myShelter.dog.front).not.toBeNull();
    expect(myShelter.cat.front.species).toEqual('cat');
    expect(myShelter).toBeInstanceOf(AnimalShelter);
  });

  it('correctly accepts dogs', () => {
    let myShelter = new AnimalShelter();

    let cat = 
    {
      species: 'dog',
    };
    myShelter.enQ(cat);

    // expect(myShelter.cat.front).not.toBeNull();
    expect(myShelter.cat.front).toBeNull();
    expect(myShelter.dog.front.species).toEqual('dog');
    expect(myShelter).toBeInstanceOf(AnimalShelter);
  });
});

