import PropTypes from "prop-types";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import {
  CreatePin,
  Feed,
  Navbar,
  PinDetails,
  Search,
  Sidebar,
} from "../components";
import Contact from "../components/Contact";
import { Icon } from "../components/Icon";
import QRCodeGenerator from "../components/QRCode";
import SocialMediaButtons from "../pages/SocialMediaButtons";

const Pins = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState(""); //Getting search term
  const [searchButton , setSearchButton] = useState(true);

  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        {/* Navbar */}
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchButton={searchButton}
          setSearchButton={setSearchButton}
          user={user && user} // If user is not null then pass user
        />
      </div>
      <div className="h-full">
        <Routes>
          {/* <Route path="/test" element={<Navbar/>} /> */}
          <Route path="/" element={<Feed />} /> {/* Home feed */}
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route path="/contact" element={<Contact />} />
          {/* Category feed */}
          <Route
            path="/pin-detail/:pinId"
            element={<PinDetails user={user && user} />}
          />
          <Route
            path="/create-pin"
            element={<CreatePin user={user && user} />}
          />
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchButton={searchButton} setSearchButton={setSearchButton} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;

// Props validation
Pins.propTypes = {
  user: PropTypes.object,
};
