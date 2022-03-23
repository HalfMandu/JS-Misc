/* 
*	Multiply two integers using recursion -- O(logn)
*	Stephen Rinkus
*/

//Time Complexity: O(y) where y is the second argument
function multiply(x, y) {
	
	//y will be decrementing each time, until it reaches 0
	//0 multiplied with anything gives 0
	if (y == 0)
		return 0;   //base case, ends the loop

	//Add x to itself each time, for as many times as y remains above 0
	if (y > 0 )
		return (x + multiply(x, y-1));	//x input remains same, decrement y

	//case where y is negative 
	if(y < 0 )
		return -multiply(x, -y);	//flip it once to allow it to multiply, then flip it again on final delivery

}

console.log("Multiply Two Integers...");
console.log(multiply(5, 11));
console.log(multiply(5, -11));

