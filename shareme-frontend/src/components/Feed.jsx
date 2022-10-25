import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Feed = () => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams(); // Getting category id from url

  const categoryName =
    categoryId && categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
  // Capitalize first letter of category

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);

      // Fetching query from sanity database
      client
        .fetch(query)
        .then((data) => {
          setPins(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setLoading(true);

      // Fetching query from sanity database
      client
        .fetch(feedQuery)
        .then((data) => {
          setPins(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [categoryId]); // reload when categoryId changes

  const ideaName = categoryId || "new"; // if categoryId is null then use new

  if (loading) {
    return <Spinner message={`Loading your ${ideaName} pins`} />;
  }
  // Home feed
  // {
  //   console.log(pins);
  // }
  if (pins?.length === 0) {
    return (
      <div className="text-center justify-center">
        <h1 className="text-3xl text-center text-red-500">
          Category : <span className="text-black"> {categoryName}</span>
        </h1>
        <p className="text-2xl m-5 text-center">No pins found</p>
      </div>
    );
  } else {
    return (
      <div className="text-center justify-center">
        {categoryId && (
          <h1 className="text-3xl text-center text-red-500">
            Category : <span className="text-black"> {categoryName}</span>
          </h1>
        )}
        {pins && <MasonryLayout pins={pins} />}
      </div>
    );
  }
};

export default Feed;
