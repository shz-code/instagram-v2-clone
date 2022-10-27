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
}) {
  const { username, profilePhotoUrl } = userProfile;

  const onEmojiClick = (emoObj, e) => {
    setCaption((e) => e + emoObj.emoji);
  };
  return (
    <div className="post__details p-4">
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
          <box-icon name="face" size="sm" animation="flashing-hover"></box-icon>
        </div>
        <div className="char__count">{caption.length}/2,200</div>
        {emoji && (
          <div className="absolute top-10 -left-4">
            <EmojiPicker lazyLoadEmojis="true" onEmojiClick={onEmojiClick} />
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(UploadPostDetails);
