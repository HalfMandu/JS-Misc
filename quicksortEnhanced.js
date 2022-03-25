/* 
* 	QuickSort - JS Implementation - nlogn
*   Stephen Rinkus
*/

const { performance } = require('perf_hooks');

///////////////////////////////////////////////////////////////////////////////////
//Helpers

//Convert txt file to array
const parseTxtFile = async (csvFile) => {

    const data = await fs.readFileAsync(csvFile);
    const str = data.toString();
    const lines = str.split('\r\n');

    let result = [];

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
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//Swap array items i and j
const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};

//Pivot options: 1st element, middle element, or random element
const choosePivot = (arr, left, right, pivotType) => {

    let pivotPos = left;  //by default, pivot is first entry in array

    //find desired pivot point, then swap with 1st element if needed
    switch (pivotType) {
        case "firstElement":
            return;   //by default, partition() already choosing 1st element
        case "middleElement":
            pivotPos = Math.floor((left + right) / 2);
            break;
        case "randomElement":
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
    swap(arr, pivotPos, i - 1);

    //send back final (semi-sorted) location of pivot, so quickSort() knows where to cut it
    return i;
}


//main recursive call
const quickSort = (arr, leftPos, rightPos) => {

    //base cases, else recursion continues
    if (arr.length < 2) {
        return arr;
    }

    if (leftPos >= rightPos) {
        return;
    }

    //partitionTypes : firstElement, middleElement, randomElement
    const partitionType = "firstElement";

    //all choices will swap with 1st element, allowing partition() to use 1st as pivot
    choosePivot(arr, leftPos, rightPos, partitionType);

    //partition around chosen pivot...once properly placed, can recurse both sides
    let sortedPivotPos = partition(arr, leftPos, rightPos);

    //recurse both sides
    //all elements before the pivot index go to the left, the rest to the right
    quickSort(arr, leftPos, sortedPivotPos - 1);
    quickSort(arr, sortedPivotPos, rightPos);

    return arr;
}

///////////////////////////////////////////////////////////////////////////////////
//Driver

let arr = [3, 4, 7, 6, 9, 16, 10, 11, 12, 2, 5, 8, 1, 13, 14, 15];

const util = require('util');
const fs = require('fs');
fs.readFileAsync = util.promisify(fs.readFile);

parseTxtFile('./QuickSort_Smaller.txt').then(() => {
    let startTime = performance.now();
    let arrSorted = quickSort(arr, 0, arr.length - 1);
    let endTime = performance.now();
    console.log("Sorted array: " + arrSorted);
    console.log(`quickSort() took ${endTime - startTime} milliseconds`);
})

///////////////////////////////////////////////////////////////////////////////////

exports.quickSort = quickSort;