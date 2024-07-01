class Node {
    constructor(value,parentNode = null) {
      this.children = [];
      this.parent = parentNode;
      this.value = value;
    }

    addNode(value) {
      const newNode = new Node(value,this)
      this.children.push(newNode);
      return {node : newNode, index : this.children.length - 1}
    }
    removeNode(index) {
      this.children.splice(index,1)
    }
}

class Tree {
    constructor(rootValue) {
      this.root = new Node(rootValue)
    }
}

const fileSystem = new Tree('/')
const {node : documentsNode} = fileSystem.root.addNode('/documents')
const {node : gamesNode} = fileSystem.root.addNode('/games')

documentsNode.addNode('results.txt');
gamesNode.addNode('cod.exe');

console.log(fileSystem)