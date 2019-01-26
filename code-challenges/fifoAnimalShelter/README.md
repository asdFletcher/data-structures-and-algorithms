![CF](http://i.imgur.com/7v5ASc8.png)
=================================================


### Author: Fletcher LaRue
Worked with Jonathan DiQuattro and Ryan Gallaway

### Links and Resources

[![Build Status](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms.svg?branch=master)](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms)

* [repo](https://github.com/asdFletcher/data-structures-and-algorithms/tree/master/code-challenges)
* [travis](https://www.travis-ci.com/asdFletcher/data-structures-and-algorithms)

--- 

---

## Feature Tasks
Create a class called AnimalShelter which holds only dogs and cats. The shelter operates using a first-in, first-out approach.
Implement the following methods:
enqueue(animal): adds animal to the shelter. animal can be either a dog or a cat object.
dequeue(pref): returns either a dog or a cat. If pref is not "dog" or "cat" then return null.

## Approach & Efficiency
<!-- What approach did you take? Why? What is the Big O space/time for this approach? -->

## API
<!-- Description of each method publicly available to your Linked List -->

## Whiteboard Solution
<!-- Embedded whiteboard image -->
![alt text](./assets/fifo_animal_shelter.jpg "Whiteboard image")

---
### Files
#### `fif-animal-shelter.js`
---
##### Exported Values and Methods for the following files:

#### `fifo-animal-shelter.js`
`fifo-animal-shelter.js` exports the AnimalShelte class, which has 2 methods available for adding and removing animals to the queue.

* `AnimalShelter` class
    * Methods:
        * `constructor()`
        * `enQ(<animal>)`
        * `deQ(<preference>)`
---

##### Using the `AnimalShelter` class methods:

- #### `AnimalShelter` `constructor()`
```JavaScript
const myShelter = new AnimalShelter();
```
* Creates a new shelter that is empty
* Accepts no arguments
* If arguments are passed in they will be ignored

- #### `AnimalShelter.prototype.enQ(<amimal>)`
```JavaScript
const myShelter = new AnimalShelter();
let myCat = {
    species: 'cat'
}
let myDog = {
    species: 'dog'
}
myShelter.enQ(myCat);
myShelter.enQ(myDog);

```
* appends the cats to the end of the cat queue
* Accepts 1 argument
* The argument must be an object with a species attribute that is either `cat` or `dog` otherwise it will not be added to the shelter

- #### `AnimalShelter.prototype.dqQ(<amimal>)`
```JavaScript
const myShelter = new AnimalShelter();
let myCat = {
    species: 'cat'
}
let myDog = {
    species: 'dog'
}
myShelter.enQ(myCat);
myShelter.enQ(myDog);

myShelter.deQ('cat'); // removes 1 cat
myShelter.deQ('cat'); // throws error, 'no cats'

```
* removes either a `cat` or `dog` from the `cat` and `dog` queues. 
* Accepts 1 argument, a string of either `cat` or `dog`
* If there are no more of the preferred species an error is thrown.
---

### Testing

Tests are written and can be found in the `__tests__` folder.

All testing for this class was done with Jest: 
* [Jest docs](https://jestjs.io/docs/en/getting-started)

Instructions for replicating the tests for this project are as follows:

* Clone the repo.
* Create a node runtime environment

    ```JavaScript
    npm init
    ```
    This will create a `package.json` file, a `package-lock.json` file.

* Install Jest

    ```JavaScript
    npm i jest
    ```
* Run jest
    ```JavaScript
    npm jest --verbose --coverage
    ```
    It is useful to bind this to the command:
    ```JavaScript
    npm test
    ```
    To do this, manually edit your package.json to include the following under the "scripts" attribute:
    ```Javascript
    "scripts": {
        "test": "jest --verbose --coverage",
        "test-watch": "jest --watchAll --verbose --coverage"
    }
    ```
    `test-watch` will re-run tests when the file is saved


---

### Dependencies

* jest: `npm i jest`


### Setup
#### `.env` requirements
* n/a

--- 
## Whiteboard Solution
![alt text](./assets/fifo_animal_shelter.jpg "Whiteboard image")


