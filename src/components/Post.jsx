import "boxicons";
import EmojiPicker from "emoji-picker-react";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import updateComments from "../services/updateComments";
import updateLikes from "../services/updateLikes";
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

  const [showComments, setShowCommetns] = useState(false);
  const [emoji, setEmoji] = useState(false);
  const [liked, setLiked] = useState(likes.includes(userProfile.userId));
  const [likedCount, setLikedCount] = useState(likes.length);
  const [caption, setScaption] = useState(post.caption);
  const [showDesc, setShowDesc] = useState(caption.length < 40);
  const { user } = useAuth();
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
        },
      ];
      try {
        await updateComments(
          docId,
          comment,
          userProfile.username,
          userProfile.profilePhotoUrl,
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
        className="grid justify-center content__box"
        onClick={handleClickEvent}
      >
        <div className="content mx-auto bg-white rounded border border-gray-primary w-3/4 md:2/4 xl:w-full">
          <div className="content__header p-3">
            <div className="user_avater flex gap-x-2 items-center">
              <img src={profilePhotoUrl} className="w-8 rounded-2xl" alt="" />
              <Link to={`p/${postUserId}`} className="font-bold cursor-pointer">
                {post?.username || "Not Provided"}
              </Link>
            </div>
          </div>
          <div
            className="content__photo cursor-pointer relative"
            onDoubleClick={handleLikeBtn}
          >
            <img src={imageSrc} className="w-full" alt="" />
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
                  <box-icon name="comment"></box-icon>
                </label>
              </div>
            </div>
            <div className="content__body__postDesc text-sm">
              <p className="font-bold cursor-pointer">{likedCount} Likes</p>
              <p className="text-sm w-full">
                <span className="font-bold break-words cursor-pointer">
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
                <Comment cmt={comment} key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
      {showCommentSubmitAlert && (
        <div className="comment__submit__alert fixed top-10 left-1/3 z-10">
          <span className="font-bold py-1 px-5 bg-gray-background shadow-md rounded">
            Comment Submitted Sucessfully.
          </span>
        </div>
      )}
    </>
  );
}
