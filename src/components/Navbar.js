import {
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
  MenuDivider,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React from "react";

const NAVBAR_COLOR = "#34495e";
const NAVBAR_HOVER_TEXT_COLOR = "#E6FFFA";
const HEADING_COLOR = "#E6FFFA";
const COMPLEMENT_COLOR = "#F56565";

const Navbar = ({
  dataStructures,
  currentDataStructures,
  setCurrentDataStructures,
}) => {
  return (
    <HStack
      alignItems={"center"}
      alignSelf={"stretch"}
      justifyContent={"space-between"}
      boxSizing="border-box"
      bgColor={NAVBAR_COLOR}
      px={"2"}
      h={"7vh"}
      borderBottom={"2px"}
    >
      <Menu h="100%" alignSelf="stretch">
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          bgColor={"inherit"}
          color={"#fff"}
          _hover={{
            bgColor: COMPLEMENT_COLOR,
            color: NAVBAR_HOVER_TEXT_COLOR,
          }}
          _expanded={{
            bgColor: COMPLEMENT_COLOR,
          }}
          size={"sm"}
          height={"100%"}
        >
          Data Structures & Algorithms
        </MenuButton>
        <MenuList bgColor={NAVBAR_COLOR}>
          {dataStructures.map((ds) => (
            <MenuItem
              key={ds}
              textTransform={"capitalize"}
              onClick={(e) => {
                console.log(e.target.innerText);
                setCurrentDataStructures(e.target.innerText.toLowerCase());
              }}
              bgColor={"inherit"}
              color={"#fff"}
              fontWeight={"bold"}
              _hover={{
                bgColor: COMPLEMENT_COLOR,
              }}
            >
              {ds}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Text
        fontSize={"2xl"}
        onClick={(e) =>
          setCurrentDataStructures(e.target.innerText.toLowerCase())
        }
        _hover={{
          cursor: "pointer",
        }}
        fontFamily={"Playfair Display"}
        color={HEADING_COLOR}
        fontWeight={"bold"}
        letterSpacing={"wider"}
      >
        CodeCanvas Simulation
      </Text>
      <Button
        size={"sm"}
        onClick={(e) => setCurrentDataStructures(currentDataStructures)}
        bgColor={"inherit"}
        fontWeight={"bold"}
        color={HEADING_COLOR}
        letterSpacing={"wide"}
        _hover={{
          bgColor: COMPLEMENT_COLOR,
        }}
        h={"100%"}
        alignSelf={"stretch"}
      >
        Clear Simulation
      </Button>
    </HStack>
  );
};

export default Navbar;
