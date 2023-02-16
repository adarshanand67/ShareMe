import React from "react";
import Confetti from "react-confetti";

const Confettis = () => {
  const width = window.innerWidth,
    height = window.innerHeight;
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
