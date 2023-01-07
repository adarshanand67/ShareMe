import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { useToast } from "@chakra-ui/react";
import { client } from "../client";
import { categories } from "../utils/data";
import Spinner from "./Spinner";

const CreatePin = ({ user }) => {
  const [loading, setLoading] = useState(false);

  // Data of uploaded pin
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState();
  const [fields, setFields] = useState();
  const [category, setCategory] = useState();
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate(); // Navigate to a new page
  const toast = useToast();

  const uploadImage = (e) => {
    const file = e.target.files[0];
    // uploading asset to sanity
    if (
      file.type === "image/png" ||
      file.type === "image/svg" ||
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/tiff" ||
      file.type === "image/webp" ||
      file.type === "video/mp4"
    ) {
      setWrongImageType(false); // If image type is correct
      setLoading(true);
      client.assets // Upload image to sanity
        .upload("image", file, {
          contentType: file.type,
          filename: file.name,
        })
        .then((document) => {
          // After upload the got document
          setImageAsset(document);
          toast({
            title: "📷 Image uploaded successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.log("Upload failed:", error.message);
        });
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };

  const savePin = () => {
    // Save pin if all fields given to sanity database
    if (title && about && destination && imageAsset?._id && category) {
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
      toast({
        title: "📌 Pin created successfully, wait for ~10 seconds to see it",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      client.create(doc).then(() => {
        navigate("/"); // Create pin and navigate to home page
      });
    } else {
      setFields(true);

      setTimeout(() => {
        // After 2 seconds set fields to false
        setFields(false);
      }, 2000);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {/* When some field is empty */}

      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in ">
          Please add all fields.
        </p>
      )}
      <div className=" flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5  w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {/* Image Loading */}
            {loading && <Spinner />}
            {/* IF wrong image type */}
            {wrongImageType && <p>It&apos;s wrong file type.</p>}
            {/* Adding Image */}
            {!imageAsset ? (
              <label htmlFor="file" className="cursor-pointer">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to upload</p>
                  </div>

                  <p className="mt-32 text-gray-400">
                    Recommendation: Use JPG, JPEG, SVG, PNG, GIF or TIFF image
                    less than 20MB
                  </p>
                </div>
                <input
                  type="file"
                  id="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
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
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Writing Title */}
        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          {user && (
            <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg ">
              <img
                src={user.image}
                className="w-10 h-10 rounded-full"
                alt="user"
              />
              <p className="font-bold">{user.userName}</p>
            </div>
          )}
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Set title
            placeholder="Add your title"
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
            onKeyDownCapture={(e) => {
              if (e.key === "Enter") {
                savePin();
              }
            }}
          />

          {/* Writing About */}
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Tell everyone what your Pin is about"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
            onKeyDownCapture={(e) => {
              if (e.key === "Enter") {
                savePin();
              }
            }}
          />
          {/* Writing destination */}
          <input
            type="url"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Add destination URL"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
            onKeyDownCapture={(e) => {
              if (e.key === "Enter") {
                savePin();
              }
            }}
          />

          {/* Selecting Category */}
          <div className="flex flex-col">
            <div>
              <p className="mb-2 font-semibold text:lg sm:text-xl">
                Choose Pin Category
              </p>
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option value="others" className="sm:text-bg">
                  Select Category
                </option>
                {categories.map((item) => (
                  <option
                    className="text-base border-0 outline-none capitalize  "
                    value={item.name}
                    key={item._id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Save Pin Button */}
            <div className="flex justify-end items-end mt-5">
              <button
                type="button"
                onClick={savePin}
                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
              >
                Save Pin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// TODO - sanitizing form data react

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

export default CreatePin;
