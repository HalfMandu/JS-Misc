/* 
* 	Binary Search Tree
*   Stephen Rinkus
*
*	Any node n1 in the tree has none, one, or both of (left, right) such that
*		-left is a node whose value is < the value of n1
*		-right is a node whose value is > the value of n1
*/

import { Queue } from "./Queue.js";
import { Stack } from "./Stack.js";

//Node instance
class Node{
	//every node knows its own value, an optional (lesser) left value, and an optional (greater) right value
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

//BST instance
class BinarySearchTree {
	
	//A new tree will have no nodes
	constructor(){
		this.root = null;
	}
	
	//Put a new value in its rightful place in the tree
	insert(value){
	
        let newNode = new Node(value);
		
		//if there is no root, set incoming node as root
        if (this.root === null){
            this.root = newNode;
            return;
        }
		
		//make a copy of the root to dig down from
        let currNode = this.root;
		
		//starting from root, start comparing to the new node
        while(currNode){
			
			//the new node already exists
            if (value === currNode.value){
				console.log("New node already exists");
				return undefined;
			}
			
			//if new node is less than this node in the tree, drill down to the left
            if (value < currNode.value){
				//if we've reachd the bottom of the tree, add the new node
                if (currNode.left === null){
                    currNode.left = newNode;
                    return;
                }
                currNode = currNode.left;
            } 
			
			//if new node is greater than this node in the tree, drill down to the right
			else {
                if (currNode.right === null){
                    currNode.right = newNode;
                    return;
                } 
                currNode = currNode.right;
            }
        }
    }
	
	//Return the node which holds this target search value, if such a node exists
	search(value) {
		
		//make sure tree's not empty
		if (!this.root){ 
			console.log("Empty tree...");
			return;
		}
		
		//begin search from the root
		let currNode = this.root;
		
		//keep drilling until target is found
		while (currNode){
			if (value === currNode.value){
				console.log("Target found.");
				return currNode;
			} else if (value < currNode.value){
				currNode = currNode.left;
			} else if (value > currNode.value){
				currNode = currNode.right;
			}
		}
		
	}
	
	//Keep drilling left until can't anymore, then start printing values
	inOrder(root) {
		
		//left, root, right
		if (root){
			this.inOrder(root.left);
			console.log(root.value);
			this.inOrder(root.right);
		}
	}
	
	//Print root, then start going left and printing as you go
	preOrder(root) {
		
		//root, left, right
		if (root){
			console.log(root.value);
			this.preOrder(root.left);
			this.preOrder(root.right);
		}
	}
	
	//Start at the bottom and print your way up to the top, finishing at the root
	postOrder(root) {
		
		//left, right, root
		if (root){
			this.postOrder(root.left);
			this.postOrder(root.right);
			console.log(root.value);
		}
	}
	
	//Invert tree
	invert(root) {
	
		//dig to the bottom leaves
		let currNode = root;
		if (currNode.left) {
			if (currNode.right) {
				this.invert(currNode.left);
				this.invert(currNode.right);
			}
		} 
	
		//swap left and right
		let temp = currNode.left;
		currNode.left = currNode.right;
		currNode.right = temp;
	}
	
	//Wrapper to remove a node from the tree
	remove(value){
		this.root = this.findAndDeleteNode(this.root, value);
	}
	
	//Search for the node (recursively) and delete it
	findAndDeleteNode(currNode, value){
		
		//make sure node exists
		if (!currNode) {
			return null;
		}
		
		//if found the node, delete it, otherwise keep recursing
		if (value === currNode.value) {
			currNode = this.deleteNode(currNode);
		} else if (value < currNode.value) {
			currNode.left = this.findAndDeleteNode(currNode.left, value);
		} else {
			currNode.right = this.findAndDeleteNode(currNode.right, value);
		}
		
		//return the updated root
		return currNode;
	}
	
