/* 
*	Queue - First In First Out 
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////

class Queue {

	//each instance will have a head and tail
	constructor() {
		this.elements = {};  //the total collection of elements within the Queue
		this.head = 0;	//represents the front
		this.tail = 0;  //represents the end 
	}
  
	//add item by shoving it at the end
	enqueue(element) {
		this.elements[this.tail] = element;
		this.tail++;  //tail length grows by one since we added one element
	}

	//remove the first item, and return it
	dequeue() {
		const element = this.elements[this.head];
		delete this.elements[this.head];
		this.head++;  //head position creeps one step forward, acknowledging removed front item
		return element;
	}

	//show the value which is associated with the first position in the queue
	peek() {
		return this.elements[this.head];
	}

	//tail and head describe distanance, so subracting gives us length of the entire queue
	get length() {
		return this.tail - this.head;
	}
	
	//if tail and head don't exist
	get isEmpty() {
		return this.length === 0;
	}
  
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

const queue = new Queue();
queue.enqueue(4);
queue.enqueue(1);
queue.enqueue(55);
queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue());   // 2
console.log(queue.peek());      // 4
console.log(queue.length);      // 4
