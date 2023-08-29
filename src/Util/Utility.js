export const COLORS = {
  NEW: "green",
  PATH: "yellow",
  DEFAULT: "#319795",
  EXIST: "purple",
  FOUND: "black",
  RIGHT_LINK: "#319795",
  LEFT_LINK: "#e53e3e",
};

export class TreeNode {
  constructor(name, id) {
    this.name = name;
    this.children = [];
    this.values = {
      isRoot: false,
      isNew: true,
      isCurr: false,
      isPath: false,
      parent: null,
      hasLeftChild: false,
      hasRightChild: false,
      id: id ? id : "defaultId",
      color: COLORS.NEW,
    };
  }

  static compare(a, b) {
    return parseInt(a) - parseInt(b);
  }

  static clearPath(root) {
    if (!root) {
      console.log("updating states");
      return;
    }

    root.values.isNew = false;
    root.values.isPath = false;
    root.values.color = COLORS.DEFAULT;

    if (root.values.hasLeftChild) {
      TreeNode.clearPath(root.children[0]);
    }

    if (root.values.hasRightChild) {
      TreeNode.clearPath(root.children[root.children.length - 1]);
    }
  }

  static inorderTraversal(arrRef, root) {
    if (!root) {
      return;
    }

    if (root.values.hasLeftChild) {
      TreeNode.inorderTraversal(arrRef, root.children[0]);
    }

    arrRef.current.push(root);

    if (root.values.hasRightChild) {
      TreeNode.inorderTraversal(
        arrRef,
        root.children[root.children.length - 1]
      );
    }
  }

  static preOrderTraversal(arrRef, root) {
    if (!root) {
      return;
    }

    arrRef.current.push(root);

    if (root.values.hasLeftChild) {
      TreeNode.preOrderTraversal(arrRef, root.children[0]);
    }

    if (root.values.hasRightChild) {
      TreeNode.preOrderTraversal(
        arrRef,
        root.children[root.children.length - 1]
      );
    }
  }

  static postOrderTraversal(arrRef, root) {
    if (!root) {
      return;
    }

    if (root.values.hasLeftChild) {
      TreeNode.postOrderTraversal(arrRef, root.children[0]);
    }

    if (root.values.hasRightChild) {
      TreeNode.postOrderTraversal(
        arrRef,
        root.children[root.children.length - 1]
      );
    }

    arrRef.current.push(root);
  }
}
