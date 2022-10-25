import React from "react";

export default function UserPost({ post }) {
  const { comments, imageSrc, likes, postId } = post;
  return (
    <div className="user__post__photo">
      <img className="w-full h-full object-cover" src={imageSrc} alt="" />
    </div>
  );
}
