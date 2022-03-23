/* 
* 	Merge Sort - JS Implementation - nlogn 
*	Stephen Rinkus
*/

//Input size: N (number is of power 2)
//Every level: 2^j subproblems -- at every level there's 2x more problems, and half the input size
//Every loop: 6N operations...doesn't matter the level you will always have less or equal 6N operations
//Number of operations at each level j: 2^j * 6(N / 2^j) = 6N
//Number of levels: lgN + 1
//O(6N * (lgN + 1)) = O(6N*lgN + 6N) = O(n lgN)

	//combine left and right sub arrays
	function merge(left, right) {

		out = [];	
		
		//shrink left and right arrs until gone
		while (left.length && right.length) {
			if (left[0] < right[0]) {
				out.push(left.shift());			
			} else {
				out.push(right.shift());			
			}
			console.log("currOut: " + out);
		}
		
		return [...out, ...left, ...right];
		
	}

	//cut array in half, recursively sort each side
	function mergeSort(arr) {

		let half = arr.length / 2;
		//const half = Math.floor(unsortedArray.length / 2);
		
		//base case
		if (arr.length < 2) {
			return arr;
		}
		
		//remaing right half remains in arr
		let left = arr.splice(0, half);
		
		//two recursive calls
		return merge(mergeSort(left), mergeSort(arr));	
	}

	console.log("Begining Mergesort");
	const arr = [3, 9, 1, 12];
	console.log("arr before sort: " + arr);
	console.log("final sorted array: " + mergeSort(arr));
	console.log("Done.");

//////////////////////////////////////////////////////////////////////////////////////////////////
//OLDER SYNTAX, before ES6

	function merge2 (left, right) {

	  let resultArray = [], leftIndex = 0, rightIndex = 0;

	  // We will concatenate values into the resultArray in order
	  while (leftIndex < left.length && rightIndex < right.length) {
		if (left[leftIndex] < right[rightIndex]) {
		  resultArray.push(left[leftIndex]);
		  leftIndex++; // move left array cursor
		} else {
		  resultArray.push(right[rightIndex]);
		  rightIndex++; // move right array cursor
		}
	  }

	  // We need to concat here because there will be one element remaining
	  // from either left OR the right
	  return resultArray
			  .concat(left.slice(leftIndex))
			  .concat(right.slice(rightIndex));
	}
















