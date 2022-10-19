import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

import { client, urlFor } from "../client";
import { fetchUser } from "../utils/fetchUser";

const Pin = ({ pin }) => {
  const { postedBy, image, _id, destination } = pin; // Destructure props

  const [postHovered, setPostHovered] = useState(false); // If post is hovered

  const navigate = useNavigate(); // Navigate to a new page

  // Fetch user data
  const user = fetchUser();

  // Delete pin of the own user only (not others)
  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  // Get already saved pins by user
  let alreadySaved = pin?.save?.filter(
    (item) => item?.postedBy?._id === user?.googleId
  );

  // Length of already saved pins
  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  const savePin = (id) => {
    if (alreadySaved?.length === 0) {
      // If pin is not already saved

      client
        .patch(id) // Patch the pin
        .setIfMissing({ save: [] }) // Set save array if not present
        .insert("after", "save[-1]", [
          // Insert the user data in the save array
          {
            _key: uuidv4(), // Generate a unique key
            userId: user?.googleId, // User id
            postedBy: {
              // User data
              _type: "postedBy",
              _ref: user?.googleId,
            },
          },
        ])
        .commit() // Commit the changes
        .then(() => {
          // After commit
          window.location.reload(); // Reload the page
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
            className="rounded-lg w-full "
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
              {/* Already saved posts */}
              {alreadySaved?.length !== 0 ? (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {pin?.save?.length} Saved
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {pin?.save?.length}
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
                    deletePin(_id); // Delete pin
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
