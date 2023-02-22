import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "regenerator-runtime/runtime";

import App from "./App";
import "./styles/index.css";

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";

// use createRoot instead of render
ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Router>
);

serviceWorkerRegistration.register();