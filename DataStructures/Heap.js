/* 

	Min Heap
	Stephen Rinkus 
	
	
			  (1)
			/    \
		 (2)     (4)
		/  \     / 
	  (5) (3)  (6)       
*/

class MinHeap {

	//Storing heap structure in an array
	constructor(){
		this.heap = [];			
	}
	
	//Insert an array of ints one at a time into a Heap
	buildMinHeap(){
		let values = [12, 7, 1, 3, 9, 13, 8, 11, 6, 14, 5, 10, 2, 4]   // 1,3,2,6,5,7,4,12,11,14,9,13,10,8
		//let values = [3, 1, 6, 5, 2, 4]   						   		 // 1,2,4,5,3,6
		//let values = [3, 6, 5, 2, 7, 4]   						   		 //
		values.forEach(val => this.insert(Number(val)));
	}
	
	//Swap two nodes
	swap(node1, node2){
		[this.heap[node1], this.heap[node2]] = [this.heap[node2], this.heap[node1]];
	}
	
	//Create a new node at the end of the heap, then start moving it upwards
	insert(val){
		//if parent is less than child, swap parent/child..repeat until heap property is regained.	
		this.heap.push(val);
		this.bubbleUp();
	}
	
	//Let a node work its way upwards to its natural resting spot.
	//Starts at bottom by default, optionally takes a starting node location
	bubbleUp(node){
		
		let index;    
		
		//if a param was passed, use that node as the starting point, otherwise start at the end
		node ? index = node : index = this.heap.length - 1;  	

		let parentIndex = Math.floor((index + 1) / 2) - 1; 
		
		//while the node still has parents which are greater, keep bubbling up
		while(index > 0 && this.heap[parentIndex] > this.heap[index]){
			this.swap(index, parentIndex);
			index = parentIndex;
			parentIndex = Math.floor((index + 1) / 2) - 1;  
		} 
	}
	
	//Sink down a node, defaults to starting at root
	bubbleDown(startNode = 0){
	
		let index = startNode;				//access to move through the array
		let swap = true;					//boolean swap status, so code knows when to exit loop
		const length = this.heap.length;
		let currNodeIndex, leftChildIndex, rightChildIndex;
		
		//keeping swapping until can't anymore (no more children or can't sink any further)
		while (swap) {
		
			swap = false;					//reset swap...code will exit loop unless a swap is performed
			currNodeIndex = index;			//make note of initial node location in case a swap occurs
			leftChildIndex = (2 * index) + 1;
			rightChildIndex = (2 * index) + 2;
			
			//first check if child inbounds, if so check if swap is needed on left
			if (leftChildIndex < length) {
				if (this.heap[leftChildIndex] < this.heap[index]){
					this.swap(currNodeIndex, leftChildIndex);
					swap = true;
				}
			}
			
			//then check if a swap needed on the right, regardless if a swap already occured on the left
			if (rightChildIndex < length) {
				if ((this.heap[rightChildIndex] < this.heap[currNodeIndex])){
					this.swap(currNodeIndex, rightChildIndex);
					swap = true;
				}
			}
			
			//keep crawling down the tree
			index = leftChildIndex;		
			
		}
	
	};
	
	//Bubble up or down when a node has recieved a new value 
	bubble(delVal, newVal, index){

		//push the new node up or down the tree, depending on how it compares to the deleted node
		delVal < newVal ? this.bubbleDown(index) : this.bubbleUp(index);
	}
	
	//The min is the first element in the array
	getMin(){
		if (!this.isEmpty()) {
			return this.heap[0];
		}
		return null;
	}
	
	//Return the highest value within the heap
	getMax(){
		if (!this.isEmpty()) {
			return Math.max(...this.heap);
		}
		return null;
	}
	
	//Remove and return the minimum element in the heap, and re-settle the remaining heap to valid state 
	extractMin(){
		
		const min = this.heap[0];			//minimum value in heap, to be returned at the end
		this.heap[0] = this.heap.pop();		//override first element with last
		this.bubbleDown();					//push the new-found root node downwards till its in place
		
		return min;
	}
	
