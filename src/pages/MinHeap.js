import React, { useState, useRef, useEffect } from "react";
import {
  HStack,
  VStack,
  Box,
  Text,
  ListItem,
  ListIcon,
  List,
} from "@chakra-ui/react";
import { MinusIcon } from "@chakra-ui/icons";
import Sidebar from "../components/Sidebar";
import SimulatorWindow from "../components/SimulatorWindow";
import { TreeNode, COLORS } from "../Util/Utility";
import Navbar from "../components/Navbar";

const SPEED = 500;

const OPERATIONS = {
  CONSTRUCT: "construct",
  PUSH: "push",
  POP: "pop",
};
const DEPTH_FACTOR = 70;

const Info = ({ path, defaultNode }) => {
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
          Min Heap
        </Text>
        <Text fontSize={"lg"}>
          A Min Heap is a specialized binary tree-based data structure that
          maintains a specific ordering property among its elements. In a Min
          Heap:
        </Text>
        <List spacing={3}>
          <ListItem fontSize={"lg"}>
            <ListIcon as={MinusIcon} />
            Each node has at most two child nodes: a left child and a right
            child.
          </ListItem>
          <ListItem fontSize={"lg"}>
            <ListIcon as={MinusIcon} />
            The value of each node is less than or equal to the values of its
            child nodes, ensuring that the minimum element is always at the
            root.
          </ListItem>
          <ListItem fontSize={"lg"}>
            <ListIcon as={MinusIcon} />
            This unique property makes Min Heaps especially useful for finding
            and managing the minimum element efficiently, among other
            applications.
          </ListItem>
        </List>

        <br />

        <Text fontSize={"xl"} fontWeight={"500"} as={"i"}>
          Operations on a Min Heap
        </Text>
        <List spacing={3}>
          <ListItem fontSize={"lg"}>
            <ListIcon as={MinusIcon} />
            Insertion or Push: Add a new element to the heap while maintaining
            the Min Heap property. It takes only one argument. If multiple
            arguments are present in the input window, then it considers only
            the first one.
          </ListItem>
          <ListItem fontSize={"lg"}>
            <ListIcon as={MinusIcon} />
            Extraction of Minimum or Pop: Retrieve and remove the minimum
            element from the heap, which is always the root. It does not take
            any argument.
          </ListItem>
          <ListItem fontSize={"lg"}>
            <ListIcon as={MinusIcon} />
            Peek at Minimum: Examine the minimum element without removing it
            from the heap. Heapify: Rearrange the elements in the heap to
            restore the Min Heap property if it's violated.
          </ListItem>
          <ListItem fontSize={"lg"}>
            <ListIcon as={MinusIcon} />
            Heapify: Rearrange the elements in the heap to restore the Min Heap
            property if it's violated.
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
      </Box>
    </VStack>
  );
};

