import React from "react";
import { Link } from "react-router-dom";

export function UserProfilePhoto(user) {
  return (
    <Link to={`user/${user?.uid}`} className="hidden md:block">
      <img
        src={user?.photoURL || user?.user}
        alt="user-pic"
        className="w-14 h-12 rounded-lg "
      />
    </Link>
  );
}
