/* 
	Kosaraju's Two-Pass Algorithm  - JS Iterative Implementation - O(m + n)
	Stephen Rinkus
		
		This is a two-run DFS algorithm which reveals the strongly connected components of a directed graph.
		The first DFS takes reversed graph, processes nodes downward from n and notes the finishing times.
		The second DFS reverses back the graph, replaces nodes with their finishing times, and tracks source vertices which dfs uses to discover SCC's.
		
		Iterative version 
		
		node --stack-size=32000 '.\kosaraju.js'
*/

const { Graph } = require('./Graph.js');
const { Stack } = require('./Stack');

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//Main

class Kosaraju_Iterative {

	constructor(graph) {
		this.scc_list = [];
		this.finishTimes = [];
		this.graph = graph;
	};
	
	//First DFS wrapper
	dfsFinishingTimes = () => {
	
		let explored = {}; 
		let finished = {};
		
		//try each point seperately, work downwards from nth element...
		for (let vert of [...this.graph.vertices.keys()].sort().reverse()){
			if (!explored[vert]){
				this.dfsFirst(vert, explored, finished);	
			}
		}
	
		console.log("FIRST DFS DONE");
		console.log("finishTimes: " + JSON.stringify(this.finishTimes));
	};
	
	//First iterative dig
	dfsFirst = (vert, explored, finished) => {
	
		const stack = new Stack();
		stack.push(vert);
		
		//take a vert, explore it, then add its neighbors to the stack
		while (!stack.isEmpty()) {
			let vert = stack.pop();
			if (!explored[vert]){
				explored[vert] = true;
				stack.push(vert);
				//console.log("dfsFirst exploring " + vert);
				for (let neighbor of this.graph.vertices.get(vert)){
					stack.push(neighbor);
				}
			} else {
				//if the vert has already been explored, and its neighbors added to stack, it's finished
				if (!finished[vert]) {
					this.finishTimes.push(vert);
					finished[vert] = true;
				}
			}
		} 
	};
	
	//Second DFS
	dfsSccLeaders = () => {
		
		let explored = {};   //reset explored map
		let finished = {};
		let leaders = {};
		let source = null;
		let sccSizes = {};
		
		//proccess nodes based on decreasing finishing times
		for (let vert of this.finishTimes.reverse()){
			if (!explored[vert]){
				
				//console.log("second DFS vert: " + vert);
				const stack = new Stack();
				stack.push(vert);
				source = vert;
				
				while (!stack.isEmpty()) {
					let nextVert = stack.pop();
					if (!explored[nextVert]){
						//console.log("exploring " + nextVert, source);
						explored[nextVert] = true;
						stack.push(nextVert);
						for (let neighbor of this.graph.vertices.get(nextVert)){
							stack.push(neighbor);
						}

					}
					//if already been explored and neighbors seen, make sure it's marked as finished
					else {
						if (!finished[nextVert]) {
							finished[nextVert] = true;
							//if this source doesn't have an entry yet, intialize it
							if (!leaders[source]){
								leaders[source] = [];
								sccSizes[source] = 0;  	//count the verts added to a leader
							} 
							leaders[source].push(nextVert); 
							sccSizes[source]++;
						}	
					} 
				}
			}
		}
		
		console.log("leaders: " + JSON.stringify(leaders));
		console.log("top sccSizes: " + Object.values(sccSizes).sort().slice(-5));
	};

}

//Take input edge list txt file and return a directed Graph
const getGraphFromFile = async (sccFile) => {

	const util = require('util');
	const fs = require('fs');
	const lines = (await util.promisify(fs.readFile)(sccFile)).toString().split('\r\n');
	const graph = new Graph("DIRECTED");
	
	//each line has two columns: vertex v1, and its outbound neighbor vertex v2
	lines.map(line => {

		if (!line) { return null; }
				
		let [v1, v2] = line.toString().split(' ');  
		
		//excluding self loops
		if (v1 != v2) {
			graph.addEdge(v1, v2);
		}

	});

	return graph;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//Driver

console.log("Starting iterative Kosaraju...");

//Fetch file
getGraphFromFile('./data/SCC_small.txt').then((graph) => {

	const kosaraju = new Kosaraju_Iterative(graph);
	
	console.log("Reversing graph... ");
	kosaraju.graph.reverse();
		
	console.log("DFS first pass... ");
	kosaraju.dfsFinishingTimes();
	
	console.log("Re-reversing graph... ");
	kosaraju.graph.reverse();
			
	console.log("DFS second pass... ");
	kosaraju.dfsSccLeaders();

});
