// class TreeNode {
//   constructor(val) {
//     this.val = val;
//     this.left = null;
//     this.right = null;
//   }
// }

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.next = null;
  }
};

class VBT {
  constructor() {
    this.root = null;
  }

  insert(inputVals) {
    //           0
    //    1           2
    // 3    4      5      6
    // 7 8  9 10  11 12  13 14 

    // [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]

    // 0 -> 1,2,
    // 1 -> 3, 4
    // 2 -> 5, 6
    // 3 -> 7, 8
    // 4 -> 9, 10
    // 5 -> 11, 12
    // 6 -> 13, 14

    // create nodes for all new values
    // [1,2,2,null,3,null,3] --> [node,node,node,null,node,null,node]
    let nodeArray = new Array(inputVals.length);
    for (let i = 0; i < inputVals.length; i++) {
      if (inputVals[i]) {
        nodeArray[i] = new TreeNode(inputVals[i]);
      } else {
        nodeArray[i] = null;
      }
    }

    // assign pointers based on array index
    for (let i = 0; i < nodeArray.length; i++) {
      let leftIndex = (i * 2) + 1;
      let rightIndex = leftIndex + 1;
      if (nodeArray[leftIndex]) {
        nodeArray[i].left = nodeArray[leftIndex];
      }
      if (nodeArray[rightIndex]) {
        nodeArray[i].right = nodeArray[rightIndex];
      }
    }
    this.root = nodeArray[0];
    return this.root;
  }

}

module.exports = VBT;
