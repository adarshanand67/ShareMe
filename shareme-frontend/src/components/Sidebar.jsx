import { Link, NavLink } from "react-router-dom";

import { IoIosArrowForward } from "react-icons/io";
import React from "react";
import { RiHomeFill } from "react-icons/ri";
import { categories } from "../utils/data";
import logo from "../assets/logo.png";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize";
const Sidebar = ({ closeToggle, user }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };
  return (
    <div>
      Sidebar
    </div>
  );
};

export default Sidebar;
