import "boxicons";
import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";

export default function Post() {
  const [show, setShow] = useState(false);
  const [emoji, setEmoji] = useState(false);
  const [text, setText] = useState(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, at in quidem esse fugiat inventore quia doloremque, animi obcaecati facilis atque totam deleniti repudiandae. Obcaecati magni doloribus nobis exercitationem iusto sequi quasi placeat, ipsam tempore neque sunt soluta laudantium possimus a. Minima dolor nisi deserunt facere, vero omnis nemo rerum!"
  );
  const [comment, setComment] = useState("");

  const onEmojiClick = (emoObj, e) => {
    setComment((e) => e + emoObj.emoji);
  };

  const inValid = comment.length === 0;

  return (
    <div className="grid justify-center content__box ">
      <div className="content mx-auto bg-white rounded border border-gray-primary w-3/4 md:2/4 xl:w-full">
        <div className="content__header p-3">
          <div className="user_avater flex gap-x-2 items-center">
            <img
              src="./images/avaters/dali.jpg"
              className="w-8 rounded-2xl"
              alt=""
            />
            <span className="font-bold">web.inspiration</span>
          </div>
        </div>
        <div className="content__photo">
          <img src="./images/users/raphael/1.jpg" alt="" />
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
            <p className="text-sm text-justify">
              <span className="font-bold">web.inspirations</span>{" "}
              {show ? text : `${text.slice(0, 40)}...`}{" "}
              {!show && (
                <span
                  className="text-gray-base font-bold cursor-pointer"
                  onClick={() => setShow((e) => !e)}
                >
                  more
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="content__footer relative">
          <div className="px-3 pb-2 grid gap-y-1">
            <p className="text-sm text-gray-base cursor-pointer">
              View all 7 commetns
            </p>
            <p className="text-sm text-gray-base">October 9</p>
          </div>
          {emoji && (
            <div className="absolute bottom-16 left-0">
              <EmojiPicker lazyLoadEmojis="true" onEmojiClick={onEmojiClick} />
            </div>
          )}
          <div className="content__footer__commentBox p-4 flex gap-x-2 items-center border-gray-primary border-t">
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
      </div>
    </div>
  );
}
