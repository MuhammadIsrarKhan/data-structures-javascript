class Graph {
    constructor() {
      this.nodes = {};
      this.edges = {};
    }
  
    addNode(identifier, value) {
      if (this.nodes[identifier]) {
        throw new Error('Node exists already!');
      }
      this.nodes[identifier] = value;
    }
  
    addEdge(startNode, endNode) {
      if (!this.nodes[startNode] || !this.nodes[endNode]) {
        throw new Error('Start or end node does not exist!');
      }
      if (this.edges[startNode] && !this.edges[startNode].has(endNode)) {
        // this.edges[startNode].push(endNode);
        this.edges[startNode].add(endNode);
      } else {
        this.edges[startNode] = new Set([endNode]);
      }
    }
  
    removeNode(nodeIdentifier) {
      this.nodes[nodeIdentifier] = undefined;
      Reflect.deleteProperty(this.edges, nodeIdentifier);
      for (const edgeIdentifier in this.edges) {
        this.edges[edgeIdentifier].delete(nodeIdentifier);
      }
    }
  
    removeEdge(startNode, endNode) {
      if (!this.edges[startNode] || !this.edges[startNode].has(endNode)) {
        throw new Error('Edge does not exist!');
      }
      this.edges[startNode].delete(endNode);
    }
  
    hasEdge(startNode, endNode) {
      if (!this.edges[startNode]) {
        return false;
      }
      return this.edges[startNode].has(endNode);
    }
  
    getAllEdges(node) {
      return this.edges[node];
    }
  }
  
  const network = new Graph();
  
  network.addNode('max', {
    firstName: 'Maximilian',
    lastName: 'Schwarzmüller',
    age: 31,
  });
  network.addNode('manuel', {
    firstName: 'Manuel',
    lastName: 'Lorenz',
    age: 32,
  });
  network.addNode('jules', {
    firstName: 'Jules',
    lastName: 'Myers',
    age: 28,
  });
  network.addNode('julie', {
    firstName: 'Julie',
    lastName: 'Edvardson',
    age: 35,
  });
  network.addNode('chrissy', {
    firstName: 'Chrissy',
    lastName: 'Jones',
    age: 29,
  });
  network.addNode('praveen', {
    firstName: 'Praveen',
    lastName: 'Kumar',
    age: 38,
  });
  
  network.addEdge('max', 'manuel');
  network.addEdge('manuel', 'max');
  network.addEdge('max', 'jules');
  network.addEdge('jules', 'max');
  network.addEdge('max', 'chrissy');
  network.addEdge('chrissy', 'max');
  network.addEdge('manuel', 'julie');
  network.addEdge('julie', 'manuel');
  network.addEdge('jules', 'chrissy');
  network.addEdge('chrissy', 'jules');
  network.addEdge('chrissy', 'praveen');
  network.addEdge('praveen', 'chrissy');
  
  console.log(network);
  
  console.log(network.hasEdge('max', 'manuel'));
  console.log(network.hasEdge('max', 'praveen'));
  
  network.removeNode('max');
  
  console.log(network);