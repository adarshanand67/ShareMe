import { Link, Route, Routes } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { Sidebar, UserProfile } from "../components";

import { AiFillCloseCircle } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import Pins from "./Pins";
import { client } from "../client";
import logo from "../assets/logo.png";
import Confetti from "react-confetti";

import { userQuery } from "../utils/data";
import Confettis from "../components/Confettis";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false); // Toggle sidebar false means off
  const [user, setUser] = useState(); // User data initially null
  const [showConfetti, setShowConfetti] = useState(true);

  const scrollRef = useRef(null); // Scroll to top
  const width = 1920; // Setting up width
  const height = 1080; // Setting up height

  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear(); // Get user info from local storage

  useEffect(() => {
    const query = userQuery(userInfo?.uid); // Get user data from sanity

    client.fetch(query).then((data) => {
      // console.log(data);
      setUser(data[0]);
    });
  }, []); // componentDidMount

  useEffect(() => {
    <Confettis />;
  }, []); // componentDidMount

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0); // Scroll to top when page load
  });

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} closeToggle={setToggleSidebar} />
        {/* If user is logged in then show sidebar */}
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)} // Toggle sidebar on
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`user-profile/${user?.uid}`}>
            <img
              src={userInfo?.photoURL}
              alt="user-pic"
              className="w-9 h-9 rounded-full "
            />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar closeToggle={setToggleSidebar} user={user && user} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
