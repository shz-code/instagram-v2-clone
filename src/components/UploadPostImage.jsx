import "boxicons";
import React, { useEffect, useRef } from "react";

export default function UploadPostImage({ image, handleImage, setImage }) {
  const imgInput = useRef();
  const imgAltProps = useRef();
  const img = useRef();
  const clearImgBtn = useRef();

  useEffect(() => {
    if (image) {
      imgAltProps.current.style.display = "none";
      img.current.style.display = "block";
      clearImgBtn.current.style.display = "block";
    } else {
      imgAltProps.current.style.display = "flex";
      img.current.style.display = "none";
      clearImgBtn.current.style.display = "none";
    }
  }, [image]);

  const handleImgBtn = () => {
    imgInput.current.click();
  };

  return (
    <div
      className="image__upload border-r border-gray-primary relative"
      style={{ height: "535px" }}
    >
      <input
        type="file"
        ref={imgInput}
        onChange={handleImage}
        className="hidden"
      />
      <div
        className="upload__img__toggle flex w-full h-full justify-center items-center cursor-pointer"
        onClick={handleImgBtn}
        ref={imgAltProps}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-16 h-16"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
      </div>
      <div className="w-full h-full hidden" ref={img}>
        <img
          src={image}
          alt="no image"
          className="w-full h-full object-cover drop-shadow-xl"
        />
        <span
          onClick={() => setImage(null)}
          className="cursor-pointer absolute top-2 right-2 rounded-full transition-all hover:scale-110 drop-shadow-2xl bg-black-light"
          ref={clearImgBtn}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
