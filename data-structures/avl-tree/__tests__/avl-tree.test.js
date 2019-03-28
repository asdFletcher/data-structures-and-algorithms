
const AVLTree = require ('../avl-tree.js');
const Node = require('../avl-tree-node.js');

describe('avl constructor', () => {
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

describe('avl insert', () => {
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

describe('avl remove', () => {

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
    myTree.insert(2);
    myTree.insert(3);
    myTree.insert(0);

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
    myTree.insertComputations = 0;
    myTree.removeComputations = 0;
    myTree.containsComputations = 0;
    myTree.findMaxComputations = 0;
    myTree.findMinComputations = 0;
    myTree.printComputations = 0;
    myExpectedTree.insertComputations = 0;
    myExpectedTree.removeComputations = 0;
    myExpectedTree.containsComputations = 0;
    myExpectedTree.findMaxComputations = 0;
    myExpectedTree.findMinComputations = 0;
    myExpectedTree.printComputations = 0;


    expect(myTree).toEqual(myExpectedTree);

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
});
