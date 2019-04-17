# Find Edges

## Challenge
Write a function based on the specifications above, which takes in a graph, and an array of city names. Without utilizing any of the built-in methods available to your language, return whether the full trip is possible with direct flights, and how much it would cost.

## Approach & Efficiency
The biggest challenge to this problem was understanding the graph implementation.

In this case, the graph class is implemented with nodes as keys in a JavaScript Map, and the values is another map of its neighbors.

In the neighbor map for each node, the keys are again Nodes, and the values are the weights of the edges.

For usability this isn't great. It'd probably be better to implemente the graph class so it is easier to write functions like these.

Efficiency:

In a graph with `n` nodes, we'll search thru the entire graph for the start node, since we can't do a constant time lookup, because we aren't passed a start node. This is O(n). Then for each of the nodes on our route, we'll search through the neighbors , and again we can't do a constant time lookup, even though it is a map, because the value is stored in a Node, not as the key. So this is again O(n). Presumanbly in a very connected graph we'll be searching O(n) for however many cities the route takes us.

So given a city array of size `m`, and a graph of size `n`, we'll be searching n nodes m times, which is O(m*n). If our lookups in the graph were constant time as it could be if the class was implemented for this problem, then we'd be able to get `m` constant time lookups, which would just be O( 1 * m ) => O(m), where again `m` is the number of cities on our route.

Presumably the route could take us to more nodes than in our graph, so worst case m could be larger than n, and so our upper bound of O(m) should be conservative.
