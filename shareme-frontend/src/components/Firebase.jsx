import React from "react";
import { FcGoogle } from "react-icons/fc";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Firebase = () => {
  const firebaseConfig = FirebaseConfig();

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        //! Important data
        console.log(result);
        const name = result.user.displayName;
        const email = result.user.email;
        const photo = result.user.photoURL;

        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("photo", photo);

      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex p-5 justify-center m-5">
      <h1>Firebase login</h1>
      <div className="justify-center ">
        <button className="flex border-4 items-center justify-center p-4 mx-2" onClick={signInWithGoogle}>
          <FcGoogle className="mr-4" /> Sign in with google
        </button>
      </div>
    </div>
  );
};

export default Firebase;
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

