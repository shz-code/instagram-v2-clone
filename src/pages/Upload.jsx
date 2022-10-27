// import axios from "axios";
import "boxicons";
import React, { useEffect, useState } from "react";
import UploadPostDetails from "../components/UploadPostDetails";
import UploadPostImage from "../components/UploadPostImage";
import { useAuth } from "../contexts/AuthProvider";
import useUserProfile from "../hooks/useUserProfile";

export default function Upload({ setCurrentPage }) {
  const { user } = useAuth();
  const { userProfile, loading } = useUserProfile(user.uid);

  const [image, setImage] = useState();
  const [emoji, setEmoji] = useState(false);
  const [caption, setCaption] = useState("");

  useEffect(() => {
    setCurrentPage("upload");
  }, []);

  const handleClickEvent = (e) => {
    if (
      e.target.getAttribute("name") !== "face" &&
      emoji &&
      !e.target.classList.contains("epr-btn") &&
      !e.target.classList.contains("epr-emoji-img")
    )
      setEmoji((e) => !e);
  };

  const handleImage = async (e) => {
    let file = e.target.files[0];

    let fileReader = new FileReader();
    let form = new FormData();

    form.set("key", "be370551b1b8be0f4264c4f4b5f18528");
    form.append("image", file);
    form.append("name", "tour");

    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      let fileURL = fileReader.result;
      setImage(fileURL);
    };

    // const res = await axios({
    //   method: "post",
    //   url: "https://api.imgbb.com/1/upload",
    //   data: form,
    // });
  };

  return (
    <div
      className="container px-1 w-full md:w-3/4 mx-auto mt-8"
      style={{ maxWidth: "850px" }}
      onClick={handleClickEvent}
    >
      <form className="block lg:grid grid-cols-2 border border-gray-primary bg-white">
        <UploadPostImage
          image={image}
          handleImage={handleImage}
          setImage={setImage}
        />
        <UploadPostDetails
          caption={caption}
          setCaption={setCaption}
          emoji={emoji}
          setEmoji={setEmoji}
          loading={loading}
          userProfile={userProfile}
        />
      </form>
    </div>
  );
}
