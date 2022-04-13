
//Vertex = Node in the Graph
class Vertex {
	
	//each vertex holds that vertex’s value along with a list of it's adjacent vertices
	constructor(value) {
		this.value = value;
		this.neighbors = [];   // adjacency list
	}
	
	//append a vertex/node to end of adjacency list
	addNeighbor(vertex) {
		this.neighbors.push(vertex);  //push() natively returns the new length of array
	}
	
	//if it exists, delete it and return deleted vertex
	removeNeighbor(vertex) {
		if (this.neighbors.has(vertex)) {
			this.neighbors.splice(this.neighbors.indexOf(vertex), 1);  //remove it from the list
			return vertex;
		}
	}
	
	//return a list of all vertices that share and edge with this vertex
	getNeighbors() {
		return this.neighbors;
	}

	//boolean check if a vertex is in the neighbors list
	isNeighbor(vertex) {
		return this.neighbors.has(vertex);
	}

}

export { Vertex };
