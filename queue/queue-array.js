class Queue {
    constructor() {
        this.items = [];
    }
    endqueue(item) {
        this.items.push(item);
    }
    dequeue() {
        return this.items.shift();
    }
    isEmpty() {
        return this.items.length === 0;
    }
    toArray() {
        return this.items.slice();
    }
}

const queue = new Queue();
queue.endqueue("max");
queue.endqueue("manu");
queue.endqueue("julie");
console.log(queue.toArray());
console.log(queue.dequeue());
console.log(queue.toArray());