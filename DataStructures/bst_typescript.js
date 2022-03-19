/**
 *                  8  root = 10 | root = <- deleteNode(10) ->
 *               /     \
 *             6        25
 *           /   \    /    \
 *          4    8   15    30
 *           \    
 *            5   
 *     
 */


class TreeNode {
    public left: TreeNode = null;
    public right: TreeNode = null;

    constructor(
        public value: number
    ) { }
}



class BinarySearchTree {
    public root: TreeNode = null;

    public add(value: number): void {
        const node: TreeNode = new TreeNode(value);

        if (this.isEmpty()) {
            this.root = node;
        } else {
            let currentNode: TreeNode = this.root;

            while (currentNode) {
                if (value > currentNode.value) {
                    if (currentNode.right === null) {
                        currentNode.right = node;
                        return;
                    }

                    currentNode = currentNode.right;
                } else {
                    if (currentNode.left === null) {
                        currentNode.left = node;
                        return;
                    }

                    currentNode = currentNode.left;
                }
            }
        }
    }

    public search(value: number): number {
        let currentNode: TreeNode = this.root;

        while (currentNode) {
            if (value === currentNode.value) {
                return value;
            } else if (value > currentNode.value) {
                currentNode = currentNode.right;
            } else {
                currentNode = currentNode.left;
            }
        }

        return null;
    }

    public delete(value: number): void {
        this.root = this.deleteRecursively(this.root, value);
    }

    private deleteRecursively(root: TreeNode, value: number): TreeNode {
        if (root === null) {
            return null;
        }

        if (root.value === value) {
            // eliminamos
            root = this.deleteNode(root); // -> devuelve la misma estructura con el nodo eliminado
        } else if (value < root.value) {
            // nos movemos a la izquierda
            root.left = this.deleteRecursively(root.left, value);
        } else {
            // derecha
            root.right = this.deleteRecursively(root.right, value);
        }

        return root;
    }

    private deleteNode(root: TreeNode): TreeNode {
        if (root.left === null && root.right === null) {
            // es hoja
            return null;
        } else if (root.left !== null && root.right !== null) {
            // tiene dos hijos
            const successorNode = this.getSuccessor(root.left);
            const successorValue = successorNode.value;

            root = this.deleteRecursively(root, successorValue);
            root.value = successorValue;

            return root;
        } else if (root.left !== null) {
            // tiene izquierdo
            return root.left;
        }

        // derecho
        return root.right;
    }

    private getSuccessor(node: TreeNode): TreeNode {
        let currentNode: TreeNode = node;

        while (currentNode) {
            if (currentNode.right === null) {
                break;
            }

            currentNode = currentNode.right;
        }

        return currentNode;
    }

    public isEmpty(): boolean {
        return this.root === null;
    }
}


const bst = new BinarySearchTree();

bst.add(20);
bst.add(25);
bst.add(15);
bst.add(18);
bst.add(14);

console.log('FIND 30:', bst.search(30));
console.log('FIND 18:', bst.search(18));
console.log('FIND 25:', bst.search(25));
console.log('FIND 15:', bst.search(15));
console.log('FIND 20:', bst.search(20));


console.log(bst.root);

bst.delete(18);

console.log(bst.root);

bst.delete(20);

console.log(bst.root);