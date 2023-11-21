import React, { useContext, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  Text,
  Box,
} from "@chakra-ui/react";
import DiffCode from "../DiffCode";
import { AllContext } from "../../context/All";

function HNContentDrawer({
  HNDrawerContent,
  openDrawer,
  closeHNDrawer,
  isHNDrawerOpen,
}) {
  const { changingNode } = useContext(AllContext);

  return (
    <>
      <Box>
        <Drawer
          isOpen={isHNDrawerOpen}
          placement="right"
          onClose={closeHNDrawer}
          size={"xxl"}
        >
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Change Request Explanation</DrawerHeader>
            <DrawerBody textColor={"gray.700"} fontSize={14}>
              {/* {drawerContent.functionExplanation} */}
              <Text>{changingNode?.newCode?.functionExplanation}</Text>

              <DiffCode />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
}

export default HNContentDrawer;
