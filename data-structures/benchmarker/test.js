'use strict';

let x = {h: "hi"};
let y = {h: "ho"};
let z = {h: "he"};

let a = [x,y];
let b = [z]

let o = [...a, ...b];


console.log(`b: `, b);
console.log(`a: `, a);
console.log(`o: `, o);

x.wat = 4;

console.log(`b: `, b);
console.log(`a: `, a);
console.log(`o: `, o);

