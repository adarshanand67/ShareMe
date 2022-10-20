import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout.jsx";
import Spinner from "./Spinner.jsx";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState([]);
  const categoryID = useParams().categoryId?.toLocaleUpperCase();

  console.log(categoryID);
  useEffect(() => {
    // Get all the pins of the category
    if (categoryID?.length > 0) {
      setLoading(true);
      const query = searchQuery(categoryID); // get query for categoryID
      client
        .fetch(query)
        .then((res) => {
          setLoading(false);
          setPins(res);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      // Get all the pins regardless of category
      client.fetch(feedQuery).then((res) => {
        setPins(res);
        setLoading(false);
      });
    }
  }, [categoryID]); // Whenever category ID Changes fetch data for that category
  // console.log(pins);

  if (loading) {
    return <Spinner message="Loading your beautiful page!" />;
  }

  if (!pins?.length) {
    return (
      <div>
        <h1 className="text-3xl text-center text-red-500">
          Category : <span className="text-black"> {categoryID}</span>
        </h1>
        <p className="text-2xl m-5 text-center">No pins found</p>
      </div>
    );
  }
  if (categoryID == undefined) {
    return (
      <div className="text-center justify-center">
        <h1 className="text-3xl text-center text-red-500">
          Category : <span className="text-black"> {categoryID}</span>
        </h1>
        {pins && <MasonryLayout pins={pins} />}
      </div>
    );
  }
};

export default Feed;
