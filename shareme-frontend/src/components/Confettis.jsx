import React from "react";
import Confetti from "react-confetti";

const Confettis = () => {
  const width = 1920,
    height = 1080;
  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={500}
      recycle={false}
    />
  );
};

export default Confettis;
