

class MinHeap {

	constructor(){
		this.heap = [];
	}
	
	/* Create a new child node at the end of the heap (last level).
	Add the new key to that node (append it to the array).
	Move the child up until you reach the root node and the heap property is satisfied. */
	buildMinHeap(){
		[10, 3, 4, 8, 2, 9, 7, 1, 2, 6, 5].forEach(val => this.insert(val));
	}

	minHeapify(){}
	
	/* Step 1 − Create a new node at the end of heap.
	Step 2 − Assign new value to the node.
	Step 3 − Compare the value of this child node with its parent.
	Step 4 − If value of parent is less than child, then swap them.
	Step 5 − Repeat step 3 & 4 until Heap property holds. */	
	insert(val){
	
		this.heap.push(val);
		this.bubbleUp();
			
	}
	
	bubbleUp(){
	
		let heapIndex = this.heap.length;  		 //use this index to move through the heap, starting at the end
		let newNode = this.heap[heapIndex - 1];  //get the recently added node, aka the last one
		
		//while (heapIndex > 0){
		if (heapIndex > 0) {
			let parentIndex = Math.floor((index - 1) / 2);
			//let parentN = Math.floor((n + 1) / 2) - 1,
			let parent = this.values[parentIndex];
			
		}
		
	}
	
	/* Delete the root node.
	Move the key of the last child to root.
	Compare the parent node with its children.
	If the value of the parent is greater than child nodes, swap them, and repeat until the heap property is satisfied. */	
	remove(){}
	
	getMin(){}
	
	getMax(){}
	
	extractMin(){}
		
	extractMax(){}
	
	decreaseKey(){}
	
	deleteKey(){}
	
	isEmpty(){}
	
	size(){}
	
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////
//Driver
		
/* 	Min Heap
 *              (10)
 *            /     \
 *         (15)     (30)
 *        /  \      /    \
 *      (40) (50)  (100)  (40)       
 */ 

console.log("Starting up MinHeap...");

const minHeap = new MinHeap();

minHeap.buildMinHeap();

