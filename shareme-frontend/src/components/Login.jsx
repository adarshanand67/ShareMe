import React, { useState } from "react";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
// Icons
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { useNavigate } from "react-router-dom";
// Firebase
import { auth } from "../firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { client } from "../client";
// Toast
import { useToast } from "@chakra-ui/react";

const Login = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const imageUrl = result.user.photoURL;
        const googleId = result.user.uid;

        // 1. Store user in local storage
        const user = {
          name,
          googleId,
          imageUrl,
        };
        localStorage.setItem("user", JSON.stringify(result.user));

        // 2. Create a new sanity user
        const doc = {
          _id: googleId,
          _type: "user",
          userName: name,
          image: imageUrl,
        };

        // 3. Check if user already exists
        client.createIfNotExists(doc).then(() => {
          setAuthenticated(true);
          navigate("/", { replace: true }); // Navigate to home page replacing the current page
        });
        toast({
          title: "Welcome to ShareMe",
          description: `Hi ${name}, you are now logged in!`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Cant sign in with github",
          description:
            "An account already exists with the same email address but different sign-in credentials.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const signInWithGithub = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const imageUrl = result.user.photoURL;
        const githubId = result.user.uid;

        // 1. Store user in local storage
        const user = {
          name,
          githubId,
          imageUrl,
        };
        localStorage.setItem("user", JSON.stringify(result.user));

        // 2. Create a new sanity user
        const doc = {
          _id: githubId,
          _type: "user",
          userName: name,
          image: imageUrl,
        };

        // 3. Check if user already exists
        client.createIfNotExists(doc).then(() => {
          setAuthenticated(true);
          navigate("/", { replace: true }); // Navigate to home page replacing the current page
        });
        toast({
          title: "Welcome to ShareMe",
          description: `Hi ${name}, you are now logged in!`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Cant sign in with github",
          description:
            "An account already exists with the same email address but different sign-in credentials.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" />
          </div>

          <div className="shadow-2xl flex gap-20">
            <button
              className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
              onClick={signInWithGoogle}
            >
              <FcGoogle className="mr-4" /> Sign in with Google
            </button>
            <button
              className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
              onClick={signInWithGithub}
            >
              <FaGithub className="mr-4" /> Sign in with Github
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
