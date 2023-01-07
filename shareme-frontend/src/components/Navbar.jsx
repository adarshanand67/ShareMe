import PropTypes from "prop-types";
import React from "react";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { fetchUser } from "../utils/fetchUser";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const user = fetchUser();
  // console.log(user);
  if (user) {
    return (
      <div className="flex gap-2 md:gap-5 w-full mt-5 p-2 ">
        <div className="flex justify-start items-center w-full px-5 rounded-full bg-gray-300 border-none outline-none focus-within:shadow-sm">
          {/* Searchbar */}
          <IoMdSearch fontSize={21} className="ml-1" />
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            value={searchTerm}
            onFocus={() => navigate("/search")}
            className="p-2 w-full bg-gray-300 outline-none"
          />
        </div>
        <div className="flex gap-5 ">
          {/* User Profile */}
          <Link to={`user/${user?.uid}`} className="hidden md:block">
            <img
              src={user.photoURL}
              alt="user-pic"
              className="w-14 h-12 rounded-lg "
            />
          </Link>
          {/* Creating new pin */}
          <Link
            to="/create-pin"
            className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center"
          >
            <IoMdAdd />
          </Link>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Navbar;

// Props validation
Navbar.propTypes = {
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
  user: PropTypes.object,
};