	//Delete a node from the tree
	deleteNode(node){
	
		//node has no children
		if (node.left === null && node.right === null) {
            return null;
        }
		
		//if children exist, recurse and reset the node in the tree
		else if (node.left !== null && node.right !== null) {

			const bottomNode = this.getBottomRightLeaf(node.left);
            const bottomNodeValue = bottomNode.value;

            node = this.findAndDeleteNode(node, bottomNodeValue);
            node.value = bottomNodeValue;

            return node;
        } 
		
		//if just the left child exists, it will replace the removed node
		else if (node.left !== null) {
            return node.left;
        }

		//otherwise if just the right child exists, it will replace the removed node
        return node.right;
	}
	
	//BFS - breadth first search - start from the top (root) and print horizontal levels going downward
	bfs(){
		
		//FIFO to govern order of discovery
		let currNode = this.root;
		let queue = new Queue();
		queue.push(currNode);
		
		//don't finish a node until all of it's child have been queued up
		while (!queue.isEmpty()) {
			currNode = queue.dequeue();
			console.log(currNode.value);
			if (currNode.left) {
				queue.enqueue(currNode.left);
			}
			if (currNode.right) {
				queue.enqueue(currNode.right);
			}
		}
	}
	
	//DFS - depth first search 
	dfs() {
	
		let currNode = this.root;
		let stack = new Stack();
		stack.push(currNode);
		
		while (!stack.isEmpty()) {
			currNode = stack.pop();
			console.log(currNode.value);
			if (currNode.left) {
				stack.push(currNode.left);
			}
			if (currNode.right) {
				stack.push(currNode.right);
			}
		}
	}
	
	//DFS - recursive implementation
	dfsRecursive(node) {
				
		console.log(node.value);
		
		//explore children before finish exploring self
		if (node.left) {
			this.dfsRecursive(node.left);
		}
		if (node.right) {
			this.dfsRecursive(node.right);
		}
		
	}
		 
	//Helper to return the lowest right leaf from a given starting node
	getBottomRightLeaf(node) {
	
		//keep drilling to the right until can't anymore, then return what's found
        let currentNode = node;
        while (currentNode) {
            if (currentNode.right === null) {
                break;
            }
            currentNode = currentNode.right;
        }
        return currentNode;
    }
	
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//Driver

/*              (5)
 *            /    \
 *         (2)     (7)
 *        /  \     /  \
 *      (1) (3)  (6)  (8)       */ 
const bst = new BinarySearchTree();

//Populating Tree
bst.insert(5);
bst.insert(2);
bst.insert(3);
bst.insert(1);
bst.insert(7);
bst.insert(6);
bst.insert(8);

//Searching
let target = 5;
console.log("Searching for target: " + target);
console.log(bst.search(5));  //returns found node

//Traversing in-order
console.log("Traversing in-order...");  
bst.inOrder(bst.root);		//1, 2, 3, 5, 6, 7, 8

//Getting bottom right leaf
console.log("Successor right leaf: ");  
console.log(bst.getBottomRightLeaf(bst.root));  //8

//Traversing pre-order
console.log("Traversing pre-order...");  
bst.preOrder(bst.root);		//5, 2, 1, 3, 7, 6, 8

//Traversing post-order
console.log("Traversing post-order...");  
bst.postOrder(bst.root);	//1, 3, 2, 6, 8, 7, 5

//Breadth first search
console.log("Breadth first searching...");  
bst.bfs();		//5, 2, 7, 1, 3, 6, 8

//Depth first search
console.log("Depth first searching...");  
bst.dfs();		//5, 7, 8, 6, 2, 3, 1

//Depth first search - recursive
console.log("Depth first searching - recursive...");  
bst.dfsRecursive(bst.root); 	//5, 2, 1, 3, 7, 6, 8

//Removing node
console.log("Removing node...");  
bst.remove(2);
console.log("Tree after removal: ");  //8, 7, 6, 5, 3, 2, 1
bst.inOrder(bst.root);

//Inverting tree
console.log("Inverting tree...");  //8, 7, 6, 5, 3, 2, 1
bst.invert(bst.root);
console.log("Tree after inversion: ");  //8, 7, 6, 5, 3, 1
bst.inOrder(bst.root);









