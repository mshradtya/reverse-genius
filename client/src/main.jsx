import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import theme from "./theme";
import { AllProvider } from "./context/All.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <AllProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AllProvider>
    </BrowserRouter>
  </ChakraProvider>
);
