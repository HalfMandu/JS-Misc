/* 
* 	Undirected Graph
*   Stephen Rinkus
* 
*	This Graph implementation uses just an Array of ints to store vertice lists (no extra class for Node)
*/

import { Queue } from "./Queue.js";
import { Stack } from "./Stack.js";

class Graph {
	
	//Each graph instance has a mapping of vertices to their adjacents...(int key, [] neighbors)
	constructor(numVerts) {
		this.numVerts = numVerts;
		this.vertices = new Map();
	};

	//Add a vertex to the graph...
	addVertex(v) {
		
		//no need to add if it already exists
		if (!this.vertices.has(v)){
			//a brand new vertex doesn't yet have neighors...initialize the adjacent list with an empty array
			this.vertices.set(v, []);		
		}
		
	};

	//Add a new edge to the graph
	addEdge(v, w) {
		
		//adds vertices if they don't exist
		this.addVertex(v);
		this.addVertex(w);
		
		//don't add if already exists...and if they don't already reference eachother, make them
		if (!(this.vertices.get(v)).includes(w)){
			this.vertices.get(v).push(w);
			this.vertices.get(w).push(v);
		}
		
	};
	
	//Delete a vertex from the graph
	removeVertex(v) {
		
		//only delete if it exists
		if (this.vertices.has(v)){
			
			//go through each of its neighbors' lists and remove their ref to it
			for (let neighbor of this.vertices.get(v)){
				this.vertices.get(neighbor).splice(this.vertices.get(neighbor).indexOf(v), 1); 
			}
			
			//finally, delete obsolete v
			this.vertices.delete(v);
		}
	};
	
	//Delete an edge from the graph
	removeEdge(v, w) {
		
		//remove v and w's refs to each other
		if (this.vertices.has(v)){
			
		}
		
	};
	
	//Prints all vertices and their adjacency lists
	printGraph() {
		
		//extract key/vals and display them
		for (let [vertex, neighbors] of this.vertices){
			console.log(vertex, neighbors);
		}
	
	};
		
	//Breadth first search - queue
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
					console.log(neighbor); 
				}
			}
		}		
	};
	
	//Depth first search - recursive
	dfs(start, explored) {
		
		explored[start] = true;
		console.log(start);
		
		for (let neighbor of this.vertices.get(start)){
			if (!explored[neighbor]){
				explored[neighbor] = true;
				this.dfs(neighbor, explored);
			}
		}		
	};
	
	//Depth first search - stack
	dfsStack(start) { 
		
		const explored = {};
		const exploreStack = new Stack();
		exploreStack.push(start);
		
		while (!exploreStack.isEmpty()) {
			
			let nextVert = exploreStack.pop();
			
			if (!explored[nextVert]){
				
				explored[nextVert] = true;
				console.log(nextVert);
				
				for (let neighbor of this.vertices.get(nextVert)){
					exploreStack.push(neighbor);
				}
				
			}
		}
	};

}

////////////////////////////////////////////////////////////////////////////////////////////////
//Driver

const graph = new Graph();
const vertices = [ 'A', 'B', 'C', 'D', 'E', 'F' ];
//const vertices = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ];

//initialize graph by adding edges
graph.addEdge('A', 'B');
graph.addEdge('A', 'D');
graph.addEdge('A', 'E');
graph.addEdge('B', 'C');
graph.addEdge('D', 'E');
graph.addEdge('E', 'F');
//graph.addEdge('E', 'C');
graph.addEdge('C', 'F');
graph.addEdge('F', 'G');
graph.addEdge('G', 'H');
graph.addEdge('Y', 'Z');  //m and p are seperated, unreachable...

graph.printGraph();

//console.log("Removing vertex...");
//graph.removeVertex('F');
//graph.printGraph();

console.log("BFS...");
graph.bfs('A');

console.log("DFS...");
graph.dfs('A', {});

console.log("DFS Stack...");
graph.dfsStack('A');

////////////////////////////////////////////////////////////////////////////////////////////////

export { Graph };