	//Remove and return the maximum element in the heap
	extractMax(){
		return this.deleteValue(this.getMax());
	}
	
	//Decrease value of key at index (new val should be smaller)
	decreaseKey(index, newVal){
	
		//overwrite the node with new, lesser value, then bubble it up from that location
		this.heap[index] = newVal;
		this.bubbleUp(index);
	}
	
	//Update a key's value with a new value and re-establish heap property
	changeKey(index, newVal){
		
		//overwrite target node then bubble() does a comp to see which direction new node needs to bubble
		let delVal = this.heap[index];
		this.heap[index] = newVal;
		this.bubble(delVal, newVal, index);
	}
	
	//Delete a given index from the heap and return the value, making sure heap property restored after
	deleteKey(index){
		
		//replace node with last node, then bubble
		let delVal = this.heap[index];
		let end = this.heap.pop();
		this.heap[index] = end;
		this.bubble(delVal, end, index);
		
		return delVal;
	}
	
	//Alternative delete approach
	deleteKey2(index){
	
		//plummet a key's value, then bubble it up to the top of the tree, then extract min
		let delValue = this.heap[index];
		this.heap[index] = Number.NEGATIVE_INFINITY;
		this.bubbleUp(index);
		this.extractMin();
		
		return delValue;
	}	
	
	//Find and delete a given value, then restore heap property (assuming no dupes)
	deleteValue(val){
		
		//search and destroy
		return this.deleteKey(this.search(val));
		
	}
	
	//Recursive - find the index of a given value...takes a start location as arg also (assuming no dupes)
	search(val, index = 0, isFound = false){
		
		let leftChildIndex = (2 * index) + 1;
		let rightChildIndex = (2 * index) + 2;
		const length = this.heap.length;
		let res = null;
		
		//base case - value found
		if (this.heap[index] == val){
			//console.log("Found target val " + val + " at index " + index);
			isFound = true;
			return index;
		}
		
		//if the left child exists and is less than or equal to search value, recurse on it 
		if (leftChildIndex < length && !isFound){
			if (this.heap[leftChildIndex] <= val){
				res = this.search(val, leftChildIndex);
			}
		}
		
		//if the right child exists and is less than or equal to search value, recurse on it 
		if (rightChildIndex < length && !isFound){
			if (this.heap[rightChildIndex] <= val){
				res = this.search(val, rightChildIndex);
			}
		}
		
		return res;
		
	}
	
	//Boolean check if the heap is empty
	isEmpty(){
		return this.heap.length < 1;
	}
	
	//Returns the number of elements in the heap
	size(){
		return this.heap.length;
	}
	
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////
//Driver
		
/* 	Min Heap
 *              (1)
 *            /    \
 *         (2)     (4)
 *        /  \     / 
 *      (5) (3)  (6)       
 */ 
console.log("Starting up MinHeap...");

const minHeap = new MinHeap();
minHeap.buildMinHeap();

console.log("Heap : " + minHeap.heap);

console.log("Min: " + minHeap.getMin());
console.log("Max: " + minHeap.getMax()); 
console.log("isEmpty: " + minHeap.isEmpty());

/* console.log("Searching...");
let searchRes = minHeap.search(0, 10);
console.log("searchRes: " + searchRes); */

/* console.log("Decreasing key...");
minHeap.decreaseKey(4, 1);
console.log("Heap : " + minHeap.heap); */

/* console.log("Extracting min: ");
console.log(minHeap.extractMin());
console.log("Heap : " + minHeap.heap);  */

/* console.log("Extracting max: ");
console.log(minHeap.extractMax());
console.log("Heap : " + minHeap.heap); */

/* let key = 1;
console.log("Deleting key: " + key + "...");
console.log("Deleted: " + minHeap.deleteKey(key));
console.log("Heap : " + minHeap.heap); */

/* let val = 11;
console.log("Deleting value " + val + "...");
let delRes = minHeap.deleteValue(val)
console.log("delRes: " + delRes); 
console.log("Heap : " + minHeap.heap); */

 
//console.log("Final heap : " + minHeap.heap);



