/* 
* 	Randomized Selection - JS Implementation - O(n)
*   Stephen Rinkus
* 	
*	Using quickSort() to perform randomized selection
*
*	Input: Array A with n distinct numbers and a number i in {1,2,...,n} 
*	Goal: Output a single number: the ith order statistic
*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//Helpers

const { performance } = require('perf_hooks');

//Random whole number, min and max included 
const getBoundedRandomNumber = (min, max) => {
	//take a random fraction of the distance between min and max, and add it to min
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//Swap array items i and j
const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//Main

const partition = (arr) => {

    let i = 1;     //i will always start one spot ahead of leftmost boundary
	
    //walk j from beginning to end, swapping smaller values backwards with i as it goes
    for (let j = 1; j <= arr.length - 1; j++) {
        if (arr[j] < arr[0]) {
            swap(arr, i, j);
            i++;
        }
    }
	
    //finally, put the pivot into its rightful place: the last open spot remaining
	//need to subtract 1, since i will finish 1 spot ahead of split
    swap(arr, 0, i-1);
		
    //send back final sorted location of pivot, so quickSort knows where to cut it
    return i-1;
}

//each recursive call will be on a slice of input array
const RSelect = (arr, len, i) => {
	
	//base case
	if (len == 1){
		return arr[0];  //element must be found, it's the only one there
	}
		
	//choose pivot from arr uniformly at random
	let pivot = getBoundedRandomNumber(0, arr.length-1);
		
	//place the randomly chosen pivot at the front, so partition() can chug as usual
	swap(arr, 0, pivot);
		
	//partition arr around pivot...j = new index of pivot, after placed inside of partition()
	let j = partition(arr);

	//lucky case where chosen pivot is the i we are looking for
	if (j == i-1){
		return arr[j];
	}
	if (j > i-1) {
		//recurse on the left side
		return RSelect (arr.slice(0, j), j, i);
	}
	if (j < i-1) {
		//recurse on the right side...i-j since we elminated the smaller ones (i) already
		return RSelect (arr.slice(j + 1, arr.length), len-j-1, i-j-1);
	}
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//Driver

//let arr = [10, 8, 2, 4];
let arr = [3, 4, 7, 6, 9, 16, 10, 11, 12, 2, 5, 8, 1, 13, 14, 15]
let orderStatistic = 12;

console.log("RandomizedSelection()...Looking for orderStatistic: " + orderStatistic);

if (orderStatistic > arr.length){
	
	console.log("ERROR: There are less than " + orderStatistic + " elements in the array (size = " + arr.length + ")");
	
} else {
	
	//Run the code and time it 
	let startTime = performance.now();
	let ithOrderStatistic = RSelect(arr, arr.length, orderStatistic); 
	let endTime = performance.now();
	
	console.log("orderStatistic " + orderStatistic + " = " + ithOrderStatistic);
	console.log(`RSelect() took ${endTime - startTime} milliseconds`);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////



