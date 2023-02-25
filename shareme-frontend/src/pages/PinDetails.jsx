import { useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { MdDownloadForOffline } from "react-icons/md";
import { VscLink, VscTag } from "react-icons/vsc";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { client, urlFor } from "../client";
<<<<<<< HEAD
import SocialMediaButtons from "../components/SocialMediaButtons";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data";
import MasonryLayout from "../container/MasonryLayout";
import Spinner from "../components/Spinner";
=======
import Footers from "../components/Footers";
import Spinner from "../components/Spinner";
import MasonryLayout from "../container/MasonryLayout";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data";

>>>>>>> parent of 4f3b0cc (Merge branch 'pr/53')
const PinDetail = ({ user }) => {
  // console.log(user);
  const { pinId } = useParams(); // Get pin id from url

  const [pins, setPins] = useState();
  const [pinDetail, setPinDetail] = useState();
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
<<<<<<< HEAD
  const showCommentToast = () => {
    toast.success('Comment added will be added soon', {
        position: toast.POSITION.BOTTOM_CENTER
    });
  };
  const navigate = useNavigate();

=======
  const [isLiked, setIsLiked] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
>>>>>>> parent of 4f3b0cc (Merge branch 'pr/53')

  let category = pinDetail?.category;
  category = capitalizeFirstLetter(category);

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
            postedBy: { _type: "postedBy", _ref: user?._id }, // Reference to user
          },
        ])
        .commit() // Commit the changes
        .then(() => {
          // After commit
          fetchPinDetails(); // Fetch pin details
          setComment(""); // Clear comment
          navigate("/"); // Navigate to pin details page
<<<<<<< HEAD

=======
          toast({
            title: "Comment added will be added soon",
            description: "Writing your comment to Database",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
>>>>>>> parent of 4f3b0cc (Merge branch 'pr/53')
          setAddingComment(false); // Set adding comment to false
        });
    }
  };

  // Loading Pin
  if (!pinDetail) {
    return <Spinner message="Showing pin" />;
  }

  // const BASE_URL = "https://share-me-web.netlify.app/";
  // const POST_URL = BASE_URL + "pin-detzail/" + pinId;
  const currentUrl = window.location.href; // Get current url

  const likes = pinDetail?.likes || 0;
  // console.log(likes);

  // const handleLike = () => {
  //   setIsLiked(!isLiked);

  //   const currentLikes = localStorage.getItem("likes") || 0;
  //   // console.log("Current Likes : ", currentLikes);

  //   const newLikes = parseInt(currentLikes) + 1;
  //   console.log("New Likes : ", newLikes);

  //   // Set new likes to local storage
  //   localStorage.setItem("likes", newLikes);

  //   // Post likes to database
  //   // Get a reference to the document in the database
  //   client
  //     .patch(pinId)
  //     // If the document does not exist, create a new document with a default value
  //     .setIfMissing({ likes: 0 })
  //     // Increment the likes field by 1
  //     .inc({ likes: 1 })
  //     // Commit the changes
  //     .commit()
  //     // Update the UI with the latest data
  //     .then(() => {
  //       // Fetch pin details
  //       fetchPinDetails();
  //     });

  //   toast({
  //     title: "Liked",
  //     description: "You liked the pin",
  //     status: "success",
  //     duration: 3000,
  //     isClosable: true,
  //   });
  // };

  // const handleUnlike = () => {
  //   // console.log("Unliked");
  //   setIsLiked(!isLiked);

  //   toast({
  //     title: "Unliked",
  //     description: "You unliked the pin",
  //     status: "error",
  //     duration: 3000,
  //     isClosable: true,
  //   });
  // };

  return (
    <div>
      {/* Pin exists */}

      {pinDetail && (
        <div
          className="m-auto flex w-full flex-col gap-5 rounded-lg bg-white shadow-lg xl:flex-row"
          style={{ maxWidth: "1500px", borderRadius: "32px" }}
        >
          {/* Image */}
          <div className="flex items-center justify-center gap-5">
            <img
              className="rounded-t-3xl rounded-b-lg"
              src={pinDetail?.image && urlFor(pinDetail?.image).url()}
              alt="user-post"
            />
          </div>
          <div className="w-full flex-1 gap-5 p-5 xl:min-w-620">
            {/* Title about */}
            <div>
              <h1 className="break-words text-4xl font-bold">
                {pinDetail.title}
              </h1>
              <p className="mt-3">{pinDetail.about}</p>
            </div>

            <div className="mt-5 flex items-center justify-between gap-5">
              <div className="flex items-center gap-2">
                {/* Download icon */}
                <a
                  href={`${pinDetail.image.asset.url}?dl=`}
                  download
                  className="flex items-center justify-center rounded-full bg-red-600 p-2 text-xl text-white opacity-75 hover:opacity-100"
                >
                  <MdDownloadForOffline size={25} />
                  <span className="px-2"> Download</span>
                </a>
              </div>
              {/* Showing Likes */}

              <div className="flex items-center gap-2">
                {/* Showing Tags */}
                <a
                  className="flex items-center justify-center rounded-full bg-red-600 p-2 text-xl text-white opacity-75 hover:opacity-100"
                  href={`/category/${category}`}
                >
                  <VscTag size={25} />
                  <span className="px-5 "> {category}</span>
                </a>
              </div>
            </div>
            {/* Link */}
            <a
              className="mt-5 flex rounded-full border-black p-2 text-xl text-black opacity-75 hover:border hover:opacity-100 "
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
            <div className="flex justify-between">
              {/* Posted by */}
              <div>
                <Link
                  to={`/user/${pinDetail?.postedBy._id}`}
                  className="mt-5 flex items-center gap-2 rounded-lg bg-white "
                >
                  <img
                    src={pinDetail?.postedBy.image}
                    className="h-10 w-10 rounded-full"
                    alt="user"
                  />
                  <p className="font-bold">{pinDetail?.postedBy.userName}</p>
                </Link>
              </div>
              {/* <div className="mt-5 flex items-center gap-2">
                <span className="text-2xl font-bold">
                  {isLiked ? (
                    <div>
                      <AiFillLike
                        size={25}
                        className="text-red-600"
                        onClick={handleUnlike}
                      />
                    </div>
                  ) : (
                    <div>
                      <AiOutlineLike
                        size={25}
                        className="text-red-600"
                        onClick={handleLike}
                      />
                    </div>
                  )}
                </span>
                <div className="text-2xl">
                  <span className="font-bold">{pinDetail?.likes}</span>
                  <span className="text-gray-500"> Likes</span>
                </div>
              </div> */}
            </div>

            {/* Comment section */}
            <h2 className="mt-8 text-2xl">Comments</h2>
            <div className="max-h-370 overflow-y-auto">
              {pinDetail?.comments?.map((item) => (
                <div
                  className="mt-5 flex items-center gap-2 rounded-lg bg-white"
                  key={item.comment}
                >
                  <img
                    src={item.postedBy?.image}
                    className="h-10 w-10 cursor-pointer rounded-full"
                    alt="user"
                  />
                  <div className="flex flex-col">
                    <p className="font-bold">{item.postedBy?.userName}</p>
                    <p>{item.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {/* Who created this post */}
              <Link to={`/user/${user._id}`}>
                <img
                  src={user.image}
                  className="h-10 w-10 cursor-pointer rounded-full"
                  alt="user"
                />
              </Link>

              {/* Adding comments */}
              <input
                className=" flex-1 rounded-2xl border-2 border-gray-200 p-2 outline-none focus:border-gray-400"
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              {/* Adding comment button */}
              <button
                type="button"
                className="rounded-full bg-red-500 px-6 py-2 text-base font-semibold text-white outline-none"
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
        <h2 className="mt-8 mb-4 text-center text-2xl font-bold">
          More from the category :{" "}
          <Link to={`/category/${category}`} className="text-red-600">
            {category}! 🔗
          </Link>
          {/* ({pins.length}) */}
        </h2>
      )}
      {pins ? (
        <>
          <MasonryLayout pins={pins} />
          <Footers />
        </>
      ) : (
        <Spinner message="Loading more pins" />
      )}
    </div>
  );
};

export default PinDetail;
