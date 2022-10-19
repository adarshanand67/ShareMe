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
  const { categoryID } = useParams(); // take categoryID from URL
  useEffect(() => {
    if (categoryID) {
      // Get all the pins of the category
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
  console.log(pins);
  if (loading) {
    // return
    return <Spinner message="We are adding new Ideas to your feed" />;
  } else {
    return <div className="">{pins && <MasonryLayout pins={pins} />}</div>;
  }
};

export default Feed;
