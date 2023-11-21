import React from "react";
import { Box, Container, Text } from "@chakra-ui/react";

export default function SmallWithSocial() {
  const style = {
    position: "absolute",
    bottom: "0",
    left: "50%",
    transform: "translateX(-50%)",
  };

  return (
    <Box style={style}>
      <Text color={"brand.textSecondary"}>© 2023 Reverse Genius</Text>
    </Box>
  );
}
