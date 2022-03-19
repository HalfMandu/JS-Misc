'use strict';

class Node {
  constructor(data) {
    this.data = data;
    this.left = undefined;
    this.right = undefined;
  }

  whoAmI() {
    return `Node ${this.value}`;
  }
}

class BST {
  constructor() {
    this.root = undefined;
  }

  // insert a Node
  insert(data) {
    var n = new Node(data);
    if (!this.root) {
      this.root = n;
      return
    }
    
    var curr = this.root;
    
    while (data !== curr.data) {
      if (data < curr.data) {
        if (!curr.left) {
          curr.left = n;
          break;
        }
        curr = curr.left;
      } else if (data > curr.data) {
        if (!curr.right) {
          curr.right = n;
          break;
        }
        curr = curr.right;
      }
    }
  }

  // search a Node
  search(data) {
    
    if (!this.root) return;

    var curr = this.root;
    if (!curr) return;

    while (curr) {
      if (data === curr.data) {
        return curr;
      } else if (data < curr.data) {
        curr = curr.left;
      } else if (data > curr.data) {
        curr = curr.right;
      }
    }
  }

  // Invert the tree
  invert(root) {
    var curr = root;

    if (curr.left) {
      if (curr.right) {
        this.invert(curr.left);
        this.invert(curr.right);
      }
    } 
    
    var temp = curr.left;
    curr.left = curr.right;
    curr.right = temp;
  }

  // In-order traversal print
  inOrder(root) {
    var curr = root;

    if (curr) {
      this.inOrder(curr.left);
      console.log(curr.data);
      this.inOrder(curr.right);
    }
  }

  // Post-order traversal print
  postOrder(root) {
    var curr = root;

    if (curr) {
      this.inOrder(curr.left);
      this.inOrder(curr.right);
      console.log(curr.data);
    }
  }

  // Pre-order traversal print
  preOrder(root) {
    var curr = root;
    if (curr) {
      console.log(curr.data);
      this.preOrder(curr.left);
      this.preOrder(curr.right);
    }
  }

}

// Let's test it out...
var bst = new BST();

/* 
 * Insert data to create such tree ->
 *
 *           (10)
 *           /  \
 *         (5)  (20)
 *         / \    \
 *       (3) (6)  (40)
 *
 */

for (var num of [10, 5, 3, 6, 20, 15, 40]) {
  bst.insert(num);
}

console.log(bst.search(5));

// Couple ways to traverse-print elements

bst.inOrder(bst.root);
bst.postOrder(bst.root);
bst.preOrder(bst.root);

// Let's invert it
var inverseBst = bst.invert(bst.root));
/* 
 * Invert tree to returns an inverted tree ->
 *
 *           (10)
 *           /  \
 *         (20) (5)
 *         /    / \
 *       (40)  (6) (3)  
 *
 */

// I'll leave you to check the new tree here