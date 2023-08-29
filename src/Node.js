class Node {
    constructor(val) {
        this.val = val;
        this.pos = -1;
        this.left = null;
        this.right = null;
        this.parent = null;
    }

    static inorderTraversal(root) {
        if (!root) {
            return;
        }

        this.inorderTraversal(root.left);
        console.log(root.val);
        this.inorderTraversal(root.right);
    }
}

export default Node;