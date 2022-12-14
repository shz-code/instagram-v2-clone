import React from "react";
import UserPost from "./UserPost";

export default function UserPosts({ userPosts }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-4">
      {userPosts.map((post, index) => (
        <UserPost key={index} post={post} />
      ))}
    </div>
  );
}
