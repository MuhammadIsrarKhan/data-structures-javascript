class Node {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
      this.parent = null;
    }
  
    get leftDepth() {
      if (!this.left) {
        return 0;
      }
  
      return this.left.depth + 1;
    }
  
    get rightDepth() {
      if (!this.right) {
        return 0;
      }
  
      return this.right.depth + 1;
    }
  
    get depth() {
      return Math.max(this.leftDepth, this.rightDepth);
    }
  
    get balanceFactor() {
      return this.leftDepth - this.rightDepth;
    }
  
    add(value) {
      if (this.value === null) {
        this.value = value;
        return;
      }
  
      if (this.value < value) {
        if (this.right) {
          this.right.add(value);
          return;
        }
        const newNode = new Node(value);
        newNode.parent = this;
        this.right = newNode;
        return;
      }
  
      if (this.value > value) {
        if (this.left) {
          this.left.add(value);
          return;
        }
        const newNode = new Node(value);
        newNode.parent = this;
        this.left = newNode;
        return;
      }
    }
  
    remove(value) {
      const identifiedNode = this.find(value);
  
      if (!identifiedNode) {
        throw new Error('Could not find node with that value');
      }
  
      if (!identifiedNode.left && !identifiedNode.right) {
        const identifiedParent = identifiedNode.parent;
        identifiedParent.removeChild(identifiedNode);
        return;
      }
  
      if (identifiedNode.left && identifiedNode.right) {
        const nextBiggerNode = identifiedNode.right.findNext();
        if (nextBiggerNode.value !== identifiedNode.right.value) {
          this.remove(nextBiggerNode.value);
          identifiedNode.value = nextBiggerNode.value;
        } else {
          identifiedNode.value = identifiedNode.right.value;
          identifiedNode.right = identifiedNode.right.right;
        }
      } else {
        const childNode = identifiedNode.left || identifiedNode.right;
  
        identifiedNode.left = childNode.left;
        identifiedNode.right = childNode.right;
        identifiedNode.value = childNode.value;
      }
  
      if (identifiedNode.left) {
        identifiedNode.left.parent = identifiedNode;
      }
      if (identifiedNode.right) {
        identifiedNode.right.parent = identifiedNode;
      }
    }
  
    removeChild(node) {
      if (this.left && this.left === node) {
        this.left = null;
        return;
      }
      if (this.right && this.right === node) {
        this.right = null;
        return;
      }
    }
  
    find(value) {
      if (this.value === value) {
        return this;
      }
  
      if (this.value < value && this.right) {
        return this.right.find(value);
      }
  
      if (this.value > value && this.left) {
        return this.left.find(value);
      }
    }
  
    findNext() {
      if (!this.left) {
        return this;
      }
  
      return this.left.findNext();
    }
  }
  
  class Tree {
    constructor() {
      this.root = new Node(null);
    }
  
    add(value) {
      this.root.add(value);
    }
  
    remove(value) {
      this.root.remove(value);
    }
  
    find(value) {
      return this.root.find(value);
    }
  }
  
  class AVLTree extends Tree {
    add(value) {
      super.add(value);
  
      let curNode = this.root.find(value);
  
      while (curNode) {
        this.balance(curNode);
        curNode = curNode.parent;
      }
    }
  
    remove(value) {
      super.remove(value);
  
      this.balance(this.root);
    }
  
    balance(node) {
      if (node.balanceFactor < -1) {
        if (node.right.balanceFactor < 0) {
          this.rotateLeft(node);
        } else if (node.right.balanceFactor > 0) {
          this.rotateRightLeft(node);
        }
      } else if (node.balanceFactor > 1) {
        if (node.left.balanceFactor < 0) {
          this.rotateLeftRight(node);
        } else if (node.left.balanceFactor > 0) {
          this.rotateRight(node);
        }
      }
    }
  
    rotateLeft(node) {
      const rightNode = node.right;
      node.right = null;
  
      if (node.parent) {
        node.parent.right = rightNode;
        node.parent.right.parent = node.parent;
      } else if (node === this.root) {
        this.root = rightNode;
        this.root.parent = null;
      }
  
      if (rightNode.left) {
        node.right = rightNode.left;
        node.right.parent = node;
      }
  
      rightNode.left = node;
      rightNode.left.parent = rightNode;
    }
  
    rotateRight(node) {
      const leftNode = node.left;
      node.left = null;
  
      if (node.parent) {
        node.parent.left = leftNode;
        node.parent.left.parent = node.parent;
      } else if (node === this.root) {
        this.root = leftNode;
        this.root.parent = null;
      }
  
      if (leftNode.right) {
        node.left = leftNode.right;
        node.left.parent = node;
      }
  
      leftNode.right = node;
      leftNode.right.parent = leftNode;
    }
  
    rotateLeftRight(node) {
      const leftNode = node.left;
      node.left = null;
  
      const leftRightNode = leftNode.right;
      leftNode.right = null;
  
      if (leftRightNode.left) {
        leftNode.right = leftRightNode.left;
        leftNode.right.parent = leftNode;
        leftRightNode.left = null;
      }
  
      node.left = leftRightNode;
      node.left.parent = node;
  
      leftRightNode.left = leftNode;
      leftRightNode.left.parent = leftRightNode;
  
      this.rotateRight(node);
    }
  
    rotateRightLeft(node) {
      const rightNode = node.right;
      node.right = null;
  
      const rightLeftNode = rightNode.left;
      rightNode.left = null;
  
      if (rightLeftNode.right) {
        rightNode.left = rightLeftNode.right;
        rightNode.left.parent = rightNode;
        rightLeftNode.right = null;
      }
  
      node.right = rightLeftNode;
      node.right.parent = node;
  
      rightLeftNode.right = rightNode;
      rightLeftNode.right.parent = rightLeftNode;
  
      this.rotateLeft(node);
    }
  }
  
  const tree = new AVLTree();
  tree.add(1);
  tree.add(3);
  tree.add(2);
  tree.add(10);
  tree.add(-5);
  tree.add(100);
  tree.add(33);
  tree.add(-3);
  tree.remove(2);
  tree.remove(10);
  console.log(tree);
  console.log(tree.find(1))  