import React, { useEffect, lazy, Suspense } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Login from "./pages/Login";
import { fetchUser } from "./utils/fetchUser";

const Home = lazy(() => import("./container/Home"));
console.log("homle...", Home);

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
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        {/* Display the containers */}
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </Suspense>
  );
};

export default App;
