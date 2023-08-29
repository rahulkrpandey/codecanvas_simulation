import React, { useState, useRef, useEffect } from "react";
import { HStack, VStack, Box, Text } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import SimulatorWindow from "../components/SimulatorWindow";
import { TreeNode, COLORS } from "../Util/Utility";

const SPEED = 200;

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
      borderRadius={"md"}
      p={"2"}
      gap={"2"}
      alignItems={"flex-start"}
    >
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
    </VStack>
  );
};

const MinHeap = ({ scale }) => {
  const [spinning, setSpinning] = useState(false);
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

  useEffect(() => {
    const timeOut = setTimeout(
      () => {
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
      },
      SPEED ? SPEED : 200
    );

    return () => {
      clearTimeout(timeOut);
    };
  }, [root, setRoot, update]);

  return (
    <HStack h={"93vh"} boxSizing="border-box" gap={"0"}>
      <Sidebar
        algoName={"min heap"}
        operations={OPERATIONS}
        simulateFunction={simulateFunction}
        spinning={spinning}
        info={<Info path={COLORS.PATH} defaultNode={COLORS.DEFAULT} />}
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

export default MinHeap;
