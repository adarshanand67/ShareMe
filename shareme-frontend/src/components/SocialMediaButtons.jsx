import React from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const SocialMediaButtons = ({ url }) => {
  // const url = props.url;
  // let HomeURL = "https://share-me-web.netlify.app/";


  return (
    // Send all buttons to bottom right
    <div className="mt2 mb-5 flex items-end justify-center gap-3">
      {/* Socials */}
      <FacebookShareButton url={url}>
        <FacebookIcon
          size={48}
          round={true}
          title="ShareMe - Next Gen Social Media Website"
        />
      </FacebookShareButton>

      <TwitterShareButton url={url}>
        <TwitterIcon
          size={48}
          round={true}
          title="ShareMe - Next Gen Social Media Website"
        />
      </TwitterShareButton>

      <WhatsappShareButton url={url}>
        <WhatsappIcon
          size={48}
          round={true}
          title="ShareMe - Next Gen Social Media Website"
        />
      </WhatsappShareButton>

      <LinkedinShareButton url={url}>
        <LinkedinIcon
          size={48}
          round={true}
          title="ShareMe - Next Gen Social Media Website"
        />
      </LinkedinShareButton>

      <RedditShareButton url={url}>
        <RedditIcon
          size={48}
          round={true}
          title="ShareMe - Next Gen Social Media Website"
        />
      </RedditShareButton>

      <TelegramShareButton url={url}>
        <TelegramIcon
          size={48}
          round={true}
          title="ShareMe - Next Gen Social Media Website"
        />
      </TelegramShareButton>
    </div>
  );
};

export default SocialMediaButtons;
