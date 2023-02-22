import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import { Tooltip } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function Icon() {
  const navigate = useNavigate();
  return (
    // <Tooltip label="Email me!" aria-label="A tooltip">

    <EmailIcon
      className="fixed bottom-10 right-10  z-10 scale-150 transform cursor-pointer rounded-full bg-gray-200 p-1 text-red-500"
      size="large"
      onClick={() => navigate("/contact")}
    />
    // </Tooltip>
  );
}
