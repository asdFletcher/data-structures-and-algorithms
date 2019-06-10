# A full binary tree is a binary tree where each node has exactly 0 or 2 children.

# Return a list of all possible full binary trees with N nodes.  Each element of the answer is the root node of one possible tree.

# Each node of each tree in the answer must have node.val = 0.

# You may return the final list of trees in any order.

# Example 1:

# Input: 7
# Output: [[0,0,0,null,null,0,0,null,null,0,0],[0,0,0,null,null,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,null,null,null,null,0,0],[0,0,0,0,0,null,null,0,0]]
# Explanation:

# Note:

# 1 <= N <= 20

# Note:
# time boxed, solution approach generates correct trees, but they are duplicate
# solution is also bad time wise

# Definition for a binary tree node.
class TreeNode
    attr_accessor :val, :left, :right
    def initialize(val)
        @val = val
        @left, @right = nil, nil
    end
end

# @param {Integer} n
# @return {TreeNode[]}
def all_possible_fbt(n, res=[])
  puts "🍊 n: #{n}"
  puts "🍊 res 1: #{res}"
  if (n % 2 == 0)
    puts "even detected returning early"
    return res
  end
  if (n == 1)
    res.push(TreeNode.new(0))
    return res
  end
  res = all_possible_fbt(n - 2, res)
  puts "🍊 res2: #{res}"
  puts "🍊 res.length: #{res.length}"
  newTrees = []
  for i in 0..res.length - 1 do
    puts "🍊 looping i: #{i} , res.length: #{res.length}"
    root = res[i]
    addLeaves(root, root, newTrees)
    # newTrees.push(*newTrees)
  end
  puts "🍊 res3: #{newTrees}"
  return newTrees
end

# pre order traversal
# add 2 children nodes to all leaves
def addLeaves(root, node, newTrees)
  return if (!node)
  # base case
  if (!node.left && !node.right)
    # add 2 children
    node.left = TreeNode.new(0)
    node.right = TreeNode.new(0)
    # copy the tree
    newTree = Marshal.load(Marshal.dump(root))
    # add the copy to newTrees
    newTrees.push(newTree)
    # remove the children from original tree
    node.left = nil
    node.right = nil
    puts "🍎 newTrees: #{newTrees}"

  end

  # recursive calls
  addLeaves(root, node.left, newTrees)
  addLeaves(root, node.right, newTrees)
end

res = all_possible_fbt(7)
