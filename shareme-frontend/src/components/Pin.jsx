import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

import { client, urlFor } from "../client";
import { fetchUser } from "../utils/fetchUser";
import { Button, Toast, Tooltip, useToast } from "@chakra-ui/react";

const Pin = ({ pin }) => {
  const { postedBy, category, image, _id, destination } = pin;
  // console.log(pin);
  // console.log(category);
  const [savingPost, setSavingPost] = useState(false);

  const [postHovered, setPostHovered] = useState(false); // If post is hovered

  const navigate = useNavigate(); // Navigate to a new page
  const toast = useToast(); // Toast

  // Fetch user data
  const user = fetchUser();

  // Delete pin of the own user only (not others)
  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
      setSavingPost(false);
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
        });
    }
  };
  // console.log(user);

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)} // If post is hovered
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)} // Navigate to a new page
        className=" relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        {/* Pin image */}
        {image && (
          <img
            className="rounded-xl w-full "
            src={urlFor(image).width(250).url()}
            alt="user-post"
          />
        )}
        {/* When post is hovered */}
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
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
                  className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {/* TODO - Fix the saved up posts */}
              {/* Already saved posts */}
              {alreadySaved?.length !== 0 ? (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  Saved
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                    toast({
                      title: "Post will be saved soon!.",
                      description: "Adding one entry of saved posts!.",
                      status: "success",
                      duration: 9000,
                      isClosable: true,
                    });
                  }}
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {pin?.save?.length} {savingPost ? "Saving" : "Save"}
                </button>
              )}
            </div>
            {/* Destination url */}
            <div className=" flex justify-between items-center gap-2 w-full">
              {destination?.slice(8).length > 0 ? (
                <a
                  href={destination}
                  target="_blank"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
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
                    e.stopPropagation(); // Stop the event from bubbling up the DOM tree
                    // deletePin(_id); // Delete pin
                    // Toast
                    <Toast status="success" description="Pin deleted" />;
                  }}
                  className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Show the user who posted it */}
      <Link
        to={`/user-profile/${postedBy?._id}`}
        className="flex gap-2 mt-2 items-center"
      >
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={postedBy?.image}
          alt="user-profile"
        />
        <p className="capitalize font-thin text-sm">{postedBy?.userName}</p>
      </Link>
    </div>
  );
};

export default Pin;
