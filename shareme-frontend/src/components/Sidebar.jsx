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
    <div className="min-w-120 hide-scrollbar flex h-full flex-col justify-between overflow-y-scroll bg-red-100">
      <div className="flex flex-col">
        {/* ShareMe Logo */}
        <Link
          to="/"
          className="my-6 flex w-190 items-center gap-2 pl-5 pt-1"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        {/* Home */}
        <div className="flex flex-col gap-2">
          {/* Categories */}
          <h3 className="3xl:text-xl mt-2 pl-5 text-base font-bold capitalize">
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
                className="h-8 w-8 rounded-md shadow-lg"
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {/* User Profile */}
      <Link
        to={`user/${user?.uid}`}
        className="mx-3 mb-3 mt-10 flex items-center gap-2 rounded-lg bg-white p-2 shadow-lg"
        onClick={handleCloseSidebar}
      >
        <img
          src={user?.photoURL}
          className="h-10 w-10 rounded-full"
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
