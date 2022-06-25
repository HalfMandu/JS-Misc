/* 
	HashTable -- basic chaining example
	Stephen Rinkus
	
	HashTable implementation which uses an array to store key/val pairs
	Uses chaining to resolve collisions
	Hashing function is the sum of the ASCII codes of the chars of the key
	127 buckets
	
	methods
		_hash(key)
		set(key, value) 
		get(key)
		remove(key)
		display()
*/


class HashTable {
	
	//127 buckets
	constructor() {
		this.table = new Array(127);
		this.size = 0;
	}
  
	//Hashing function to derive index from a key
	_hash(key) {
		
		let hash = 0;
		
		//sum the ASCII code of the characters in the key
		for (let i = 0; i < key.length; i++) {
			hash += key.charCodeAt(i);
		}
		
		//to ensure that the hash value doesn't exceed the bucket size, need to use modulo
		return hash % this.table.length;

	}
	
	//Set a key/value pair in the HashTable
	set(key, value) {
	
		const index = this._hash(key);
		
		//ensuring something has been set with this derived hash index before (not necessarily input value)
		if (this.table[index]) {
		
			//step through the chain of pairs located at the index, looking for the target key/val
			for (let i = 0; i < this.table[index].length; i++) {
				if (this.table[index][i][0] === key) {
					this.table[index][i][1] = value;
					return;
				}
			}
			
			//hash index exists, but this key not in the chain...push the new key/value pair to this index
			this.table[index].push([key, value]);
			
		} 
		//derived index hasn't been used yet, intialize it with second dimension array...
		else {
			this.table[index] = [];
			this.table[index].push([key, value]);
		}
		this.size++;
	}

	
	//Get a value from the HashTable
	get(key) {
	
		const target = this._hash(key);
		
		//check the chain at the derived index and return the correct key/value pair if found
		if (this.table[target]) {
			for (let i = 0; i < this.table.length; i++) {
				if (this.table[target][i][0] === key) {
					return this.table[target][i][1];
				}
			}
		}
		
		return undefined;  //key not present
	}


	//Delete a key/value pair from the Hash Table
	remove(key) {
	
		const index = this._hash(key);
		
		//step through the second-level chain and remove the targeted key/value
		if (this.table[index] && this.table[index].length) {
			for (let i = 0; i < this.table.length; i++) {
				if (this.table[index][i][0] === key) {
					this.table[index].splice(i, 1);
					this.size--;
					return true;
				}
			}
		} else {
			return false;
		}
	}
	
	//display all key/value pairs stored in the HashTable
	display() {
		
		console.log("Hash Table: ");
		console.log("Size: " + this.size);
		console.log("------------------------------------------");
		
		this.table.forEach((values, index) => {
			const chainedValues = values.map(
				([key, value]) => `[ ${key}: ${value} ]`
			);
			console.log(`${index}: ${chainedValues}`);
		});
	
		console.log("------------------------------------------");
	
	}

}