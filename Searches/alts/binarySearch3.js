//one call to recursive method - input size n/2 
//remaining work outside recursion is constant 

function binarySearchIterative(a,n,data){
  
  var high = n
  var low = 0
  
  while(1){
  
    let mid = Math.abs((low + high)/2)
	
    if(a[mid] === data) 
		return mid
		
    if(data < a[mid]) 
		high = mid-1
		
    else 
		low = mid + 1
  }
  
  return -1;
}

function binarySearchRecursive(a, high, low, data){

  if(low > high) 
	return -1;
	
  var mid = Math.abs((low + high)/2);
  
  if(data === a[mid]) 
	return mid;
	
  if(data < a[mid]) 
	return binarySearchRecursive(a, mid - 1, low, data);
	
  else 
	return binarySearchRecursive(a, high, mid + 1, data);
	
}

let arr = [3, 4, 5, 6];
let data = 4;

console.log("Array: " +  arr);
console.log("Searching array for " + data);
console.log("binarySearchIterative: " + binarySearchIterative(arr, arr.length, data));
console.log("binarySearchRecursive: " + binarySearchRecursive(arr, 0, arr.length-1, data));

