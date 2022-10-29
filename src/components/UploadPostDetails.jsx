import EmojiPicker from "emoji-picker-react";
import React, { memo } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

function UploadPostDetails({
  setCaption,
  caption,
  setEmoji,
  emoji,
  loading,
  userProfile,
  isInvalid,
}) {
  const { username, profilePhotoUrl } = userProfile;

  const onEmojiClick = (emoObj, e) => {
    setCaption((e) => e + emoObj.emoji);
  };
  return (
    <div className="post__details p-4 border-t border-gray-primary lg:border-none">
      {loading ? (
        <Skeleton count={1} height={40} />
      ) : (
        <div className="user__avater flex gap-x-2 items-center mb-2">
          <div className="user__profile">
            <img src={profilePhotoUrl} className="w-8 rounded-full" alt="" />
          </div>
          <div className="user__name">
            <Link className="font-bold cursor-pointer">{username}</Link>
          </div>
        </div>
      )}
      <div className="caption">
        <textarea
          name="caption"
          className="resize-none w-full h-96 bg-white py-2 outline-none"
          placeholder="Please enter your caption"
          value={caption}
          onChange={({ target }) =>
            caption.length < 2200 && setCaption(target.value)
          }
        ></textarea>
      </div>
      <div className="post__details__footer text-gray-base relative flex justify-between items-center">
        <div
          onClick={() => setEmoji((e) => !e)}
          className="top-1 cursor-pointer"
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
        <div className="char__count">{caption.length}/2,200</div>
        {emoji && (
          <div className="absolute top-10 -left-4 z-30">
            <EmojiPicker lazyLoadEmojis="true" onEmojiClick={onEmojiClick} />
          </div>
        )}
      </div>
      <div className="submit__btn mt-3 flex justify-end">
        <button
          type="submit"
          className={`bg-blue-medium text-white py-1 px-3 rounded ${
            isInvalid && `opacity-50`
          }`}
          disabled={isInvalid}
        >
          Add Post
        </button>
      </div>
    </div>
  );
}

export default memo(UploadPostDetails);
