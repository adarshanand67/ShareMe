import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Login from "./components/Login";
import Home from "./container/Home";
import Firebase from "./components/Firebase";
import { fetchUser } from "./utils/fetchUser";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = fetchUser();
    if (!user) {
      navigate("/login");
    }
  }, []);

  // Make scrollbar red
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/firebase" element={<Firebase />} />
        <Route path="/*" element={<Home />} />
      </Routes>
  );
};

export default App;
