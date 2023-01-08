import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import { Tooltip } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function Icon() {
  const navigate = useNavigate();
  return (
    // <Tooltip label="Email me!" aria-label="A tooltip">

      <EmailIcon
        className="fixed bottom-10 right-10  text-red-500 cursor-pointer transform scale-150 z-10 bg-gray-200 rounded-full p-1"
        size="large"
        onClick={() => navigate("/contact")}
      />
    // </Tooltip>
  );
}
