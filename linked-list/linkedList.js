export default class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(value) {
    const newNode = {value,next:null};
    if(this.tail) {
        this.tail.next = newNode
    }
    this.tail = newNode;
    if(!this.head) {
        this.head = newNode;
    }
  }

  prepend(value) {
    const newNode = {value,next:this.head};
    if(!this.tail) {
        this.tail = newNode;
    }
    this.head = newNode
  }

  insertAfter(value,afterValue) {
    const existingNode = this.find(afterValue);
    if(existingNode) {
        const newNode = {value,next:existingNode.next};
        existingNode.next = newNode;
    }
  }

  find(value) {
    let curNode = this.head;
    while(curNode) {
      if(curNode.value === value) {
        return curNode;
      }
      curNode = curNode.next;
    }
    return null;
  } 

  delete(value) {
    if(!this.head) {
      return
    }

    while(this.head && this.head.value === value) {
      this.head = this.head.next;
    }

    let curNode = this.head;
    while(curNode?.next) {
      if(curNode.next.value === value) {
        curNode.next = curNode.next.next;
      }else {
        curNode = curNode.next
      }
    }

    if(this.tail.value === value) {
      this.tail = curNode;
    }
  }

  deleteHead() {
    if(!this.head){
      return;
    }

    const deletedItem = this.head;

    if(this.head.next) {
      this.head = this.head.next;
    }else {
      this.head = null;
      this.tail = null;
    }
    return deletedItem;
  }

  toArray() {
    const elements = [];
    let curNode = this.head;
    while (curNode) {
        elements.push(curNode);
        curNode = curNode.next
    }
    return elements;    
  }
}

const linkedList = new LinkedList();

// linkedList.append(1);
// linkedList.append("Hello");
// linkedList.append("israr");
// linkedList.append("israr");
// linkedList.append(true);
// linkedList.append(18.5);
// linkedList.prepend("First Value");
// linkedList.prepend("First Value");

// console.log(linkedList.toArray())

// linkedList.delete('israr');
// linkedList.delete("First Value");
// linkedList.delete(18.5);

// console.log(linkedList.toArray())

// console.log(linkedList.find("Hello"))
// console.log(linkedList.find("israr"))

// linkedList.insertAfter('new value - 1',1);
// linkedList.insertAfter('new value - 2',"Hello");

// console.log(linkedList.toArray())