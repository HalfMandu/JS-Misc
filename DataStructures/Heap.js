/* 
	Arr[0] Returns the root node.
	Arr[(i-1)/2] Returns the parent node.
	Arr[(2*i)+1] Returns the left child node.
	Arr[(2*i)+2] Returns the right child node.
	
	Get max or min element - O(1)
		
	Remove max or min element  - O(Log n) 
		need to maintain the max/mix at root node...Log n operations
	
	Insert element - O(Log n) 
		insert the value at the end of the tree and bubble up to restore heap property
	
	1) Shape Property: A binary heap is a complete binary tree, this means all of the levels of the tree are completely filled except possibly the last level. The nodes are filled from left to right.
	2) Heap Property: The value stored in each node is either (greater than or equal to) OR (less than or equal to ) it’s children depending if it is a max heap or a min heap.

	Building a heap from an array of n input elements can be done by starting with an empty heap, then successively inserting each element. 
		This algorithm runs O( n log n) time. 
	However this method is suboptimal and a faster algorithm was created by Floyd, which starts by putting the elements on a binary tree, respecting the shape property, 
	then starting from the lowest level and moving upwards
	
	 	Min Heap
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
		this.found = false;
	}
	
	//Swap two nodes, uses destructure
	swap(node1, node2){
		[this.heap[node1], this.heap[node2]] = [this.heap[node2], this.heap[node1]]
	}
	
	//Insert an array of ints one at a time into a Heap
	buildMinHeap(){
		let values = [12, 7, 1, 3, 9, 13, 8, 11, 6, 14, 5, 10, 2, 4]   // 1,3,2,6,5,7,4,12,11,14,9,13,10,8
		//let values = [3, 1, 6, 5, 2, 4]   						   // 1,2,4,5,3,6
		values.forEach(val => this.insert(Number(val)));
	}
	
	//Create a new node at the end of the heap, then compare it to its parents.
	//If parent's value is less than child's, swap parent/child. Repeat until heap property is regained.	
	insert(val){
		this.heap.push(val);
		this.bubbleUp();
	}
	
	//Let a node work its way upwards to its natural resting spot.
	//Starts at bottom by default, optionally takes a starting node location
	bubbleUp(node){
		
		let index = null;    //index to move through the heap, starting at the end
		
		//if a param was passed, use that node as the starting point, otherwise start at the end
		node ? index = node : index = this.heap.length - 1;  	
		
		const currNode = this.heap[index];  		 //get the node to use for comparisons
		
		//while the node still has room above to move upwards, keep bubbling
		while (index > 0) {
		
			let parentIndex = Math.floor((index + 1) / 2) - 1;  
			let parent = this.heap[parentIndex];
			
			//if new node still isn't lower than new parent, perform another swap
			if (currNode < parent){
				this.swap(index, parentIndex);
				index = parentIndex;
			} 
			else break;
		}
	}
	
	//Sink down starting from a node
	bubbleDown(startNode){
	
		let index = startNode;				//access to move through the array
		let swap = true;					//boolean swap status, so code knows when to exit loop
		let currNode, currNodeIndex, leftChildIndex, rightChildIndex = null;
		const length = this.heap.length;
		
		//keeping swapping until can't anymore (no more children or can't sink any further)
		while (swap) {
		
			swap = false;					//reset swap...code will exit loop unless a swap is performed
			currNodeIndex = index;			//make note of initial node locatation in case a swap happens
			currNode = this.heap[index];	//the parent node used to check children
			leftChildIndex = (2 * index) + 1;
			rightChildIndex = (2 * index) + 2;
			
			//first check if child inbounds, if so check if swap is needed on left
			if (leftChildIndex < length) {
				if (this.heap[leftChildIndex] < currNode){
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
		this.bubbleDown(0);					//push the new-found root node downwards till its in place
		
		return min;
	}
	
	//Remove and return the maximum element in the heap
	extractMax(){}
	
	//To-do
	decreaseKey(){}
	
	//Plummet a key's value, then bubble it up to the top of the tree, then extract min
	deleteKey(key){
	
		let delValue = this.heap[key];
		this.heap[key] = Number.NEGATIVE_INFINITY;
		this.bubbleUp(key);
		this.extractMin();
		
		return delValue;
	}
	
	//Find and replace the target value with the popped last value, then bubble it up or down based on a comp
	deleteValue(val){

		let end = this.heap[this.heap.length - 1];
		let targetIndex = this.search(0, val);
		let delVal = this.heap[targetIndex];
		this.heap[targetIndex] = this.heap.pop();
		
		//need to push the new node up or down the tree, depending on how it compares to the deleted node
		if (delVal < end){
			this.bubbleDown(targetIndex);
		} else {
			this.bubbleUp(targetIndex);
		}
		
		return delVal;
	}
	
	//Recursive - Find the index of a given value...takes a starting location as arg also 
	search(index, val){
		
		let currNode = this.heap[index];		
		let leftChildIndex = (2 * index) + 1;
		let rightChildIndex = (2 * index) + 2;
		const length = this.heap.length;
		let res = null;
		
		//base case - found value
		if (currNode == val){
			//console.log("Found target val " + val + " at index " + index);
			this.found = true;
			return index;
		}
		
		//if the left child exists and is less than or equal to search value, recurse on it 
		if (leftChildIndex < length){
			if (this.heap[leftChildIndex] <= val && !this.found){
				res = this.search(leftChildIndex, val);
			}
		}
		
		//if the right child exists and is less than or equal to search value, recurse on it 
		if (rightChildIndex < length && !this.found){
			if (this.heap[rightChildIndex] <= val){
				res = this.search(rightChildIndex, val);
			}
		}
		
		return res;
		
	}
	
	//What to remove if no paramter is passed?
	remove(){}
	
	//Re-establish heap property -- take an array and heapify it...different from buildMinHeap()?
	minHeapify(){}
	
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

//console.log("Heap : " + minHeap.heap);

/* console.log("Min: " + minHeap.getMin());
console.log("Max: " + minHeap.getMax()); 
console.log("isEmpty: " + minHeap.isEmpty());  */

/* console.log("Searching...");
let searchRes = minHeap.search(0, 10);
console.log("searchRes: " + searchRes); */

/* console.log("Extracting min: ");
console.log(minHeap.extractMin());
console.log("Heap : " + minHeap.heap); */

/* let key = 3;
console.log("Deleting key: " + key + "...");
console.log("Deleted value: " + minHeap.deleteKey(key)); */

/* let val = 22;
console.log("Deleting value " + val + "...");
let delRes = minHeap.deleteValue(val)
console.log("delRes: " + delRes); */

console.log("Final heap : " + minHeap.heap);



