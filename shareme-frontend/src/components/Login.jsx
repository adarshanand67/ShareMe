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
// React typing animation
import { TypeAnimation } from "react-type-animation";
import Confettis from "../components/Confettis";

const Login = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const { signInWithGoogle, signInWithGithub } = SignInUtility();

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

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5 m-5">
            <img src={logo} width="130px" />
          </div>
          <div className="m-5 p-5">
            {/* Content  */}
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-3xl font-bold text-white">
                Share your moments with
                <TypeAnimation
                  sequence={[
                    "friends 😇",
                    2000,
                    "family 👨‍👩‍👧‍👦",
                    2000,
                    "strangers 🤗",
                    2000,
                    "colleagues 🤝",
                    2000,
                  ]}
                  wrapper="div"
                  cursor={true}
                  repeat={Infinity}
                  style={{
                    fontSize: "2rem",
                  }}
                />
              </h1>
            </div>
          </div>
          <div className="shadow-2xl flex gap-20">
            <button
              className="bg-mainColor flex justify-center items-center p-3 pr-5 rounded-full outline-none cursor-pointer hover:bg-opacity-80"
              onClick={signInWithGoogle}
            >
              <FcGoogle className="mr-4" />
              <span className=""> Google</span>
            </button>
            <button
              className="bg-mainColor flex justify-center items-center p-3 pr-5 rounded-full outline-none cursor-pointer hover:bg-opacity-80"
              onClick={signInWithGithub}
            >
              <FaGithub className="mr-4" /> Github
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  function SignInUtility() {
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
            title: "Welcome to ShareMe 😃",
            description: `Hi ${name}, you are now logged in!`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        })
        .catch((error) => {
          toast({
            title: "Cant sign in with Google 😔",
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
            title: "Welcome to ShareMe 😃",
            description: `Hi ${name}, you are now logged in!`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          // Confettis for 5 seconds
        })
        .catch((error) => {
          toast({
            title: "Cant sign in with github 😐",
            description:
              "An account already exists with the same email address but different sign-in credentials.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
    };
    return { signInWithGoogle, signInWithGithub };
  }
};

export default Login;
