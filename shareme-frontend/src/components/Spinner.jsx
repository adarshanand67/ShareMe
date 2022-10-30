import React from "react";
import { BounceLoader } from "react-spinners";

// Change spinners
const Spinner = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-5">
      <BounceLoader
        color="#FF0000"
        aria-label="Loading Spinner"
        data-testid="loader"
        size={150}
      />
      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
};

export default Spinner;
