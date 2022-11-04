import { useToast } from "@chakra-ui/react";
import { getAuth, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import img from "../assets/img.jpeg";
import { client } from "../client";
import { activeBtnStyles, notActiveBtnStyles } from "../utils/activeBtnStyles";
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import { fetchUser } from "../utils/fetchUser";
import MasonryLayout from "./MasonryLayout";
import QRCodeGenerator from "./QRCode";
import SocialMediaButtons from "./SocialMediaButtons";
import Spinner from "./Spinner";

const UserProfile = () => {
  const [user, setUser] = useState();
  const [pins, setPins] = useState();
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();

  const toast = useToast();

  const User = fetchUser();

  useEffect(() => {
    const query = userQuery(userId);
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
              className="w-full h-40 2xl:h-50 shadow-lg object-cover opacity-100 "
              src={img}
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
        <SocialMediaButtons /> 
        {/* Show QR Code at bottom right */}
        <div className="flex flex-col items-center">
          {/* <h2 className="w-[177px] mx-auto">Scan QR </h2> */}
          <QRCodeGenerator />
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

        <div className="px-2">
          <MasonryLayout pins={pins} />
        </div>

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
