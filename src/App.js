import "./App.css";
import { useRef, useState } from "react";
import Tree from "./pages/Tree";
import Home from "./pages/Home";
import MinHeap from "./pages/MinHeap";
import { Box, VStack } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Mst from "./pages/Mst";

function App() {
  console.log(`windows width: ${window.innerWidth}`);
  const fraction = window.innerWidth / 1536;

  const dataStructures = ["home", "binary search tree", "min heap", "minimum spanning tree"];
  const [currentDataStructures, setCurrentDataStructures] = useState("home");
  const SPEED = {
    SLOW: 500,
    MEDIUM: 300,
    FAST: 100,
  };

  console.log(currentDataStructures);
  let currPage = <Home />;
  switch (currentDataStructures) {
    case dataStructures[1]:
      currPage = (
        <Tree
          scale={fraction}
          dataStructures={dataStructures}
          setCurrentDataStructures={setCurrentDataStructures}
          currentDataStructures={currentDataStructures}
          speeds={SPEED}
        />
      );
      break;
    case dataStructures[2]:
      currPage = (
        <MinHeap
          scale={fraction}
          dataStructures={dataStructures}
          setCurrentDataStructures={setCurrentDataStructures}
          currentDataStructures={currentDataStructures}
          speeds={SPEED}
        />
      );
      break;
    case dataStructures[3]:
      currPage = (
        <Mst
          dataStructures={dataStructures}
          setCurrentDataStructures={setCurrentDataStructures}
          currentDataStructures={currentDataStructures}
        />
      );
      break;
    default:
      currPage = (
        <Home
          dataStructures={dataStructures}
          setCurrentDataStructures={setCurrentDataStructures}
          currentDataStructures={currentDataStructures}
        />
      );
      break;
  }

  return (
    <VStack boxSizing="border-box" gap={"0"}>
      {/* <Navbar
        dataStructures={dataStructures}
        setCurrentDataStructures={setCurrentDataStructures}
        currentDataStructures={currentDataStructures}
      /> */}
      {currPage}
    </VStack>
  );
}

export default App;
