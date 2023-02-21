import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import Confettis from "./Confettis";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { Icon } from "./Icon";
import { Footer } from "flowbite-react";
import Footers from "./Footers";

const Feed = () => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);

  const { categoryId } = useParams(); // Getting category id from url

  const navigate = useNavigate();
  // Capitalize first letter of category
  const categoryName =
    categoryId && categoryId.charAt(0).toUpperCase() + categoryId.slice(1);

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

  if (pins?.length === 0) {
    return (
      <div className="text-center justify-center">
        <h1 className="text-3xl text-center text-red-500">
          Category : <span className="text-black"> {categoryName}</span>
        </h1>
        <p className="text-2xl m-5 text-center">No pins found</p>
        <Footers/>
      </div>
    );
  } else {
    return (
      <div className="justify-center text-center">
        {categoryId && (
          <h1 className="text-center text-3xl text-red-500">
            Category : <span className="text-black"> {categoryName}</span>
          </h1>
        )}
        {pins && <MasonryLayout pins={pins} />}
        <Footers />
      </div>
    );
  }
};

export default Feed;
