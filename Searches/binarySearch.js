/* 
* 	Binary Search - JS Implementation - logn
*   Stephen Rinkus
*/

/* Search a sorted array by repeatedly dividing the array in half. Begin with an interval covering the whole array. If the value of the search key is less than the item in the middle of the interval, narrow the interval to the lower half. Otherwise, narrow it to the upper half. Repeatedly check until the value is found or the interval is empty.  */


/* runtime: logn 
 * best-case : O(1) when the central index would directly match the desired value. 
 * worst-case : logn - values at either extremity of the list or values not in the list. 
 * space complexity would be O(log n)
 */
const { performance } = require('perf_hooks');


const binarySearch = (array, val) => {

	let minPos = 0;
	let maxPos = array.length - 1;
	let mid;
	let search;
	
	//self calling named function to enable recursion
	(search = () => {
		
		mid = Math.floor((minPos + maxPos) / 2);

		console.log(`Looking between ${array[minPos]} and ${array[maxPos]}`);

		if (array[mid] === val ){
		  console.log(`Value found -- ${val} == ${array[mid]}`);
		  return;
		}

		if (val > array[mid]){
		  minPos = mid + 1;
		}

		if (val < array[mid]){
		  maxPos = mid -1;
		}

		search(); //value not yet found, so recurse again
		
	})();
}


//let arr = [1, 3, 4, 5, 8, 10, 15, 18, 20, 21, 22, 25, 26, 29, 34, 35];
let val = 96;
let sortedArr = [];
for (let i = 1; i <= 100; i++){
	sortedArr.push(i);
}

let startTime = performance.now();
binarySearch(sortedArr, val);
let endTime = performance.now();
	
console.log(`binarySearch() took ${endTime - startTime} milliseconds`);


module.exports = {binarySearch};
