import React, { useEffect, useState } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { useToast } from "@chakra-ui/react";
import { VscLink, VscTag } from "react-icons/vsc";
import { client, urlFor } from "../client";
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

const PinDetail = ({ user }) => {
  // console.log(user);
  const { pinId } = useParams(); // Get pin id from url

  const [pins, setPins] = useState();
  const [pinDetail, setPinDetail] = useState();
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  let category = pinDetail?.category;
  category = capitalizeFirstLetter(category);

  // console.log(category);

  const fetchPinDetails = () => {
    const query = pinDetailQuery(pinId);
    // console.log(query);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPinDetail(data[0]);
        // console.log(data[0]);

        if (data[0]) {
          const query1 = pinDetailMorePinQuery(data[0]);
          client.fetch(query1).then((res) => {
            setPins(res); // * Set pins to fetched data json
          });
        }
      });
    }
  };

  // useEffect changes only when pinId changes
  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  // Adding comments function
  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client // Patch the pin
        .patch(pinId)
        .setIfMissing({ comments: [] }) // Set comments array if not present
        .insert("after", "comments[-1]", [
          // Insert comment at the end of the array
          {
            comment,
            _key: uuidv4(), // Generate unique key
            postedBy: { _type: "postedBy", _ref: user._id }, // Reference to user
          },
        ])
        .commit() // Commit the changes
        .then(() => {
          // After commit
          fetchPinDetails(); // Fetch pin details
          setComment(""); // Clear comment
          navigate("/"); // Navigate to pin details page
          toast({
            title: "Comment added will be added soon",
            description: "Writing your comment to Database",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setAddingComment(false); // Set adding comment to false
        });
    }
  };

  // Loading Pin
  if (!pinDetail) {
    return <Spinner message="Showing pin" />;
  }

  return (
    <div>
      {/* Pin exists */}
      {pinDetail && (
        <div
          className="flex xl:flex-row flex-col m-auto bg-white rounded-lg shadow-lg w-full gap-5"
          style={{ maxWidth: "1500px", borderRadius: "32px" }}
        >
          {/* Image */}
          <div className="flex justify-center items-center gap-5">
            <img
              className="rounded-t-3xl rounded-b-lg"
              src={pinDetail?.image && urlFor(pinDetail?.image).url()}
              alt="user-post"
            />
          </div>

          <div className="w-full p-5 flex-1 xl:min-w-620 gap-5">
            {/* Title about */}
            <div>
              <h1 className="text-4xl font-bold break-words">
                {pinDetail.title}
              </h1>
              <p className="mt-3">{pinDetail.about}</p>
            </div>

            <div className="flex items-center justify-between mt-5 gap-5">
              <div className="flex gap-2 items-center">
                {/* Download icon */}
                <a
                  href={`${pinDetail.image.asset.url}?dl=`}
                  download
                  className="bg-red-600 p-2 text-xl rounded-full flex items-center justify-center text-white opacity-75 hover:opacity-100"
                >
                  <MdDownloadForOffline size={25} />
                  <span className="px-2"> Download</span>
                </a>
              </div>
              <div className="flex gap-2 items-center">
                {/* Showing Tags */}
                <a
                  className="bg-red-600 p-2 text-xl rounded-full flex items-center justify-center text-white opacity-75 hover:opacity-100"
                  href={`/category/${category}`}
                >
                  <VscTag size={25} />
                  <span className="px-5 "> {category}</span>
                </a>
              </div>
            </div>
            {/* Link */}
            <a
              className="p-2 mt-5 text-xl rounded-full flex text-black opacity-75 hover:opacity-100 hover:border border-black "
              href={pinDetail.destination}
              target="_blank"
              rel="noreferrer"
            >
              <VscLink size={25} />
              <span className="px-5">
                {pinDetail.destination.length > 30
                  ? pinDetail.destination.substring(0, 30) + "..."
                  : pinDetail.destination}
              </span>
            </a>
            {/* Posted by */}
            <Link
              to={`/user-profile/${pinDetail?.postedBy._id}`}
              className="flex gap-2 mt-5 items-center bg-white rounded-lg "
            >
              <img
                src={pinDetail?.postedBy.image}
                className="w-10 h-10 rounded-full"
                alt="user-profile"
              />
              <p className="font-bold">{pinDetail?.postedBy.userName}</p>
            </Link>

            {/* Comment section */}
            <h2 className="mt-8 text-2xl">Comments</h2>
            <div className="max-h-370 overflow-y-auto">
              {pinDetail?.comments?.map((item) => (
                <div
                  className="flex gap-2 mt-5 items-center bg-white rounded-lg"
                  key={item.comment}
                >
                  <img
                    src={item.postedBy?.image}
                    className="w-10 h-10 rounded-full cursor-pointer"
                    alt="user-profile"
                  />
                  <div className="flex flex-col">
                    <p className="font-bold">{item.postedBy?.userName}</p>
                    <p>{item.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap mt-6 gap-3">
              {/* Who created this post */}
              <Link to={`/user-profile/${user._id}`}>
                <img
                  src={user.image}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  alt="user-profile"
                />
              </Link>
              {/* Adding comments */}
              <input
                className=" flex-1 border-gray-200 outline-none border-2 p-2 rounded-2xl focus:border-gray-400"
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              {/* Adding comment button */}
              <button
                type="button"
                className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                onClick={addComment}
              >
                {addingComment ? "Doing..." : "Done"}
                {/* Show toast of adding comment */}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* More from this user */}
      {pins?.length > 0 && (
        <h2 className="text-center font-bold text-2xl mt-8 mb-4">
          More from this user ({pins.length}) ▶
        </h2>
      )}
      {pins ? (
        <MasonryLayout pins={pins} />
      ) : (
        <Spinner message="Loading more pins" />
      )}
    </div>
  );
};

export default PinDetail;
