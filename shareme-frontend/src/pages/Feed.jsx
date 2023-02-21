import { Footer } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { client } from "../client";
import Confettis from "../components/Confettis";
import Footers from "../components/Footers";
import { Icon } from "../components/Icon";
import Spinner from "../components/Spinner";
import MasonryLayout from "../container/MasonryLayout";
import { feedQuery, searchQuery } from "../utils/data";

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
      <div className="justify-center text-center">
        <h1 className="text-center text-3xl text-red-500">
          Category : <span className="text-black"> {categoryName}</span>
        </h1>
        <p className="m-5 text-center text-2xl">No pins found</p>
        <Footers />
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
