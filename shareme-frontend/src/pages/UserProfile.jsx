import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import img from "../assets/img.jpeg";
import { client } from "../client";
import { Icon } from "../components/Icon";
import MasonryLayout from "../components/MasonryLayout";
import QRCodeGenerator from "../components/QRCode";
import Spinner from "../components/Spinner";
import { activeBtnStyles, notActiveBtnStyles } from "../utils/activeBtnStyles";
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import { fetchUser } from "../utils/fetchUser";
import SocialMediaButtons from "./SocialMediaButtons";

const UserProfile = () => {
  const [user, setUser] = useState();
  const [pins, setPins] = useState();
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");

  const navigate = useNavigate();

  const { userId } = useParams();
  // console.log(userId);

  const showToastMessage = () => {
    toast.warning('Sorry to see you go 😢', {
        position: toast.POSITION.BOTTOM_CENTER
    });
  };

  const User = fetchUser();
  // console.log(User)

  useEffect(() => {
    const query = userQuery(userId); // Get user by id
    client.fetch(query).then((data) => {
      // Fetch user by id
      setUser(data[0]); // Set user
    });
  }, [userId]); // If user id changes then fetch user again

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
        showToastMessage();
      })
      .catch((error) => {});
      
  }

  return (
    <div className="relative h-full items-center justify-center pb-2">
      <div className="flex flex-col pb-5">
        <div className="relative mb-7 flex flex-col">
          <div className="flex flex-col items-center justify-center">
            <img
              className="2xl:h-50 h-40 w-full object-cover opacity-100 shadow-lg "
              src={"https://source.unsplash.com/random/680x300/?city,water,sky"}
              alt="user-pic"
            />
            <img
              className="-mt-10 h-20 w-20 rounded-full object-cover shadow-xl"
              src={user.image}
              alt="user-pic"
            />
          </div>
          <h1 className="mt-3 text-center text-3xl font-bold">
            {user.userName}
          </h1>
          <div className="z-1 absolute top-0 right-0 p-2">
            {userId === User.uid && (
              // Logic for logout redirec to login page
              <button
                type="button"
                className=" cursor-pointer rounded-full bg-white p-2 shadow-md outline-none"
                onClick={() => FirebaseLogout()}
              >
                <IoIosLogOut color="red" fontSize={21} />
              </button>
            )}
          </div>
        </div>
        {/* Show QR Code at bottom right */}
        <div className="ali flex flex-row items-center justify-center">
          {/* <h2 className="w-[177px] mx-auto">Scan QR </h2> */}
          <SocialMediaButtons url={window.location.href} />
          {/* <QRCodeGenerator url={window.location.href} /> */}
          <Icon />
        </div>

        {/* Created Pins */}
        <div className="mb-7 text-center">
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
          <div className="text-1xl mt-2 flex w-full items-center justify-center font-bold">
            No Pins Found!
          </div>
        )}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default UserProfile;
