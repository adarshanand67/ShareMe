import React, { useEffect, useState } from "react";

import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import MasonryLayout from "../container/MasonryLayout";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "../components/Spinner";
import { isAlphabetorNumber } from "../utils/isAlphabetorNumber";

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const showErrorMessage = () => {
    toast.error('Search term should be alphanumeric', {
        position: toast.POSITION.BOTTOM_CENTER
    });
  };

  useEffect(() => {
    if (searchTerm !== "") {
      if (isAlphabetorNumber(searchTerm)) {
        setLoading(true);
        const query = searchQuery(searchTerm.toLowerCase()); // Get query
        client.fetch(query).then((data) => {
          // Fetch data from sanity
          setPins(data);
          setLoading(false);
          console.log(data);
          // console.log(data[0].postedBy.userName);
        });
      } else {
        client.fetch(feedQuery).then((data) => {
          setPins(data);
          setLoading(false);
        });
        showErrorMessage()
      }
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [searchTerm]); // If search term changes then fetch data


  // console.log(pins);
  return (
    <div>
      {loading && <Spinner message="Searching pins" />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl ">No Pins Found!</div>
      )}
      <ToastContainer/>
    </div>
  );
};

export default Search;
