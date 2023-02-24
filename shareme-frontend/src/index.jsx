import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "regenerator-runtime/runtime";

import App from "./App";
import "./styles/index.css";

// use createRoot instead of render
ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
