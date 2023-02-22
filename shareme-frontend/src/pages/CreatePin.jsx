import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import { client } from "../client";
import Confettis from "../components/Confettis";
import Spinner from "../components/Spinner";
import { categories } from "../utils/data";

const CreatePin = ({ user }) => {
  const [loading, setLoading] = useState(false);

  // Data of uploaded pin
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState();
  const [fields, setFields] = useState();
  const [category, setCategory] = useState();
  const [imageAsset, setImageAsset] = useState();
  const [showConfetti, setShowConfetti] = useState(false);
  const [wrongImageType, setWrongImageType] = useState(false);
  const toast = useToast();

  const navigate = useNavigate(); // Navigate to a new page

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];

    if (isImageTypeValid(selectedFile)) {
      setLoading(true);
      uploadImageToSanity(selectedFile)
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log("Upload failed:", error.message);
        });
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };

  const isImageTypeValid = (file) => {
    return (
      file.type === "image/png" ||
      file.type === "image/svg" ||
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/tiff"
    );
  };

  const uploadImageToSanity = (file) =>
    client.assets.upload("image", file, {
      contentType: file.type,
      filename: file.name,
    });

  const savePin = () => {
    if (fieldsMissing()) {
      setFields(true);
      setTimeout(() => setFields(false), 2000);
    } else {
      setShowConfetti(true);
      createPin();
      toast({
        title: "Pin created successfully.",
        description: "Your pin will be visible after 10 seconds.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const fieldsMissing = () =>
    !title || !about || !destination || !imageAsset?._id || !category;

  const createPin = () => {
    const doc = {
      _type: "pin",
      title,
      about,
      destination,
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset?._id,
        },
      },
      userId: user._id,
      postedBy: {
        _type: "postedBy",
        _ref: user._id,
      },
      category,
    };

    client.create(doc).then(() => {
      setTimeout(() => {
        navigate("/"); // Create pin and navigate to home page
      }, 3000);
    });
  };
  return (
    <div className="mt-5 flex flex-col items-center justify-center lg:h-4/5">
      {/* When some field is empty */}
      {fields && (
        <p className="mb-5 text-xl text-red-500 transition-all duration-150 ease-in ">
          Please add all fields.
        </p>
      )}
      <div className=" flex w-full flex-col items-center justify-center bg-red-100 p-3 lg:w-4/5 lg:flex-row  lg:p-5">
        <div className="flex w-full flex-0.7 p-3">
          <div className=" flex h-420 w-full flex-col items-center justify-center border-2 border-dotted border-gray-300 p-3">
            {/* Image Loading */}
            {loading && <Spinner />}
            {/* IF wrong image type */}
            {wrongImageType && <p>It&apos;s wrong file type.</p>}
            {/* Adding Image */}
            {!imageAsset ? (
              //  {/*eslint-disable-next-line jsx-a11y/label-has-associated-control*/}
              <label htmlFor="file" className="cursor-pointer">
                <div className="flex h-full flex-col items-center justify-center">
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to upload</p>
                  </div>

                  <p className="mt-32 text-gray-400">
                    Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or
                    TIFF less than 20MB
                  </p>
                </div>
                <input
                  type="file"
                  id="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="h-0 w-0"
                />
              </label>
            ) : (
              // Image Preview (Already uploaded)
              <div className="relative h-full">
                <img
                  src={imageAsset?.url}
                  alt="uploaded-pic"
                  className="h-full w-full"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 cursor-pointer rounded-full bg-red-100 p-3 text-xl outline-none transition-all duration-500 ease-in-out hover:shadow-md"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Writing Title */}

        <div className="mt-5 flex w-full flex-1 flex-col gap-6 lg:pl-5">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Set title
            placeholder="Add your title"
            className="border-b-2 border-gray-300 bg-red-100 p-2 text-2xl font-bold outline-none sm:text-3xl"
          />

          {/* Writing About */}
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Tell everyone what your Pin is about"
            className="border-b-2 border-gray-300 bg-red-100 p-2 text-base outline-none sm:text-lg"
          />
          {/* Writing destination */}
          <input
            type="url"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Add a destination link"
            className="border-b-2 border-gray-300 bg-red-100 p-2 text-base outline-none sm:text-lg"
          />

          {/* Selecting Category */}
          <div className="flex flex-col">
            <div>
              <p className="text:lg mb-2 font-semibold sm:text-xl">
                Choose Pin Category
              </p>
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="w-4/5 cursor-pointer rounded-md border-b-2 border-gray-300 bg-red-100 p-2 text-base outline-none"
              >
                <option
                  value="others"
                  className="sm:text-bg border-b-2 border-gray-300 bg-red-100"
                >
                  Select Category
                </option>
                {categories.map((item) => (
                  <option
                    className="border-0 border-b-2 border-gray-300 bg-red-100 text-base capitalize text-black outline-none "
                    value={item.name}
                    key={item._id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5 flex items-end justify-end gap-3">
              {/* Cancel button */}
              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-28 rounded-full bg-black p-2 font-bold text-white outline-none"
              >
                Cancel
              </button>
              {/* Save Pin Button */}
              <button
                type="button"
                onClick={savePin}
                className="w-28 rounded-full bg-red-500 p-2 font-bold text-white outline-none"
              >
                Save Pin
              </button>
            </div>
          </div>
        </div>
      </div>
      {user && (
        <div className="mx-auto mt-2 mb-2 flex items-center gap-2 rounded-lg bg-red-300 p-3 ">
          <Link to={`/user/${user._id}`}>
            <img
              src={user.image}
              className="h-10 w-10 rounded-full"
              alt="user-profile"
            />
          </Link>
          <Link to={`/user/${user._id}`}>
            <p className="font-bold">{user.userName}</p>
          </Link>
        </div>
      )}
      {/* Confetti */}
      {showConfetti ? <Confettis /> : null}
    </div>
  );
};

export default CreatePin;
