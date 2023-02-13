import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Home from "./container/Home";
import Login from "./pages/Login";
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
      {/* Display the containers */}
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default App;
