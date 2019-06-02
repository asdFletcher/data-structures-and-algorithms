/*
On an infinite plane, a robot initially stands at (0, 0) and faces north.  The robot can receive one of three instructions:

"G": go straight 1 unit;
"L": turn 90 degrees to the left;
"R": turn 90 degress to the right.
The robot performs the instructions given in order, and repeats them forever.

Return true if and only if there exists a circle in the plane such that the robot never leaves the circle.

Example 1:

Input: "GGLLGG"
Output: true
Explanation: 
The robot moves from (0,0) to (0,2), turns 180 degrees, and then returns to (0,0).
When repeating these instructions, the robot remains in the circle of radius 2 centered at the origin.
Example 2:

Input: "GG"
Output: false
Explanation: 
The robot moves north indefinitely.
Example 3:

Input: "GL"
Output: true
Explanation: 
The robot moves from (0, 0) -> (0, 1) -> (-1, 1) -> (-1, 0) -> (0, 0) -> ...
 

Note:

1 <= instructions.length <= 100
instructions[i] is in {'G', 'L', 'R'}
*/


function getDirection(angle) {
  angle = angle % 360;
  if (angle === 90 || angle === -270) {
    return 'N'
  }
  if (angle === 0) {
    return 'E'
  }
  if (angle === 180 || angle === -180) {
    return 'W'
  }
  if (angle === 270 || angle === -90) {
    return 'S'
  }
}

function reduceInstructions(arr) {
  let res = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < arr.length; j++){
      res.push(arr[j]);
    }
  }
  return res;
}

var isRobotBounded = function(instructions) {
  let N = 0;
  let E = 0;
  let W = 0;
  let S = 0;

  instructions = reduceInstructions(instructions);

  let dir = 90;
  for (let i = 0; i < instructions.length; i++){
    if (instructions[i] === 'G') {
      let letterDir = getDirection(dir);
      if (letterDir === 'N') { N++; }
      if (letterDir === 'E') { E++; }
      if (letterDir === 'W') { W++; }
      if (letterDir === 'S') { S++; }
    }
    if (instructions[i] === 'L') {
      dir += 90;
    }
    if (instructions[i] === 'R') {
      dir -= 90;
    }
  }

  if (N - S !== 0) {
    return false;
  }
  if (E - W !== 0) {
    return false;
  }
  return true;
};


console.log(`should be true: `, isRobotBounded('GGLLGG'));
console.log(`should be false: `, isRobotBounded('GG'));
console.log(`should be true: `, isRobotBounded('GL'));
console.log(`should be false: `, isRobotBounded('"GLGLGGLGL"'));


// function reduceNumbers(instructions) {
//   let instructions2 = [];
//   let sum = 0;
//   for (let i = 0; i < 4; i++) {
//     for (let j = 0; j < instructions.length; j++) {
      
//       if (instructions[j] === 'G') {
//         sum++;
//       } else {
//         if (sum !== 0) {
//           instructions2.push(sum);
//           sum = 0;
//         }
//         instructions2.push(instructions[j]);
//       }
//       if (j === instructions.length - 1 && sum !== 0) {
//         instructions2.push(sum);
//         sum = 0;
//       }
//     }
//   }
//   return instructions2;
// }

// function reduceLetters(instructions) {
//   let dir = 90;

//   for(let i = 0; i < instructions.length; i++) {
//     if (instructions[i] !== 'L' && instructions[i] !== 'R') {

//     } else {
//       if (instructions[i] === 'L') {
//         dir = dir + 90;
//       } else if (instructions[i] === 'R') {
//         dir = dir - 90;
//       }
//     }
//   }
  
// }
