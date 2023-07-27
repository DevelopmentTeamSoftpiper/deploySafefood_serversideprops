import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "next-share";
import React from "react";

const SocialButton = ({ url, title, media, description }) => {
  return (
    <div>
      <FacebookShareButton
        url={url}
        title={title}
        media={media}
        description={description}
      >
        <FacebookIcon size={50} round />
      </FacebookShareButton>

      <TwitterShareButton
        url={url}
        title={title}
        media={media}
        description={description}
      >
        <TwitterIcon className="mx-3" size={50} round />
      </TwitterShareButton>
    </div>
  );
};

export default SocialButton;
