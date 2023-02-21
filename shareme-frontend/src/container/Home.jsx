import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Sidebar } from "../components";

const UserProfile = lazy(() =>
  import("../components").then((module) => {
    return { default: module.UserProfile };
  })
);
const Pins = lazy(() => import("./Pins"));

import { AiFillCloseCircle } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import logo from "../assets/logo.png";
import { client } from "../client";

import Confettis from "../components/Confettis";
import SocialMediaButtons from "../components/SocialMediaButtons";
import { userQuery } from "../utils/data";
import { fetchUser } from "../utils/fetchUser";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false); // Toggle sidebar false means off
  const [user, setUser] = useState(); // User data initially null
  const [showConfetti, setShowConfetti] = useState(true);

  const scrollRef = useRef(null); // Scroll to top
  const width = 1920; // Setting up width
  const height = 1080; // Setting up height

  const userInfo = fetchUser();
  useEffect(() => {
    const query = userQuery(userInfo?.uid); // Get user data from sanity

    client.fetch(query).then((data) => {
      // console.log(data);
      setUser(data[0]);
      // console.log("user",user);
    });
  }, []); // componentDidMount

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0); // Scroll to top when page load
  });

  return (
    <div className="flex h-screen flex-col bg-gray-50 transition-height duration-75 ease-out md:flex-row">
      <div className="hidden h-screen flex-initial md:flex">
        <Sidebar closeToggle={setToggleSidebar} />
        {/* If user is logged in then show sidebar */}
      </div>
      <div className="flex flex-row md:hidden">
        <div className="flex w-full flex-row items-center justify-between p-2 shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)} // Toggle sidebar on
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`user/${userInfo?.uid}`}>
            <img
              src={userInfo?.photoURL}
              alt="user-pic"
              className="h-9 w-9 rounded-full "
            />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed z-10 h-screen w-4/5 animate-slide-in overflow-y-auto bg-white shadow-md">
            <div className="absolute flex w-full items-center justify-end p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      <div className="h-screen flex-1 overflow-y-scroll pb-2" ref={scrollRef}>
        <Suspense>
          <Routes>
            <Route path="/user/:userId" element={<UserProfile />} />
            <Route path="/*" element={<Pins user={user && user} />} />
            <Route path="/test" element={<SocialMediaButtons />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
