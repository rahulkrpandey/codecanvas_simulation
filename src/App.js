import "./App.css";
import { useRef, useState } from "react";
import Tree from "./pages/Tree";
import Home from "./pages/Home";
import MinHeap from "./pages/MinHeap";
import Trie from "./pages/Trie";
import { Box, VStack } from "@chakra-ui/react";
import Navbar from "./components/Navbar";

function App() {
  console.log(`windows width: ${window.innerWidth}`);
  const fraction = window.innerWidth / 1536;

  const dataStructures = ["binary search tree", "min heap", "trie"];
  const [currentDataStructures, setCurrentDataStructures] = useState("home");

  let currPage = <Home />;
  switch (currentDataStructures) {
    case dataStructures[0]:
      currPage = <Tree scale={fraction} />;
      break;
    case dataStructures[1]:
      currPage = <MinHeap scale={fraction} />;
      break;
    case dataStructures[2]:
      currPage = <Trie />;
      break;
    default:
      currPage = <Home />;
      break;
  }

  return (
    <VStack boxSizing="border-box" gap={"0"}>
      <Navbar
        dataStructures={dataStructures}
        setCurrentDataStructures={setCurrentDataStructures}
        currentDataStructures={currentDataStructures}
      />
      {currPage}
    </VStack>
  );
}

export default App;
