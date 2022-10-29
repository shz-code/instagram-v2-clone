import React from "react";
import { Link } from "react-router-dom";

export default function UserNoti({ noti }) {
  //   console.log(noti);
  const {
    dateCreated,
    postId,
    type,
    sender: { senderPhoto, userId, username },
  } = noti;

  const currentDate = new Date();
  const notiDate = new Date(dateCreated);

  return (
    <div className="flex gap-x-1 justify-between items-center">
      <div className="flex gap-x-2 items-center">
        <img
          src={senderPhoto}
          alt={`${username}'s profile pic`}
          className="w-8 rounded-full"
        />
        <div>
          <Link to={`/p/${userId}`} className="font-bold">
            {username}
          </Link>
          <Link to={`/post/${postId}`}>
            {type === "like"
              ? " liked on your post."
              : type === "comment"
              ? " commented on your post."
              : null}
          </Link>
          <Link to={`/p/${userId}`}>
            {type === "follow" && " followed you."}
          </Link>
        </div>
      </div>
      <div className="text-xs text-gray-base">
        {notiDate.getDate() - currentDate.getDate() === 0
          ? "Today"
          : notiDate.getDate() - currentDate.getDate() === -1
          ? "Yesterday"
          : notiDate.getDate() - currentDate.getDate()}
      </div>
    </div>
  );
}
