import React, { useState } from "react";
import logo from "../assets/logowhite.png";
import shareVideo from "../assets/share.mp4";
// Icons
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { useNavigate } from "react-router-dom";
// Firebase
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { client } from "../client";
import { auth } from "../firebase";
// Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// React typing animation
import { TypeAnimation } from "react-type-animation";

const Login = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const SuccedToast = () => {
    toast.success('Welcome to ShareMe 😃', {
        position: toast.POSITION.BOTTOM_CENTER
    });
  };
  const googleErrorToast = () => {
    toast.error('Cant sign in with Google 😔', {
        position: toast.POSITION.BOTTOM_CENTER
    });
  };
  const githubErrorToast = () => {
    toast.error('Cant sign in with GitHub 😔', {
        position: toast.POSITION.BOTTOM_CENTER
    });
  };

  const { signInWithGoogle, signInWithGithub } = SignInUtility();

  return (
    <div className="flex h-screen flex-col items-center justify-start">
      <div className=" relative h-full w-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="h-full w-full object-cover"
        />

        <div className="absolute top-0 right-0 left-0 bottom-0 flex flex-col items-center justify-center bg-blackOverlay">
          <div className="m-5 p-5">
            <img src={logo} width="130px" />
          </div>
          <div className="m-5 p-5">
            {/* Content  */}
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-3xl font-bold text-white">
                Share your moments with
                <TypeAnimation
                  sequence={[
                    "friends 😇",
                    2000,
                    "family 👨‍👩‍👧‍👦",
                    2000,
                    "colleagues 🤝",
                    2000,
                    "world 🤗",
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
          <div className="flex gap-20 shadow-2xl">
            <button
              className="flex cursor-pointer items-center justify-center rounded-full bg-mainColor p-3 pr-5 outline-none hover:bg-opacity-80"
              onClick={signInWithGoogle}
            >
              <FcGoogle className="mr-4" />
              <span className=""> Google</span>
            </button>
            <button
              className="flex cursor-pointer items-center justify-center rounded-full bg-mainColor p-3 pr-5 outline-none hover:bg-opacity-80"
              onClick={signInWithGithub}
            >
              <FaGithub className="mr-4" /> Github
            </button>
          </div>
        </div>
      </div>
      <ToastContainer/>
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
            SuccedToast()
          });
          
        })
        .catch((error) => {
          googleErrorToast()
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
          SuccedToast()
          // Confettis for 5 seconds
        })
        .catch((error) => {
          githubErrorToast();
        });
    };
    return { signInWithGoogle, signInWithGithub };
  }
};

export default Login;
