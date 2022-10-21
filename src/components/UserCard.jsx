import React from "react";

export default function UserCard() {
  return (
    <>
      <div className="user__avater flex gap-x-2 items-center">
        <div className="user__profile">
          <img
            src="./images/avaters/karl.jpg"
            className="w-12 rounded-full"
            alt=""
          />
        </div>
        <div className="user__name grid">
          <span className="font-bold">shz</span>
          <span className="text-gray-base">pixxy</span>
        </div>
      </div>
      <div className="logout text-blue-medium font-bold">Follow</div>
    </>
  );
}
