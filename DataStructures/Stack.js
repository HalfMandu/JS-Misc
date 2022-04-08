/* 
*	Stack - Last In First Out - ES6
*/

//////////////////////////////////////////////////////////////////////////////////////////////////

class Stack extends Array {
    
	//treat the last position of an array as the front
	peek() {
        return this[this.length -1];
    }
	
	//easy to check if empty with Array's built in length function
    isEmpty() {
        return this.length === 0;
    }
	
	//Array.prototype.length
	size() {
		return this.length;
	}
	
	//push, pop already avaiable from Array.prototype
	pop = () => {     
		return this.items.pop();   
	} 
	
	//peek at the last item's value
	peek = () => {
		return this.items[this.items.length - 1];   
	}
	
	//set total length to 0 to remove everything
	clear = () => {
		this.items.length = 0;   
	}        
}

//////////////////////////////////////////////////////////////////////////////////////////////////

const stack = new Stack();
stack.push(1);
stack.push(2);
stack.pop();
stack.isEmpty();   //false

const stack1 = new Stack(5, 1, 22, 4, 8);


