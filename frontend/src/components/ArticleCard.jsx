import React from "react";
import { images } from "./../constants";

import { BsCheckLg } from "react-icons/bs";

const ArticleCard = ({ className }) => {
  return (
    <div
      className={`rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${className}`}
    >
      <img
        src={images.Post1Image}
        alt="title"
        className="w-full object-cover object-center h-auto mg:h-52 lg:h-48 xl:h-60"
      />

      <div className="p-5">
        <h2 className="font-roboto font-bold text-xl text-dark-soft md:text-2xl lg:text-[28px]">
          Future of Work
        </h2>
        <p className="text-dark-light text-sm md:text-lg">
          Majority of peole will work in jobs that don’t exist today.
        </p>

        <div className="flex justify-between flex-nowrap items-center mt-6">
          <div className="flex items-center gap-x-2 gap-x-2.5">
            <img src={images.PostProfile} alt="profile" className="w-9 h-9 md:w-10 md:h-10"/>
            <dir className="flex flex-col">
              <h4 className="font-bold italic text-dark-soft text-sm mg:text-base">
                Viola Manisa
              </h4>
              <div className="flex items-center gap-x-2">
                <span className="bg-[#36B37E] w-fit bg-opacity-20 p-1.5 rounded-full">
                  <BsCheckLg className="h-1.5 w-1.5 text-[#36B37E]"/>
                </span>
                <span className="italic text-dark-light text-xs md:text-sm">Verified writer</span>
              </div>
            </dir>
          </div>
          <span className="font-bold text-dark-light italic text-sm md:text-base">02 May</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
