import React from "react";
import UserCard from "./UserCard";

export default function SuggestedUsers() {
  return (
    <div className="aside__body">
      <div className="flex justify-between">
        <span className="text-gray-base">Suggestions For You</span>
        <span className="font-bold">See All</span>
      </div>
      <div className="aside__body__userCards flex justify-between items-center py-4">
        <UserCard />
      </div>
    </div>
  );
}
