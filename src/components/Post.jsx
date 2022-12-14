import "boxicons";
import EmojiPicker from "emoji-picker-react";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import style from "../assets/css/Post.module.css";
import { useAuth } from "../contexts/AuthProvider";
import updateComments from "../services/updateComments";
import updateLikes from "../services/updateLikes";
import updateNotification from "../services/updateNotification";
import Comment from "./Comment";

export default function Post({ post, userProfile }) {
  const {
    comments,
    dateCreated,
    imageSrc,
    likes,
    postId,
    userId: postUserId,
    profilePhotoUrl,
    docId,
  } = post;
  const { user } = useAuth();

  const [showComments, setShowCommetns] = useState(false);
  const [emoji, setEmoji] = useState(false);
  const [liked, setLiked] = useState(likes.includes(userProfile.userId));
  const [likedCount, setLikedCount] = useState(likes.length);
  const [caption, setScaption] = useState(post.caption);
  const [showDesc, setShowDesc] = useState(caption.length < 40);
  const [comment, setComment] = useState("");
  const [modComments, setModComments] = useState([]);
  const [showCommentSubmitAlert, setShowCommentAlert] = useState(false);

  const date = new Date(dateCreated);

  const textAreaRef = useRef();
  const postRef = useRef();
  const inValid = comment.length === 0;

  const onEmojiClick = (emoObj, e) => {
    setComment((e) => e + emoObj.emoji);
  };
  const handleClickEvent = (e) => {
    if (
      e.target.getAttribute("name") !== "face" &&
      emoji &&
      !e.target.classList.contains("epr-btn") &&
      !e.target.classList.contains("epr-emoji-img")
    )
      setEmoji((e) => !e);
  };
  const handleLikeBtn = async (e) => {
    if (liked) {
      setLiked(false);
      await updateLikes(docId, userProfile.userId, false, postUserId, postId);
      setLikedCount((e) => e - 1);
    } else {
      setLiked(true);
      await updateLikes(docId, userProfile.userId, true, postUserId, postId);
      await updateNotification(
        userProfile.userId,
        userProfile.username,
        userProfile.profilePhotoUrl,
        "like",
        postUserId,
        postId
      );
      setLikedCount((e) => e + 1);
      postRef.current.style.display = "flex";
    }
    const showHeart = () => {
      postRef.current.style.display = "none";
    };
    setTimeout(showHeart, 1300);
  };
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!inValid) {
      const newArr = [
        {
          comment: comment,
          displayName: userProfile.username,
          profilePhotoUrl: userProfile.profilePhotoUrl,
          userId: user.uid,
        },
      ];
      try {
        await updateComments(
          docId,
          comment,
          userProfile.username,
          userProfile.profilePhotoUrl,
          postUserId,
          postId,
          user.uid
        );
        await updateNotification(
          userProfile.userId,
          userProfile.username,
          userProfile.profilePhotoUrl,
          "comment",
          postUserId,
          postId
        );
        setModComments((prev) => {
          return [...prev, ...newArr];
        });
        setShowCommentAlert(true);
        setComment("");

        setInterval(() => {
          setShowCommentAlert(false);
        }, 2000);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (textAreaRef.current) {
      if (comment.length > 117) textAreaRef.current.setAttribute("rows", "4");
      else if (comment.length > 78)
        textAreaRef.current.setAttribute("rows", "3");
      else if (comment.length > 39)
        textAreaRef.current.setAttribute("rows", "2");
      else if (comment.length < 39)
        textAreaRef.current.setAttribute("rows", "1");
    }
  }, [comment]);

  useEffect(() => {
    const newArr = _.cloneDeep(comments);
    setModComments(newArr);
  }, []);

  return (
    <>
      <div
        className={`grid justify-center ${style.content__box} w-full`}
        onClick={handleClickEvent}
      >
        <div className="content mx-auto bg-white rounded border border-gray-primary w-full md:2/4 xl:w-full">
          <div className="content__header p-3">
            <div className="user_avater flex gap-x-2 items-center">
              <img src={profilePhotoUrl} className="w-8 rounded-2xl" alt="" />
              <Link to={`p/${postUserId}`} className="font-bold cursor-pointer">
                {post?.username || "Not Provided"}
              </Link>
            </div>
          </div>
          <div
            className={`${style.content__photo} cursor-pointer relative`}
            onDoubleClick={handleLikeBtn}
          >
            <img
              src={imageSrc}
              className={`w-full ${style.content__photo__img}`}
              alt="photo"
            />
            <span
              className="absolute top-0 left-0 justify-center items-center hidden h-full w-full transition-all ease-in-out"
              ref={postRef}
            >
              <box-icon
                type="solid"
                name="heart"
                color="white"
                size="lg"
              ></box-icon>
            </span>
          </div>
          <div className="content__body px-3 py-2">
            <div className="content__body__postActions">
              <div className="post_actions flex gap-x-2">
                <span className="cursor-pointer" onClick={handleLikeBtn}>
                  {liked ? (
                    <box-icon
                      type="solid"
                      name="heart"
                      color="red"
                      animation="tada"
                    ></box-icon>
                  ) : (
                    <box-icon type="regular" name="heart"></box-icon>
                  )}
                </span>
                <label className="cursor-pointer" htmlFor={postId + 1}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                    />
                  </svg>
                </label>
              </div>
            </div>
            <div className="content__body__postDesc text-sm">
              <p className="font-bold cursor-pointer">{likedCount} Likes</p>
              <p className="text-sm w-full">
                <Link
                  to={`/p/${postUserId}`}
                  className="font-bold break-words cursor-pointer"
                >
                  {post?.username || "Not Provided"}
                </Link>{" "}
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
                View all {modComments.length} comments
              </p>
              <p className="text-sm text-gray-base">
                {date.toLocaleString("default", { month: "long" })}{" "}
                {date.getDate()}
              </p>
            </div>
            {emoji && (
              <div className="absolute bottom-16 left-0">
                <EmojiPicker
                  lazyLoadEmojis="true"
                  onEmojiClick={onEmojiClick}
                />
              </div>
            )}
            <form
              onSubmit={handleCommentSubmit}
              className="content__footer__addCommentBox p-4 flex gap-x-2 items-center border-gray-primary border-t"
            >
              <div
                onClick={() => setEmoji((e) => !e)}
                className="relative cursor-pointer"
              >
                <svg
                  name="face"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                  />
                </svg>
              </div>
              <textarea
                ref={textAreaRef}
                id={postId + 1}
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
                type="submit"
              >
                Post
              </button>
            </form>
          </div>
          {showComments && (
            <div className="commetns__box border-gray-primary border-t p-3 grid gap-y-3 text-sm">
              <p className="text-gray-base font-bold">All Comments</p>
              {modComments.map((comment, index) => (
                <Comment cmt={comment} key={index} postUserId={postUserId} />
              ))}
            </div>
          )}
        </div>
      </div>
      {showCommentSubmitAlert && (
        <div className="comment__submit__alert fixed :top-14 left-7 sm:left-1/3 z-10">
          <span className="font-bold py-1 px-5 bg-gray-background shadow-md rounded">
            Comment Submitted Sucessfully.
          </span>
        </div>
      )}
    </>
  );
}
