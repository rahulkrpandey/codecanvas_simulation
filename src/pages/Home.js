import { Box, VStack, Text, List, ListItem, ListIcon } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import React from "react";
import Navbar from "../components/Navbar";

const Home = ({
  dataStructures,
  currentDataStructures,
  setCurrentDataStructures,
}) => {
  return (
    <VStack>
      <Navbar
        dataStructures={dataStructures}
        setCurrentDataStructures={setCurrentDataStructures}
        currentDataStructures={currentDataStructures}
        showInputSection={false}
      />
      <Box maxW={"70%"}>
        <Text as={"i"} fontWeight={"500"} fontSize={"2xl"}>
          About the Project
        </Text>
        <Text
          fontFamily={"'Roboto', sans-serif"}
          fontWeight={"400"}
          fontSize={"lg"}
        >
          Welcome to our exciting project{" "}
          <Text fontWeight={"500"} as={"i"}>
            CodeCanvas Simulation
          </Text>
          , an interactive exploration of fundamental data structures! Here, we
          invite you to dive into the fascinating world of binary search trees,
          min heaps, and minimum spanning trees. Our project is designed to
          provide you with a hands-on experience, allowing you to not only
          understand the structure and operations of these common data
          structures but also witness them in action.
        </Text>

        <br />

        <Text as={"i"} fontWeight={"500"} fontSize={"2xl"}>
          Why This Project?
        </Text>
        <Text fontSize={"lg"}>
          Understanding data structures is a crucial aspect of computer science
          and software development. They form the backbone of many algorithms
          and applications, and a solid grasp of how they work is essential for
          building efficient and elegant software solutions. However, learning
          about these structures can often be daunting and abstract. That's
          where our project comes in!
        </Text>

        <br />

        <Text as={"i"} fontWeight={"500"} fontSize={"2xl"}>
          Interactive Learning
        </Text>
        <Text fontSize={"lg"}>
          Our project isn't your typical dry academic exercise. We believe that
          learning should be engaging, interactive, and, most importantly, fun!
          With our project, you can interact with these data structures in
          real-time and see how common operations unfold step by step. It's like
          having a personal tour guide through the intricate world of binary
          search trees, min heaps, and minimum spanning trees.
        </Text>

        <br />

        <Text as={"i"} fontWeight={"500"} fontSize={"2xl"}>
          Key Features
        </Text>
        <List spacing={3}>
          <ListItem fontSize={"lg"}>
            <ListIcon as={CheckIcon} color="green.500" />
            Binary Search Tree: Explore the magic of binary search trees, where
            nodes are organized in a hierarchical structure. Witness the
            elegance of insertion, deletion, and traversal operations as they
            unfold before your eyes.
          </ListItem>
          <ListItem fontSize={"lg"}>
            <ListIcon as={CheckIcon} color="green.500" />
            Min Heap: Dive into the world of min heaps, a specialised tree-based
            structure with a unique ordering property. Observe how elements are
            organised, extracted, and inserted, all while maintaining the heap's
            integrity.
          </ListItem>
          <ListItem fontSize={"lg"}>
            <ListIcon as={CheckIcon} color="green.500" />
            Minimum Spanning Tree: Discover the concept of minimum spanning
            trees and their applications in various domains. Follow along as we
            construct spanning trees using Kruskal's algorithms, unlocking the
            secrets of efficient network design.
          </ListItem>
        </List>

        <br />

        <Text as={"i"} fontWeight={"500"} fontSize={"2xl"}>
          Learn, Explore, Enjoy
        </Text>
        <Text fontSize={"lg"}>
          Our project is more than just a learning resource; it's an opportunity
          to explore, experiment, and enjoy the journey of discovering data
          structures. Whether you're a student looking to solidify your
          understanding, a developer seeking practical insights, or simply a
          curious individual interested in the inner workings of algorithms,
          this project is for you. <br /> <br /> Join us on this captivating
          adventure through data structures, where every click and interaction
          brings you one step closer to mastering these foundational building
          blocks of computer science and programming. Don't just read about data
          structures; experience them firsthand with our interactive project!
        </Text>

        <br />
        <br />
      </Box>
    </VStack>
  );
};

export default Home;
