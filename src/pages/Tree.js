import {
  Box,
  HStack,
  VStack,
  Text,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import { MinusIcon } from "@chakra-ui/icons";
import React, { useState, useEffect, useRef } from "react";
import SimulatorWindow from "../components/SimulatorWindow";
import Navbar from "../components/Navbar";
import { TreeNode, COLORS } from "../Util/Utility";
import "./TreeUtil.css";

// length of link from one level to next
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
      mx={"2"}
      borderRadius={"md"}
      p={"4"}
      gap={"2"}
      alignItems={"flex-start"}
      maxH={"xl"}
      overflow={"scroll"}
      overflowX={"hidden"}
    >
      <Box>
        <Text fontSize={"xl"} fontWeight={"500"} as={"i"}>
          Binary Search Tree (BST)
        </Text>
        <Text fontSize={"lg"}>
          A Binary Search Tree is a hierarchical data structure that organizes
          elements in a way that facilitates efficient search, insertion, and
          deletion operations. In a BST:
        </Text>
        <List spacing={3}>
          <ListItem fontSize={"lg"}>
            <ListIcon as={MinusIcon} />
            Each node has at most two child nodes: a left child and a right
            child.
          </ListItem>
          <ListItem fontSize={"lg"}>
            <ListIcon as={MinusIcon} />
            Nodes to the left of a parent contain values less than the parent,
            while nodes to the right contain values greater than the parent.
          </ListItem>
          <ListItem fontSize={"lg"}>
            <ListIcon as={MinusIcon} />
            This ordering property allows for fast searching: left subtree for
            smaller values and right subtree for larger values
          </ListItem>
        </List>

        <br />

        <Text fontSize={"xl"} fontWeight={"500"} as={"i"}>
          Operations on a BST
        </Text>
        <List spacing={3}>
          <ListItem fontSize={"lg"}>
            <ListIcon as={MinusIcon} />
            <b>Construction:</b> Add a new node while maintaining the BST's
            ordering property. Accepts multiple arguments from input window.
          </ListItem>
          <ListItem fontSize={"lg"}>
            <ListIcon as={MinusIcon} />
            <b>Insertion:</b> Add a new node while maintaining the BST's
            ordering property. It takes only one argument. If multiple arguments
            are present in the input window, then it considers only the first
            one.
          </ListItem>
          <ListItem fontSize={"lg"}>
            <ListIcon as={MinusIcon} />
            <b>Search:</b> Find a specific element efficiently by traversing the
            tree. It takes only one argument. If multiple arguments are present
            in the input window, then it considers only the first one.
          </ListItem>
          <ListItem fontSize={"lg"}>
            <ListIcon as={MinusIcon} />
            <b>Deletion:</b> Remove a node while preserving the BST's structure
            and ordering. It takes only one argument. If multiple arguments are
            present in the input window, then it considers only the first one.
          </ListItem>
        </List>

        <br />

        <Text fontSize={"xl"} fontWeight={"500"} as={"i"}>
          Traversals on a BST
        </Text>
        <List spacing={3}>
          <ListItem fontSize={"lg"}>
            <ListIcon as={MinusIcon} />
            <b>Inorder:</b> Traverse the left subtree, visit the current node,
            then traverse the right subtree (produces elements in ascending
            order).
          </ListItem>
          <ListItem fontSize={"lg"}>
            <ListIcon as={MinusIcon} />
            <b>Preorder:</b> Visit the current node, traverse the left subtree,
            then traverse the right subtree.
          </ListItem>
          <ListItem fontSize={"lg"}>
            <ListIcon as={MinusIcon} />
            <b>Postorder:</b> Traverse the left subtree, traverse the right
            subtree, then visit the current node.
          </ListItem>
        </List>

        <br />

        <Text
          textTransform={"capitalize"}
          fontSize={"xl"}
          fontWeight={"500"}
          as="i"
        >
          about colors of nodes and links
        </Text>
        <HStack gap={"5"} justifyContent={"flex-start"}>
          <Box
            h={"5"}
            minW={"5"}
            borderRadius={"50%"}
            border="2px"
            bgColor={newNode}
          />
          <Text
            fontWeight={"extrabold"}
            fontSize={"sm"}
            letterSpacing={"widest"}
            textTransform={"capitalize"}
          >
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
          <Text
            fontWeight={"extrabold"}
            fontSize={"sm"}
            letterSpacing={"widest"}
            textTransform={"capitalize"}
          >
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
          <Text
            fontWeight={"extrabold"}
            fontSize={"sm"}
            letterSpacing={"widest"}
            textTransform={"capitalize"}
          >
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
          <Text
            fontWeight={"extrabold"}
            fontSize={"sm"}
            letterSpacing={"widest"}
            textTransform={"capitalize"}
          >
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
          <Text
            fontWeight={"extrabold"}
            fontSize={"sm"}
            letterSpacing={"widest"}
            textTransform={"capitalize"}
          >
            node is found during search
          </Text>
        </HStack>

        <HStack gap={"5"} overflow={"clip"}>
          <Box h={"2"} minW={"6"} border="2px" bgColor={leftChild} />
          <Text
            fontWeight={"extrabold"}
            fontSize={"sm"}
            letterSpacing={"widest"}
            textTransform={"capitalize"}
          >
            link to left child
          </Text>
        </HStack>

        <HStack gap={"5"} overflow={"clip"}>
          <Box h={"2"} minW={"6"} border="2px" bgColor={rightChild} />
          <Text
            fontWeight={"extrabold"}
            fontSize={"sm"}
            letterSpacing={"widest"}
            textTransform={"capitalize"}
          >
            link to right child
          </Text>
        </HStack>
      </Box>
    </VStack>
  );
};

const Tree = ({
  scale,
  speeds,
  dataStructures,
  currentDataStructures,
  setCurrentDataStructures,
}) => {
  const [root, setRoot] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [speed, setSpeed] = useState(speeds.FAST);
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

  const clearSimulation = () => {
    traversal.current = null;
    currNode.current = null;
    currIndex.current = 0;
    arr.current = [];
    setRoot(null);
    setSpinning(false);
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      console.log("inside useeffect");
      console.log(arr.current);
      if (arr.current.length >= 1) {
        updateTree(currNode);
      } else {
        setSpinning(false);
      }
    }, speed);

    return () => clearTimeout(timeOut);
  }, [root, setRoot, updateTree, setSpinning]);

  console.log("root: ");
  console.log(root);

  return (
    <HStack h={"100vh"} boxSizing="border-box" gap={"0"}>
      <VStack
        w={"100vw"}
        h="100vh"
        boxSizing="border-box"
        gap={"1"}
        ref={parentRef}
      >
        <Navbar
          dataStructures={dataStructures}
          setCurrentDataStructures={setCurrentDataStructures}
          currentDataStructures={currentDataStructures}
          showInputSection={true}
          operations={OPERATIONS}
          simulateFunction={simulateFunction}
          spinning={spinning}
          speed={speed}
          setSpeed={setSpeed}
          speeds={speeds}
          clearSimulation={clearSimulation}
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
