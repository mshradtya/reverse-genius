import React, { useContext } from "react";
import { Text } from "@chakra-ui/react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
import HighlightedCode from "./HighlightedCode";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { AllContext } from "../context/All";

export default function DiffCode() {
  const { changingNode } = useContext(AllContext);
  const oldCode = changingNode.oldCode.code;

  const newCode = changingNode.newCode.functionCode;

  const newStyles = {
    variables: {
      light: {
        codeFoldGutterBackground: "#6F767E",
        codeFoldBackground: "#E2E4E5",
      },
    },
  };
  return (
    <div className="App">
      <ReactDiffViewer
        oldValue={oldCode}
        newValue={newCode}
        splitView={true}
        compareMethod={DiffMethod.WORDS}
        styles={newStyles}
        leftTitle="Original Code"
        rightTitle="Recommended Code"
      />
      <SyntaxHighlighter language="javascript" style={a11yDark}>
        {newCode}
      </SyntaxHighlighter>
    </div>
  );
}