const MinHeap = ({
  scale,
  dataStructures,
  currentDataStructures,
  setCurrentDataStructures,
  speeds,
}) => {
  const [spinning, setSpinning] = useState(false);
  const [speed, setSpeed] = useState(speeds.FAST);
  const parentRef = useRef(null);
  const [root, setRoot] = useState(null);

  const minHeapArray = useRef(["FILLER_ELEMENT"]);
  const ptr2 = useRef(null); // used during constuct operation
  const ptr1 = useRef(null); // used during any operation
  const input = useRef([]); // input from user

  const convertMinHeapArrayToTree = (minHeapArray) => {
    const arr = minHeapArray.current;
    const length = arr.length;
    for (let i = 1; i < length; i++) {
      const node = arr[i];

      // Resetting attributes
      node.children = [];
      node.values.hasLeftChild = false;
      node.values.hasRightChild = false;
      node.values.color = COLORS.DEFAULT;

      if (2 * i < length) {
        node.values.hasLeftChild = true;
        node.children.push(arr[2 * i]);
      }

      if (2 * i + 1 < length) {
        node.values.hasRightChild = true;
        node.children.push(arr[2 * i + 1]);
      }
    }
  };

  const construct = () => {
    if (ptr1.current === null) {
      ptr1.current = ptr2.current;
      minHeapArray.current[ptr1.current].values.color = COLORS.PATH;
    } else {
      let idx = ptr1.current;
      let left = 2 * idx,
        right = 2 * idx + 1;
      const arr = minHeapArray.current;
      const length = arr.length;
      let minIdx = idx;

      if (left < length) {
        let cmp = TreeNode.compare(arr[minIdx].name, arr[left].name);
        if (cmp > 0) {
          minIdx = left;
        }
      }

      if (right < length) {
        let cmp = TreeNode.compare(arr[minIdx].name, arr[right].name);
        if (cmp > 0) {
          minIdx = right;
        }
      }

      if (minIdx !== idx) {
        let name = arr[minIdx].name;
        arr[minIdx].name = arr[idx].name;
        arr[idx].name = name;

        console.log(idx);
        console.log(arr[idx].name);

        ptr1.current = minIdx;
        arr[idx].values.color = COLORS.DEFAULT;
        arr[minIdx].values.color = COLORS.PATH;
      } else {
        ptr2.current--;
        arr[ptr1.current].values.color = COLORS.DEFAULT;
        ptr1.current = null;
        if (ptr2.current === 0) {
          ptr2.current = null;
        }
      }
    }

    const node = new TreeNode(
      minHeapArray.current[1].name,
      minHeapArray.current[1].id
    );
    node.children = minHeapArray.current[1].children;
    node.values = minHeapArray.current[1].values;
    minHeapArray.current[1] = node;
    setRoot(node);
  };

  const push = () => {
    const idx = ptr1.current;
    const arr = minHeapArray.current;
    if (idx === 1) {
      ptr1.current = null;
      arr[1].values.color = COLORS.DEFAULT;
    } else {
      const parent = parseInt(idx / 2);
      console.log(idx);
      const cmp = TreeNode.compare(arr[idx].name, arr[parent].name);
      if (cmp < 0) {
        let name = arr[idx].name;
        arr[idx].name = arr[parent].name;
        arr[parent].name = name;

        arr[idx].values.color = COLORS.DEFAULT;
        arr[parent].values.color = COLORS.PATH;

        ptr1.current = parent;
      } else {
        ptr1.current = null;
        arr[idx].values.color = COLORS.DEFAULT;
      }
    }

    const node = new TreeNode(
      minHeapArray.current[1].name,
      minHeapArray.current[1].id
    );
    node.children = minHeapArray.current[1].children;
    node.values = minHeapArray.current[1].values;
    minHeapArray.current[1] = node;
    setRoot(node);
  };

  const pop = () => {
    const arr = minHeapArray.current;
    const idx = ptr1.current;
    const left = 2 * idx;
    const right = 2 * idx + 1;
    const length = arr.length;
    let minIdx = idx;

    if (left < length) {
      let cmp = TreeNode.compare(arr[minIdx].name, arr[left].name);
      if (cmp > 0) {
        minIdx = left;
      }
    }

    if (right < length) {
      let cmp = TreeNode.compare(arr[minIdx].name, arr[right].name);
      if (cmp > 0) {
        minIdx = right;
      }
    }

    if (minIdx !== idx) {
      const name = arr[minIdx].name;
      arr[minIdx].name = arr[idx].name;
      arr[idx].name = name;

      arr[idx].values.color = COLORS.DEFAULT;
      arr[minIdx].values.color = COLORS.PATH;

      ptr1.current = minIdx;
    } else {
      ptr1.current = null;
      arr[idx].values.color = COLORS.DEFAULT;
    }

    const node = new TreeNode(
      minHeapArray.current[1].name,
      minHeapArray.current[1].id
    );
    node.children = minHeapArray.current[1].children;
    node.values = minHeapArray.current[1].values;
    minHeapArray.current[1] = node;
    setRoot(node);
  };

  const update = () => {
    const arr = input.current;
    switch (arr[0]) {
      case OPERATIONS.CONSTRUCT:
        construct();
        break;
      case OPERATIONS.PUSH:
        push();
        break;
      case OPERATIONS.POP:
        pop();
        break;
      default:
        break;
    }
  };

  const adjustInput = (inputFromUser) => {
    let tempArray = inputFromUser;
    switch (inputFromUser[0]) {
      case OPERATIONS.PUSH:
        tempArray = inputFromUser.slice(0, 2);
        break;
      case OPERATIONS.POP:
        tempArray = inputFromUser.slice(0, 1);
        break;
      default:
        break;
    }

    return tempArray;
  };

  const simulateFunction = (inputFromUser) => {
    console.log("in priority queue");
    console.log(inputFromUser);

    input.current = adjustInput(inputFromUser);

    setSpinning(true);
    const tempArray = input.current;
    switch (tempArray[0]) {
      case OPERATIONS.CONSTRUCT:
        if (tempArray.length === 1) {
          input.current = [];
          setSpinning(false);
          return;
        }

        const temp = tempArray
          .slice(1)
          .map((item) => new TreeNode(item.text, item.id));
        input.current = tempArray.slice(0, 1);
        minHeapArray.current = ["FILLER_ELEMENT", ...temp];
        ptr2.current = parseInt((minHeapArray.current.length - 1) / 2);
        if (ptr2.current === 0) {
          ptr2.current = null;
        }
        console.log(minHeapArray.current);
        console.log(ptr2.current);
        convertMinHeapArrayToTree(minHeapArray);
        setRoot({ ...minHeapArray.current[1] });
        break;
      case OPERATIONS.PUSH:
        if (tempArray.length === 1) {
          input.current = [];
          setSpinning(false);
          return;
        }

        const node = new TreeNode(tempArray[1].text, tempArray[1].id);
        node.values.color = COLORS.PATH;
        minHeapArray.current.push(node);

        input.current = [tempArray[0]];
        ptr1.current = minHeapArray.current.length - 1;
        convertMinHeapArrayToTree(minHeapArray);
        setRoot({ ...minHeapArray.current[1] });
        break;
      case OPERATIONS.POP:
        minHeapArray.current[1] =
          minHeapArray.current[minHeapArray.current.length - 1];
        minHeapArray.current.pop();
        if (minHeapArray.current.length === 1) {
          setRoot(null);
          return;
        }

        convertMinHeapArrayToTree(minHeapArray);
        minHeapArray.current[1].values.color = COLORS.PATH;
        ptr1.current = 1;
        setRoot({ ...minHeapArray.current[1] });
        break;
      default:
        setSpinning(false);
        console.log("operation is undefined");
        break;
    }

    console.log(input.current);
  };

  const clearSimulation = () => {
    input.current = [];
    ptr1.current = ptr2.current = null;
    minHeapArray.current = ["FILLER_ELEMENT"];
    setSpinning(false);
    setRoot(null);
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      console.log("in use effect");
      console.log(input.current);
      console.log(ptr1.current);
      console.log(ptr2.current);
      if (
        input.current.length === 1 &&
        (ptr1.current !== null || ptr2.current !== null)
      ) {
        update();
      } else {
        setSpinning(false);
        input.current = [];
      }
    }, speed);

    return () => {
      clearTimeout(timeOut);
    };
  }, [root, setRoot, update]);

  return (
    <VStack w={"100vw"} boxSizing="border-box" h={"100vh"} ref={parentRef}>
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
        info={<Info defaultNode={COLORS.DEFAULT} path={COLORS.PATH} />}
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
  );
};

export default MinHeap;
