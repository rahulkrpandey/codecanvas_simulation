import {
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Stack,
  Input,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { v4 as uuid } from "uuid";
import { useDisclosure } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React from "react";
import { useState } from "react";

const COLORS = {
  BACKGROUND: "#34495e",
  BUTTON_BACKGROUND: "#F56565",
  MODEL_INPUT_BG: "#F56565",
  MODEL_BACKGROUND: "#97266D",
  SINGLE_ITEM_BG: "#285E61",
};

const ListElement = ({ text, array, setArray }) => {
  const ClickHandler = () => {
    console.log(`clicked text ${text.id}`);
    setArray(array.filter((arr) => arr.id !== text.id));
  };
  return (
    <Text
      fontSize={"sm"}
      px={"0.5"}
      py={"1"}
      boxSizing="border-box"
      bgColor={COLORS.SINGLE_ITEM_BG}
      onClick={ClickHandler}
      color={"#fff"}
      borderRadius={"sm"}
      textAlign={"center"}
      width={"20"}
      _hover={{
        cursor: "pointer",
      }}
    >
      {text.text}
    </Text>
  );
};

const VerticallyCenter = ({ input, setInput }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      const vals = e.target.value
        .split(" ")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
      vals.forEach((element) => {
        console.log(parseInt(element));
        if (element.length > 3 || isNaN(parseInt(element))) {
          alert(
            "Invalid input, either number is not integer or its length is greater than 3"
          );
          return;
        }
      });

      console.log(vals);
      const newVals = vals.map((item) => {
        return { id: uuid(), text: item };
      });

      if (newVals.length > 0) {
        setInput((input) => [...input, ...newVals]);
      }

      e.target.value = "";
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        textTransform={"uppercase"}
        textAlign={"left"}
        justifyContent={"flex-start"}
        size={"sm"}
        bgColor={COLORS.BUTTON_BACKGROUND}
        color={"#fff"}
        _hover={{
          bgColor: COLORS.BUTTON_BACKGROUND,
        }}
      >
        input
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent maxW={"55%"} bgColor={COLORS.BACKGROUND}>
          <ModalHeader color={"#fff"} textTransform={"capitalize"}>
            user input (space separated values)
          </ModalHeader>
          <ModalCloseButton fill={"#fff"} />
          <ModalBody>
            <Stack gap={"5"} mb={"10"}>
              <HStack>
                <Input
                  placeholder="input"
                  size="md"
                  onKeyDown={keyPressHandler}
                  color={"#fff"}
                  border={"2px"}
                  borderColor={"black"}
                />
                <Button
                  fontSize={"x-small"}
                  onClick={() => setInput([])}
                  color={"#fff"}
                  bgColor={COLORS.BUTTON_BACKGROUND}
                  _hover={{
                    bgColor: COLORS.BUTTON_BACKGROUND,
                    color: "#fff",
                  }}
                >
                  CLEAR INPUT
                </Button>
              </HStack>
              <HStack
                flexWrap={"wrap"}
                bgColor={COLORS.MODEL_INPUT_BG}
                px={"5"}
                py={"5"}
                maxH={"sm"}
                overflow={"scroll"}
                overflowX={"hidden"}
                alignItems={"flex-start"}
                justifyContent={"flex-start"}
                borderRadius={"md"}
              >
                {input.map((text) => (
                  <ListElement
                    key={text.id}
                    text={text}
                    array={input}
                    setArray={setInput}
                  />
                ))}
              </HStack>
            </Stack>
          </ModalBody>
          {/* <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

const Sidebar = ({
  algoName,
  operations,
  simulateFunction,
  spinning,
  info,
}) => {
  const [inputFromUser, setInputFromUser] = useState([]);
  const [operation, setOperation] = useState(operations.CONSTRUCT);
  const Simulate = () => {
    let tempInput = [operation, ...inputFromUser];
    simulateFunction(tempInput);
  };
  return (
    <VStack
      bgColor={COLORS.BACKGROUND}
      boxSizing="border-box"
      w={"15vw"}
      h={"100%"}
      gap={"5"}
      p={"5"}
      alignItems={"stretch"}
      borderRight={"2px"}
    >
      <Text
        fontSize={"xl"}
        textAlign={"center"}
        textTransform={"uppercase"}
        fontWeight={"bold"}
        fontFamily={"Playfair Display"}
        color={"#fff"}
      >
        {algoName}
      </Text>

      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          textAlign={"left"}
          size={"sm"}
          color={"#fff"}
          bgColor={COLORS.BUTTON_BACKGROUND}
          _hover={{
            bgColor: COLORS.BUTTON_BACKGROUND,
          }}
          _expanded={{
            bgColor: COLORS.BUTTON_BACKGROUND,
          }}
        >
          {operation.toUpperCase()}
        </MenuButton>
        <MenuList bgColor={COLORS.BACKGROUND}>
          {Object.keys(operations).map((operation) => (
            <MenuItem
              key={operation}
              textTransform={"uppercase"}
              onClick={(e) => {
                setOperation(e.target.textContent);
                console.log(e.target.textContent);
              }}
              bgColor={COLORS.BACKGROUND}
              _hover={{
                bgColor: COLORS.BUTTON_BACKGROUND,
              }}
              fontWeight={"bold"}
              color={"#fff"}
            >
              {operation.toLowerCase()}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <VerticallyCenter input={inputFromUser} setInput={setInputFromUser} />

      <Button
        onClick={Simulate}
        size="sm"
        bgColor={"#319795"}
        color="#fff"
        _hover={{ bgColor: COLORS.BUTTON_BACKGROUND }}
        isDisabled={spinning}
      >
        {spinning ? <Spinner /> : <span>SIMULATE </span>}
      </Button>

      {info}
    </VStack>
  );
};

export default Sidebar;
