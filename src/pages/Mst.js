import React, { useEffect, useRef, useState } from "react";
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
import { select, line, path } from "d3";
import "./Mst.css";
import Navbar from "../components/Navbar";
import { COLORS } from "../Util/Utility";

const TapOnScreenText = ({ x, y }) => {
  const borderWidth = 500; // Border width and height
  const textContent = "Tap on Screen"; // Text content
  const fontSize = 36; // Font size
  const borderRadius = 5; // Border radius
  const borderColor = "black"; // Border color
  const dashArray = "5"; // Dashed style (5px dashes)

  return (
    <svg
      className="tap-on-screen"
      width={borderWidth}
      height={borderWidth}
      x={x / 2 - borderWidth / 2}
      y={y / 2 - borderWidth / 2}
    >
      {/* Background rectangle with border */}
      <rect
        x="0"
        y="0"
        width={borderWidth}
        height={borderWidth}
        rx={borderRadius}
        ry={borderRadius}
        fill="transparent"
        stroke={borderColor}
        strokeWidth={2}
        strokeDasharray={dashArray}
      />

      {/* Text */}
      <text
        x="50%"
        y="50%"
        fill="black"
        fontSize={fontSize}
        fontWeight={"100"}
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {textContent}
      </text>
    </svg>
  );
};

// based on kurshkal algorithm
const Info = ({ node, link }) => {
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
          Minimum Spanning Tree (Kruskal's Algorithm)
        </Text>
        <Text fontSize={"lg"}>
          A Minimum Spanning Tree (MST) is a fundamental concept in graph theory
          and network design. It represents a subset of edges in an undirected,
          connected graph that connects all vertices while minimizing the total
          edge weight. Kruskal's algorithm is one of the popular methods to find
          the Minimum Spanning Tree efficiently. Here's an overview:
        </Text>

        <br />

        <Text fontSize={"xl"} fontWeight={"500"} as={"i"}>
          Key Properties and Uses:
        </Text>
        <List spacing={3}>
          <ListItem fontSize={"lg"}>
            <ListIcon as={MinusIcon} />
            Kruskal's algorithm is greedy, as it always chooses the smallest
            available edge. This property ensures that it finds the MST with the
            minimum total edge weight.
          </ListItem>
          <ListItem fontSize={"lg"}>
            <ListIcon as={MinusIcon} />
            Minimum Spanning Trees have various practical applications, such as
            designing efficient network layouts (e.g., connecting cities with
            minimum road construction cost), ensuring efficient communication in
            computer networks, and optimizing circuit design in electronic
            engineering.
          </ListItem>
          <ListItem fontSize={"lg"}>
            <ListIcon as={MinusIcon} />
            Kruskal's algorithm is relatively straightforward to implement and
            is suitable for sparse graphs with a large number of edges.
          </ListItem>
        </List>

        <br />
        <Text fontSize={"xl"} fontWeight={"500"} as={"i"}>
          Interact With Project
        </Text>
        <Text fontSize={"lg"}>
          You can easily add nodes by tapping or right-clicking, and watch as
          the MST adapts in real-time. Removing nodes is just as simple with a
          click.
          <br />
          The weight of the nodes is defined as the Euclidean distance between
          the nodes of that edge.
        </Text>

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
            bgColor={node}
          />
          <Text
            fontWeight={"extrabold"}
            fontSize={"sm"}
            letterSpacing={"widest"}
            textTransform={"capitalize"}
          >
            color of node
          </Text>
        </HStack>

        <HStack gap={"5"} overflow={"clip"}>
          <Box
            h={"5"}
            minW={"5"}
            borderRadius={"50%"}
            border="2px"
            bgColor={link}
          />
          <Text
            fontWeight={"extrabold"}
            fontSize={"sm"}
            letterSpacing={"widest"}
            textTransform={"capitalize"}
          >
            color of link
          </Text>
        </HStack>
      </Box>
    </VStack>
  );
};

