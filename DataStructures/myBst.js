/* 
* 	Binary Search Tree
*   Stephen Rinkus
*
*	Any node n1 in the tree has none, one, or both of (left, right) such that
*		-left is a node whose value is < the value of n1
*		-right is a node whose value is > the value of n1
*/

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
	
	//Delete a value
	remove(value){
		this.root = this.removeNode(this.root, value);
	}
	
	//Delete a node
	removeNode(node, key){
			
		if (node === null)
			return null;

		else if (key < node.value){
			node.left = this.removeNode(node.left, key);
			return node;
		}

		else if (key > node.value){
			node.right = this.removeNode(node.right, key);
			return node;
		}

		else {
		
			if (node.left === null && node.right === null){
				node = null;
				return node;
			}

			if (node.left === null){
				node = node.right;
				return node;
			}
			
			else if (node.right === null){
				node = node.left;
				return node;
			}

			let aux = this.findMinNode(node.right);
			node.value = aux.value;

			node.right = this.removeNode(node.right, aux.value);
			return node;
		}
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
console.log(bst.search(5));

//Traversing in-order
console.log("Traverse in-order...");  //1, 2, 3, 5, 6, 7, 8
bst.inOrder(bst.root);

//Traversing pre-order
console.log("Traverse pre-order...");  //5, 2, 1, 3, 7, 6, 8
bst.preOrder(bst.root);

//Traversing post-order
console.log("Traverse post-order...");  //1, 3, 2, 6, 8, 7, 5
bst.postOrder(bst.root);










