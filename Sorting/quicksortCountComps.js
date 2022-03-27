/* 
* 	QuickSort - JS Implementation - nlogn
*   Stephen Rinkus
*/

const { performance } = require('perf_hooks');

///////////////////////////////////////////////////////////////////////////////////
//Helpers

//Keeping track of pivot options
const FIRST_ELEMENT = 1;
const MIDDLE_ELEMENT = 2;
const LAST_ELEMENT = 3;
const RANDOM_ELEMENT = 4;

//Convert txt file to array
const parseTxtFile = async (csvFile) => {

    const util = require('util');
    const fs = require('fs');
    fs.readFileAsync = util.promisify(fs.readFile);

    const data = await fs.readFileAsync(csvFile);
    const str = data.toString();
    const lines = str.split('\r\n');

    lines.map(line => {
        if (!line) {
            return null;
        }
        result.push(Number(line));
    })

    return result;
}

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

//Pivot options: 1st element, middle element, last element, or random element
const choosePivot = (arr, left, right, pivotType) => {

    let pivotPos = left;  //by default, pivot is first entry in array
	
    //find desired pivot point, then swap with 1st element if needed
    switch (pivotType) {
		//by default, partition() already choosing 1st element
        case FIRST_ELEMENT:
            return;   
        case MIDDLE_ELEMENT:
            pivotPos = Math.floor((left + right) / 2);
            break;
		case LAST_ELEMENT: 
			pivotPos = right;
			break;
        case RANDOM_ELEMENT:
            pivotPos = getBoundedRandomNumber(left, right);
            break;
        default:
            return;
    }
    
    //swap the chosen pivot with the left-bound, so partition() can treat it as pivot 
    swap(arr, left, pivotPos);

    return;
}

///////////////////////////////////////////////////////////////////////////////////
//Main

//takes the full array each time, along with the left and right subarray boundaries
//partitions the array around a pivot, so that leftside < pivot < rightside
const partition = (arr, left, right) => {

    let i = left + 1;     //i will always start one spot ahead of leftmost boundary
    let pivotPos = left;  //pivot always chosen as 1st element in this method

    //walk j from beginning to end, sending smaller values backwards as it goes
    for (let j = left + 1; j <= right; j++) {
        if (arr[j] < arr[pivotPos]) {
            swap(arr, i, j);
            i++;
        }
    }
	
    //finally, put the pivot into its rightful place: the last open spot remaining
	//need to subtract 1, since i will finish 1 spot ahead of split
    swap(arr, pivotPos, i - 1);

    //send back final sorted location of pivot, so quickSort knows where to cut it
    return i-1;
}


//main recursive call
const quickSort = (arr, leftPos, rightPos) => {

    //base cases, else recursion continues
    if (arr.array.length < 2) {
        return arr;
    }

    if (leftPos >= rightPos) {
        return;
    }

    //partitionTypes : FIRST_ELEMENT, MIDDLE_ELEMENT, LAST_ELEMENT, RANDOM_ELEMENT
    const partitionType = LAST_ELEMENT;

    //all choices will swap with 1st element, allowing partition() to use 1st element as pivot regardless
    choosePivot(arr.array, leftPos, rightPos, partitionType);

    //partition around chosen pivot...once properly placed, can recurse both sides
    let sortedPivotPos = partition(arr.array, leftPos, rightPos);
		
    //recurse both sides...all elements before the pivot index go to the left, the rest to the right
    quickSort(arr, leftPos, sortedPivotPos - 1);
    quickSort(arr, sortedPivotPos + 1, rightPos);
	
	//the number of comparisons is the number of spots between the boundaries
    arr.compCounter += (rightPos - leftPos);
	
    return { 
		"array": arr.array,
		"compCounter": arr.compCounter
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
//Driver

//let arr = [3, 4, 7, 6, 9, 16, 10, 11, 12, 2, 5, 8, 1, 13, 14, 15];
//const arr = [3, 4, 7, 6, 9, 16, 10, 11];
//const arr = [4, 3, 7, 6];
//const arr = [1, 2, 3, 4];
/* const arr = {
	"array": [3, 4, 7, 6, 9, 16, 10, 11, 12, 2, 5, 8, 1, 13, 14, 15],
	"compCounter": 0
} */

let result = [];

parseTxtFile('./QuickSort.txt').then(() => {

	const arr = {
		"array": result,
		"compCounter": 0
	} 
 
    let startTime = performance.now();
    let arrSorted = quickSort(arr, 0, arr.array.length - 1);
    let endTime = performance.now();
	
	console.log("final compCounter: " + arrSorted.compCounter);
    
	console.log(`quickSort() took ${endTime - startTime} milliseconds`);
	
	//first element pivot comparisons: 162,085 
	//middle element pivot comparisons: 150,657 
	//last element pivot comparisons: 164,123
	
})

///////////////////////////////////////////////////////////////////////////////////

exports.quickSort = quickSort;
