class Node {
    constructor(value, parentNode = null) {
      this.children = [];
      this.value = value;
      this.parent = parentNode;
    }
  
    addNode(value) {
      const segments = value.split('/');
  
      if (segments.length === 0) {
        return;
      }
      if (segments.length === 1) {
        const node = new Node(segments[0], this);
        this.children.push(node);
        return { node: node, index: this.children.length - 1 };
      }
      const existingChildNode = this.children.find(
        (child) => child.value === segments[0]
      );
  
      if (existingChildNode) {
        existingChildNode.addNode(segments.slice(1).join('/'));
      } else {
        const node = new Node(segments[0], this);
        node.addNode(segments.slice(1).join('/'));
        this.children.push(node);
        return { node: node, index: this.children.length - 1 };
      }
    }
  
    removeNode(value) {
      const segments = value.split('/');
  
      if (segments.length === 0) {
        return;
      }
      if (segments.length === 1) {
        const existingNodeIndex = this.children.findIndex(
          (child) => child.value === segments[0]
        );
        if (existingNodeIndex < 0) {
          throw new Error('Could not find matching value!');
        }
        this.children.splice(existingNodeIndex, 1);
      }
      if (segments.length > 1) {
        const existingChildNode = this.children.find(
          (child) => child.value === segments[0]
        );
  
        if (!existingChildNode) {
          throw new Error(
            'Could not find matching path! Path segment: ' + segments[0]
          );
        }
  
        existingChildNode.removeNode(segments.slice(1).join('/'));
      }
    }

    find(value) {
      //Depth first
      // for(const child of this.children) {
      //   if(child.value === value) {
      //     return child;
      //   }
      //   const foundNode = child.find(value);
      //   if(foundNode) {
      //     return foundNode;
      //   }
      // }

      //Breadth first
      for(const child of this.children) {
        if(child.value === value) {
          return child;
        }
      }
      for(const child of this.children) {
        const foundNode = child.find(value);
        if(foundNode) {
          return foundNode;
        }
      } 
    }
  }
  
  class Tree {
    constructor(rootValue) {
      this.root = new Node(rootValue);
    }
  
    add(path) {
      this.root.addNode(path);
    }
  
    remove(path) {
      this.root.removeNode(path);
    }

    find(path){
      if(this.root.value === path) {
        return this.root;
      }
      return this.root.find(path);
    }
  }
  
  const filesystem = new Tree('/');
  filesystem.add('documents');
  filesystem.add('documents/personal/tax.docx');
  filesystem.add('games/cod.exe');
  filesystem.add('games/cod2.exe');
  filesystem.remove('games/cod.exe');
  // filesystem.remove('games/cod3.exe');
  // filesystem.remove('gamessssss/cod2.exe');
  
  console.log(filesystem);
  
  console.log(filesystem.find('tax.docx'))