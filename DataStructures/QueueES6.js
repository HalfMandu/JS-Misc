/* 
*	Queue - First In First Out - ES6
*/

//////////////////////////////////////////////////////////////////////////////////////////////////

class Queue extends Array {
	
	//Array already pushes item to the back 
    enqueue(val) {
        this.push(val);
    }
	
	//Array can already remove from the front (and return removed item)
    dequeue() {
        return this.shift();
    }
	
	//easy to read a value at an index
    peek() {
        return this[0];
    }
	
	//Array already has a length function
    isEmpty() {
        return this.length === 0;
    }
	
}

//////////////////////////////////////////////////////////////////////////////////////////////////

const queue = new Queue();

queue.enqueue(12);
queue.enqueue(1);
queue.enqueue(5);
queue.isEmpty();
queue.dequeue();

//////////////////////////////////////////////////////////////////////////////////////////////////

//rear is at position 0 in the list
class QueueBackToFront {
    
	constructor() {
        this.items = [];
    }

    isEmpty() {
        return (this.items.length === 0);
    }

    enqueue(item) {
        this.items.unshift(item);
    }

    dequeue() {
        return this.items.pop();
    }

    size() {
        return this.items.length;
    }
}

let queue2 = new Queue();

console.log( queue2.isEmpty() ); 	// true
queue2.enqueue(8.4);
queue2.enqueue('banana')
console.log( queue2.size() ); 		// 2
console.log( queue2.dequeue() ); 	// 8.4
console.log( queue2.isEmpty() ); 	// false
console.log( queue2.size() ); 		// 1
