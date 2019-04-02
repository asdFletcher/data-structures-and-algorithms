
const AVLTree = require ('../avl-tree.js');
const Node = require('../avl-tree-node.js');

function setCountersToZero(tree){
  tree.insertComputations = 0;
  tree.removeComputations = 0;
  tree.containsComputations = 0;
  tree.findMaxComputations = 0;
  tree.findMinComputations = 0;
  tree.printComputations = 0;
}

describe('avl tree', () => {
  describe('constructor', () => {
    it('constructs a tree', ()=>{
      let myTree = new AVLTree();
      expect(myTree).toBeInstanceOf(AVLTree);
    });
    it('fresh tree has no nodes', ()=>{
      let myTree = new AVLTree();
      expect(myTree.root).toBeNull();
    });
    it('ignores parameters', ()=>{
      let myTree = new AVLTree(2);
      expect(myTree.root).toBeNull();
    });
  });
  
  describe('insert', () => {
    it('returns undefined when no input is given, doesnt return a node', ()=>{
      let myTree = new AVLTree();
      let result = myTree.insert();
  
      expect(result).toBeUndefined();
      expect(myTree.root).toBeNull();
    });
  
    it('returns undefined if input is a non numeric string, and does not insert the node', ()=>{
      let myTree = new AVLTree();
      let result = myTree.insert('test');
  
      expect(result).toBeUndefined();
      expect(myTree.root).toBeNull();
    });
  
    it('returns the node if input is a numeric string, and inserts the node', ()=>{
      let myTree = new AVLTree();
      let result = myTree.insert('4');
  
      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toBe(4);
      expect(myTree.root.left).toBeNull();
      expect(myTree.root.right).toBeNull();
  
      expect(result).toBeInstanceOf(Node);
      expect(result.value).toBe(4);
    });
  
    it('returns undefined if input is true, and does not insert the node', ()=>{
      let myTree = new AVLTree();
      let result = myTree.insert(true);
  
      expect(result).toBeUndefined();
      expect(myTree.root).toBeNull();
    });
  
    it('returns undefined if input is false, and does not insert the node', ()=>{
      let myTree = new AVLTree();
      let result = myTree.insert(false);
  
      expect(result).toBeUndefined();
      expect(myTree.root).toBeNull();
    });
  
    it('returns the node if input is not an integer, and inserts the node', ()=>{
      let myTree = new AVLTree();
      let result = myTree.insert(3.4);
  
      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toEqual(3.4);
      expect(myTree.root.left).toBeNull();
      expect(myTree.root.right).toBeNull();
  
      expect(result).toBeInstanceOf(Node);
      expect(result.value).toBe(3.4);
    });
  
    it('returns the node if input is negative, and inserts the node', ()=>{
      let myTree = new AVLTree();
      let result = myTree.insert(-5.4);
  
      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toEqual(-5.4);
      expect(myTree.root.left).toBeNull();
      expect(myTree.root.right).toBeNull();
  
      expect(result).toBeInstanceOf(Node);
      expect(result.value).toBe(-5.4);
    });
    
    it('returns undefined when the same node is inserted more than once at the root', ()=>{
      let myTree = new AVLTree();
      myTree.insert(5);
      let result = myTree.insert(5);
  
      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toBe(5);
      expect(myTree.root.left).toBeNull();
      expect(myTree.root.right).toBeNull();
      expect(myTree.root.height).toBe(0);
  
      expect(result).toBeUndefined();
    });

    it('returns undefined when the same node is inserted more than once not on the root', ()=>{
      let myTree = new AVLTree();
      myTree.insert(5);
      myTree.insert(4);
      let result = myTree.insert(4);
  
      expect(myTree.root.value).toBe(5);

      expect(myTree.root.left.value).toBe(4);
  
      expect(result).toBeUndefined();
    });

    it('can insert a node', ()=>{
      let myTree = new AVLTree();
      let result = myTree.insert(5);
  
      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toBe(5);
      expect(myTree.root.left).toBeNull();
      expect(myTree.root.right).toBeNull();
      expect(myTree.root.height).toBe(0);
  
      expect(result).toBeInstanceOf(Node);
      expect(result.value).toBe(5);
    });
    
    it('can insert 2 nodes with no rotations', ()=>{
      let myTree = new AVLTree();
      myTree.insert(10);
      myTree.insert(5);
  
      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toBe(10);
      expect(myTree.root.height).toBe(1);
  
  
      expect(myTree.root.left).toBeInstanceOf(Node);
      expect(myTree.root.left.value).toBe(5);
      expect(myTree.root.left.left).toBeNull();
      expect(myTree.root.right).toBeNull();
  
      expect(myTree.root.left.height).toBe(0);
  
    });
  
    it('can insert 3 nodes with no rotations', ()=>{
      let myTree = new AVLTree();
      myTree.insert(5);
      myTree.insert(6);
      myTree.insert(4);
  
      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toBe(5);
      expect(myTree.root.height).toBe(1);
  
      expect(myTree.root.left).toBeInstanceOf(Node);
      expect(myTree.root.left.value).toBe(4);
      expect(myTree.root.left.left).toBeNull();
      expect(myTree.root.left.height).toBe(0);
      
      
      expect(myTree.root.right).toBeInstanceOf(Node);
      expect(myTree.root.right.value).toBe(6);
      expect(myTree.root.right.left).toBeNull();
      expect(myTree.root.right.height).toBe(0);
    });
  
    it('can insert 3 nodes with a single left root rotation', ()=>{
      let myTree = new AVLTree();
      myTree.insert(5);
      myTree.insert(4);
      myTree.insert(3);
  
      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toBe(4);
  
      expect(myTree.root.left).toBeInstanceOf(Node);
      expect(myTree.root.left.value).toBe(3);
      expect(myTree.root.left.left).toBeNull();
      
      
      expect(myTree.root.right).toBeInstanceOf(Node);
      expect(myTree.root.right.value).toBe(5);
      expect(myTree.root.right.left).toBeNull();
    });
  
    it('can insert 3 nodes with a single left root rotation, with correct height maintenance', ()=>{
      let myTree = new AVLTree();
      myTree.insert(5);
      myTree.insert(4);
      myTree.insert(3);
  
      expect(myTree.root.height).toBe(1);
      expect(myTree.root.left.height).toBe(0);
      expect(myTree.root.right.height).toBe(0);
    });
  
    it('can insert 3 nodes with a single right root rotation', ()=>{
      let myTree = new AVLTree();
      myTree.insert(1);
      myTree.insert(2);
      myTree.insert(3);
  
      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toBe(2);
  
      expect(myTree.root.left).toBeInstanceOf(Node);
      expect(myTree.root.left.value).toBe(1);
      expect(myTree.root.left.left).toBeNull();
      
      
      expect(myTree.root.right).toBeInstanceOf(Node);
      expect(myTree.root.right.value).toBe(3);
      expect(myTree.root.right.left).toBeNull();
    });
  
    it('can insert 3 nodes with a single right root rotation, with correct height maintenance', ()=>{
      let myTree = new AVLTree();
      myTree.insert(1);
      myTree.insert(2);
      myTree.insert(3);
  
      expect(myTree.root.height).toBe(1);
      expect(myTree.root.left.height).toBe(0);
      expect(myTree.root.right.height).toBe(0);
    });
  
    it('can insert 3 nodes with a double left root rotation, with no sub trees', ()=>{
      let myTree = new AVLTree();
      myTree.insert(7);
      myTree.insert(5);
      myTree.insert(6);
  
      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toBe(6);
  
      expect(myTree.root.left).toBeInstanceOf(Node);
      expect(myTree.root.left.value).toBe(5);
      expect(myTree.root.left.left).toBeNull();
      
      
      expect(myTree.root.right).toBeInstanceOf(Node);
      expect(myTree.root.right.value).toBe(7);
      expect(myTree.root.right.left).toBeNull();
    });
  
    it('can insert 3 nodes with a double left root rotation, with correct height maintenance', ()=>{
      let myTree = new AVLTree();
      myTree.insert(7);
      myTree.insert(5);
      myTree.insert(6);
  
      expect(myTree.root.height).toBe(1);
      expect(myTree.root.left.height).toBe(0);
      expect(myTree.root.right.height).toBe(0);
    });
  
    it('can insert 3 nodes with a double right root rotation, with no sub trees', ()=>{
      let myTree = new AVLTree();
      myTree.insert(7);
      myTree.insert(9);
      myTree.insert(8);
  
      expect(myTree.root.value).toBe(8);
  
      expect(myTree.root.left.value).toBe(7);
      expect(myTree.root.left.left).toBeNull();
      
      expect(myTree.root.right.value).toBe(9);
      expect(myTree.root.right.left).toBeNull();
    });
  
    it('can insert 3 nodes with a double right root rotation, with correct height maintenance', ()=>{
      let myTree = new AVLTree();
      myTree.insert(7);
      myTree.insert(9);
      myTree.insert(8);
  
      expect(myTree.root.height).toBe(1);
      expect(myTree.root.left.height).toBe(0);
      expect(myTree.root.right.height).toBe(0);
    });
  
    it('does a double left root rotation, with a single left child on new root', ()=>{
      let myTree = new AVLTree();
      myTree.insert(20);
      myTree.insert(10);
      myTree.insert(25);
      myTree.insert(5);
      myTree.insert(15);
      myTree.insert(14);
  
      expect(myTree.root.value).toBe(15);
  
      expect(myTree.root.left.value).toBe(10);
      expect(myTree.root.left.left.value).toBe(5);
      expect(myTree.root.left.right.value).toBe(14);
  
      expect(myTree.root.right.value).toBe(20);
      expect(myTree.root.right.right.value).toBe(25);
      expect(myTree.root.right.left).toBeNull();
    });
  
    it('does a double left root rotation, with a single left child on new root, with correct height maintenance', ()=>{
      let myTree = new AVLTree();
      myTree.insert(20);
      myTree.insert(10);
      myTree.insert(25);
      myTree.insert(5);
      myTree.insert(15);
      myTree.insert(14);
  
      expect(myTree.root.height).toBe(2);
      
      expect(myTree.root.left.height).toBe(1);
  
      expect(myTree.root.left.left.height).toBe(0);
      expect(myTree.root.left.right.height).toBe(0);
  
      expect(myTree.root.right.height).toBe(1);
      expect(myTree.root.right.right.height).toBe(0);
    });
  
    it('does a double left root rotation, with a single right child on new root', ()=>{
      let myTree = new AVLTree();
      myTree.insert(20);
      myTree.insert(10);
      myTree.insert(25);
      myTree.insert(5);
      myTree.insert(15);
      myTree.insert(16);
  
      expect(myTree.root.value).toBe(15);
  
      expect(myTree.root.left.value).toBe(10);
      expect(myTree.root.left.left.value).toBe(5);
      expect(myTree.root.left.right).toBeNull();
  
      expect(myTree.root.right.value).toBe(20);
      expect(myTree.root.right.right.value).toBe(25);
      expect(myTree.root.right.left.value).toBe(16);
    });
  
    it('does a double left root rotation, with a single right child on new root, with correct height maintenance', ()=>{
      let myTree = new AVLTree();
      myTree.insert(20);
      myTree.insert(10);
      myTree.insert(25);
      myTree.insert(5);
      myTree.insert(15);
      myTree.insert(16);
  
      expect(myTree.root.height).toBe(2);
  
      expect(myTree.root.left.height).toBe(1);
      expect(myTree.root.left.left.height).toBe(0);
  
      expect(myTree.root.right.height).toBe(1);
      expect(myTree.root.right.right.height).toBe(0);
      expect(myTree.root.right.left.height).toBe(0);
    });
  
    it('does a double right root rotation, with a single right child on new root', ()=>{
      let myTree = new AVLTree();
      myTree.insert(20);
      myTree.insert(10);
      myTree.insert(30);
      myTree.insert(25);
      myTree.insert(35);
      myTree.insert(26);
  
      expect(myTree.root.value).toBe(25);
  
      expect(myTree.root.left.value).toBe(20);
      expect(myTree.root.left.left.value).toBe(10);
      expect(myTree.root.left.right).toBeNull();
  
      expect(myTree.root.right.value).toBe(30);
      expect(myTree.root.right.right.value).toBe(35);
      expect(myTree.root.right.left.value).toBe(26);
    });
  
    it('does a double right root rotation, with a single right child on new root, with correct height maintenance', ()=>{
      let myTree = new AVLTree();
      myTree.insert(20);
      myTree.insert(10);
      myTree.insert(30);
      myTree.insert(25);
      myTree.insert(35);
      myTree.insert(26);
  
      expect(myTree.root.height).toBe(2);
  
      expect(myTree.root.left.height).toBe(1);
      expect(myTree.root.left.left.height).toBe(0);
  
      expect(myTree.root.right.height).toBe(1);
      expect(myTree.root.right.right.height).toBe(0);
      expect(myTree.root.right.left.height).toBe(0);
    });
  
    it('does a double right root rotation, with a single left child on new root', ()=>{
      let myTree = new AVLTree();
      myTree.insert(20);
      myTree.insert(10);
      myTree.insert(30);
      myTree.insert(25);
      myTree.insert(35);
      myTree.insert(24);
  
      expect(myTree.root.value).toBe(25);
  
      expect(myTree.root.left.value).toBe(20);
      expect(myTree.root.left.left.value).toBe(10);
      expect(myTree.root.left.right.value).toBe(24);
  
      expect(myTree.root.right.value).toBe(30);
      expect(myTree.root.right.right.value).toBe(35);
      expect(myTree.root.right.left).toBeNull();
    });
    it('does a double right root rotation, with a single left child on new root, with correct height maintenance', ()=>{
      let myTree = new AVLTree();
      myTree.insert(20);
      myTree.insert(10);
      myTree.insert(30);
      myTree.insert(25);
      myTree.insert(35);
      myTree.insert(24);
  
      expect(myTree.root.height).toBe(2);
  
      expect(myTree.root.left.height).toBe(1);
      expect(myTree.root.left.left.height).toBe(0);
      expect(myTree.root.left.right.height).toBe(0);
  
      expect(myTree.root.right.height).toBe(1);
      expect(myTree.root.right.right.height).toBe(0);
    });
  
    it('does a single left non-root rotation', ()=>{
      let myTree = new AVLTree();
      myTree.insert(7);
      myTree.insert(6);
      myTree.insert(9);
      myTree.insert(8);
      myTree.insert(5);
      myTree.insert(4);
  
      expect(myTree.root.value).toBe(7);
  
      expect(myTree.root.left.value).toBe(5);
      expect(myTree.root.left.left.value).toBe(4);
      expect(myTree.root.left.right.value).toBe(6);
  
      expect(myTree.root.right.value).toBe(9);
      expect(myTree.root.right.right).toBeNull();
      expect(myTree.root.right.left.value).toBe(8);
    });
  
    it('does a single left non-root rotation, with correct height maintenance', ()=>{
      let myTree = new AVLTree();
      myTree.insert(7);
      myTree.insert(6);
      myTree.insert(9);
      myTree.insert(8);
      myTree.insert(5);
      myTree.insert(4);
  
      expect(myTree.root.height).toBe(2);
  
      expect(myTree.root.left.height).toBe(1);
      expect(myTree.root.left.left.height).toBe(0);
      expect(myTree.root.left.right.height).toBe(0);
  
      expect(myTree.root.right.height).toBe(1);
      expect(myTree.root.right.left.height).toBe(0);
    });
  
    it('does a single right non-root rotation', ()=>{
      let myTree = new AVLTree();
      myTree.insert(3);
      myTree.insert(2);
      myTree.insert(5);
      myTree.insert(1);
      myTree.insert(6);
      myTree.insert(7);
  
      expect(myTree.root.value).toBe(3);
  
      expect(myTree.root.left.value).toBe(2);
      expect(myTree.root.left.left.value).toBe(1);
      expect(myTree.root.left.right).toBeNull();
  
      expect(myTree.root.right.value).toBe(6);
      expect(myTree.root.right.right.value).toBe(7);
      expect(myTree.root.right.left.value).toBe(5);
    });
  
    it('does a single right non-root rotation, with correct height maintenance', ()=>{
      let myTree = new AVLTree();
      myTree.insert(3);
      myTree.insert(2);
      myTree.insert(5);
      myTree.insert(1);
      myTree.insert(6);
      myTree.insert(7);
  
      expect(myTree.root.height).toBe(2);
  
      expect(myTree.root.left.height).toBe(1);
      expect(myTree.root.left.left.height).toBe(0);
  
      expect(myTree.root.right.height).toBe(1);
      expect(myTree.root.right.right.height).toBe(0);
      expect(myTree.root.right.left.height).toBe(0);
    });
  
    it('does a double left non-root rotation', ()=>{
      let myTree = new AVLTree();
      myTree.insert(7);
      myTree.insert(6);
      myTree.insert(8);
      myTree.insert(4);
      myTree.insert(9);
      myTree.insert(5);
  
      expect(myTree.root.value).toBe(7);
  
      expect(myTree.root.left.value).toBe(5);
      expect(myTree.root.left.left.value).toBe(4);
      expect(myTree.root.left.right.value).toBe(6);
  
      expect(myTree.root.right.value).toBe(8);
      expect(myTree.root.right.right.value).toBe(9);
      expect(myTree.root.right.left).toBeNull();
    });
  
    it('does a double left non-root rotation, with correct height maintenance', ()=>{
      let myTree = new AVLTree();
      myTree.insert(7);
      myTree.insert(6);
      myTree.insert(8);
      myTree.insert(4);
      myTree.insert(9);
      myTree.insert(5);
  
      expect(myTree.root.height).toBe(2);
  
      expect(myTree.root.left.height).toBe(1);
      expect(myTree.root.left.left.height).toBe(0);
      expect(myTree.root.left.right.height).toBe(0);
  
      expect(myTree.root.right.height).toBe(1);
      expect(myTree.root.right.right.height).toBe(0);
    });
  
    it('does a double right non-root rotation', ()=>{
      let myTree = new AVLTree();
      myTree.insert(3);
      myTree.insert(2);
      myTree.insert(6);
      myTree.insert(1);
      myTree.insert(9);
      myTree.insert(8);
  
      expect(myTree.root.value).toBe(3);
  
      expect(myTree.root.left.value).toBe(2);
      expect(myTree.root.left.left.value).toBe(1);
      expect(myTree.root.left.right).toBeNull();
  
      expect(myTree.root.right.value).toBe(8);
      expect(myTree.root.right.right.value).toBe(9);
      expect(myTree.root.right.left.value).toBe(6);
    });
  
    it('does a double right non-root rotation, with correct height maintenance', ()=>{
      let myTree = new AVLTree();
      myTree.insert(3);
      myTree.insert(2);
      myTree.insert(6);
      myTree.insert(1);
      myTree.insert(9);
      myTree.insert(8);
  
      expect(myTree.root.height).toBe(2);
  
      expect(myTree.root.left.height).toBe(1);
      expect(myTree.root.left.left.height).toBe(0);
  
      expect(myTree.root.right.height).toBe(1);
      expect(myTree.root.right.right.height).toBe(0);
      expect(myTree.root.right.left.height).toBe(0);
    });
  
    it('does a double left non-root rotation, with a single left child on new root', ()=>{
      let myTree = new AVLTree();
      myTree.insert(20);
      myTree.insert(9);
      myTree.insert(22);
      myTree.insert(6);
      myTree.insert(10);
      myTree.insert(24);
      myTree.insert(5);
      myTree.insert(8);
      myTree.insert(7);
  
      expect(myTree.root.value).toBe(20);
  
      expect(myTree.root.left.value).toBe(8);
  
      expect(myTree.root.left.left.value).toBe(6);
      expect(myTree.root.left.right.value).toBe(9);
  
      expect(myTree.root.left.left.left.value).toBe(5);
      expect(myTree.root.left.left.right.value).toBe(7);
  
      expect(myTree.root.left.right.left).toBeNull();
      expect(myTree.root.left.right.right.value).toBe(10);
  
      expect(myTree.root.right.value).toBe(22);
      expect(myTree.root.right.right.value).toBe(24);
      expect(myTree.root.right.left).toBeNull();
    });
  
    it('does a double left non-root rotation, with a single left child on new root, with correct height maintenance', ()=>{
      let myTree = new AVLTree();
      myTree.insert(20);
      myTree.insert(9);
      myTree.insert(22);
      myTree.insert(6);
      myTree.insert(10);
      myTree.insert(24);
      myTree.insert(5);
      myTree.insert(8);
      myTree.insert(7);
  
      expect(myTree.root.height).toBe(3);
  
      expect(myTree.root.left.height).toBe(2);
  
      expect(myTree.root.left.left.height).toBe(1);
      expect(myTree.root.left.right.height).toBe(1);
  
      expect(myTree.root.left.left.left.height).toBe(0);
      expect(myTree.root.left.left.right.height).toBe(0);
  
      expect(myTree.root.left.right.right.height).toBe(0);
  
      expect(myTree.root.right.height).toBe(1);
      expect(myTree.root.right.right.height).toBe(0);
    });
  
    it('does a double left non-root rotation, with a single right child on new root', ()=>{
      let myTree = new AVLTree();
      myTree.insert(20);
      myTree.insert(10);
      myTree.insert(22);
      myTree.insert(4);
      myTree.insert(15);
      myTree.insert(24);
      myTree.insert(2);
      myTree.insert(7);
      myTree.insert(8);
  
      expect(myTree.root.value).toBe(20);
  
      expect(myTree.root.left.value).toBe(7);
  
      expect(myTree.root.left.left.value).toBe(4);
      expect(myTree.root.left.right.value).toBe(10);
  
      expect(myTree.root.left.left.left.value).toBe(2);
      expect(myTree.root.left.left.right).toBeNull();
  
      expect(myTree.root.left.right.left.value).toBe(8);
      expect(myTree.root.left.right.right.value).toBe(15);
  
      expect(myTree.root.right.value).toBe(22);
      expect(myTree.root.right.right.value).toBe(24);
      expect(myTree.root.right.left).toBeNull();
    });
  
    it('does a double left non-root rotation, with a single right child on new root, with correct height maintenance', ()=>{
      let myTree = new AVLTree();
      myTree.insert(20);
      myTree.insert(10);
      myTree.insert(22);
      myTree.insert(4);
      myTree.insert(15);
      myTree.insert(24);
      myTree.insert(2);
      myTree.insert(7);
      myTree.insert(8);
  
      expect(myTree.root.height).toBe(3);
  
      expect(myTree.root.left.height).toBe(2);
  
      expect(myTree.root.left.left.height).toBe(1);
      expect(myTree.root.left.right.height).toBe(1);
  
      expect(myTree.root.left.left.left.height).toBe(0);
  
      expect(myTree.root.left.right.left.height).toBe(0);
      expect(myTree.root.left.right.right.height).toBe(0);
  
      expect(myTree.root.right.height).toBe(1);
      expect(myTree.root.right.right.height).toBe(0);
    });
  
    it('does a double right non-root rotation, with a single left child on new root', ()=>{
      let myTree = new AVLTree();
      myTree.insert(10);
      myTree.insert(9);
      myTree.insert(14);
      myTree.insert(8);
      myTree.insert(12);
      myTree.insert(20);
      myTree.insert(16);
      myTree.insert(22);
      myTree.insert(15);
  
      expect(myTree.root.value).toBe(10);
  
      expect(myTree.root.left.value).toBe(9);
  
      expect(myTree.root.left.left.value).toBe(8);
      expect(myTree.root.left.right).toBeNull();
  
      expect(myTree.root.right.value).toBe(16);
      
      expect(myTree.root.right.right.value).toBe(20);
      expect(myTree.root.right.left.value).toBe(14);
  
      expect(myTree.root.right.right.right.value).toBe(22);
      expect(myTree.root.right.right.left).toBeNull();
  
      expect(myTree.root.right.left.left.value).toBe(12);
      expect(myTree.root.right.left.right.value).toBe(15);
    });
  
    it('does a double right non-root rotation, with a single left child on new root, with correct height maintenance', ()=>{
      let myTree = new AVLTree();
      myTree.insert(10);
      myTree.insert(9);
      myTree.insert(14);
      myTree.insert(8);
      myTree.insert(12);
      myTree.insert(20);
      myTree.insert(16);
      myTree.insert(22);
      myTree.insert(15);
  
      expect(myTree.root.height).toBe(3);
  
      expect(myTree.root.left.height).toBe(1);
  
      expect(myTree.root.left.left.height).toBe(0);
  
      expect(myTree.root.right.height).toBe(2);
      
      expect(myTree.root.right.right.height).toBe(1);
      expect(myTree.root.right.left.height).toBe(1);
  
      expect(myTree.root.right.right.right.height).toBe(0);
  
      expect(myTree.root.right.left.left.height).toBe(0);
      expect(myTree.root.right.left.right.height).toBe(0);
    });
  
    it('does a double right non-root rotation, with a single right child on new root', ()=>{
      let myTree = new AVLTree();
      myTree.insert(10);
      myTree.insert(9);
      myTree.insert(14);
      myTree.insert(8);
      myTree.insert(12);
      myTree.insert(20);
      myTree.insert(16);
      myTree.insert(22);
      myTree.insert(17);
  
      expect(myTree.root.value).toBe(10);
  
      expect(myTree.root.left.value).toBe(9);
  
      expect(myTree.root.left.left.value).toBe(8);
      expect(myTree.root.left.right).toBeNull();
  
      expect(myTree.root.right.value).toBe(16);
      
      expect(myTree.root.right.right.value).toBe(20);
      expect(myTree.root.right.left.value).toBe(14);
  
      expect(myTree.root.right.right.right.value).toBe(22);
      expect(myTree.root.right.right.left.value).toBe(17);
  
      expect(myTree.root.right.left.left.value).toBe(12);
      expect(myTree.root.right.left.right).toBeNull();
    });
  
    it('does a double right non-root rotation, with a single right child on new root, with correct height maintenance', ()=>{
      let myTree = new AVLTree();
      myTree.insert(10);
      myTree.insert(9);
      myTree.insert(14);
      myTree.insert(8);
      myTree.insert(12);
      myTree.insert(20);
      myTree.insert(16);
      myTree.insert(22);
      myTree.insert(17);
  
      expect(myTree.root.height).toBe(3);
  
      expect(myTree.root.left.height).toBe(1);
  
      expect(myTree.root.left.left.height).toBe(0);
  
      expect(myTree.root.right.height).toBe(2);
      
      expect(myTree.root.right.right.height).toBe(1);
      expect(myTree.root.right.left.height).toBe(1);
  
      expect(myTree.root.right.right.right.height).toBe(0);
      expect(myTree.root.right.right.left.height).toBe(0);
  
      expect(myTree.root.right.left.left.height).toBe(0);
    });
  
  });
  
  describe('remove', () => {
  
    it('returns undefined when given non numeric input', ()=>{
      let myTree = new AVLTree();
  
      let result = myTree.remove('test');
  
      expect(result).toBeUndefined();
    });
  
    it('returns undefined when given true', ()=>{
      let myTree = new AVLTree();
  
      let result = myTree.remove(true);
  
      expect(result).toBeUndefined();
    });
    
    it('returns undefined when given false', ()=>{
      let myTree = new AVLTree();
  
      let result = myTree.remove(false);
  
      expect(result).toBeUndefined();
    });
  
    it('returns undefined when value is not present in an empty tree', ()=>{
      let myTree = new AVLTree();
  
      let result = myTree.remove(2);
  
      expect(result).toBeUndefined();
    });
  
    it('returns the node when it is present, and is the root, and has no children', ()=>{
      let myTree = new AVLTree();
  
      myTree.insert(2);
  
      let result = myTree.remove(2);
  
      expect(result).toBeInstanceOf(Node);
      expect(result.value).toBe(2);
      expect(result.left).toBeNull();
      expect(result.right).toBeNull();
  
      expect(myTree.root).toBeNull();
    });
  
    it('returns the node when it is present, and is the root, and has 1 left child', ()=>{
      let myTree = new AVLTree();
  
      myTree.insert(2);
      myTree.insert(1);
  
      let result = myTree.remove(2);
  
      expect(result.value).toBe(2);
      
      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toBe(1);
      expect(myTree.root.left).toBeNull();
      expect(myTree.root.right).toBeNull();
    });
  
    it('returns the node when it is present, and is the root, and has 1 right child', ()=>{
      let myTree = new AVLTree();
  
      myTree.insert(2);
      myTree.insert(3);
  
      let result = myTree.remove(2);
  
      expect(result.value).toBe(2);
      
      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toBe(3);
      expect(myTree.root.left).toBeNull();
      expect(myTree.root.right).toBeNull();
    });
  
    it('returns the removed node, and is the root, from a tree that has two single-node children', ()=>{
      let myTree = new AVLTree();
  
      myTree.insert(2);
      myTree.insert(1);
      myTree.insert(3);
  
      let result = myTree.remove(2);
  
      expect(result.value).toBe(2);
      
      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toBe(3);
      expect(myTree.root.left.value).toBe(1);
      expect(myTree.root.right).toBeNull();
    });
  
    it('returns the removed leaf node', ()=>{
      let myTree = new AVLTree();
  
      myTree.insert(2);
      myTree.insert(1);
      myTree.insert(3);
  
      let result = myTree.remove(1);
  
      expect(result.value).toBe(1);
      
      expect(myTree.root).toBeInstanceOf(Node);
      expect(myTree.root.value).toBe(2);
      expect(myTree.root.left).toBeNull();
      expect(myTree.root.right.value).toBe(3);
    });
  
    it('removes left non leaf node from sub tree with only leaves', ()=>{
      let myTree = new AVLTree();
  
      myTree.insert(5);
      myTree.insert(3);
      myTree.insert(7);
      myTree.insert(2);
      myTree.insert(4);
      myTree.insert(6);
      myTree.insert(8);
  
      let result = myTree.remove(3);
  
      expect(result.value).toBe(3);
      
      expect(myTree.root.value).toBe(5);
      expect(myTree.root.left.value).toBe(4);
      expect(myTree.root.left.left.value).toBe(2);
      expect(myTree.root.left.right).toBeNull();
  
      expect(myTree.root.right.value).toBe(7);
      expect(myTree.root.right.left.value).toBe(6);
      expect(myTree.root.right.right.value).toBe(8);
    });
    
    it('removes right non leaf node from sub tree with only leaves', ()=>{
      let myTree = new AVLTree();
  
      myTree.insert(5);
      myTree.insert(3);
      myTree.insert(7);
      myTree.insert(2);
      myTree.insert(4);
      myTree.insert(6);
      myTree.insert(8);
  
      let result = myTree.remove(7);
  
      expect(result.value).toBe(7);
      
      expect(myTree.root.value).toBe(5);
      expect(myTree.root.left.value).toBe(3);
      expect(myTree.root.left.left.value).toBe(2);
      expect(myTree.root.left.right.value).toBe(4);
  
      expect(myTree.root.right.value).toBe(8);
      expect(myTree.root.right.left.value).toBe(6);
      expect(myTree.root.right.right).toBeNull();
    });
  
    it('removes a leaf node causing a single left rotation', ()=>{
      let myTree = new AVLTree();
  
      myTree.insert(3);
      myTree.insert(2);
      myTree.insert(4);
      myTree.insert(1);
  
      let result = myTree.remove(4);
  
      expect(result.value).toBe(4);
      
      expect(myTree.root.value).toBe(2);
      expect(myTree.root.left.value).toBe(1);
      expect(myTree.root.right.value).toBe(3);
    });
  
    it('removes a leaf node causing a single right rotation', ()=>{
      let myTree = new AVLTree();
  
      myTree.insert(1);
      myTree.insert(0);
      myTree.insert(2);
      myTree.insert(3);
  
      let result = myTree.remove(0);
  
      expect(result.value).toBe(0);
      
      expect(myTree.root.value).toBe(2);
      expect(myTree.root.left.value).toBe(1);
      expect(myTree.root.right.value).toBe(3);
    });
  
    it('removes a leaf node causing a double left rotation', ()=>{
      let myTree = new AVLTree();
  
      myTree.insert(8);
      myTree.insert(6);
      myTree.insert(9);
      myTree.insert(7);
  
      let result = myTree.remove(9);
  
      expect(result.value).toBe(9);
      
      expect(myTree.root.value).toBe(7);
      expect(myTree.root.left.value).toBe(6);
      expect(myTree.root.right.value).toBe(8);
    });
    it('removes a leaf node causing a double right rotation', ()=>{
      let myTree = new AVLTree();
  
      myTree.insert(5);
      myTree.insert(4);
      myTree.insert(7);
      myTree.insert(6);
  
      let result = myTree.remove(4);
  
      expect(result.value).toBe(4);
      
      expect(myTree.root.value).toBe(6);
      expect(myTree.root.left.value).toBe(5);
      expect(myTree.root.right.value).toBe(7);
    });
  
    it('removes a leaf node causing a double left rotation', ()=>{
      let myTree = new AVLTree();
  
      myTree.insert(8);
      myTree.insert(6);
      myTree.insert(9);
      myTree.insert(5);
      myTree.insert(7);
  
      let result = myTree.remove(9);
  
      expect(result.value).toBe(9);
      
      expect(myTree.root.value).toBe(7);
      expect(myTree.root.left.value).toBe(6);
      expect(myTree.root.right.value).toBe(8);
      
      expect(myTree.root.left.left.value).toBe(5);
    });
    it('removes a leaf node causing a double right rotation', ()=>{
      let myTree = new AVLTree();
  
      myTree.insert(5);
      myTree.insert(4);
      myTree.insert(7);
      myTree.insert(6);
      myTree.insert(8);
  
      let result = myTree.remove(4);
  
      expect(result.value).toBe(4);
      
      expect(myTree.root.value).toBe(6);
      expect(myTree.root.left.value).toBe(5);
      expect(myTree.root.right.value).toBe(7);
  
      expect(myTree.root.right.right.value).toBe(8);
    });
  
    it('removes a leaf node causing a double left rotation with larger sub trees', ()=>{
      let myTree = new AVLTree();
  
      myTree.insert(85);
      myTree.insert(62);
      myTree.insert(88);
      myTree.insert(42);
      myTree.insert(66);
      myTree.insert(86);
      myTree.insert(0);
      myTree.insert(65);
  
      let result = myTree.remove(86);
  
      expect(result.value).toBe(86);
      
      expect(myTree.root.value).toBe(66);
      expect(myTree.root.left.value).toBe(62);
      expect(myTree.root.right.value).toBe(85);
      
      expect(myTree.root.left.left.value).toBe(42);
      expect(myTree.root.left.right.value).toBe(65);
      
      expect(myTree.root.right.right.value).toBe(88);
      expect(myTree.root.right.left).toBeNull();
  
      expect(myTree.root.left.left.left.value).toBe(0);
    });
    it('removes a leaf node causing a double left rotation with full sub trees', ()=>{
      let myTree = new AVLTree();
      let values = [71, 35, 87, 27, 61, 84, 96, 16, 30, 53, 70, 97, 8, 24, 28, 32, 39, 56];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
  
      myTree.remove(84);
  
      let myExpectedTree = new AVLTree();
      let expectedValues = [61, 35, 71, 27, 53, 70, 96, 16, 30, 39, 56, 87, 97, 8, 24, 28, 32];
      for(let i = 0; i < values.length; i++){
        myExpectedTree.insert(expectedValues[i]);
      }
  
      // ignore analyitics counters
      setCountersToZero(myTree);
      setCountersToZero(myExpectedTree);

      expect(myTree).toEqual(myExpectedTree);
  
    });
    
    it('returns undefined when removing an value that does not exist', () => {
      let myTree = new AVLTree();
  
      myTree.insert(85);
      myTree.insert(62);
      myTree.insert(88);
  
      let result = myTree.remove(2);

      expect(result).toBeUndefined();
    });
  
    it('creates imbalance in left sub tree when removing left leaf node, when removed node is 0 deep', ()=>{
      let myTree = new AVLTree();
  
      let values = [10, 3, 12, 0, 7, 11, 13, 5];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(0);

      let expectedTreeValues = [10, 5, 12, 3, 7, 11, 13];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(0);
      expect(myTree).toEqual(expectedTree);
    });
    it('creates imbalance in left sub tree when removing right leaf node, when removed node is 0 deep', ()=>{
      let myTree = new AVLTree();
  
      let values = [10, 3, 12, 0, 7, 11, 13, 1];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(7);

      let expectedTreeValues = [10, 1, 12, 0, 3, 11, 13];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(7);
      expect(myTree).toEqual(expectedTree);
    });

    it('creates imbalance in right sub tree when removing left leaf node, when removed node is 0 deep', ()=>{
      let myTree = new AVLTree();
  
      let values = [10, 3, 15, 0, 7, 12, 17, 13];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(17);

      let expectedTreeValues = [10, 3, 13, 0, 7, 12, 15];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(17);
      expect(myTree).toEqual(expectedTree);
    });
    it('creates imbalance in right sub tree when removing right leaf node, when removed node is 0 deep', ()=>{
      let myTree = new AVLTree();
  
      let values = [10, 3, 15, 0, 7, 12, 17, 16];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(12);

      let expectedTreeValues = [10, 3, 16, 0, 7, 15, 17];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(12);
      expect(myTree).toEqual(expectedTree);
    });

    
    it('removes left sub tree root, when replacement is in left tree, 2 deep, replacement causes double left rotation', ()=>{
      let myTree = new AVLTree();
  
      let values = [20, 10, 30, 5, 15, 25, 35, 2, 8, 13, 17, 40, 3];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(10);

      let expectedTreeValues = [20, 8, 30, 3, 15, 25, 35, 2, 5, 13, 17, 40];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(10);
      expect(myTree).toEqual(expectedTree);
    });
    it('removes left sub tree root, when replacement is in left tree, 2 deep, replacement causes single left rotation', ()=>{
      let myTree = new AVLTree();
  
      let values = [20, 10, 30, 5, 15, 25, 35, 2, 8, 13, 17, 40, 1];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(10);

      let expectedTreeValues = [20, 8, 30, 2, 15, 25, 35, 1, 5, 13, 17, 40];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(10);
      expect(myTree).toEqual(expectedTree);
    });
    it('removes left sub tree root, when replacement is in left tree, 2 deep, replacement causes no rotation', ()=>{
      let myTree = new AVLTree();
  
      let values = [20, 10, 30, 5, 15, 25, 35, 2, 8, 13, 17, 40, 7];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(10);

      let expectedTreeValues = [20, 8, 30, 5, 15, 25, 35, 2, 7, 13, 17, 40];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(10);
      expect(myTree).toEqual(expectedTree);
    });
    it('removes left sub tree root, when replacement is in left tree, 2 deep, replacement causes no rotation', ()=>{
      let myTree = new AVLTree();
  
      let values = [20, 10, 30, 5, 15, 25, 35, 2, 8, 13, 17, 40, 9];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(10);

      let expectedTreeValues = [20, 9, 30, 5, 15, 25, 35, 2, 8, 13, 17, 40];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(10);
      expect(myTree).toEqual(expectedTree);
    });
    it('removes left sub tree root, when replacement is in right tree, 2 deep, replacement causes no rotation', ()=>{
      let myTree = new AVLTree();
  
      let values = [20, 10, 30, 5, 15, 25, 35, 2, 8, 13, 17, 40, 12];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(10);

      let expectedTreeValues = [20, 12, 30, 5, 15, 25, 35, 2, 8, 13, 17, 40];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(10);
      expect(myTree).toEqual(expectedTree);
    });
    it('removes left sub tree root, when replacement is in right tree, 2 deep, replacement causes no rotation', ()=>{
      let myTree = new AVLTree();
  
      let values = [20, 10, 30, 5, 15, 25, 35, 2, 8, 13, 17, 40, 14];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(10);

      let expectedTreeValues = [20, 13, 30, 5, 15, 25, 35, 2, 8, 14, 17, 40];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(10);
      expect(myTree).toEqual(expectedTree);
    });
    it('removes left sub tree root, when replacement is in right tree, 2 deep, replacement causes double rotation', ()=>{
      let myTree = new AVLTree();
  
      let values = [20, 10, 30, 5, 15, 25, 35, 2, 8, 13, 17, 40, 16];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(10);

      let expectedTreeValues = [20, 13, 30, 5, 16, 25, 35, 2, 8, 15, 17, 40];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(10);
      expect(myTree).toEqual(expectedTree);
    });
    it('removes left sub tree root, when replacement is in right tree, 2 deep, replacement causes single rotation', ()=>{
      let myTree = new AVLTree();
  
      let values = [20, 10, 30, 5, 15, 25, 35, 2, 8, 13, 17, 40, 18];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(10);

      let expectedTreeValues = [20, 13, 30, 5, 17, 25, 35, 2, 8, 15, 18, 40];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(10);
      expect(myTree).toEqual(expectedTree);
    });
    it('removes right sub tree root, when replacement is in left tree, 2 deep, replacement causes single left rotation', ()=>{
      let myTree = new AVLTree();
  
      let values = [20, 10, 30, 5, 15, 25, 35, 1, 23, 27, 33, 40, 22];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(30);

      let expectedTreeValues = [20, 10, 27, 5, 15, 23, 35, 1, 22, 25, 33, 40];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(30);
      expect(myTree).toEqual(expectedTree);
    });
    it('removes right sub tree root, when replacement is in left tree, 2 deep, replacement causes double left rotation', ()=>{
      let myTree = new AVLTree();
  
      let values = [20, 10, 30, 5, 15, 25, 35, 1, 23, 27, 33, 40, 24];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(30);

      let expectedTreeValues = [20, 10, 27, 5, 15, 24, 35, 1, 23, 25, 33, 40];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(30);
      expect(myTree).toEqual(expectedTree);
    });
    it('removes right sub tree root, when replacement is in left tree, 2 deep, replacement causes no rotation', ()=>{
      let myTree = new AVLTree();
  
      let values = [20, 10, 30, 5, 15, 25, 35, 1, 23, 27, 33, 40, 26];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(30);

      let expectedTreeValues = [20, 10, 27, 5, 15, 25, 35, 1, 23, 26, 33, 40];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(30);
      expect(myTree).toEqual(expectedTree);
    });
    it('removes right sub tree root, when replacement is in left tree, 2 deep, replacement causes no rotation', ()=>{
      let myTree = new AVLTree();
  
      let values = [20, 10, 30, 5, 15, 25, 35, 1, 23, 27, 33, 40, 28];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(30);

      let expectedTreeValues = [20, 10, 28, 5, 15, 25, 35, 1, 23, 27, 33, 40];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(30);
      expect(myTree).toEqual(expectedTree);
    });
    it('removes right sub tree root, when replacement is in left tree, 2 deep, replacement causes no rotation', ()=>{
      let myTree = new AVLTree();
  
      let values = [20, 10, 30, 5, 15, 25, 35, 1, 23, 27, 33, 40, 32];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(30);

      let expectedTreeValues = [20, 10, 32, 5, 15, 25, 35, 1, 23, 27, 33, 40];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(30);
      expect(myTree).toEqual(expectedTree);
    });
    it('removes right sub tree root, when replacement is in left tree, 2 deep, replacement causes no rotation', ()=>{
      let myTree = new AVLTree();
  
      let values = [20, 10, 30, 5, 15, 25, 35, 1, 23, 27, 33, 40, 34];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(30);

      let expectedTreeValues = [20, 10, 33, 5, 15, 25, 35, 1, 23, 27, 34, 40];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(30);
      expect(myTree).toEqual(expectedTree);
    });
    it('removes right sub tree root, when replacement is in left tree, 2 deep, replacement causes double right rotation', ()=>{
      let myTree = new AVLTree();
  
      let values = [20, 10, 30, 5, 15, 25, 35, 1, 23, 27, 33, 40, 39];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(30);

      let expectedTreeValues = [20, 10, 33, 5, 15, 25, 39, 1, 23, 27, 35, 40];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(30);
      expect(myTree).toEqual(expectedTree);
    });
    it('removes right sub tree root, when replacement is in left tree, 2 deep, replacement causes single right rotation', ()=>{
      let myTree = new AVLTree();
  
      let values = [20, 10, 30, 5, 15, 25, 35, 1, 23, 27, 33, 40, 41];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(30);

      let expectedTreeValues = [20, 10, 33, 5, 15, 25, 40, 1, 23, 27, 35, 41];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(30);
      expect(myTree).toEqual(expectedTree);
    });


    // removed node is parent of imbalanced node
    // removed node is 2+ removed from imbalanced node
    // removed node is 1 below the imbalanced node
    // removed node is 2 below the imbalanced node
    // removed node is 3+ below the imbalanced node





    it('removes left sub tree root, when replacement is in left tree, 3 deep, removal causes no rotation, no height change', ()=>{
      let myTree = new AVLTree();
  
      let values = [52, 30, 81, 19, 42, 69, 91, 9, 25, 41, 48, 58, 80, 83, 94, 2, 16, 21, 37, 45, 49, 53, 60, 76, 82, 90, 93, 97, 17];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(19);

      let expectedTreeValues = [52, 30, 81, 17, 42, 69, 91, 9, 25, 41, 48, 58, 80, 83, 94, 2, 16, 21, 37, 45, 49, 53, 60, 76, 82, 90, 93, 97];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(19);
      expect(myTree).toEqual(expectedTree);
    });
    it('removes left sub tree root, when replacement is in left tree, 2 deep, removal causes no rotation, no height change', ()=>{
      let myTree = new AVLTree();
  
      let values = [52, 30, 81, 19, 42, 69, 91, 9, 25, 38, 48, 58, 80, 83, 94, 21, 37, 41, 45, 49, 53, 60, 76, 82, 90, 93, 97];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(19);

      let expectedTreeValues = [52, 30, 81, 21, 42, 69, 91, 9, 25, 38, 48, 58, 80, 83, 94, 37, 41, 45, 49, 53, 60, 76, 82, 90, 93, 97];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(19);
      expect(myTree).toEqual(expectedTree);
    });
    it('removes left sub tree root, when replacement is in left tree, 1 deep, removal causes no rotation, no height change', ()=>{
      let myTree = new AVLTree();
  
      let values = [52, 30, 81, 19, 42, 69, 91, 9, 58, 80, 83, 94];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(19);

      let expectedTreeValues = [52, 30, 81, 9, 42, 69, 91, 58, 80, 83, 94];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(19);
      expect(myTree).toEqual(expectedTree);
    });

    it('removes left sub tree root, replacement is 3 steps from removed node, removal causes no rotation, a height change', ()=>{
      let myTree = new AVLTree();
  
      let values = [52, 30, 81, 19, 42, 69, 91, 9, 25, 41, 48, 58, 80, 83, 94, 2, 16, 21, 37, 45, 49, 53, 60, 76, 82, 90, 93, 97, 17];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(19);

      let expectedTreeValues = [52, 30, 81, 17, 42, 69, 91, 9, 25, 41, 48, 58, 80, 83, 94, 2, 16, 21, 37, 45, 49, 53, 60, 76, 82, 90, 93, 97];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(19);
      expect(myTree).toEqual(expectedTree);
    });
    it('removes left sub tree root, replacement is 2 steps from removed node, removal causes no rotation, a height change', ()=>{
      let myTree = new AVLTree();
  
      let values = [52, 30, 81, 19, 42, 69, 91, 9, 25, 38, 48, 58, 80, 83, 94, 21, 37, 41, 45, 49, 53, 60, 76, 82, 90, 93, 97];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(19);

      let expectedTreeValues = [52, 30, 81, 21, 42, 69, 91, 9, 25, 38, 48, 58, 80, 83, 94, 37, 41, 45, 49, 53, 60, 76, 82, 90, 93, 97];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(19);
      expect(myTree).toEqual(expectedTree);
    });
    it('removes left sub tree root, replacement is 1 steps from removed node, removal causes no rotation, a height change', ()=>{
      let myTree = new AVLTree();
  
      let values = [52, 30, 81, 19, 42, 69, 91, 9, 58, 80, 83, 94];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(19);

      let expectedTreeValues = [52, 30, 81, 9, 42, 69, 91, 58, 80, 83, 94];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(19);
      expect(myTree).toEqual(expectedTree);
    });


    it('removes left sub tree root, imbalance 1 step from removed node, no height change', ()=>{
      let myTree = new AVLTree();
  
      let values = [26, 14, 56, 9, 18, 39, 80, 1, 10, 17, 21, 35, 45, 75, 88, 13, 22, 34, 36, 41, 55, 74, 77, 84, 92, 44, 48, 81, 91, 93];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(14);

      let expectedTreeValues = [26, 17, 56, 9, 21, 39, 80, 1, 10, 18, 22, 35, 45, 75, 88, 13, 34, 36, 41, 55, 74, 77, 84, 92, 44, 48, 81, 91, 93];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(14);
      expect(myTree).toEqual(expectedTree);
    });
    it('removes left sub tree root, imbalance 1 step from removed node, with height change', ()=>{
      let myTree = new AVLTree();
  
      let values = [26, 14, 56, 9, 18, 39, 80, 1, 10, 17, 21, 35, 45, 75, 88, 22, 34, 36, 41, 55, 74, 77, 84, 92];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(14);

      let expectedTreeValues = [26, 17, 56, 9, 21, 39, 80, 1, 10, 18, 22, 35, 45, 75, 88, 34, 36, 41, 55, 74, 77, 84, 92];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(14);
      expect(myTree).toEqual(expectedTree);
    });
    it('removes left sub tree root, imbalance 1 step from removed node, with height change', ()=>{
      let myTree = new AVLTree();
  
      let values = [26, 14, 56, 9, 18, 39, 80, 1, 10, 17, 21, 35, 45, 75, 88, 22, 34, 36, 41, 55, 74, 77, 84, 92, 44, 48, 81, 91, 93];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(14);

      let expectedTreeValues = [39, 26, 56, 17, 35, 45, 80, 9, 21, 34, 36, 41, 55, 75, 88, 1, 10, 18, 22, 44, 48, 74, 77, 84, 92, 81, 91, 93];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(14);
      expect(myTree).toEqual(expectedTree);
    });
    it('removes left sub tree root, imbalance 2 steps from removed node, with height change', ()=>{
      let myTree = new AVLTree();
  
      let values = [65, 13, 81, 7, 59, 74, 89, 2, 12, 37, 64, 69, 78, 85, 92, 3, 10, 30, 38, 61, 66, 72, 80, 82, 86, 91, 98, 40];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(13);

      let expectedTreeValues = [65, 30, 81, 7, 59, 74, 89, 2, 12, 38, 64, 69, 78, 85, 92, 3, 10, 37, 40, 61, 66, 72, 80, 82, 86, 91, 98];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(13);
      expect(myTree).toEqual(expectedTree);
    });
    it('removes left sub tree root, imbalance 3 steps from removed node, with height change', ()=>{
      let myTree = new AVLTree();
  
      let values = [52, 21, 79, 11, 40, 65, 90, 6, 17, 28, 43, 57, 74, 86, 94, 1, 8, 12, 20, 25, 38, 41, 45, 54, 62, 73, 77, 81, 89, 91, 98, 5, 7, 10, 15, 22, 26, 33, 39, 44, 47, 60, 64, 80, 82, 92, 99, 27];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(21);

      let expectedTreeValues = [52, 22, 79, 11, 40, 65, 90, 6, 17, 28, 43, 57, 74, 86, 94, 1, 8, 12, 20, 26, 38, 41, 45, 54, 62, 73, 77, 81, 89, 91, 98, 5, 7, 10, 15, 25, 27, 33, 39, 44, 47, 60, 64, 80, 82, 92, 99];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(21);
      expect(myTree).toEqual(expectedTree);
    });

    it('removal of leaf node causes double right rotation at root, which requries another double rotation', ()=>{
      let myTree = new AVLTree();
  
    
      let values = [41, 14, 62, 10, 23, 48, 74, 1, 13, 18, 24, 42, 55, 63, 79, 11, 61, 69, 76, 93, 78, 87];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(42);

      let expectedTreeValues = [41, 14, 74, 10, 23, 62, 79, 1, 13, 18, 24, 55, 63, 76, 93, 11, 48, 61, 69, 78, 87];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(42);
      expect(myTree).toEqual(expectedTree);
    });
    it('removal of leaf node -> single right -> double right at root -> double rotation in right tree', ()=>{
      let myTree = new AVLTree();
  
      let values = [37, 24, 56, 13, 29, 50, 80, 4, 14, 26, 36, 45, 53, 63, 91, 17, 44, 47, 52, 54, 60, 72, 87, 96, 48, 62, 69, 78, 83, 90, 94];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(4);

      let expectedTreeValues = [50, 37, 56, 24, 45, 53, 80, 14, 29, 44, 47, 52, 54, 63, 91, 13, 17, 26, 36, 48, 60, 72, 87, 96, 62, 69, 78, 83, 90, 94];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(4);
      expect(myTree).toEqual(expectedTree);
    });
    it('removal of leaf node -> single right -> double right at root -> 2x double rotation in right tree', ()=>{
      let myTree = new AVLTree();
  
      let values = [37, 24, 56, 13, 29, 50, 80, 4, 14, 26, 36, 45, 53, 63, 91, 17, 44, 47, 52, 54, 60, 72, 87, 96, 48, 62, 83, 90, 94];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.remove(4);

      let expectedTreeValues = [50, 37, 63, 24, 45, 56, 87, 14, 29, 44, 47, 53, 60, 80, 91, 13, 17, 26, 36, 48, 52, 54, 62, 72, 83, 90, 96, 94];
      let expectedTree = new AVLTree();
      for(let i = 0; i < expectedTreeValues.length; i++){
        expectedTree.insert(expectedTreeValues[i]);
      }

      setCountersToZero(myTree);
      setCountersToZero(expectedTree);

      expect(result.value).toBe(4);
      expect(myTree).toEqual(expectedTree);
    });

  });
  
  describe('contains', () => {
    it('returns false if tree is empty', () => {
      let myTree = new AVLTree();
  
      let result = myTree.contains(2);
      
      expect(result).toBe(false);
    });
  
    it('correctly returns false if the tree is 1 node', () => {
      let myTree = new AVLTree();
      myTree.insert(3);
  
      let result = myTree.contains(2);
      
      expect(result).toBe(false);
    });
  
    it('correctly returns true if the tree is 1 node', () => {
      let myTree = new AVLTree();
      myTree.insert(3);
  
      let result = myTree.contains(3);
      
      expect(result).toBe(true);
    });
  
    it('correctly returns true on left sub tree leaf node, multi node tree', () => {
      let myTree = new AVLTree();
      myTree.insert(10);
      myTree.insert(5);
      myTree.insert(15);
      myTree.insert(3);
      myTree.insert(7);
      myTree.insert(12);
      myTree.insert(17);
  
      let result = myTree.contains(7);
      
      expect(result).toBe(true);
    });
  
    it('correctly returns true on right sub tree leaf node, multi node tree', () => {
      let myTree = new AVLTree();
      myTree.insert(10);
      myTree.insert(5);
      myTree.insert(15);
      myTree.insert(3);
      myTree.insert(7);
      myTree.insert(12);
      myTree.insert(17);
  
      let result = myTree.contains(17);
      
      expect(result).toBe(true);
    });
  
    it('correctly returns true on left sub tree non-leaf node, multi node tree', () => {
      let myTree = new AVLTree();
      myTree.insert(10);
      myTree.insert(5);
      myTree.insert(15);
      myTree.insert(3);
      myTree.insert(7);
      myTree.insert(12);
      myTree.insert(17);
  
      let result = myTree.contains(5);
      
      expect(result).toBe(true);
    });
  
    it('correctly returns true on right sub tree non-leaf node, multi node tree', () => {
      let myTree = new AVLTree();
      myTree.insert(10);
      myTree.insert(5);
      myTree.insert(15);
      myTree.insert(3);
      myTree.insert(7);
      myTree.insert(12);
      myTree.insert(17);
  
      let result = myTree.contains(15);
      
      expect(result).toBe(true);
    });
  
    it('correctly returns false on left sub tree, multi node tree', () => {
      let myTree = new AVLTree();
      myTree.insert(10);
      myTree.insert(5);
      myTree.insert(15);
      myTree.insert(3);
      myTree.insert(7);
      myTree.insert(12);
      myTree.insert(17);
  
      let result = myTree.contains(0);
      
      expect(result).toBe(false);
    });
    
    it('correctly returns false on right sub tree, multi node tree', () => {
      let myTree = new AVLTree();
      myTree.insert(10);
      myTree.insert(5);
      myTree.insert(15);
      myTree.insert(3);
      myTree.insert(7);
      myTree.insert(12);
      myTree.insert(17);
  
      let result = myTree.contains(20);
      
      expect(result).toBe(false);
    });
  
  });
  
  describe('findMin', () => {
    it('returns undefined if tree is empty', () => {
      let myTree = new AVLTree();
  
      let result = myTree.findMin();
      
      expect(result).toBe(undefined);
    });
    
    it('correctly returns min value, single node tree', () => {
      let myTree = new AVLTree();
      myTree.insert(10);
  
      let result = myTree.findMin();
      
      expect(result).toBe(10);
    });
  
    it('correctly returns min value, multi node tree', () => {
      let myTree = new AVLTree();
      myTree.insert(10);
      myTree.insert(5);
      myTree.insert(15);
      myTree.insert(3);
      myTree.insert(7);
      myTree.insert(12);
      myTree.insert(17);
  
      let result = myTree.findMin();
      
      expect(result).toBe(3);
    });
  
  });
  
  describe('findMax', () => {
    it('returns undefined if tree is empty', () => {
      let myTree = new AVLTree();
  
      let result = myTree.findMax();
      
      expect(result).toBe(undefined);
    });
    
    it('correctly returns max value, single node tree', () => {
      let myTree = new AVLTree();
      myTree.insert(10);
  
      let result = myTree.findMax();
      
      expect(result).toBe(10);
    });
  
    it('correctly returns max value, multi node tree', () => {
      let myTree = new AVLTree();
      myTree.insert(10);
      myTree.insert(5);
      myTree.insert(15);
      myTree.insert(3);
      myTree.insert(7);
      myTree.insert(12);
      myTree.insert(17);
  
      let result = myTree.findMax();
      
      expect(result).toBe(17);
    });
  });
  
  describe('printPreOrder', () => {
    it('returns empty array if tree is empty', () => {
      let myTree = new AVLTree();
  
      let result = myTree.printPreOrder();
      
      expect(result).toEqual([]);
    });
    
    it('correctly returns pre order traversal, single node tree', () => {
      let myTree = new AVLTree();
      myTree.insert(10);
  
      let result = myTree.printPreOrder();
      let expected = [10];
      
      expect(result).toEqual(expected);
    });
  
    it('correctly returns pre order traversal, multi node tree', () => {
      let myTree = new AVLTree();
      myTree.insert(10);
      myTree.insert(5);
      myTree.insert(15);
      myTree.insert(3);
      myTree.insert(7);
      myTree.insert(12);
      myTree.insert(17);
  
      let result = myTree.printPreOrder();
      let expected = [10, 5, 3, 7, 15, 12, 17];
  
      expect(result).toEqual(expected);
    });
  });
  
  describe('printInOrder', () => {
    it('returns empty array if tree is empty', () => {
      let myTree = new AVLTree();
  
      let result = myTree.printInOrder();
      
      expect(result).toEqual([]);
    });
    
    it('correctly returns in order traversal, single node tree', () => {
      let myTree = new AVLTree();
      myTree.insert(10);
  
      let result = myTree.printInOrder();
      let expected = [10];
      
      expect(result).toEqual(expected);
    });
  
    it('correctly returns in order traversal, multi node tree', () => {
      let myTree = new AVLTree();
      myTree.insert(10);
      myTree.insert(5);
      myTree.insert(15);
      myTree.insert(3);
      myTree.insert(7);
      myTree.insert(12);
      myTree.insert(17);
  
      let result = myTree.printInOrder();
      let expected = [3, 5, 7, 10, 12, 15, 17];
  
      expect(result).toEqual(expected);
    });
  });
  
  describe('printPostOrder', () => {
    it('returns empty array if tree is empty', () => {
      let myTree = new AVLTree();
  
      let result = myTree.printPostOrder();
      
      expect(result).toEqual([]);
    });
    
    it('correctly returns post order traversal, single node tree', () => {
      let myTree = new AVLTree();
      myTree.insert(10);
  
      let result = myTree.printPostOrder();
      let expected = [10];
      
      expect(result).toEqual(expected);
    });
  
    it('correctly returns post order traversal, multi node tree', () => {
      let myTree = new AVLTree();
      myTree.insert(10);
      myTree.insert(5);
      myTree.insert(15);
      myTree.insert(3);
      myTree.insert(7);
      myTree.insert(12);
      myTree.insert(17);
  
      let result = myTree.printPostOrder();
      let expected = [3, 7, 5, 12, 17, 15, 10];
  
      expect(result).toEqual(expected);
    });
  });

  describe('containsDuplicates', () => {
    it('returns false on an empty tree', () => {
      let myTree = new AVLTree();
  
      let result = myTree.containsDuplicates();
      
      expect(result).toBe(false);
    });

    it('returns false on a single node tree', () => {
      let myTree = new AVLTree();
      myTree.insert(10);
      let result = myTree.containsDuplicates();
      
      expect(result).toBe(false);
    });
    it('returns false on a larger tree', () => {
      let myTree = new AVLTree();
      let values = [20, 10, 30, 5, 15, 25, 35, 1, 23, 27, 33, 40, 41];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.containsDuplicates();
      expect(result).toBe(false);
    });
  });

  describe('containsHeightErrors', () => {
    it('returns false on an empty tree', () => {
      let myTree = new AVLTree();
  
      let result = myTree.containsHeightErrors();
      
      expect(result).toBe(false);
    });

    it('returns false on a single node tree', () => {
      let myTree = new AVLTree();
      myTree.insert(10);
      let result = myTree.containsHeightErrors();
      
      expect(result).toBe(false);
    });
    it('returns false on a larger tree', () => {
      let myTree = new AVLTree();
      let values = [20, 10, 30, 5, 15, 25, 35, 1, 23, 27, 33, 40, 41];
      for(let i = 0; i < values.length; i++){
        myTree.insert(values[i]);
      }
      let result = myTree.containsHeightErrors();
      expect(result).toBe(false);
    });
  });
});


