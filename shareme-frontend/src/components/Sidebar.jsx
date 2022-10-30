import PropTypes from "prop-types";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { RiHomeFill } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { categories } from "../utils/data";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-5 border-black  transition-all duration-200 ease-in-out capitalize";

const Sidebar = ({ user, closeToggle }) => {
    const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="flex flex-col justify-between bg-red-100 h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        {/* ShareMe Logo */}
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        {/* Home */}
        <div className="flex flex-col gap-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          {/* Categories */}
          <h3 className="mt-2 px-5 font-bold text-base 3xl:text-xl capitalize">
            Discover cateogries
          </h3>
          {/* All categories */}
          {categories.slice(0, categories.length - 1).map((category) => (
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
                className="w-8 h-8 rounded-full shadow-lg"
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {/* User Profile */}
      {user && (
        <Link
          to={`user-profile/${user?._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img
            src={user?.image}
            className="w-10 h-10 rounded-full"
            alt="user-profile"
          />
          <p>{user?.userName}</p>
          <IoIosArrowForward />
        </Link>
      )}
    </div>
  );
};

export default Sidebar;

// Write propTypes here
Sidebar.propTypes = {
  user: PropTypes.object,
  closeToggle: PropTypes.func,
};
