import LinkedList from "../linkedList.js";

class Queue {
    constructor() {
        this.list = new LinkedList();
    }
    endqueue(item) {
        this.list.append(item);
    }
    dequeue() {
        return this.list.deleteHead();
    }
    isEmpty() {
        return this.list.head === null;
    }
    toArray() {
        return this.list.toArray();
    }
}

const queue = new Queue();
queue.endqueue("max");
queue.endqueue("manu");
queue.endqueue("John");
console.log(queue.toArray());
queue.dequeue();
console.log(queue.toArray());