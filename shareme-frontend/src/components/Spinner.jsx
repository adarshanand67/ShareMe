import React from "react";
import { BounceLoader, SyncLoader } from "react-spinners";

// Change spinners
const Spinner = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-5 mt-5">
      <SyncLoader
        color="#f44336"
        aria-label="Loading Spinner"
        data-testid="loader"
        size={20}
      />
      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
};

export default Spinner;
