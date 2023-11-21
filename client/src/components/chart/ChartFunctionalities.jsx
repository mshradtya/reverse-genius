import React, { useState, useContext, useEffect } from "react";
import {
  IconButton,
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  Tooltip,
  Flex,
} from "@chakra-ui/react";
import {
  AiOutlineZoomIn,
  AiOutlineZoomOut,
  AiOutlineClear,
} from "react-icons/ai";
import { BiSolidSend } from "react-icons/bi";
import { MdCenterFocusWeak } from "react-icons/md";
import { ImTree } from "react-icons/im";
import { BsSearch } from "react-icons/bs";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { AllContext } from "../../context/All";
import { FiRefreshCcw } from "react-icons/fi";
import { TbMessage2Plus } from "react-icons/tb";
import ChangeRequestInput from "./ChangeRequestInput";
import LanguagesMenu from "./LanguagesMenu";

const ChartFunctionalities = ({
  chart,
  toggleCompactView,
  isCompact,
  setIsCompact,
  handleNodeClick,
}) => {
  const {
    newNodes,
    highlightedNodes,
    setHighlightedNodes,
    setNewNodes,
    chartData,
  } = useContext(AllContext);
  const [isChatInputVisible, setChatInputVisible] = useState(false);
  const [nextNodeIdx, setNextNodeIdx] = useState(0);
  const [isDefaultView, setIsDefaultView] = useState(true);

  const toggleChatInput = () => {
    setChatInputVisible(!isChatInputVisible);
  };

  const container1Style = {
    position: "absolute",
    right: "20px",
    top: "50%",
    transform: "translateY(-50%)",
  };

  const container2Style = {
    position: "absolute",
    right: "20px",
    // top: "90%",
    bottom: "25px",
  };

  const container3Style = {
    position: "absolute",
    bottom: "85px",
    left: "50%",
    transform: "translateX(-50%)",
  };

  const container4Style = {
    position: "absolute",
    right: "20px",
    // top: "90%",
    top: "75px",
  };

  function centerNextNode() {
    const id = highlightedNodes[nextNodeIdx];
    if (chart) chart.setCentered(id).render();
  }

  useEffect(() => {
    centerNextNode();
  }, [nextNodeIdx]);

  // for switching between highlighted nodes with keyboard
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "ArrowLeft") {
        if (nextNodeIdx > 0) {
          setNextNodeIdx((prev) => prev - 1);
        } else {
          setNextNodeIdx(highlightedNodes.length - 1);
        }
      } else if (event.key === "ArrowRight") {
        if (highlightedNodes.length - nextNodeIdx >= 2) {
          setNextNodeIdx((prev) => prev + 1);
        } else {
          setNextNodeIdx(0);
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [nextNodeIdx, highlightedNodes.length]);

  // for zoom in and out with keyboard
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "+" || event.key === "Add") {
        chart.zoomIn();
      } else if (event.key === "-" || event.key === "Subtract") {
        chart.zoomOut();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [chart]);

  function filterChart(e) {
    const value = e.srcElement.value;

    const data = chart.data();

    data.forEach((d) => {
      d._expanded = false;
      d._searchResult = false;
    });

    data.forEach((d) => {
      if (value != "" && d.name.toLowerCase().includes(value.toLowerCase())) {
        d._searchResult = true;
        d._expanded = true;
      }
    });

    chart.data(data).render().fit();
  }

  const handleRemoveNewNodes = () => {
    newNodes.forEach((node) => chart.removeNode(node.id).render());
    setNewNodes([]);
    chart.data(chartData[0].data).render();
  };

  return (
    <>
      <div style={container1Style}>
        <Stack direction={"column"} gap={3}>
          <Tooltip
            label="Toggle Compact View"
            aria-label="Clear Highlights"
            openDelay={500}
            placement="left"
          >
            <IconButton
              isRound={true}
              variant="outline"
              colorScheme="teal"
              aria-label="Send email"
              icon={<ImTree />}
              fontSize="20px"
              color={"brand.primary"}
              background={"white"}
              boxShadow={"0 0 5px rgba(0, 0, 128, 0.8)"}
              _hover={{ background: "brand.secondary", color: "white" }}
              onClick={() => {
                chart.compact(!isCompact).render();
                setIsCompact(!isCompact);
              }}
            />
          </Tooltip>

          <Tooltip
            label="Fit To Screen"
            aria-label="Clear Highlights"
            openDelay={500}
            placement="left"
          >
            <IconButton
              isRound={true}
              variant="outline"
              colorScheme="teal"
              aria-label="Send email"
              icon={<MdCenterFocusWeak />}
              fontSize="20px"
              color={"brand.primary"}
              background={"white"}
              boxShadow={"0 0 5px rgba(0, 0, 128, 0.8)"}
              _hover={{ background: "brand.secondary", color: "white" }}
              onClick={() => {
                chart.fit();
              }}
            />
          </Tooltip>

          <Tooltip
            label="Enter Change Request"
            aria-label="Enter Change Request"
            openDelay={500}
            placement="left"
          >
            <IconButton
              isDisabled={!isDefaultView}
              isRound={true}
              variant="outline"
              colorScheme="teal"
              aria-label="Send email"
              icon={<TbMessage2Plus />}
              fontSize="20px"
              color={"brand.primary"}
              background={"white"}
              boxShadow={"0 0 5px rgba(0, 0, 128, 0.8)"}
              _hover={{ background: "brand.secondary", color: "white" }}
              onClick={toggleChatInput}
            />
          </Tooltip>
        </Stack>
      </div>

      <div style={container2Style}>
        <Stack direction={"column"} gap={3}>
          <Tooltip
            label="Zoom In"
            aria-label="Zoom In"
            openDelay={500}
            placement="left"
          >
            <IconButton
              isRound={true}
              variant="outline"
              colorScheme="teal"
              aria-label="Send email"
              icon={<AiOutlineZoomIn />}
              fontSize="20px"
              color={"brand.primary"}
              background={"white"}
              boxShadow={"0 0 5px rgba(0, 0, 128, 0.8)"}
              _hover={{ background: "brand.secondary", color: "white" }}
              onClick={() => chart.zoomIn()}
            />
          </Tooltip>

          <Tooltip
            label="Zoom Out"
            aria-label="Zoom Out"
            openDelay={500}
            placement="left"
          >
            <IconButton
              isRound={true}
              variant="outline"
              colorScheme="teal"
              aria-label="Send email"
              icon={<AiOutlineZoomOut />}
              fontSize="20px"
              color={"brand.primary"}
              background={"white"}
              boxShadow={"0 0 5px rgba(0, 0, 128, 0.8)"}
              _hover={{ background: "brand.secondary", color: "white" }}
              onClick={() => chart.zoomOut()}
            />
          </Tooltip>
        </Stack>
      </div>

      {highlightedNodes.length > 0 && (
        <div style={container3Style}>
          <Stack direction={"row"} gap={3}>
            <Tooltip
              label="Previous Node"
              aria-label="Previous Node"
              openDelay={500}
              placement="left"
            >
              <IconButton
                isRound={true}
                variant="outline"
                colorScheme="teal"
                aria-label="Send email"
                icon={<AiOutlineArrowLeft />}
                fontSize="20px"
                background={"brand.primary"}
                color={"white"}
                boxShadow={"0 0 5px rgba(0, 0, 128, 0.8)"}
                _hover={{ background: "brand.secondary", color: "white" }}
                onClick={() => {
                  if (nextNodeIdx > 0) {
                    setNextNodeIdx((prev) => prev - 1);
                  } else {
                    setNextNodeIdx(highlightedNodes.length - 1);
                  }
                }}
              />
            </Tooltip>

            <Tooltip
              label="Next Node"
              aria-label="Next Node"
              openDelay={500}
              placement="right"
            >
              <IconButton
                isRound={true}
                variant="outline"
                colorScheme="teal"
                aria-label="Send email"
                icon={<AiOutlineArrowRight />}
                fontSize="20px"
                background={"brand.primary"}
                color={"white"}
                boxShadow={"0 0 5px rgba(0, 0, 128, 0.8)"}
                _hover={{ background: "brand.secondary", color: "white" }}
                onClick={() => {
                  if (highlightedNodes.length - nextNodeIdx >= 2) {
                    setNextNodeIdx((prev) => prev + 1);
                  } else {
                    setNextNodeIdx(0);
                  }
                }}
              />
            </Tooltip>
          </Stack>
        </div>
      )}

      <div style={container4Style}>
        <Stack direction={"column"} gap={3}>
          <Tooltip
            label="Refresh Chart"
            aria-label="refresh Chart"
            openDelay={500}
            placement="left"
          >
            <IconButton
              isRound={true}
              variant="outline"
              colorScheme="teal"
              aria-label="Send email"
              icon={<FiRefreshCcw />}
              fontSize="20px"
              color={"brand.primary"}
              background={"white"}
              boxShadow={"0 0 5px rgba(0, 0, 128, 0.8)"}
              _hover={{ background: "brand.secondary", color: "white" }}
              onClick={() => {
                chart.clearHighlighting();
                setHighlightedNodes([]);
                setIsDefaultView(true);
                // handleRemoveNewNodes();
              }}
            />
          </Tooltip>
        </Stack>
      </div>

      {/* search node */}
      <InputGroup
        w={"400px"}
        style={{
          position: "absolute",
          top: "10px",
          right: "70px",
        }}
      >
        <InputLeftElement pointerEvents="none">
          <BsSearch color="#304497" />
        </InputLeftElement>
        <Input
          type="tel"
          placeholder="Search Node"
          onInput={() => filterChart(event)}
          border={"1px solid #304497"}
          boxShadow={"0 0 5px rgba(0, 0, 128, 0.8)"}
          _focus={{
            boxShadow: "0 0 5px rgba(0, 0, 128, 0.8)",
            border: "2px solid #304497",
          }}
        />
      </InputGroup>

      <div style={{ position: "absolute", top: "10px", right: "480px" }}>
        <LanguagesMenu
          chart={chart}
          handleNodeClick={handleNodeClick}
          setIsDefaultView={setIsDefaultView}
          setChatInputVisible={setChatInputVisible}
        />
      </div>

      <ChangeRequestInput
        chart={chart}
        isChatInputVisible={isChatInputVisible}
      />
    </>
  );
};

export default ChartFunctionalities;
