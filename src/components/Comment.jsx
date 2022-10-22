import React from "react";

export default function Comment({ cmt }) {
  const { comment, displayName } = cmt;
  return (
    <div className="comment grid grid-cols-[20%_80%] items-center gap-x-4 bg-gray-background rounded">
      <div className="user__info flex gap-x-2 items-center font-bold cursor-pointer">
        <div className="user__avater">
          <img
            src="./images/avaters/karl.jpg"
            className="w-8 rounded-full"
            alt="User"
          />
        </div>
        <span>{displayName}</span>
      </div>
      <div className="">{comment}</div>
    </div>
  );
}
