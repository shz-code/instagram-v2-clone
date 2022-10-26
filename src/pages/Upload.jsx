<<<<<<< HEAD
// import axios from "axios";
=======
>>>>>>> 995be91ef9da5eee4c3d8e0a7766dce90c6f263a
import React, { useEffect, useState } from "react";

export default function Upload({ setCurrentPage }) {
  const [image, setImage] = useState();
  useEffect(() => {
    setCurrentPage("upload");
  }, []);

<<<<<<< HEAD
  const handleImage = async (e) => {
    let file = e.target.files[0];

    let fileReader = new FileReader();
    let form = new FormData();

    form.set("key", "be370551b1b8be0f4264c4f4b5f18528");
    form.append("image", file);
    form.append("name", "tour");

=======
  const handleImage = (e) => {
    let filelist = e.target.files;
    let file = filelist[0];
    let fileReader = new FileReader();
>>>>>>> 995be91ef9da5eee4c3d8e0a7766dce90c6f263a
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      let fileURL = fileReader.result;
      setImage(fileURL);
    };
<<<<<<< HEAD
    // const res = await axios({
    //   method: "post",
    //   url: "https://api.imgbb.com/1/upload",
    //   data: form,
    // });
=======
>>>>>>> 995be91ef9da5eee4c3d8e0a7766dce90c6f263a
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
