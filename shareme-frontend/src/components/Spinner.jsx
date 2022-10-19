import React from "react";
import { BounceLoader, GridLoader } from "react-spinners";
const Spinner = ({message}) => {
  return (
    // <div className="flex flex-col justify-center">
    //   <div>
    //   </div>
    //   <p className="text-lg text-center px-2">Your Feed is loading...</p>
    //   {/* <GridLoader color="#36d7b7" /> */}
    // </div>
    <div className="flex flex-col justify-center items-center w-full h-full">
      <BounceLoader color="#FF0000" />
      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
};

export default Spinner;
