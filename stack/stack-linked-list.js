import LinkedList from "../linkedList.js";

class Stack {
    constructor() {
        this.list = new LinkedList();
    }
    push(item) {
        this.list.prepend(item);
    }
    pop() {
        return this.list.deleteHead()
    }
    isEmpty() {
        return this.list.head === null;
    }
    toArray() {
        return this.list.toArray();
    }
}

// const stack = new Stack();
// stack.push(1);
// stack.push(2);
// stack.push(3);
// console.log(stack.toArray());
// stack.pop();
// console.log(stack.toArray());