
//Vertex = Node in the Graph
class Vertex {
	
	//each Node holds that vertex’s value and a list of its adjacent vertices
	constructor(value) {
		this.value = value;
		this.neighbors = []; // adjacency list
	}
	
	//append a vertex/node to end of adjacency list
	addNeighbor(vertex) {
		this.neighbors.push(vertex);  //push() natively returns the new length of array
	}
	
	//if it exists, delete it and return deleted node
	removeNeighbor(vertex) {
		if (this.neighbors.has(vertex)) {
			this.neighbors.splice(this.neighbors.indexOf(vertex), 1);  //remove it from the list
			return vertex;
		}
	}
	
	//return the adjacency list
	getNeighbors() {
		return this.neighbors;
	}

	//boolean check if a vertex is in the neighbors list
	isNeighbor(vertex) {
		return this.neighbors.has(vertex);
	}

}

export { Vertex };
