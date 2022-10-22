import React from "react";
import { Link } from "react-router-dom";

export default function UserCard({ profile }) {
  console.log(profile);
  const { username, fullName, userId } = profile;
  return (
    <>
      <div className=" flex justify-between items-center py-4">
        <div className="user__avater flex gap-x-2 items-center">
          <div className="user__profile">
            <img
              src="./images/avaters/karl.jpg"
              className="w-12 rounded-full"
              alt=""
            />
          </div>
          <div className="user__name grid">
            <span className="font-bold">{username}</span>
            <span className="text-gray-base">{fullName}</span>
          </div>
        </div>
        <Link to="/public" className="logout text-blue-medium font-bold">
          Follow
        </Link>
      </div>
    </>
  );
}
