import "boxicons";
import React from "react";
import style from "../assets/css/UserPost.module.css";

export default function UserPost({ post }) {
  const { comments, imageSrc, likes, postId } = post;
  return (
    <div className={`${style.user__post__photo} relative cursor-pointer`}>
      <img className="w-full h-full object-cover" src={imageSrc} alt="" />
      <div
        className={`absolute top-0 left-0 bg-black-light/25 text-white h-full w-full justify-center items-center hidden gap-x-4 ${style.user__post__states} transition-all`}
      >
        <span className="flex items-center gap-x-1">
          <box-icon type="solid" name="heart" color="white"></box-icon>{" "}
          {likes.length}{" "}
        </span>
        <span className="flex items-center gap-x-1">
          <box-icon type="solid" name="comment" color="white"></box-icon>{" "}
          {comments.length}{" "}
        </span>
      </div>
    </div>
  );
}
