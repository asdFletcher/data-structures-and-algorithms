'use strict';

const AVLTreeNode = require('../avl-tree/avl-tree-node.js');
const AVLTree = require('../avl-tree/avl-tree.js');


let count = 0;
const times = {};
const data = [];


const myTimer = setInterval( ()=> {
  let time = new Date().getTime();
  times[time] = count;
  count++;
  if (count > 1000){
    clearInterval(myTimer);
    

    for( let key in times){
      data.push({x: times[key], y: key});
    }
    // console.log(times);
    // console.log(data);

    console.log(data[data.length-1].y - data[0].y);
  }
}, 0);







