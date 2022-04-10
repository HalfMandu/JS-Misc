/* 
*	Graph
*   Stephen Rinkus 
*
*	A Graph implementation which uses Node objects to represent vertices.
*	Queue and Stack are used for BFS/DFS.
*  	
*/

import { Vertex } from "./Vertex.js";
import { Queue } from "./Queue.js";
import { Stack } from "./Stack.js";

class Graph {
	
	//default to undirected graph
	constructor(edgeDir = Graph.UNDIRECTED) {
		this.vertices = new Map();
		this.edgeDir = edgeDir;
	}  
	
	//add to map edge: (vert1 -> vert2)
	addEdge(vert1, vert2) {
	
		const v1 = this.addVertex(vert1);   //add vert1 to map
		const v2 = this.addVertex(vert2);   //add vert2 to map

		v1.addNeighbor(v2);   //add a ref of v2 to v1

		if (this.edgeDir === Graph.UNDIRECTED) {
			v2.addNeighbor(v1);  //only a ref of v1 to v2 if graph is undirected
		}

		return [v1, v2];
	}
	
	//add a vertex node to the map and return it
	addVertex(vertexKey) {
		//if it already exists, just return its value
		if (this.vertices.has(vertexKey)) {
			return this.vertices.get(vertexKey);
		} else {
			const vertex = new Vertex(vertexKey);
			this.vertices.set(vertexKey, vertex);
			return vertex;
		}
	}
	
	//delete a vertex from the map
	//this method could be improved to just look in the affected keys, instead of all...
	removeVertex(vertexKey) {
		const vertex = this.vertices.get(vertexKey);
		if (vertex) {
			//look in all nodes' values for the vertex and remove it if found...
			for (const neighbor of this.vertices.values()) {
				neighbor.removeNeighbor(vertex);
			}
		}
		return this.vertices.delete(vertexKey);
	}
	
	//delete edge (vert1, vert2)
	removeEdge(vert1, vert2) {
	
		const v1 = this.vertices.get(vert1);
		const v2 = this.vertices.get(vert2);

		//if they exist, remove their refs to each other
		if (v1 && v2) {
		
			v1.removeNeighbor(v2);  //remove one neighbor (v2) from v1's list

			if (this.edgeDir === Graph.UNDIRECTED) {
				v2.removeNeighbor(v1);
			}
		}

		return [v1, v2];
	}
	
	//JavaScript generators, iterating one val at a time...good for large graphs 
	*bfs(first) {
	
		const explored = new Map();     //keeps track of which vertices have been visited
		const toExplore = new Queue();  //governs order of exploration for the remaining vertices

		toExplore.enqueue(first);       //begin the search with the root element of the graph
		
		//while there are still vertices to explore, keep recursing
		while (!toExplore.isEmpty()) {
			const nextVertex = toExplore.dequeue();
			//if the vertex exists and the map hasn't seen it yet, explore it and recurse its neighbors
			if (nextVertex && !explored.has(nextVertex)) {
				yield nextVertex;
				explored.set(nextVertex);  //mark as visited
				nextVertex.getNeighbors().forEach(neighbor => toExplore.enqueue(neighbor));
			}
		}
	}
	
	//depth first 
	*dfs(first) {
	
		const explored = new Map();
		const toExplore = new Stack();

		toExplore.push(first);

		while (!toExplore.isEmpty()) {
			const nextVertex = toExplore.pop();
			if (nextVertex && !explored.has(nextVertex)) {
				yield nextVertex;
				explored.set(nextVertex);
				nextVertex.getNeighbors().forEach(neighbor => toExplore.push(neighbor));
			}
		}
	}
		
}

Graph.UNDIRECTED = Symbol('directed graph'); // two-ways edges
Graph.DIRECTED = Symbol('undirected graph'); // one-way edges

/////////////////////////////////////////////////////////////////////////////////////////////////////////

const graph = new Graph(Graph.UNDIRECTED);


const [bfsFirst] = graph.addEdge(1, 2);
graph.addEdge(1, 3);
graph.addEdge(1, 4);
graph.addEdge(5, 2);
graph.addEdge(6, 3);
graph.addEdge(7, 3);
graph.addEdge(8, 4);
graph.addEdge(9, 5);
graph.addEdge(10, 6);

console.log("Running BFS...");

let bfsFromFirst = graph.bfs(bfsFirst);

console.log("bfsFromFirst: ");

console.log(bfsFromFirst.next().value.value); // 1
console.log(bfsFromFirst.next().value.value); // 2
console.log(bfsFromFirst.next().value.value); // 3
console.log(bfsFromFirst.next().value.value); // 4
console.log(bfsFromFirst.next().value.value); // 5
console.log(bfsFromFirst.next().value.value); // 6
console.log(bfsFromFirst.next().value.value); // 7
console.log(bfsFromFirst.next().value.value); // 8
console.log(bfsFromFirst.next().value.value); // 9
console.log(bfsFromFirst.next().value.value); // 10
//console.log(bfsFromFirst.next().value.value); // error

/////////////////////////////////////////////

const graph2 = new Graph(Graph.UNDIRECTED);

console.log("Running DFS...");

const [dfsFirst] = graph2.addEdge(1, 2);
graph2.addEdge(1, 3);
graph2.addEdge(1, 4);
graph2.addEdge(5, 2);
graph2.addEdge(6, 3);
graph2.addEdge(7, 3);
graph2.addEdge(8, 4);
graph2.addEdge(9, 5);
graph2.addEdge(10, 6);

let dfsFromFirst = graph2.dfs(dfsFirst);
let exploredOrder = Array.from(dfsFromFirst);
const values = exploredOrder.map(vertex => vertex.value);
console.log(values);	// [1, 4, 8, 3, 7, 6, 10, 2, 5, 9]










