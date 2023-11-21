import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Heading,
  Text,
  Button,
  Input,
  Progress,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input as ChakraInput,
} from "@chakra-ui/react";
import axios from "../api/axios";

const UploadZip = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applicationName, setApplicationName] = useState("");

  const handleButtonClick = async () => {
    if (uploadSuccess) {
      navigate("/chart");
    } else if (isFileSelected) {
      await handleUpload();
    } else {
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleApplicationNameChange = (event) => {
    setApplicationName(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setSelectedFile(selectedFile);
      setIsFileSelected(true);
      console.log("Selected ZIP File:", selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.log("Please select a ZIP file.");
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("applicationName", applicationName);

    try {
      const response = await axios.post("/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });

      setIsLoading(false);
      setUploadSuccess(true);
      console.log("Upload complete. Response: ", response.data);
    } catch (error) {
      console.error("Upload failed: ", error);
      setIsLoading(false);
      setUploadSuccess(false);
    }
  };

  const handleViewTree = () => {
    navigate("/chart");
  };

  return (
    <Container pt={"50px"} maxW="750px" centerContent>
      <Heading as="h1" size="2xl" color={"brand.textPrimary"} mb={"10px"}>
        Reverse Genius
      </Heading>
      <Text
        fontSize="2xl"
        color={"brand.textSecondary"}
        mb={"20px"}
        textAlign={"center"}
      >
        Effortless Change Request Management
      </Text>
      <Button
        as="button"
        fontSize="4xl"
        p="40px"
        color={"white"}
        bg={"brand.primary"}
        mb={"10px"}
        _hover={{
          bg: "brand.secondary",
        }}
        onClick={uploadSuccess ? handleViewTree : handleButtonClick}
        isLoading={isLoading}
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.2}"
      >
        {uploadSuccess ? "View Tree" : isFileSelected ? "Upload" : "Begin"}
      </Button>

      <Input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".zip"
        onChange={handleFileChange}
      />
      {applicationName && (
        <Text fontSize="xl" color={"brand.textSecondary"} textAlign={"center"}>
          Application Name: {applicationName}
        </Text>
      )}
      {selectedFile && (
        <Text fontSize="xl" color={"brand.textSecondary"} textAlign={"center"}>
          Selected file: {selectedFile.name}
        </Text>
      )}
      {isLoading && (
        <Progress
          value={uploadProgress}
          style={{ width: "100%" }}
          size="sm"
          colorScheme="green"
          isAnimated
          mt={"10px"}
        />
      )}
      {uploadSuccess && (
        <Alert status="success">
          <AlertIcon />
          <AlertTitle>Upload Successful!</AlertTitle>
          <AlertDescription>
            Your file has been uploaded successfully.
          </AlertDescription>
        </Alert>
      )}

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Configuration</ModalHeader>
          <ModalBody>
            <ChakraInput
              placeholder="Application Name"
              value={applicationName}
              onChange={handleApplicationNameChange}
              mb={"20px"}
            />
            <Input
              type="file"
              ref={fileInputRef}
              accept=".zip"
              onChange={handleFileChange}
              mb={"20px"}
            />
            <Text fontSize={"sm"} textAlign={"center"}>
              Max size 10 mb
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              // colorScheme="blue"
              onClick={handleModalClose}
              mr={3}
              isDisabled={!applicationName || !selectedFile}
              bg={"brand.primary"}
              color={"white"}
              _hover={{
                bg: "brand.secondary",
              }}
            >
              Finish
            </Button>
            <Button
              onClick={handleModalClose}
              bg={"brand.primary"}
              color={"white"}
              _hover={{
                bg: "brand.secondary",
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default UploadZip;
