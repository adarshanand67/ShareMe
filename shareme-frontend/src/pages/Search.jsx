import { useEffect, useState } from "react";

import { client } from "../client";
import MasonryLayout from "../container/MasonryLayout";
import { feedQuery, searchQuery } from "../utils/data";

import { useToast } from "@chakra-ui/react";
import Spinner from "../components/Spinner";
import { isAlphabetorNumber } from "../utils/isAlphabetorNumber";

const Search = ({ searchTerm, setSearchTerm , searchButton}) => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (searchTerm !== "") {
      if (isAlphabetorNumber(searchTerm)) {
        setLoading(true);
        const query = searchQuery(searchTerm.toLowerCase()); // Get query
        // console.log(query)
        
        client.fetch(query).then((data) => {
          // Fetch data from sanity
          setPins(data); // Set pins that match the search term
          setLoading(false);
        });
      } else {
        // If the search term is not alphanumeric then show empty feed
        setPins([]);
        setLoading(false);

        toast({
          title: "Search term should be alphanumeric",
          status: "error",
          duration: 1000,
          isClosable: true,
          margin: "1rem",
        });
      }
    } else {
      client.fetch(feedQuery).then((data) => {
        // If the search term is empty, then fetch the feed
        setPins(data);
        setLoading(false);
      });
    }
  }, [searchTerm , searchButton]); // If search term changes then fetch data

  return (
    <div>
      {loading && <Spinner message="Searching pins" />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl ">No Pins Found!</div>
      )}
    </div>
  );
};

export default Search;
