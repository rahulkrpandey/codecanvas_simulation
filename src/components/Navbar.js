import {
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
  Stack,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Spinner,
} from "@chakra-ui/react";
import { ChevronDownIcon, InfoIcon } from "@chakra-ui/icons";
import React from "react";
import { v4 as uuid } from "uuid";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

const NAVBAR_COLOR = "#34495e";
const NAVBAR_HOVER_TEXT_COLOR = "#E6FFFA";
const HEADING_COLOR = "#E6FFFA";
const COMPLEMENT_COLOR = "#F56565";
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

const VerticallyCenter = ({ input, setInput, toDisable }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      let toEnter = true;
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

          toEnter = false;
        }
      });

      if (!toEnter) {
        return;
      }

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
  console.log(toDisable);

  return (
    <>
      <Button
        onClick={onOpen}
        textTransform={"uppercase"}
        textAlign={"left"}
        justifyContent={"flex-start"}
        size={"sm"}
        color={"#fff"}
        isDisabled={toDisable}
        rightIcon={<ChevronDownIcon />}
        bgColor={"inherit"}
        _hover={{
          bgColor: COMPLEMENT_COLOR,
          color: NAVBAR_HOVER_TEXT_COLOR,
        }}
        _expanded={{
          bgColor: COMPLEMENT_COLOR,
        }}
        height={"100%"}
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

const Help = ({ toDisable, info }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        textTransform={"uppercase"}
        textAlign={"left"}
        justifyContent={"flex-start"}
        size={"sm"}
        color={"#fff"}
        isDisabled={toDisable}
        bgColor={"inherit"}
        _hover={{
          bgColor: COMPLEMENT_COLOR,
          color: NAVBAR_HOVER_TEXT_COLOR,
        }}
        _expanded={{
          bgColor: COMPLEMENT_COLOR,
        }}
        height={"100%"}
      >
        <InfoIcon boxSize={"5"} />
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent maxW={"55%"} bgColor={"#f0f0f0"}>
          <ModalHeader textTransform={"capitalize"}>
            about this page
          </ModalHeader>
          <ModalCloseButton fill={"#fff"} />
          <ModalBody>{info}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const Navbar = ({
  dataStructures,
  currentDataStructures,
  setCurrentDataStructures,
  algoName,
  operations,
  simulateFunction,
  spinning,
  info,
  showInputSection,
  speed,
  setSpeed,
  speeds,
  clearSimulation,
}) => {
  const [inputFromUser, setInputFromUser] = useState([]);
  const [operation, setOperation] = useState(
    operations ? Object.keys(operations)[0].toLocaleLowerCase() : "operations"
  );
  const [page, setPage] = useState(currentDataStructures);
  const Simulate = () => {
    let tempInput = [operation, ...inputFromUser];
    simulateFunction(tempInput);
  };

  return (
    <HStack
      bgColor={NAVBAR_COLOR}
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
    >
      <HStack
        alignItems={"center"}
        gap={"5"}
        boxSizing="border-box"
        px={"2"}
        h={"6vh"}
        borderBottom={"2px"}
      >
        <Text
          fontSize={"lg"}
          onClick={(e) => setCurrentDataStructures("home")}
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
            {page.toUpperCase()}
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
        {
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
              isDisabled={showInputSection === false}
            >
              SPEED
            </MenuButton>
            <MenuList bgColor={NAVBAR_COLOR}>
              {speeds &&
                Object.keys(speeds).map((sp) => (
                  <MenuItem
                    key={sp}
                    textTransform={"capitalize"}
                    onClick={(e) => {
                      console.log(speeds[sp]);
                      setSpeed(speeds[sp]);
                    }}
                    bgColor={"inherit"}
                    color={"#fff"}
                    fontWeight={"bold"}
                    _hover={{
                      bgColor: COMPLEMENT_COLOR,
                    }}
                  >
                    {sp}
                  </MenuItem>
                ))}
            </MenuList>
          </Menu>
        }
        // operation, input and simulate button
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
            isDisabled={showInputSection === false}
          >
            {operation.toUpperCase()}
          </MenuButton>
          <MenuList bgColor={COLORS.BACKGROUND}>
            {operations &&
              Object.keys(operations).map((operation) => (
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
        <VerticallyCenter
          input={inputFromUser}
          setInput={setInputFromUser}
          toDisable={showInputSection === false}
        />
        <Button
          onClick={Simulate}
          size="sm"
          bgColor={"#319795"}
          color="#fff"
          // _hover={{ bgColor: COLORS.BUTTON_BACKGROUND }}
          isDisabled={showInputSection === false || spinning}
          // onClick={(e) => setCurrentDataStructures(currentDataStructures)}
          fontWeight={"bold"}
          // color={HEADING_COLOR}
          letterSpacing={"wide"}
          _hover={{
            // color: COMPLEMENT_COLOR,
            color: "#000",
          }}
          h={"100%"}
          alignSelf={"stretch"}
        >
          {spinning ? <Spinner /> : <span>SIMULATE </span>}
        </Button>
        <Button
          size={"sm"}
          onClick={clearSimulation}
          bgColor={"inherit"}
          fontWeight={"bold"}
          color={HEADING_COLOR}
          letterSpacing={"wide"}
          _hover={{
            bgColor: COMPLEMENT_COLOR,
          }}
          h={"100%"}
          alignSelf={"stretch"}
          isDisabled={!clearSimulation}
        >
          Clear Simulation
        </Button>
        <Help info={info} toDisable={!clearSimulation} />
      </HStack>
    </HStack>
  );
};

export default Navbar;
