import React, { useEffect, useState } from "react";

export default function Upload({ setCurrentPage }) {
  const [image, setImage] = useState();
  useEffect(() => {
    setCurrentPage("upload");
  }, []);

  const handleImage = (e) => {
    let filelist = e.target.files;
    let file = filelist[0];
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      let fileURL = fileReader.result;
      setImage(fileURL);
    };
  };
  return (
    <div
      className="container px-1 w-full md:w-3/4 mx-auto mt-8"
      style={{ maxWidth: "850px" }}
    >
      <form className="grid grid-cols-2">
        <div className="image__upload">
          <input type="file" onChange={handleImage} />
          <img src={image} alt="no image" width="350" />
        </div>
        <div className="post__details">
          <div className="caption">
            <input type="text" />
          </div>
        </div>
      </form>
    </div>
  );
}
