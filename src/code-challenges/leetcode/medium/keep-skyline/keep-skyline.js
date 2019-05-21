// Input: grid = [[3,0,8,4],[2,4,5,7],[9,2,6,3],[0,3,1,0]]
// Output: 35
// Explanation: 
// The grid is:
// [ [3, 0, 8, 4], 
//   [2, 4, 5, 7],
//   [9, 2, 6, 3],
//   [0, 3, 1, 0] ]

// The skyline viewed from top or bottom is: [9, 4, 8, 7]
// The skyline viewed from left or right is: [8, 7, 9, 3]

// The grid after increasing the height of buildings without affecting skylines is:

// gridNew = [ [8, 4, 8, 7],
//             [7, 4, 7, 7],
//             [9, 4, 8, 7],
//             [3, 3, 3, 3] ]

// 1 < grid.length = grid[0].length <= 50.
// All heights grid[i][j] are in the range [0, 100].
// All buildings in grid[i][j] occupy the entire grid cell: that is, they are a 1 x 1 x grid[i][j] rectangular prism.

//      j = 0  1  2  3
// i = 0 [ [8, 4, 8, 7],  <-- [0][j]
// i = 1   [7, 4, 7, 7],  <-- [1][j]
// i = 2   [9, 4, 8, 7],  <-- [2][j]
// i = 3   [3, 3, 3, 3] ] <-- [3][j]

// colMaxs=[ . . . .]  j
function maxIncreaseKeepingSkyline(grid) {
  let grandTotal = 0;
  let rowMaxes = [];
  let colMaxes = [];
  for (let i = 0; i < grid.length; i++) {

    for (let j = 0; j < grid[0].length; j++) {
      let h = grid[i][j];
      if (h > rowMaxes[i] || !rowMaxes[i]) {
        rowMaxes[i] = h;
      }
      if (h > colMaxes[j] || !colMaxes[j]) {
        colMaxes[j] = h;
      }
    }
  }
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      let h = grid[i][j];
      if (h < rowMaxes[i] || h < colMaxes[j]) {
        if (rowMaxes[i] < colMaxes[j]) {
          grandTotal += (rowMaxes[i] - h)
        } else {
          grandTotal += (colMaxes[j] - h)
        }
      }
    }
  }
  return grandTotal;
}

gridNew = [ [3, 0, 8, 4], 
            [2, 4, 5, 7],
            [9, 2, 6, 3],
            [0, 3, 1, 0] ]
console.log(`result: `, maxIncreaseKeepingSkyline(gridNew));

