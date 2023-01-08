import PropTypes from "prop-types";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { RiHomeFill } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { categories } from "../utils/data";
import { fetchUser } from "../utils/fetchUser";

const isNotActiveStyle =
  "flex items-center pl-5 gap-3 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center pl-5 my-0 gap-3 font-extrabold border-l-8 border-r-8 border-red-500 transition-all duration-500 ease-in-out capitalize";
const isActiveStyleHome =
  "flex items-center pl-5 my-0 gap-3 font-extrabold transition-all duration-500 ease-in-out capitalize";

const Sidebar = ({ closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };
  const user = fetchUser();
  // console.log(user);

  return (
    <div className="flex flex-col justify-between bg-red-100 h-full overflow-y-scroll min-w-120 hide-scrollbar">
      <div className="flex flex-col">
        {/* ShareMe Logo */}
        <Link
          to="/"
          className="flex pl-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        {/* Home */}
        <div className="flex flex-col gap-2">
          {/* Categories */}
          <h3 className="mt-2 pl-5 font-bold text-base 3xl:text-xl capitalize">
            Categories
          </h3>
          {/* All categories */}
          {categories.map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img
                src={category.image}
                className="w-8 h-8 rounded-md shadow-lg"
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {/* User Profile */}
      <Link
        to={`user/${user?.uid}`}
        className="flex mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
        onClick={handleCloseSidebar}
      >
        <img
          src={user?.photoURL}
          className="w-10 h-10 rounded-full"
          alt="user"
        />
        <p>{user?.displayName}</p>
        <IoIosArrowForward />
      </Link>
    </div>
  );
};

export default Sidebar;

// Write propTypes here
Sidebar.propTypes = {
  user: PropTypes.object,
  closeToggle: PropTypes.func,
};
