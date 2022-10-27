import "boxicons";
import React, { useEffect, useRef } from "react";

export default function UploadPostImage({ image, handleImage, setImage }) {
  const imgInput = useRef();
  const imgAltProps = useRef();
  const img = useRef();

  useEffect(() => {
    if (image) {
      imgAltProps.current.style.display = "none";
      img.current.style.display = "block";
    } else {
      imgAltProps.current.style.display = "flex";
      img.current.style.display = "none";
    }
  }, [image]);

  const handleImgBtn = () => {
    imgInput.current.click();
  };

  return (
    <div className="image__upload border-r border-gray-primary">
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
        <box-icon name="cloud-upload" size="lg"></box-icon>
      </div>
      <div className="w-full h-full">
        <img
          src={image}
          alt="no image"
          className="w-full h-full object-cover hidden"
          ref={img}
        />
        <span onClick={() => setImage(null)} className="cursor-pointer">
          Cross
        </span>
      </div>
    </div>
  );
}
