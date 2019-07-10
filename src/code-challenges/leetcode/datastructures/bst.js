class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(val) {
    let newNode = new TreeNode(val);

    const go = (node) => {
      if (newNode.val < node.val) {
        if(node.left) {
          go(node.left);
        } else {
          node.left = newNode;
        }
      }
      if (newNode.val > node.val) {
        if(node.right) {
          go(node.right);
        } else {
          node.right = newNode;
        }
      }
    }

    if (!this.root) {
      this.root = newNode;
    } else {
      go(this.root);
    }

    return this.root;
  }

  insertMany(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.insert(arr[i]);
    }
    return this.root;
  }

}

module.exports = BST;
