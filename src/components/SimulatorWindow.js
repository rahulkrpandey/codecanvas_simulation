import React from "react";
import { Tree as Treee } from "react-d3-tree";
import { Box, Text } from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";

const SimulatorWindow = ({ root, scale, translate, depthFactor }) => {
  if (!root) {
    return (
      <Box
        width={"100%"}
        height={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box
          width={"sm"}
          height={"sm"}
          display={"flex"}
          alignItems={"flex-start"}
          justifyContent={"center"}
          border={"2px"}
          borderStyle={"dashed"}
          borderRadius={"5px"}
          flexDirection={"column"}
          paddingLeft={'20'}
        >
          {/* <SmallAddIcon boxSize={'10'} color={'gray.700'} />
          <Text
            as="i"
            fontSize={"2xl"}
            textTransform={"uppercase"}
            fontWeight={"100"}
          >
            simulation output
          </Text> */}
          <Text
            as="i"
            fontSize={"2xl"}
            textTransform={"uppercase"}
            fontWeight={"100"}
          >
            Steps
          </Text>
          <br />
          <Text
            as="i"
            fontSize={"2xl"}
            textTransform={"uppercase"}
            fontWeight={"100"}
          >
            1. Adjust Speed
          </Text>
          <Text
            as="i"
            fontSize={"2xl"}
            textTransform={"uppercase"}
            fontWeight={"100"}
          >
            2. Select Operation
          </Text>
          <Text
            as="i"
            fontSize={"2xl"}
            textTransform={"uppercase"}
            fontWeight={"100"}
          >
            3. Give Input
          </Text>
          <Text
            as="i"
            fontSize={"2xl"}
            textTransform={"uppercase"}
            fontWeight={"100"}
          >
            4. Simulate
          </Text>
          <Text
            as="i"
            fontSize={"2xl"}
            textTransform={"uppercase"}
            fontWeight={"100"}
          >
            5. Press Info For More Information
          </Text>
        </Box>
      </Box>
    );
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

export default SimulatorWindow;
