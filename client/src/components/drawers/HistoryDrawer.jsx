import React, { useContext, useEffect, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  Box,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { MdHistory } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

import { AllContext } from "../../context/All";

function HistoryDrawer({ openDrawer, closeDrawer, isDrawerOpen }) {
  const [applications, setAllApplications] = useState([]);
  const navigate = useNavigate();

  const { setData, setCurrentApp, setHighlightedNodes } =
    useContext(AllContext);

  const getAllApplications = async () => {
    try {
      const response = await axios.get("/SendAllApplications");
      setAllApplications(response.data);
    } catch (error) {
      console.error("Upload failed: ", error);
    }
  };

  const handleClick = async (name) => {
    setCurrentApp(name);
    navigate("/chart");
    closeDrawer();
  };

  useEffect(() => {
    getAllApplications();
  }, []);

  return (
    <>
      <Box>
        <Drawer isOpen={isDrawerOpen} placement="right" onClose={closeDrawer}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Upload History</DrawerHeader>
            <DrawerBody>
              <List spacing={4}>
                {applications.map((app) => (
                  <div
                    onClick={() => handleClick(app.ApplicationName)}
                    key={app.ApplicationName}
                  >
                    {" "}
                    <ListItem
                      key={app.name}
                      as={Button}
                      w="100%"
                      style={{ borderBottom: "3px solid brand.primary" }}
                    >
                      <ListIcon
                        as={MdHistory}
                        boxSize={"20px"}
                        color="brand.primary"
                      />
                      {app.ApplicationName}
                    </ListItem>
                  </div>
                ))}
              </List>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
}

export default HistoryDrawer;
