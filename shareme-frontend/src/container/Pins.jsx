import PropTypes from "prop-types";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Navbar, Feed, PinDetails, CreatePin, Search } from "../components";
import Confettis from "../components/Confettis";
import Contact from "../components/Contact";
import { Icon } from "../components/Icon";
import SocialMediaButtons from "../components/SocialMediaButtons";

const Pins = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState(""); //Getting search term

  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        {/* Navbar */}
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user && user} // If user is not null then pass user
        />
        {/* Always show the icon */}
        <Icon />
        <SocialMediaButtons />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/test" element={<SocialMediaButtons />} />
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
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
