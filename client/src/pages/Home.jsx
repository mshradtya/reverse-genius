import React, { useState } from "react";
import UploadZip from "../components/UploadZip";
import ParticlesBg from "particles-bg";
import { Box } from "@chakra-ui/react";

const Home = () => {
  return (
    <Box h={"calc(100vh - 60px)"}>
      <UploadZip />
      <ParticlesBg
        type="cobweb"
        num={65}
        bg={{
          width: "100%",
          height: "100%",
          position: "absolute",
          "z-index": "-1",
          top: "0px",
          left: "0px",
          backgroundColor: "#f5f5fa",
        }}
      />
    </Box>
  );
};

export default Home;
