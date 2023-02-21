import { Footer } from "flowbite-react";
import React, { useState } from "react";
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import SocialMediaButtons from "./SocialMediaButtons";

const Footers = () => {
  const url = window.location.href;
  return (
    <>
      <div className="mt-2 w-full">
        {/* <Footer.Divider /> */}
        <h1 className="mb-2 text-center text-2xl">Help us spread the word!</h1>
        <SocialMediaButtons url={url} text="ShareMe™ - Documenting your life" />
        <div className="flex w-full justify-center pb-2">
          <hr />

          <Footer.Copyright href="#" by="ShareMe™" year={2023} />
        </div>
      </div>
    </>
  );
};

export default Footers;
