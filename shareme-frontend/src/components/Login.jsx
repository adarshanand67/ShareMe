import React from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { client } from "../client";

function FirebaseConfig() {
  return {
    apiKey: "AIzaSyB4xljIB6nEdaKoWehBjD_PRPnsSr7u8X8",
    authDomain: "trim-silicon-365709.firebaseapp.com",
    projectId: "trim-silicon-365709",
    storageBucket: "trim-silicon-365709.appspot.com",
    messagingSenderId: "836382567162",
    appId: "1:836382567162:web:659f8dc265d733543bf743",
    measurementId: "G-DFEWDCFF0V",
  };
}

const firebaseConfig = FirebaseConfig();
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      //! Important data
      console.log(result);
      const name = result.user.displayName;
      const googleId = result.user.email;
      const imageUrl = result.user.photoURL;
      // const googleId = result.user.uid;

      const user = {
        name,
        googleId,
        imageUrl,
      };
      localStorage.setItem("user", JSON.stringify(result.user));

      // Creating a new sanity user
      const doc = {
        _id: googleId,
        _type: "user",
        userName: name,
        image: imageUrl,
      };

      // Connect to sanity if account not exist before
      client.createIfNotExists(doc).then(() => {
        navigate("/", { replace: true }); // Navigate to home page
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

          <div className="shadow-2xl">
            {/* <GoogleLogin
              clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> Sign in with google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            /> */}
            <button
              className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
              onClick={signInWithGoogle}
            >
              <FcGoogle className="mr-4" /> Sign in with google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
