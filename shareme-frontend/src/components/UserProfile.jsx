import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import img1 from "../assets/back.jpg";
import img2 from "../assets/back2.jpg";
import img3 from "../assets/back3.jpg";
import img4 from "../assets/back4.jpg";
import Spinner from "./Spinner";
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import { useToast } from "@chakra-ui/react";

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-non";

function generateRandomImage() {
  var randomImage = new Array();
  randomImage[0] = img1;
  randomImage[1] = img2;
  randomImage[2] = img3;
  randomImage[3] = img4;
  var random = Math.floor(Math.random() * randomImage.length);
  return randomImage[random];
}
const randomImage = generateRandomImage();

const UserProfile = () => {
  const [user, setUser] = useState();
  const [pins, setPins] = useState();
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");

  const navigate = useNavigate();

  const toast = useToast();

  const { userId } = useParams();
  const User =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  // console.log(User);

  useEffect(() => {
    const query = userQuery(userId); // fetch
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  // const logout = () => {
  //   localStorage.clear();

  //   navigate("/login");
  // };

  if (!user) return <Spinner message="Loading profile" />;

  function FirebaseLogout() {
    const auth = getAuth(); // Get current state of auth object

    signOut(auth)
      .then(() => {
        // Sign-out successful.
        localStorage.clear();
        navigate("/login");
        toast({
          title: "Sorry to see you go 😢",
          description: "You are now logged out",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {});
  }
  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              // className="w-full h-15 object-cover"
              className="w-full h-40 2xl:h-50 shadow-lg object-cover"
              src={randomImage}
              alt="user-pic"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={user.image}
              alt="user-pic"
            />
          </div>
          <h1 className="font-bold text-3xl text-center mt-3">
            {user.userName}
          </h1>
          <div className="absolute top-0 z-1 right-0 p-2">
            {userId === User.uid && (
              // Logic for logout redirec to login page
              <button
                type="button"
                className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                onClick={() => FirebaseLogout()}
              >
                <IoIosLogOut color="red" fontSize={21} />
              </button>
            )}
          </div>
        </div>
        {/* Created Pins */}
        <div className="text-center mb-7">
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("created");
            }}
            className={`${
              activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
            }`}
          >
            Created
          </button>
          {/* Saved Pins */}
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("saved");
            }}
            className={`${
              activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
            }`}
          >
            Saved
          </button>
        </div>

        {/* Render the Masonry Layout of all my pins */}
        <div className="px-2">
          <MasonryLayout pins={pins} />
        </div>

        {/* Checker for no pins */}
        {pins?.length === 0 && (
          <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
            No Pins Found!
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
