import React, { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  Box,
} from "@chakra-ui/react";
import HighlightedCode from "../HighlightedCode";

function ContentDrawer({
  drawerContent,
  openDrawer,
  closeDrawer,
  isDrawerOpen,
}) {
  return (
    <>
      <Box>
        <Drawer
          isOpen={isDrawerOpen}
          placement="right"
          onClose={closeDrawer}
          size={"xl"}
        >
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader color={"brand.textPrimary"}>
              Code Explanation
            </DrawerHeader>
            <DrawerBody textColor={"gray.700"} fontSize={14}>
              {drawerContent.functionExplanation}
              <HighlightedCode drawerContent={drawerContent} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
}

export default ContentDrawer;
