import "boxicons";
import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import Comment from "./Comment";

export default function Post({ post }) {
  const [showComments, setShowCommetns] = useState(false);
  const [emoji, setEmoji] = useState(false);
  const [caption, setScaption] = useState(post.caption);
  const [showDesc, setShowDesc] = useState(caption.length < 40);
  const { user } = useAuth();
  const [comment, setComment] = useState("");

  const { comments, dateCreated, imageSrc, likes, photoId, userId } = post;
  const date = new Date(dateCreated);

  const onEmojiClick = (emoObj, e) => {
    setComment((e) => e + emoObj.emoji);
  };
  const handleClickEvent = (e) => {
    if (e.target.getAttribute("name") !== "face" && emoji) setEmoji((e) => !e);
  };
  const textAreaRef = useRef();
  const inValid = comment.length === 0;

  useEffect(() => {
    if (textAreaRef.current) {
      if (comment.length > 106) textAreaRef.current.setAttribute("rows", "3");
      else if (comment.length > 53)
        textAreaRef.current.setAttribute("rows", "2");
      else if (comment.length < 53)
        textAreaRef.current.setAttribute("rows", "1");
    }
  }, [comment]);

  return (
    <div
      className="grid justify-center content__box"
      onClick={handleClickEvent}
    >
      <div className="content mx-auto bg-white rounded border border-gray-primary w-3/4 md:2/4 xl:w-full">
        <div className="content__header p-3">
          <div className="user_avater flex gap-x-2 items-center">
            <img
              src="./images/avaters/dali.jpg"
              className="w-8 rounded-2xl"
              alt=""
            />
            <span className="font-bold">
              {post?.username || "Not Provided"}
            </span>
          </div>
        </div>
        <div className="content__photo">
          <img src={imageSrc} className="w-full" alt="" />
        </div>
        <div className="content__body px-3 py-2">
          <div className="content__body__postActions">
            <div className="post_actions flex gap-x-2">
              <span className="cursor-pointer">
                <box-icon name="heart" animation="flashing-hover"></box-icon>
              </span>
              <span className="cursor-pointer">
                <box-icon name="comment" animation="flashing-hover"></box-icon>
              </span>
            </div>
          </div>
          <div className="content__body__postDesc">
            <p className="text-sm w-full break-words">
              <span className="font-bold">
                {" "}
                {post?.username || "Not Provided"}
              </span>{" "}
              {showDesc ? `${caption}` : `${caption.slice(0, 40)}...`}{" "}
              {!showDesc && (
                <span
                  className="text-gray-base font-bold cursor-pointer"
                  onClick={() => setShowDesc((e) => !e)}
                >
                  more
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="content__footer relative">
          <div className="px-3 pb-2 grid gap-y-1">
            <p
              className="text-sm text-gray-base cursor-pointer"
              onClick={() => setShowCommetns((e) => !e)}
            >
              View all {comments.length} comments
            </p>
            <p className="text-sm text-gray-base">
              {date.toLocaleString("default", { month: "long" })}{" "}
              {date.getDay()}
            </p>
          </div>
          {emoji && (
            <div className="absolute bottom-16 left-0">
              <EmojiPicker lazyLoadEmojis="true" onEmojiClick={onEmojiClick} />
            </div>
          )}
          <div className="content__footer__addCommentBox p-4 flex gap-x-2 items-center border-gray-primary border-t">
            <div
              onClick={() => setEmoji((e) => !e)}
              className="relative top-1 cursor-pointer"
            >
              <box-icon
                name="face"
                size="sm"
                animation="flashing-hover"
              ></box-icon>
            </div>
            <textarea
              ref={textAreaRef}
              rows={1}
              type="text"
              className="outline-none w-full px-3 py-1 resize-none text-sm"
              placeholder="Add Your Comment"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            ></textarea>
            <button
              className={`font-bold text-blue-medium ${
                inValid && `opacity-50`
              }`}
            >
              Post
            </button>
          </div>
        </div>
        {showComments && (
          <div className="commetns__box border-gray-primary border-t p-3 grid gap-y-3 text-sm">
            <p className="text-gray-base font-bold">All Comments</p>
            {comments.map((comment, index) => (
              <Comment cmt={comment} key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
