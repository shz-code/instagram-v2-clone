import React from "react";
import UserCard from "./UserCard";

export default function Aside() {
  return (
    <div className="aside text-sm w-full">
      <div className="aside__header py-4 flex justify-between items-center">
        <div className="user__avater flex gap-x-2 items-center">
          <div className="user__profile">
            <img
              src="./images/avaters/dali.jpg"
              className="w-12 rounded-full"
              alt=""
            />
          </div>
          <div className="user__name grid">
            <span className="font-bold">karl</span>
            <span className="text-gray-base">Dust</span>
          </div>
        </div>
        <div className="logout text-blue-medium font-bold">Logout</div>
      </div>
      <div className="aside__body">
        <div className="flex justify-between">
          <span className="text-gray-base">Suggestions For You</span>
          <span className="font-bold">See All</span>
        </div>
        <div className="aside__body__userCards flex justify-between items-center py-4">
          <UserCard />
        </div>
      </div>
    </div>
  );
}
