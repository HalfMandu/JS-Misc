/*
	swap(arr, i, j)
	isPrime(number, index, array)
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

//Boolean check if prime number in the array, or return undefined if none
const isPrime(number, index, array) {
	let start = 2;
	while (start <= Math.sqrt(number)) {
		if (number % start++ < 1) {
			return false;
		}
	}
	return number > 1;
}
//console.log([4, 6, 8, 12].find(isPrime)); // undefined, not found
//console.log([4, 5, 8, 12].find(isPrime)); // 5


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


