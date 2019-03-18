'use strict';

const AVLTreeNode = require('../avl-tree/avl-tree-node.js');
const AVLTree = require('../avl-tree/avl-tree.js');

function doStuff() {
  let count = 0;
  const times = {};
  const data = [];

  async function test(){
    let time = new Date().getTime();
    times[time] = count;
    count++;
    for(let i = 0; i < 100; i++){

    }
      for( let key in times){

  }

  await test();
  data.push({x: times[key], y: key});
  // console.log(times);
  // console.log(data);
  console.log(data[data.length-1].y - data[0].y);

}

doStuff();
