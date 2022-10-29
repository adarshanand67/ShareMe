import React, { useEffect, useState } from "react";

import MasonryLayout from "./MasonryLayout";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";

import Spinner from "./Spinner";
import { Switch, Route, Redirect } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

function isAlphabetorNumber(str) {
  // return /^[a-zA-Z0-9]+$/.test(str);
  let flag = true;
  for (let i = 0; i < str.length; i++) {
    if (
      !(
        (str[i] >= "a" && str[i] <= "z") ||
        (str[i] >= "A" && str[i] <= "Z") ||
        (str[i] >= "0" && str[i] <= "9")
      )
    ) {
      flag = false;
    }
  }
  return flag;
}

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (searchTerm !== "") {
      if (isAlphabetorNumber(searchTerm)) {
        setLoading(true);
        const query = searchQuery(searchTerm.toLowerCase()); // Get query
        client.fetch(query).then((data) => {
          // Fetch data from sanity
          setPins(data);
          setLoading(false);
        });
      } else {
        client.fetch(feedQuery).then((data) => {
          setPins(data);
          setLoading(false);
        });
        toast({
          title: "Search term should be alphanumeric",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      }
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [searchTerm]); // If search term changes then fetch data

  return (
    <div>
      {loading && <Spinner message="Searching pins" />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl ">No Pins Found!</div>
      )}
      {/* If no pins found */}
    </div>
  );
};

export default Search;
