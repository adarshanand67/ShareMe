import PropTypes from "prop-types";
import React from "react";
// import vertical line from react icons
import {
  IoIosLink,
  IoMdAdd,
  IoMdClose,
  IoMdMic,
  IoMdSearch,
} from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { fetchUser } from "../utils/fetchUser";

const MicActiveStyles = "bg-red-500 text-white";
const MicInactiveStyles = "bg-gray-300 text-gray-500";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const user = fetchUser();
  // console.log(user);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const navigateToSearch = () => {
    navigate("/search");
  };

  if (user) {
    return (
      <div className="mt-5 flex w-full gap-2 p-2 md:gap-5 ">
        <div className="flex w-full items-center justify-start rounded-full border-none bg-gray-300 px-5 outline-none focus-within:shadow-sm">
          {/* Searchbar */}
          <IoMdSearch fontSize={21} className="ml-1" />
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Pins"
            value={searchTerm}
            onFocus={() => navigate("/search")}
            onBlur={() => setSearchTerm("")} // Clear search term when user clicks outside
            className="w-full bg-gray-300 p-2 outline-none"
          />
          {/* Close button */}
          <button
            className="ml-2 rounded-full bg-gray-300 p-2 text-gray-500"
            onClick={() => setSearchTerm("")}
          >
            <IoMdClose fontSize={21} />
          </button>
        </div>

        {/* Voice search */}
        {browserSupportsSpeechRecognition ? (
          <button
            className={`ml-2 rounded-full p-4 hover:bg-red-400
            ${listening ? MicActiveStyles : MicInactiveStyles}`}
            onClick={
              listening
                ? resetTranscript && setSearchTerm(transcript)
                : () => {
                    navigateToSearch();
                    SpeechRecognition.startListening();
                  }
            }
          >
            <IoMdMic fontSize={21} />
          </button>
        ) : null}

        {/* User Profile */}
        <div className="flex items-center gap-5">
          <Link
            to={`user/${user?.uid}`}
            className="mx-3 flex h-12 w-12 items-center justify-center rounded-full"
            // onClick={handleCloseSidebar}
          >
            <img src={user?.photoURL} className="rounded-lg" alt="user" />
          </Link>
          {/* Creating new pin */}
          <Link
            to="/create-pin"
            className="flex items-center justify-center rounded-lg bg-black text-white md:h-12 md:w-14"
          >
            <IoMdAdd />
          </Link>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Navbar;

// Props validation
Navbar.propTypes = {
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
  user: PropTypes.object,
};
