import React from "react";

export default function Comment({ cmt }) {
  const { comment, displayName } = cmt;
  return (
    <div className="comment grid grid-cols-[20%_80%] items-center gap-x-4 bg-gray-background rounded">
      <div className="user__info grid gap-x-2 grid-cols-[40%_60%] items-center font-bold cursor-pointer">
        <div className="user__avater">
          <img
            src="./images/avaters/karl.jpg"
            className="w-8 rounded-full"
            alt="User"
          />
        </div>
        <span className="break-words">{displayName}</span>
      </div>
      <div className="">{comment}</div>
    </div>
  );
}
