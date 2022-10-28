import React from "react";
import { Link } from "react-router-dom";

export default function Comment({ cmt }) {
  const { comment, displayName, profilePhotoUrl, userId } = cmt;
  return (
    <div className="comment grid grid-cols-[30%_70%] items-center gap-x-4 bg-gray-background rounded">
      <div className="user__info grid gap-x-2 grid-cols-[30%_70%] items-center font-bold cursor-pointer">
        <div className="user__avater">
          <img
            src={
              profilePhotoUrl ? profilePhotoUrl : "./images/avaters/karl.jpg"
            }
            className="w-8 rounded-full"
            alt="User"
          />
        </div>
        <Link to={userId && `/p/${userId}`} className="break-words">
          {displayName}
        </Link>
      </div>
      <div>{comment}</div>
    </div>
  );
}
