import React from "react";

import {
  FaFacebookSquare,
  FaRedditSquare,
  FaWhatsappSquare,
} from "react-icons/fa";

import { BsTwitterX } from "react-icons/bs";

const SocialShareButton = ({ url, title }) => {
  return (
    <div className="w-full flex justify-between">
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://www.facebook.com/dialog/share?app_id&display=popup&href=${url}`}
      >
        {/* //developer.facebook and paste app id */}
        <FaFacebookSquare className="text-[#3b5998] w-12 h-auto" />
      </a>
      <a target="_blank" rel="noreferrer" href="#">
        <BsTwitterX className="text-[#000] w-12 h-auto" />
      </a>
      <a target="_blank" rel="noreferrer" href="#">
        <FaRedditSquare className="text-[#ff4500] w-12 h-auto" />
      </a>
      <a target="_blank" rel="noreferrer" href="#">
        <FaWhatsappSquare className="text-[#25D366] w-12 h-auto" />
      </a>
    </div>
  );
};

export default SocialShareButton;
