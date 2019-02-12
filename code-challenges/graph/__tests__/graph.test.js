'use strict';

const Graph = require('./../graph.js').Graph;
const Node = require('./../graph.js').Node;

describe ('node class', ()=>{
  it('can correctly instantiate a node with no args', ()=>{
    let myNode = new Node();
    expect(myNode).toBeInstanceOf(Node);
    expect(myNode.value).toEqual(undefined);
  });
  it('can correctly instantiate a node with a value', ()=>{
    let myNode = new Node(5);
    expect(myNode).toBeInstanceOf(Node);
    expect(myNode.value).toEqual(5);

  });
});

describe ('graph class', ()=>{
  describe('constructor', ()=>{
    it('can correctly instantiate a graph', ()=>{
      let myGraph = new Graph();
      expect(myGraph).toBeInstanceOf(Graph);
    });
  });

  describe('addNode()', ()=>{
    it('increments size on add', ()=>{
      let myGraph = new Graph();
      expect(myGraph.size()).toEqual(0);
      myGraph.addNode(5);
      expect(myGraph.size()).toEqual(1);
    });

    it('returns the node on add', ()=>{
      let myGraph = new Graph();
      let node = myGraph.addNode(5);
      expect(node).toBeInstanceOf(Node);
      expect(node.value).toEqual(5);
    });

    it('correctly adds the node to the graph', ()=>{
      let myGraph = new Graph();
      let obj = [1,2,3];
      let node = myGraph.addNode(obj);
      expect(node.value).toEqual(obj);
      let result = myGraph.getNodes().has(node);
      expect(result).toEqual(true);
    });

    it('objects are stored in the map by memory location and not simply value', ()=>{
      let myGraph = new Graph();
      let obj = [1,2,3];
      let result = myGraph.getNodes().has([1,2,3]);
      expect(result).toEqual(false);
    });
  });

  describe('addEdge()', ()=>{
    it(`throws error when either node doesn't exist`, ()=>{
      let myGraph = new Graph();
      let a = new Node(5);
      let b = new Node([1,2,3]);
      expect(()=>{
        myGraph.addEdge(a,b);
      }).toThrow();
    });
    it(`throws error when either node doesn't exist`, ()=>{
      let myGraph = new Graph();
      let a = new Node(5);
      expect(()=>{
        myGraph.addEdge(a);
      }).toThrow();
    });
    it(`throws error when either node doesn't exist`, ()=>{
      let myGraph = new Graph();
      expect(()=>{
        myGraph.addEdge();
      }).toThrow();
    });
    it(`correctly adds 1 edge`, ()=>{
      let myGraph = new Graph();

      let a = myGraph.addNode(5);
      let b = myGraph.addNode([1,2,3]);

      let weight = 100;
      myGraph.addEdge(a,b,weight);
      let resultA = myGraph.getNeighbors(a);

      expect(resultA).toBeInstanceOf(Map);
      expect(resultA.size).toEqual(1);
      expect(resultA.has(b)).toEqual(true);
      expect(resultA.get(b)).toEqual(weight);
    });
    it(`correctly adds 2 edges`, ()=>{
      let myGraph = new Graph();

      let a = myGraph.addNode(5);
      let b = myGraph.addNode([1,2,3]);
      let c = myGraph.addNode('lol');

      myGraph.addEdge(a,b,10);
      myGraph.addEdge(a,c,20);
      let resultA = myGraph.getNeighbors(a);

      expect(resultA).toBeInstanceOf(Map);
      expect(resultA.size).toEqual(2);
      expect(resultA.has(b)).toEqual(true);
      expect(resultA.has(c)).toEqual(true);
      expect(resultA.get(b)).toEqual(10);
      expect(resultA.get(c)).toEqual(20);
    });

    it(`correctly adds a self edge`, ()=>{
      let myGraph = new Graph();

      let a = myGraph.addNode(5);

      myGraph.addEdge(a,a,10);

      let resultA = myGraph.getNeighbors(a);

      expect(resultA).toBeInstanceOf(Map);
      expect(resultA.size).toEqual(1);
      expect(resultA.has(a)).toEqual(true);
      expect(resultA.get(a)).toEqual(10);
    });
  });

  describe('getNodes()', ()=>{
    it(`returns empty list for empty graph`, ()=>{
      let myGraph = new Graph();
      let nodeList = myGraph.getNodes();
      expect(nodeList).toBeInstanceOf(Map);
      expect(nodeList.size).toEqual(0);

    });
    it(`returns the correct list with 1 node`, ()=>{
      let myGraph = new Graph();
      let a = myGraph.addNode(5);

      let nodeList = myGraph.getNodes();

      expect(nodeList).toBeInstanceOf(Map);
      expect(nodeList.size).toEqual(1);
      expect(nodeList.has(a)).toBe(true);

    });
    it(`returns the correct list with 1 node`, ()=>{
      let myGraph = new Graph();
      let a = myGraph.addNode(5);
      let b = myGraph.addNode(a);

      let nodeList = myGraph.getNodes();

      expect(nodeList).toBeInstanceOf(Map);
      expect(nodeList.size).toEqual(2);
      expect(nodeList.has(a)).toBe(true);
      expect(nodeList.has(b)).toBe(true);
    });

  });

  describe('getNeighbors()', ()=>{
    it(`throws error when the node doesn't exist`, ()=>{
      let myGraph = new Graph();
      let a = new Node(5);
      expect(()=>{
        myGraph.getNeighbors(a);
      }).toThrow();
    });

    it(`returns a map of edges`, ()=>{
      let myGraph = new Graph();

      let a = myGraph.addNode(5);
      let b = myGraph.addNode([1,2,3]);
      let weight = 100;
      myGraph.addEdge(a,b,weight);

      let resultA = myGraph.getNeighbors(a);

      expect(resultA).toBeInstanceOf(Map);
    });

    it(`returns 1 edge correctly`, ()=>{
      let myGraph = new Graph();

      let a = myGraph.addNode(5);
      let b = myGraph.addNode([1,2,3]);
      let weight = 100;
      myGraph.addEdge(a,b,weight);
      let resultA = myGraph.getNeighbors(a);

      expect(resultA.size).toEqual(1);
      expect(resultA.has(b)).toEqual(true);
      expect(resultA.get(b)).toEqual(weight);
    });

    it(`returns 2 edges correctly`, ()=>{
      let myGraph = new Graph();

      let a = myGraph.addNode(5);
      let b = myGraph.addNode([1,2,3]);
      let c = myGraph.addNode('lol');

      myGraph.addEdge(a,b,10);
      myGraph.addEdge(a,c,20);

      let resultA = myGraph.getNeighbors(a);

      expect(resultA.size).toEqual(2);
      expect(resultA.has(b)).toEqual(true);
      expect(resultA.has(c)).toEqual(true);
      expect(resultA.get(b)).toEqual(10);
      expect(resultA.get(c)).toEqual(20);
    });

    it(`returns a double edge properly`, ()=>{
      let myGraph = new Graph();

      let a = myGraph.addNode(5);
      let b = myGraph.addNode([1,2,3]);

      myGraph.addEdge(a,b,10);
      myGraph.addEdge(b,a,20);

      let resultA = myGraph.getNeighbors(a);
      let resultB = myGraph.getNeighbors(b);

      expect(resultA).toBeInstanceOf(Map);
      expect(resultB).toBeInstanceOf(Map);

      expect(resultA.size).toEqual(1);
      expect(resultB.size).toEqual(1);

      expect(resultA.has(b)).toEqual(true);
      expect(resultB.has(a)).toEqual(true);

      expect(resultA.get(b)).toEqual(10);
      expect(resultB.get(a)).toEqual(20);
    });
  });

  describe('breadthFirst', () => {
    it('correctly process a graph breadth first', () => {
      const myGraph = new Graph();

      let a = myGraph.addNode(1);
      let b = myGraph.addNode(2);
      let c = myGraph.addNode(3);
      let d = myGraph.addNode(4);
      let e = myGraph.addNode(5);
      let f = myGraph.addNode(6);
      let g = myGraph.addNode(7);
      let h = myGraph.addNode(8);
      let k = myGraph.addNode(9);

      myGraph.addEdge(a,b,1);
      myGraph.addEdge(b,c,1);
      myGraph.addEdge(b,g,1);
      myGraph.addEdge(c,d,1);
      myGraph.addEdge(c,e,1);
      myGraph.addEdge(c,f,1);
      myGraph.addEdge(f,k,1);
      myGraph.addEdge(g,c,1);
      myGraph.addEdge(g,h,1);
      myGraph.addEdge(h,f,1);

      let result = myGraph.breadthFirst(a);
      let expected = [a,b,c,g,d,e,f,h,k];

      expect(result).toEqual(expected);
    });

    it('handles an empty graph', () => {
      const myGraph = new Graph();
      let a = new Node(1);

      let result = myGraph.breadthFirst(a);

      expect(result).toEqual(undefined);
    });
  });
});