import { Box, HStack, VStack, Text } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import { Tree as Treee } from "react-d3-tree";
import Sidebar from "../components/Sidebar";
import "./TreeUtil.css";

const DEPTH_FACTOR = 70;
const OPERATIONS = {
  CONSTRUCT: "construct",
  INSERT: "insert",
  SEARCH: "search",
  DELETE: "delete",
  PREORDER: "preorder",
  INORDER: "inorder",
  POSTORDER: "postorder",
};

const COLORS = {
  NEW: "green",
  PATH: "yellow",
  DEFAULT: "#319795",
  EXIST: "purple",
  FOUND: "black",
  RIGHT_LINK: "#319795",
  LEFT_LINK: "#e53e3e",
};

class TreeNode {
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

const Info = ({
  newNode,
  path,
  defaultNode,
  exist,
  found,
  leftChild,
  rightChild,
}) => {
  return (
    <VStack
      bgColor={"inherit"}
      border={"2px"}
      borderRadius={"md"}
      p={"2"}
      gap={"2"}
      alignItems={"flex-start"}
    >
      <HStack gap={"5"} justifyContent={"flex-start"}>
        <Box
          h={"5"}
          minW={"5"}
          borderRadius={"50%"}
          border="2px"
          bgColor={newNode}
        />
        <Text color="#fff" textTransform={"capitalize"}>
          newly created node
        </Text>
      </HStack>

      <HStack gap={"5"} overflow={"clip"}>
        <Box
          h={"5"}
          minW={"5"}
          borderRadius={"50%"}
          border="2px"
          bgColor={path}
        />
        <Text color="#fff" textTransform={"capitalize"}>
          nodes part of traversal or path
        </Text>
      </HStack>

      <HStack gap={"5"} overflow={"clip"}>
        <Box
          h={"5"}
          minW={"5"}
          borderRadius={"50%"}
          border="2px"
          bgColor={defaultNode}
        />
        <Text color="#fff" textTransform={"capitalize"}>
          default color of node
        </Text>
      </HStack>

      <HStack gap={"5"} overflow={"clip"}>
        <Box
          h={"5"}
          minW={"5"}
          borderRadius={"50%"}
          border="2px"
          bgColor={exist}
        />
        <Text color="#fff" textTransform={"capitalize"}>
          when node is inserted but it already exist
        </Text>
      </HStack>

      <HStack gap={"5"} overflow={"clip"}>
        <Box
          h={"5"}
          minW={"5"}
          borderRadius={"50%"}
          border="2px"
          bgColor={found}
        />
        <Text color="#fff" textTransform={"capitalize"}>
          node is found during search
        </Text>
      </HStack>

      <HStack gap={"5"} overflow={"clip"}>
        <Box h={"2"} minW={"6"} border="2px" bgColor={leftChild} />
        <Text color="#fff" textTransform={"capitalize"}>
          link to left child
        </Text>
      </HStack>

      <HStack gap={"5"} overflow={"clip"}>
        <Box h={"2"} minW={"6"} border="2px" bgColor={rightChild} />
        <Text color="#fff" textTransform={"capitalize"}>
          link to right child
        </Text>
      </HStack>
    </VStack>
  );
};

const SimulatorWindow = ({ root, scale, translate, depthFactor }) => {
  if (!root) {
    return;
  }

  console.log(translate);

  // Custom color for node
  const getCustumColor = (node) => {
    return node.values.color;
  };

  // Function to fill custom color to node
  const renderCustomNodeElement = ({ nodeDatum }) => {
    let _x = 0.5,
      _y = -0.1;
    if (nodeDatum.children.length === 0) {
      _x = -1;
      _y = 1.5;
    }

    return (
      <g>
        <circle r={10} fill={`${getCustumColor(nodeDatum)}`} />
        <text x={10} dx={`${_x}em`} dy={`${_y}em`}>
          {nodeDatum.name}
        </text>
      </g>
    );
  };

  // Function to add custum class to links for giving custom styling
  const getDynamicPathClass = (linkData, orientation) => {
    const { source, target } = linkData;
    const par = parseInt(source.data.name);
    const chi = parseInt(target.data.name);
    console.log(`par: ${par} and chi: ${chi}`);

    if (isNaN(par) || isNaN(chi)) {
      return "error-link-style";
    }

    if (chi >= par) {
      return "right-child-link";
    } else {
      return "left-child-link";
    }
  };

  return (
    <Box
      p="10"
      width={"100%"}
      height={"100%"}
      boxSizing="border-box"
      transform={`scale(${scale})`}
      overflow={"hidden"}
    >
      {/* <Box Width={width} margin={"auto"}> */}
      <Box height={"100%"}>
        <Treee
          data={root}
          orientation="vertical"
          translate={translate}
          renderCustomNodeElement={renderCustomNodeElement}
          pathClassFunc={getDynamicPathClass}
          zoomable={true}
          scaleExtent={{ min: 0.1, max: 2 }}
          nodeSize={{ x: 100, y: 100 }}
          svgClassName="show-content-inside-tree" // Added to enable overflow, so we can see tree
          depthFactor={depthFactor}
          draggable={true}
          separation={{
            siblings: 0.5,
            nonSiblings: 0.5,
          }}
        />
      </Box>
    </Box>
  );
};

const Tree = ({ scale, speed }) => {
  const [root, setRoot] = useState(null);
  const [spinning, setSpinning] = useState(false);
  let arr = useRef([]);
  const parentRef = useRef(null);
  let traversal = useRef(null);
  let currNode = useRef(null);
  const currIndex = useRef(0);

  const InsertInTree = (arr, currNode) => {
    const input = arr.current;
    if (input.length < 2) {
      return;
    }
    console.log("insert in tree util");
    const val = input[1].text;
    const id = input[1].id;

    if (!root) {
      setRoot(new TreeNode(val, id));
      arr.current = input.filter((item) => item.id !== id);
      setSpinning(false);
      return true;
    }

    if (!currNode.current) {
      currNode.current = root;
    }

    let curr = currNode.current;
    let cmp = TreeNode.compare(curr.name, val);
    if (cmp === 0) {
      arr.current = input.filter((item) => item.id !== id);
      curr.values.color = COLORS.EXIST;
      setSpinning(false);
      setRoot((root) => {
        return { ...root };
      });

      return;
    }

    if (!curr.values.isPath) {
      curr.values.isPath = true;
      curr.values.color = COLORS.PATH;
      setRoot((root) => {
        return { ...root };
      });
    }

    if (cmp > 0) {
      if (curr.values.hasLeftChild) {
        currNode.current = curr.children[0];
      } else {
        const node = new TreeNode(val, id);
        curr.values.hasLeftChild = true;
        curr.children.unshift(node);
        arr.current = input.filter((item) => item.id !== id);
        setSpinning(false);
      }
    } else {
      if (curr.values.hasRightChild) {
        currNode.current = curr.children[curr.children.length - 1];
      } else {
        const node = new TreeNode(val, id);
        curr.values.hasRightChild = true;
        curr.children.push(node);
        arr.current = input.filter((item) => item.id != id);
        setSpinning(false);
      }
    }

    setRoot((root) => {
      return { ...root };
    });
  };

  const SearchInTree = (arr, currNode) => {
    const input = arr.current;
    if (input.length < 2) {
      setSpinning(false);
      return;
    }

    console.log("search in tree util");
    if (!root) {
      setSpinning(false);
      return;
    }

    const val = input[1].text;
    const id = input[1].id;

    if (!root) {
      arr.current = input.filter((item) => item.id !== id);
      setSpinning(false);
      setRoot(new TreeNode(val, id));
      return true;
    }

    if (!currNode.current) {
      currNode.current = root;
    }

    let curr = currNode.current;
    let cmp = TreeNode.compare(curr.name, val);
    if (cmp === 0) {
      arr.current = input.filter((item) => item.id != id);
      curr.values.color = COLORS.FOUND;
      setRoot((root) => {
        return { ...root };
      });

      setSpinning(false);
      return;
    }

    if (!curr.values.isPath) {
      curr.values.isPath = true;
      curr.values.color = COLORS.PATH;
      setRoot((root) => {
        return { ...root };
      });
    }

    if (cmp > 0) {
      if (curr.values.hasLeftChild) {
        currNode.current = curr.children[0];
      } else {
        arr.current = input.filter((item) => item.id != id);
        setSpinning(false);
      }
    } else {
      if (curr.values.hasRightChild) {
        currNode.current = curr.children[curr.children.length - 1];
      } else {
        arr.current = input.filter((item) => item.id != id);
        setSpinning(false);
      }
    }

    setRoot((root) => {
      return { ...root };
    });
  };

  function findMin(node) {
    while (node.values.hasLeftChild) {
      node = node.children[0];
    }
    return node;
  }

  const deleteUtil = (root, key) => {
    if (root === null) {
      return null;
    }

    let cmp = TreeNode.compare(root.name, key);
    if (cmp > 0) {
      if (root.values.hasLeftChild) {
        root.children[0] = deleteUtil(root.children[0], key);
        if (!root.children[0]) {
          root.values.hasLeftChild = false;
          root.children.shift();
        }
      }

      return root;
    } else if (cmp < 0) {
      if (root.values.hasRightChild) {
        root.children[root.children.length - 1] = deleteUtil(
          root.children[root.children.length - 1],
          key
        );

        if (!root.children[root.children.length - 1]) {
          root.values.hasRightChild = false;
          root.children.pop();
        }
      }

      return root;
    } else {
      if (root.children.length == 0) {
        return null;
      } else if (root.children.length == 1) {
        return root.children[0];
      }

      // Case 2: Node has two children
      const successor = findMin(root.children[root.children.length - 1]);
      root.name = successor.name;
      root.children[root.children.length - 1] = deleteUtil(
        root.children[root.children.length - 1],
        successor.name
      );
      if (!root.children[root.children.length - 1]) {
        root.values.hasRightChild = false;
        root.children.pop();
      }
    }

    return root;
  };

  const DeleteInTree = (arr, root) => {
    console.log("i am here in delete");
    if (arr.current.length < 2) {
      return;
    }

    console.log(arr.current);
    let key = arr.current[1].text;
    let newRoot = deleteUtil(root, key);
    arr.current = [];
    if (newRoot) {
      setRoot({ ...newRoot });
    } else {
      setRoot(null);
    }
  };

  const constructUtil = (start, end, values) => {
    if (start > end) {
      return null;
    }

    let mid = parseInt(start + (end - start) / 2);

    console.log(`mid is ${mid}`);
    console.log(values);
    console.log(values[mid]);
    let val = values[mid].text;
    let id = values[mid].id;
    const node = new TreeNode(val, id);
    const left = constructUtil(start, mid - 1, values);
    const right = constructUtil(mid + 1, end, values);

    if (left) {
      node.children.push(left);
      node.values.hasLeftChild = true;
    }

    if (right) {
      node.children.push(right);
      node.values.hasRightChild = true;
    }

    return node;
  };

  const ConstructTree = (arr) => {
    const values = arr.current
      .slice(1)
      .sort((a, b) => parseInt(a.text) - parseInt(b.text))
      .filter((item, idx, arr) => {
        if (idx === 0 || arr[idx - 1].text !== item.text) {
          return true;
        }

        return false;
      });
    console.log("constructing");
    console.log(values);
    const newRoot = constructUtil(0, values.length - 1, values);
    arr.current = [];
    setRoot(newRoot);
    setSpinning(false);
  };

  const PrintTraversal = (traversal, currIndex, arr, order) => {
    if (!traversal.current) {
      traversal.current = [];
      currIndex.current = 0;
      switch (order) {
        case OPERATIONS.INORDER:
          TreeNode.inorderTraversal(traversal, root);
          break;

        case OPERATIONS.PREORDER:
          TreeNode.preOrderTraversal(traversal, root);
          break;

        case OPERATIONS.POSTORDER:
          TreeNode.postOrderTraversal(traversal, root);
          break;
        default:
          console.log("Traversal is not found");
          break;
      }
    }

    if (currIndex.current >= traversal.current.length) {
      arr.current = [];
      traversal.current = null;
      currIndex = null;
      setSpinning(false);
      return;
    }

    const _arr = traversal.current;
    const idx = currIndex.current;
    if (_arr[idx].values.isPath) {
      currIndex.current = idx + 1;
    } else {
      _arr[idx].values.isPath = true;
      _arr[idx].values.color = COLORS.PATH;
    }

    setRoot((root) => {
      return { ...root };
    });
  };

  const updateTree = (currNode) => {
    const input = arr.current;
    switch (input[0]) {
      case OPERATIONS.INSERT:
        if (input.length < 2) {
          setSpinning(false);
          break;
        }
        InsertInTree(arr, currNode);
        break;
      case OPERATIONS.SEARCH:
        if (input.length < 2) {
          setSpinning(false);
          break;
        }
        SearchInTree(arr, currNode);
        break;
      case OPERATIONS.DELETE:
        if (input.length < 2) {
          setSpinning(false);
          break;
        }

        if (input.length > 2) {
          SearchInTree(arr, currNode);
        } else {
          DeleteInTree(arr, root);
        }
        break;
      case OPERATIONS.CONSTRUCT:
        if (arr.length < 2) {
          setSpinning(false);
          break;
        }

        ConstructTree(arr);
        break;
      case OPERATIONS.INORDER:
        // traversal.current = [];
        // TreeNode.inorderTraversal(traversal, root);
        PrintTraversal(traversal, currIndex, arr, input[0]);
        break;
      case OPERATIONS.PREORDER:
        // traversal.current = [];
        // TreeNode.preOrderTraversal(traversal, root);
        PrintTraversal(traversal, currIndex, arr, input[0]);
        break;
      case OPERATIONS.POSTORDER:
        // traversal.current = [];
        // TreeNode.postOrderTraversal(traversal, root);
        PrintTraversal(traversal, currIndex, arr, input[0]);
        break;
      default:
        break;
    }
  };

  const adjustInput = (input) => {
    let adjustedInput = input;
    switch (input[0]) {
      case OPERATIONS.CONSTRUCT:
        if (input.length < 2) {
          return [];
        }
        break;
      case OPERATIONS.INSERT:
        if (input.length < 2) {
          return [];
        }
        adjustedInput = input.slice(0, 2);
        break;
      case OPERATIONS.SEARCH:
        if (input.length < 2) {
          return [];
        }
        adjustedInput = input.slice(0, 2);
        break;
      case OPERATIONS.DELETE:
        if (input.length < 2) {
          return [];
        }
        adjustedInput = input.slice(0, 2);
        adjustedInput.push({ ...adjustedInput[1] });
        adjustedInput[2].id = "";
        break;
      case OPERATIONS.INORDER:
        adjustedInput = input.slice(0, 1);
        break;
      case OPERATIONS.PREORDER:
        adjustedInput = input.slice(0, 1);
        break;
      case OPERATIONS.POSTORDER:
        adjustedInput = input.slice(0, 1);
        break;
      default:
        break;
    }
    return adjustedInput;
  };

  const simulateFunction = (inputFromUser) => {
    console.log(inputFromUser);
    const adjustedInput = adjustInput(inputFromUser);
    console.log(adjustedInput);
    setSpinning(true);
    if (adjustedInput.length === 0) {
      setSpinning(false);
      return;
    }

    arr.current = adjustedInput;
    currIndex.current = 0;
    if (!root) {
      updateTree(currNode);
    } else {
      TreeNode.clearPath(root);
      currNode.current = root;
      setRoot((root) => {
        if (!root) {
          return null;
        }

        return { ...root };
      });
    }
  };

  useEffect(() => {
    const timeOut = setTimeout(
      () => {
        console.log("inside useeffect");
        console.log(arr.current);
        if (arr.current.length >= 1) {
          updateTree(currNode);
        } else {
          setSpinning(false);
        }
      },
      speed ? speed : 200
    );

    return () => clearTimeout(timeOut);
  }, [root, setRoot, updateTree, setSpinning]);

  console.log("root: ");
  console.log(root);

  return (
    <HStack h={"93vh"} boxSizing="border-box" gap={"0"}>
      <Sidebar
        algoName={"Binary Search Tree"}
        operations={OPERATIONS}
        simulateFunction={simulateFunction}
        spinning={spinning}
        info={
          <Info
            newNode={COLORS.NEW}
            path={COLORS.PATH}
            defaultNode={COLORS.DEFAULT}
            exist={COLORS.EXIST}
            found={COLORS.FOUND}
            leftChild={COLORS.LEFT_LINK}
            rightChild={COLORS.RIGHT_LINK}
          />
        }
      />
      <VStack w={"85vw"} boxSizing="border-box" h={"100%"} ref={parentRef}>
        // Simulator window
        <SimulatorWindow
          root={root}
          depthFactor={DEPTH_FACTOR}
          scale={scale}
          translate={{
            x: parentRef.current?.clientWidth / 2,
            y: 25,
          }}
        />
      </VStack>
    </HStack>
  );
};

export default Tree;
