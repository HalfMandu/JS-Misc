function binarySearchIterative(a,n,data){
  var high = n
  var low = 0
  while(1){
    let mid = Math.abs((low + high)/2)
    if(a[mid] === data) return mid
    if(data < a[mid]) high = mid-1
    else low = mid + 1
  }
  return -1
}

function binarySearchRecursive(a, high, low, data){
  if(low > high) return -1
  var mid = Math.abs((low + high)/2)
  if(data === a[mid]) return mid
  if(data < a[mid]) return binarySearchRecursive(a, mid - 1, low, data)
  else return binarySearchRecursive(a, high, mid + 1, data)
}

	//one call to recursive method - input size n/2 
	//remaining work outside recursion is constant 