const Mst = ({
  dataStructures,
  currentDataStructures,
  setCurrentDataStructures,
}) => {
  const svgRef = useRef(null);
  const pathArrayRef = useRef([]);
  const [data, setData] = useState([]);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const union = (a, b) => {
    const A = find(a),
      B = find(b);
    if (A === B) {
      return 0;
    }
    if (A.rank >= B.rank) {
      B.par = A;
      if (A.rank === B.rank) {
        A.rank++;
      }
    } else {
      A.par = B;
    }

    return 1;
  };

  const find = (a) => {
    if (a.par === null) {
      return a;
    }

    return (a.par = find(a.par));
  };

  useEffect(() => {
    if (x === 0) {
      setX(svgRef.current.clientWidth);
      setY(svgRef.current.clientHeight);
    }
    const svg = select(svgRef.current);
    for (let i = data.length - 1; i >= 0; i--) {
      data[i].par = null;
      data[i].rank = 0;
    }

    console.log(data);
    console.log(pathArrayRef.current);
    let count = data.length - 1;
    const links = [];
    const len = pathArrayRef.current.length;
    for (let i = 0; i < len && count > 0; i++) {
      const a = pathArrayRef.current[i][0],
        b = pathArrayRef.current[i][1];
      if (union(a, b) === 1) {
        count--;
        links.push(pathArrayRef.current[i]);
      }
    }

    const myLine = line()
      .x((d) => d.x)
      .y((d) => d.y);

    const paths = svg
      .selectAll("path")
      .data(links)
      .join("path")
      .attr("d", (val) => myLine(val))
      .attr("fill", "none")
      .attr("stroke", COLORS.LEFT_LINK);

    const circles = svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", 10)
      .attr("cx", (val) => val.x)
      .attr("cy", (val) => val.y)
      .attr("stroke", "#000")
      .attr("fill", COLORS.DEFAULT);

    circles.on("click", (val, d) => {
      pathArrayRef.current = pathArrayRef.current.filter(
        (item) => val !== item[0] && val !== item[1]
      );
      setData((data) => [...data.filter((item) => item !== val)]);
    });

    circles.raise();
  }, [data]);

  const clickHandler = (e) => {
    console.log(e);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = parseInt(e.nativeEvent.clientX - rect.left),
      y = parseInt(e.nativeEvent.clientY - rect.top);
    console.log(e.nativeEvent.clientX, e.nativeEvent.clientY);
    console.log(x, y);
    const point = {
      x: x,
      y: y,
      par: null,
      rank: 0,
    };

    data.forEach((item) => {
      const arr = pathArrayRef.current;
      arr.push([point, item]);
    });

    pathArrayRef.current.sort((a, b) => {
      const dist1 =
        (a[0].x - a[1].x) * (a[0].x - a[1].x) +
        (a[0].y - a[1].y) * (a[0].y - a[1].y);
      const dist2 =
        (b[0].x - b[1].x) * (b[0].x - b[1].x) +
        (b[0].y - b[1].y) * (b[0].y - b[1].y);

      if (dist1 < dist2) {
        return -1;
      } else if (dist1 === dist2) {
        return 0;
      }

      return 1;
    });

    setData((data) => [...data, point]);
  };

  const clearSimulation = () => {
    pathArrayRef.current = [];
    setData([]);
  };

  return (
    <VStack height={"100vh"} width={"100%"}>
      <Navbar
        dataStructures={dataStructures}
        setCurrentDataStructures={setCurrentDataStructures}
        currentDataStructures={currentDataStructures}
        showInputSection={false}
        clearSimulation={clearSimulation}
        info={<Info node={COLORS.DEFAULT} link={COLORS.LEFT_LINK} />}
      />
      <Box h="93vh" w="100vw">
        <svg className="svg" ref={svgRef} onClick={clickHandler}>
          {data.length === 0 && <TapOnScreenText x={x} y={y} />}
        </svg>
      </Box>
    </VStack>
  );
};

export default Mst;
