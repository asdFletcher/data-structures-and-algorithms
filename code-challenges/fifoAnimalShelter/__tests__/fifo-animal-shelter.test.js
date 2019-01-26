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
    expect(myShelter.dog.front).toBeNull();
    expect(myShelter.cat.front.value.species).toEqual('cat');
    expect(myShelter).toBeInstanceOf(AnimalShelter);
  });

  it('correctly accepts dogs', () => {
    let myShelter = new AnimalShelter();

    let cat = 
    {
      species: 'dog',
    };
    myShelter.enQ(cat);

    expect(myShelter.cat.front).toBeNull();
    expect(myShelter.dog.front.value.species).toEqual('dog');
    expect(myShelter).toBeInstanceOf(AnimalShelter);
  });

  it('accepts more than 1 accepts dog', () => {
    let myShelter = new AnimalShelter();

    let dog = 
    {
      species: 'dog',
    };
    myShelter.enQ(dog);
    myShelter.enQ(dog);

    expect(myShelter.dog.front.value.species).toEqual('dog');
    expect(myShelter.dog.back.value.species).toEqual('dog');
    expect(myShelter).toBeInstanceOf(AnimalShelter);
    expect( ()=> {
      myShelter.deQ('dog');
    }).not.toThrow();
    expect( ()=> {
      myShelter.deQ('dog');
    }).not.toThrow();
    expect( ()=> {
      myShelter.deQ('dog');
    }).toThrow();
  });

  it('dequeue throws an error when tehre are none of a type', () => {
    let myShelter = new AnimalShelter();

    expect( ()=> {
      myShelter.deQ('dog');
    }).toThrow();
  });
});

