
//Vertex = Node in the Graph
class Vertex {
	
	//each vertex holds that vertex’s value along with a list of it's adjacent vertices
	constructor(value) {
		this.value = value;
		this.neighbors = [];   // adjacency list, each element is a Vertex object 
	}
	
	//append a Vertex object to end of adjacency list
	addNeighbor(vertex) {
		this.neighbors.push(vertex);  //push() natively returns the new length of array
	}
	
	//if Vertex object exists as a neighbor, delete it and return it
	removeNeighbor(vertex) {
		if (this.neighbors.includes(vertex)) {
			this.neighbors.splice(this.neighbors.indexOf(vertex), 1);  //remove it from the list
			return vertex;
		}
	}
	
	//return a list of all vertices that share and edge with this vertex
	getNeighbors() {
		return this.neighbors;
	}

	//boolean check if a vertex int key has a Vertex in the neighbors list
	isNeighbor(vertex) {
		if ([...this.neighbors].some(neighbor => neighbor.value === vertex)){
			return true;
		} else {
			return false;
		}
	}

}

export { Vertex };
