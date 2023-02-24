import React, { useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Typography } from "@mui/material";
import { client, urlFor } from "../client";
import { fetchUser } from "../utils/fetchUser";

const Pin = ({ pin }) => {
  const { postedBy, category, image, _id, destination, title } = pin;
  // console.log(pin);
  // console.log(category);
  // console.log(title);
  const [savingPost, setSavingPost] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [postHovered, setPostHovered] = useState(false); // If post is hovered

  const navigate = useNavigate(); // Navigate to a new page
  const showSavedToast = () => {
    toast.success('Post will be saved soon!.', {
        position: toast.POSITION.BOTTOM_CENTER
    });
  };
  const showDeletedToast = () => {
    toast.success('Pin Deleted ', {
        position: toast.POSITION.BOTTOM_CENTER
    });
  };
  // Fetch user data
  const user = fetchUser();

  // Delete pin of the own user only (not others)
  const deletePin = (id) => {
    client.delete(id).then(() => {
      setSavingPost(false);
      setDeleted(true);
      // window.location.reload();
    });
  };

  // Get already saved pins by user
  let alreadySaved = pin?.save?.filter((item) => item?.user?._id === user?._id);

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  // console.log(alreadySaved);

  // console.log(user?.uid);
  const savePin = (id) => {
    if (alreadySaved?.length === 0) {
      setSavingPost(true);

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user?.uid,
            postedBy: {
              _type: "postedBy",
              _ref: user?.uid,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
         showSavedToast()
        });
    }
  };
  // console.log(user);

  return (
    <div className={`m-2 py-3 ${deleted ? "hidden" : null}`}>
      <div
        onMouseEnter={() => setPostHovered(true)} // If post is hovered
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)} // Navigate to a new page
        className=" relative w-auto cursor-zoom-in overflow-hidden rounded-lg transition-all duration-500 ease-in-out hover:shadow-lg"
      >
        {/* Pin image */}
        {image && (
          <div className="flex flex-col items-center">
            <img
              className="w-full rounded-xl "
              src={urlFor(image).width(250).url()}
              alt="user-post"
            />
          </div>
        )}
        {/* When post is hovered */}
        {postHovered && (
          <div
            className="absolute top-0 z-50 flex h-full w-full cursor-pointer flex-col justify-between p-1 pr-2 pt-2 pb-2"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {/* Show Download btn */}
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download // Download image utility
                  onClick={(e) => {
                    e.stopPropagation(); // Stop the event from bubbling up the DOM tree
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white p-2 text-xl opacity-75 outline-none hover:opacity-100 hover:shadow-md"
                >
                  <MdDownloadForOffline color="black" />
                </a>
              </div>
              {/* Already saved posts */}
              {alreadySaved?.length !== 0 ? (
                <button
                  type="button"
                  className="rounded-3xl bg-red-500 px-5 py-1 text-base font-bold text-white opacity-70 outline-none hover:opacity-100 hover:shadow-md"
                >
                  Saved
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    savePin(_id);
                    showSavedToast()
                  }}
                  type="button"
                  className="rounded-3xl bg-red-500 px-5 py-1 text-base font-bold text-white opacity-70 outline-none hover:opacity-100 hover:shadow-md"
                >
                  {pin?.save?.length} {savingPost ? "Saving" : "Save"}
                </button>
              )}
            </div>
            {/* Destination url */}
            <div className=" flex w-full items-center justify-between gap-2">
              {destination?.slice(8).length > 0 ? (
                <a
                  href={destination}
                  target="_blank"
                  className="flex items-center gap-2 rounded-full bg-white p-2 pl-4 pr-4 font-bold text-black opacity-70 hover:opacity-100 hover:shadow-md"
                  rel="noreferrer"
                >
                  <BsFillArrowUpRightCircleFill />
                  {destination?.length > 15
                    ? destination?.slice(8, 15) + "..."
                    : destination?.slice(8)}
                </a>
              ) : undefined}
              {/* Delete Button */}
              {postedBy?._id === user?.uid && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    showDeletedToast();
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white p-2 text-white opacity-75 outline-none hover:opacity-100"
                >
                  <AiTwotoneDelete color="black" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center justify-center">
        <span className="h1 text-center font-bold text-red-400">
          {title && title}
        </span>
        {/* Show the user who posted it */}
        <Link
          to={`/user/${postedBy?._id}`}
          className="flex items-center gap-2 "
        >
          <img
            className="h-8 w-8 rounded-full object-cover"
            src={postedBy?.image}
            alt="user"
          />
          <p className="text-sm font-thin capitalize">{postedBy?.userName}</p>
          <hr />
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Pin;
