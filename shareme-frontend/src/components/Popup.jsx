// import React from "react";
// import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";

// export default () => (
//   <Popup trigger={<button> Trigger</button>} position="right center">
//     <div>Popup content here !!</div>
//   </Popup>
// );

import React from "react";
import Popup from "reactjs-popup";

const Popups = () => {
  return (
    <div>
      <Popup trigger={<button> Trigger</button>} position="right center">
        <div>Popup content here !!</div>
      </Popup>
    </div>
  );
};

export default Popup;
