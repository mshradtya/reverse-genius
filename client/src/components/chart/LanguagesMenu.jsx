import React, { useState, useContext } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { BsDatabaseFill } from "react-icons/bs";
import { BiLogoJavascript, BiLogoPython } from "react-icons/bi";
import { FaCodeBranch } from "react-icons/fa";
import { AllContext } from "../../context/All";

const LanguagesMenu = ({
  chart,
  handleNodeClick,
  setIsDefaultView,
  setChatInputVisible,
}) => {
  const { chartData } = useContext(AllContext);
  const [menuIcon, setMenuIcon] = useState(<FaCodeBranch />);

  const iconMappings = {
    Default: <FaCodeBranch />,
    Javascript: <BiLogoJavascript />,
    Python: <BiLogoPython />,
    Database: <BsDatabaseFill />,
  };

  const handleMenuItemClick = (d) => {
    chart
      .data(d.data)
      .onNodeClick((d) => handleNodeClick(d))
      .expandAll()
      .render();

    setMenuIcon(iconMappings[d.id]);

    if (d.id !== "Default") {
      setChatInputVisible(false);
      setIsDefaultView(false);
    } else {
      setIsDefaultView(true);
    }
  };

  return (
    <Menu placement="bottom">
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={menuIcon}
        variant="outline"
        fontSize="20px"
        color={"brand.primary"}
        background={"white"}
        border={"1px solid #304497"}
        boxShadow={"0 0 5px rgba(0, 0, 128, 0.8)"}
        _hover={{ background: "brand.secondary", color: "white" }}
      />
      <MenuList>
        {chartData.map((d) => (
          <MenuItem
            key={d.id}
            color={"brand.primary"}
            fontSize={"17px"}
            icon={iconMappings[d.id]}
            onClick={() => handleMenuItemClick(d)}
          >
            {d.id}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LanguagesMenu;
