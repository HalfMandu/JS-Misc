/*
	swap(arr, i, j)
	parseTxtFile async (csvFile)
	getMedian(arr, first, mid, last)
	getBoundedRandomNumber(min, max) 
	getRandomKey(keys)
	printGraph()
	printObj(object)
	bisect(list, num)
*/


//Swap array items i and j
const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};

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

//Identify location of which of three elements is the median (i.e., the index of the one whose value is in between the value of the other two)
const getMedian = (arr, first, mid, last) => {

	//bitwise XOR -- return element ONLY if it is greater than JUST ONE of the other two elements...
	if ((arr[first] > arr[mid]) ^ (arr[first] > arr[last]))
		return first;
	if ((arr[mid] > arr[first]) ^ (arr[mid] > arr[last]))
		return mid;
	else
		return last;
}

//Random whole number, min and max included 
const getBoundedRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
};

//takes in list of keys and returns a random one
const getRandomKey = (keys) => {
	let rand = Math.floor(Math.random() * (keys.length));
	return keys[rand];
};

//Prints all vertices and their adjacency lists
printGraph() {
	//extract key/vals and display them
	for (let [vertex, neighbors] of this.vertices){
		console.log(vertex, neighbors);
	}
};
	
//simplify an object for printing
const printObj = (object) => {
    const simpleObject = {};
    for (let prop in object ){
        if (!object.hasOwnProperty(prop)){
            continue;
        }
        if (typeof(object[prop]) == 'object'){
            continue;
        }
        if (typeof(object[prop]) == 'function'){
            continue;
        }
        simpleObject[prop] = object[prop];
    }
    return JSON.stringify(simpleObject);  // returns cleaned up JSON
};


//Returns the position a new number would have if inserted (keeping the array sorted)
const bisect = (list, num) => {
	
	//empty array
	if (!list.length){ 
		return 0;
	}
	
	//only one item...just need to compare it to the new item
	if (list.length == 1){
		return num > list[0] ? 1 : 0;
	}
	
	//set the boundary markers, working inwards from front and back
	let leftBound = 0;
	let rightBound = list.length - 1;
	
	return bisect(leftBound, rightBound);  //enter recursion and return with final settled index position 

	//depends on closure over leftBound and rightBound to work correctly
	function bisect(left, right){
		
		//item is greater than current highest...position is at the beginning
		if (list[left] > num){
			return 0;
		}

		//item is lesser than current lowest...position is at the end
		if (list[right] < num){
			return list.length;
		}

		//right and left bounds are now neighbors
		if (right - left == 1){
			//new num belongs in between left and right
			if (list[left] < num && list[right] >= num){
				return left + 1;
			}
			//if its a dupe, new one goes in front
			if (list[left] == num){
				return left;
			}
		}
		
		//identify new middle for next round of recursing
		let mid = left + (Math.floor((right - left) / 2));
		let midVal = list[mid];

		//check which side to recurse on
		if (num <= midVal){
			rightBound = mid;
		} else if (num > midVal){
			leftBound = mid;
		}
		
		return bisect(leftBound, rightBound);   //recurse with updated boundaries
	}
  
}