import React from "react";
import Node from "./Node";
import { Box, Container, Flex, ring } from "@chakra-ui/react";
import { useState } from "react";

const HEIGHT = 40;
const MAXW = 150;
const GAP = 16;
const HAS_PARENTS = 1;
const LEFT_CHILD = 0;
const RIGHT_CHILD = 1;
const HAS_CHILD = 1;
const SHOW_UPPER_ARROW = 1;

const Graph = ({ root }) => {
  return (
    <Box padding={"100"} maxW={"max-content"}>
      {/* {root.val} */}
      {ResultantGraph(root)}
    </Box>
  );
};

const GraphElementWrapper = ({
  hasParent,
  whichChild,
  hasChild,
  leftChild,
  rightChild,
  showUpperArrow,
  value,
}) => {
    console.log(`showUpperArrow: ${showUpperArrow}`);
  return (
    <Box display={"flex"} flexDir={"column"} maxW={"max-content"}>
      {hasParent === 1 && (
        <Border showBorderTop={showUpperArrow} orientation={whichChild} />
      )}
      <Box
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"stretch"}
        maxW={"max-content"}
      >
        <GraphElement element={value} />
        {hasChild === 1 && <Pipe />}
        {hasChild === 1 && (
          <Box display={"flex"} gap={GAP}>
            {leftChild}
            {rightChild}
          </Box>
        )}
      </Box>
    </Box>
  );
};

const GraphElement = ({ element }) => {
  console.log(element);
  return (
    <Box
      w={MAXW}
      height={HEIGHT}
      bgColor="#38B2AC"
      color="white"
      borderRadius={"5"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      overflow={"hidden"}
    >
      {element}
    </Box>
  );
};

const Border = ({ orientation, showBorderTop }) => {
  const width = `calc(50% + ${GAP / 2}px)`;
  console.log(
    `border top: ${showBorderTop} ${showBorderTop === SHOW_UPPER_ARROW}`
  );
  return (
    <Box
      height={HEIGHT}
      w={width}
      border={"2px solid"}
      borderBottom={"0"}
      borderTop={showBorderTop === SHOW_UPPER_ARROW ? "2" : "0"}
      borderRight={orientation === LEFT_CHILD && "0"}
      borderLeft={orientation !== LEFT_CHILD && "0"}
      alignSelf={orientation === LEFT_CHILD ? "flex-end" : "flex-start"}
      transform={
        orientation === LEFT_CHILD
          ? `translateX(${GAP / 2}px)`
          : `translateX(-${GAP / 2}px)`
      }
    />
  );
};

const Pipe = () => {
  return <Box maxW={"0"} height={HEIGHT} border={"1px solid"} />;
};

const ResultantGraph = (root) => {
  if (!root) {
    return null;
  }

  const stack = [];
  const hashTable = new Map();
  let curr = root;
  while (curr || stack.length > 0) {
    if (curr) {
      stack.push(curr);
      curr = curr.left;
    } else {
      let temp = stack[stack.length - 1].right;
      if (temp) {
        curr = temp;
      } else {
        temp = stack[stack.length - 1];
        console.log(`data: ${temp.val}`);
        stack.pop();
        let left = temp.left ? hashTable.get(temp.left) : null;
        let right = temp.right ? hashTable.get(temp.right) : null;
        let obj = Util(temp, left, right);
        if (temp.pos !== 1) {
          left = obj;
          right = null;
        } else {
          right = obj;
          left = null;
        }
        hashTable.set(temp, obj);

        while (stack.length > 0 && stack[stack.length - 1].right === temp) {
          temp = stack[stack.length - 1];
          console.log(`data: ${temp.val}`);
          stack.pop();
          let left = temp.left ? hashTable.get(temp.left) : null;
          let right = temp.right ? hashTable.get(temp.right) : null;
          let obj = Util(temp, left, right);
          if (temp.pos !== 1) {
            left = obj;
            right = null;
          } else {
            right = obj;
            left = null;
          }
          hashTable.set(temp, obj);
        }
      }
    }
  }

  return hashTable.get(root);
};

const Util = (root, left, right) => {
  return (
    <GraphElementWrapper
      hasParent={(root.parent !== null) ? 1 : 0}
      whichChild={root.pos}
      hasChild={(!left && !right) ? 0 : 1}
      leftChild={left ? left : null}
      rightChild={right ? right : null}
      showUpperArrow={(root.parent && root.parent.left && root.parent.right) ? 1 : 0}
      value={root.val}
    />
  );
};

export default Graph;
