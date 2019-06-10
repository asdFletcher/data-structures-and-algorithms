# Given the root node of a binary search tree, return the sum of values of all nodes with value between L and R (inclusive).

# The binary search tree is guaranteed to have unique values.

# Input: root = [10,5,15,3,7,null,18], L = 7, R = 15 # Output: 32
# Input: root = [10,5,15,3,7,13,18,1,null,6], L = 6, R = 10 # Output: 23
# 30 min

# Note:
# The number of nodes in the tree is at most 10000.
# The final answer is guaranteed to be less than 2^31.

# Definition for a binary tree node.
class TreeNode
    attr_accessor :val, :left, :right
    def initialize(val)
        @val = val
        @left, @right = nil, nil
    end
end

# @param {TreeNode} root
# @param {Integer} l
# @param {Integer} r
# @return {Integer}
def range_sum_bst(root, l, r)
  sum = 0
  return 0 if !root

  sum += root.val if root.val <= r && root.val >= l
  sum += range_sum_bst(root.left,l,r) unless root.left == nil
  sum += range_sum_bst(root.right,l,r) unless root.left == nil
  return sum
end

a = TreeNode.new(10)
b = TreeNode.new(4)
c = TreeNode.new(15)
d = TreeNode.new(2)
e = TreeNode.new(6)
f = TreeNode.new(11)
g = TreeNode.new(17)

#      10
#    4     15
#  2  6  11   17
#       a
#    b     c
#  d  e  f   g

a.left = b
a.right = c
b.left = d
b.right = e
c.left = f
c.right = g

res = range_sum_bst(a, 0, 100)
puts "result: #{res}"
