 class Stack {
    constructor() {
        this.items = [];
    }
    push(item) {
        this.items.push(item);
    }
    pop() {
        return this.items.pop();
    }
    isEmpty() {
        return this.items.length === 0;
    }
    toArray() {
        return this.items.slice();
    }
 }

 const stack = new Stack()
 stack.push(1)
 stack.push(2)
 stack.push(3)
 console.log(stack.toArray())
 stack.pop()
 console.log(stack.toArray())