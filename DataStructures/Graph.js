/* 
* 	Undirected Graph
*   Stephen Rinkus
* 
*	This Graph implementation uses just an Array of ints to store vertice lists (no extra class for Node)
*/

import { Queue } from "./Queue.js";

class Graph {
	
	//each graph instance has a mapping of vertices to their adjacents...(int key, [] neighbors)
	constructor(numVerts) {
		this.numVerts = numVerts;
		this.vertices = new Map();
	}

	//add a vertex to the graph
	addVertex(v) {
	
		//a brand new vertex doesn't yet have neighors...initialize the adjacent list with an empty array
		this.vertices.set(v, []);
	}

	//add a new edge to the graph
	addEdge(v, w) {
		
		//get the nieghbors list for vertex v and add the vertex w (edge between v and w)
		this.vertices.get(v).push(w);

		//undirected graph means also need to add an edge from w to v 
		this.vertices.get(w).push(v);
	}
	
	//delete a vertex from the graph
	removeVertex(v) {
	
	};
	
	
	//delete an edge from the graph
	removeEdge(v, w) {
	
	};
	
	//Prints all vertices and their adjacency lists
	printGraph() {
	
		//get all the vertices
		const keys = this.vertices.keys();

		//iterate over the vertices
		for (let vert of keys)	{
		
			//get the corresponding adjacency list for the vertex
			let neighbors = this.vertices.get(vert);
			let out = [];

			//iterate over the adjacency list and add to output string array
			for (let neighbor of neighbors){
				out = [...out, neighbor];
			}
			
			//print the vertex and its adjacency list
			console.log(vert + " : " + [...out]);
		}
	}
		
	//breadth first search
	bfs(start) {

		//track visibility boolean for each vertex
		const explored = {};
	 
		//FIFO queue to manage discovery order of BFS
		const exploreQueue = new Queue();
	 
		//mark the starting vertex as explored and add it to the queue
		explored[start] = true;
		exploreQueue.enqueue(start);
		console.log(start);
		
		//keep discovering vertices until queue is empty
		while (!exploreQueue.isEmpty()) {
			//loop through the lists and add a vertex to the queue if it is not explored yet
			for (let neighbor of this.vertices.get(exploreQueue.dequeue())){
				if (!explored[neighbor]){
					explored[neighbor] = true;
					exploreQueue.enqueue(neighbor);
					console.log(neighbor);  //found a new vertex
				}
			}
		}		
	};
	
	//similar to bfs but using a Stack
	dfs(start) { 
	
	}

}

////////////////////////////////////////////////////////////////////////////////////////////////
//Driver

const graph = new Graph();
const vertices = [ 'A', 'B', 'C', 'D', 'E', 'F' ];
//const vertices = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ];

//adding vertices
vertices.forEach(vert => graph.addVertex(vert));

//adding edges
graph.addEdge('A', 'B');
graph.addEdge('A', 'D');
graph.addEdge('A', 'E');
graph.addEdge('B', 'C');
graph.addEdge('D', 'E');
graph.addEdge('E', 'F');
graph.addEdge('E', 'C');
graph.addEdge('C', 'F');

graph.printGraph();

console.log("Starting BFS...");
graph.bfs('A');

////////////////////////////////////////////////////////////////////////////////////////////////

export { Graph };






