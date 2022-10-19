import React from "react";
import { urlFor } from "../client";

const Pin = ({ pin }) => {
  const { image, title, about, destination, postedBy, save, comments } = pin;
  // if image is null
  if (!image) {
    return null;
  } else {
    return (
      <div>
        {/* <Pin key={pin._id} pin={pin} className="w-max" /> */}
        <img
          className="rounded-lg w-full"
          alt="pin"
          src={urlFor(image).width(250).url()}
        />
      </div>
    );
  }
};

export default Pin;
