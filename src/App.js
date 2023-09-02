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

  const dataStructures = ["binary search tree", "min heap", "mst"];
  const [currentDataStructures, setCurrentDataStructures] = useState("home");

  console.log(currentDataStructures);
  let currPage = <Home />;
  switch (currentDataStructures) {
    case dataStructures[0]:
      currPage = <Tree scale={fraction} />;
      break;
    case dataStructures[1]:
      currPage = <MinHeap scale={fraction} />;
      break;
    case dataStructures[2]:
      currPage = <Mst />;
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
