# Find the Maximum Value in a Binary Tree


## Challenge
Write a function called `find-maximum-value` which takes binary tree as its only input. Without utilizing any of the built-in methods available to your language, return the maximum value stored in the tree. You can assume that the values stored in the Binary Tree will be numeric.

## Approach & Efficiency
We used a breadth first search with a queue, and enqueued values when they were encountered, starting with the root. The nodes were enqueued in the order they were encountered , left to right. When a tree node in the queue was evaluated it was dequeued, and if it was larger than the max value encountered so far, then max value was updated. This was in a while loop , which ran until the queue was empty.

The speed of this is O(n) , since it has to traverse every node, and it looks at each node once.

The space of this is O(w) where width is the maximum number of nodes 'across' the tree. Since this is a binary tree, and the width is related to n as follows:
h = 1, w = 2
h = 2, w = 4
h = 3, w = 8
h = 4, w = 16

So w is h^2. 

And n is related to w as follows:
w = 1, n = 1
w = 2, n = 2 + all prior
w = 3, n = 3 + all prior
w = 4, n = 4 + all prior

so n = w + w-1 + w-2 ... + 1

which is just w^2 / 2


## Solution

![](./assets/find-maximum-value.jpg)