import {
  FacebookShareButton,
  LinkedinShareButton, RedditShareButton,
  TelegramShareButton, TwitterShareButton,
  WhatsappShareButton
} from "react-share";

import {
  FacebookIcon,
  LinkedinIcon, RedditIcon,
  TelegramIcon, TwitterIcon,
  WhatsappIcon
} from "react-share";

const SocialMediaButtons = ({ url }) => {
  return (
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
