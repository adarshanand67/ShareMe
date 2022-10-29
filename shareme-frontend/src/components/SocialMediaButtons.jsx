import { Tooltip, Typography } from "@mui/material";
import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
} from "react-share";

const SocialMediaButtons = () => {
  // const currentUrl = window.location.href; // Get current url
  const currentUrl = "https://share-me-web.netlify.app/";

  return (
    // Send all buttons to bottom right
    <div className="flex items-end justify-center mb-5 mt2 gap-3">
      <hr />
      <h1 className="text-3xl">Share Website on - </h1>
      
      <Tooltip title="Facebook" placement="top">
        <FacebookShareButton url={currentUrl}>
          <FacebookIcon
            size={48}
            round={true}
            title="Share Me - by Adarsh Anand"
          />
        </FacebookShareButton>
      </Tooltip>

      <Tooltip title="Twitter" placement="top">
        <TwitterShareButton url={currentUrl}>
          <TwitterIcon
            size={48}
            round={true}
            title="Share Me - by Adarsh Anand"
          />
        </TwitterShareButton>
      </Tooltip>

      <Tooltip title="Whatsapp" placement="top">
        <WhatsappShareButton url={currentUrl}>
          <WhatsappIcon
            size={48}
            round={true}
            title="Share Me - by Adarsh Anand"
          />
        </WhatsappShareButton>
      </Tooltip>

      <Tooltip title="Linkedin" placement="top">
        <LinkedinShareButton url={currentUrl}>
          <LinkedinIcon
            size={48}
            round={true}
            title="Share Me - by Adarsh Anand"
          />
        </LinkedinShareButton>
      </Tooltip>

      <Tooltip title="Pinterest" placement="top">
        <PinterestShareButton url={currentUrl}>
          <PinterestIcon
            size={48}
            round={true}
            title="Share Me - by Adarsh Anand"
          />
        </PinterestShareButton>
      </Tooltip>

      <Tooltip title="Reddit" placement="top">
        <RedditShareButton url={currentUrl}>
          <RedditIcon
            size={48}
            round={true}
            title="Share Me - by Adarsh Anand"
          />
        </RedditShareButton>
      </Tooltip>

      <Tooltip title="Tumblr" placement="top">
        <TumblrShareButton url={currentUrl}>
          <TumblrIcon
            size={48}
            round={true}
            title="Share Me - by Adarsh Anand"
          />
        </TumblrShareButton>
      </Tooltip>

      <Tooltip title="Telegram" placement="top">
        <TelegramShareButton url={currentUrl}>
          <TelegramIcon
            size={48}
            round={true}
            title="Share Me - by Adarsh Anand"
          />
        </TelegramShareButton>
      </Tooltip>
    </div>
  );
};

export default SocialMediaButtons;
