//https://www.educative.io/blog/data-structure-heaps-guide

class minHeap {
    constructor() {
        this.heap = []
        this.elements = 0;
    };

    insert(val) {
        if (this.elements >== this.heap.length) {
            this.elements = this.elements + 1
            this.heap.push(val);
            this.__percolateUp(this.heap.length - 1);
        }
        else {
            this.heap[this.elements] = val;
            this.elements = this.elements + 1;
            this.__percolateUp(this.elements - 1);
        }
    };
    
    getMin() {
        if (this.heap.length !== 0)
            return this.heap[0];
        return null;
    }

    removeMin() {
        const min = this.heap[0];
        if (this.elements > 1) {            
            this.heap[0] = this.heap[this.elements - 1];
            this.elements = this.elements - 1;
            this.__minHeapify(0);
            return min;
        } else if (this.elements == 1) {
            this.elements = this.elements - 1;
            return min;
        } else {
            return null;
        }
    };

    __percolateUp(index) {
        let parent = Math.floor((index - 1) / 2);
        if (index <= 0)
            return
        else if (this.heap[parent] > this.heap[index]) {
            let tmp = this.heap[parent];
            this.heap[parent] = this.heap[index];
            this.heap[index] = tmp;
            this.__percolateUp(parent);
        }
    };

    __minHeapify(index) {
        let left = (index * 2) + 1;
        let right = (index * 2) + 2;
        let smallest = index;
        if ((this.elements > left) && (this.heap[smallest] > this.heap[left])) {
            smallest = left;
        }
        if ((this.elements > right) && (this.heap[smallest] > this.heap[right]))
            smallest = right;
        if (smallest !== index) {
            let tmp = this.heap[smallest];
            this.heap[smallest] = this.heap[index];
            this.heap[index] = tmp;
            this.__minHeapify(smallest);
        }
    }

    buildHeap(arr) {
        this.heap = arr;
        this.elements = this.heap.length;
        for (let i = this.heap.length - 1; i >= 0; i--) {
            this.__minHeapify(i)
        }
    }
};

let heap = new minHeap();
heap.insert(12);
heap.insert(10);
heap.insert(-10);
heap.insert(100);

console.log(heap.getMin()); //you should get -10

let newheap = new minHeap();
let arr = [12, 6, 8, 3, 16, 4, 27];
newheap.buildHeap(arr) //builds this new heap with elements from the array
console.log(newheap.getMin()) //this logs 3

newheap.removeMin();

console.log(newheap.getMin())

//////////////////////////////////////////////////////////////////////////////////////////////////////////

/* convert a binary max heap into a binary min heap where maxHeap is an array in the maxHeap format (i.e. the parent is greater than its children). output is a converted array
*/

function minHeapify(heap, index) {
    var left = index * 2;
    var right = (index * 2) + 1;
    var smallest = index;

    if ((heap.length > left) && (heap[smallest] > heap[left])) {
        smallest = left
    }
    if ((heap.length > right) && (heap[smallest] > heap[right]))
        smallest = right
    if (smallest != index) {
        var tmp = heap[smallest]
        heap[smallest] = heap[index]
        heap[index] = tmp
        minHeapify(heap, smallest)
    }
    return heap;
}

function convertMax(maxHeap) {
    for (var i = Math.floor((maxHeap.length) / 2); i > -1; i--)
        maxHeap = minHeapify(maxHeap, i)
    return maxHeap
}

//var maxHeap = [9,4,7,1,-2,6,5]
//console.log(convertMax(maxHeap))


















