/* 
*	Multiply two integers using recursion -- O(logn)
*	Stephen Rinkus
*/

//Time Complexity: O(y) where y is the second argument
const multiply = (x, y) => {
	
	//y will be decrementing each time, until it reaches 0
	//0 multiplied with anything gives 0
	if (y == 0)
		return 0;   //base case, ends the loop

	//Add x to itself for as many loops as y remains above 0
	if (y > 0 )
		return (x + multiply(x, y-1));	//x input remains same, decrement y

	//case where y is negative 
	if(y < 0 )
		return -multiply(x, -y);	//flip it once to allow it to multiply, then flip it again on final delivery

}

let x = 5;
let y = 11;
let z = -11;

console.log("Multiplying " + x + " with " + y);;
console.log(multiply(x, y));
console.log("Multiplying " + x + " with " + z);;
console.log(multiply(x, z));

