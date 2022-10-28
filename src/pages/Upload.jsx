import axios from "axios";
import React, { useEffect, useState } from "react";
import UploadPostDetails from "../components/UploadPostDetails";
import UploadPostImage from "../components/UploadPostImage";
import { useAuth } from "../contexts/AuthProvider";
import useUserProfile from "../hooks/useUserProfile";
import userNewPost from "../services/userNewPost";

export default function Upload({ setCurrentPage }) {
  const { user } = useAuth();
  const { userProfile, loading } = useUserProfile(user.uid);

  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [emoji, setEmoji] = useState(false);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setCurrentPage("upload");
  }, []);

  const isInvalid = image === null || caption === "";
  const uploadPost = async (imgUrl) => {
    try {
      await userNewPost(
        user.uid,
        userProfile.username,
        userProfile.fullName,
        userProfile.profilePhotoUrl,
        caption,
        imgUrl,
        Date.now() + Math.ceil(Math.random() * 10000)
      );
      setUploading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let form = new FormData();
    form.set("key", import.meta.env.VITE_IMGBBKEY);
    form.append("image", file);
    form.append("name", `${userProfile.username}'s Upload - ${file.name}`);
    try {
      setUploading(true);
      const res = await axios({
        method: "post",
        url: "https://api.imgbb.com/1/upload",
        data: form,
      });
      uploadPost(res.data.data.display_url);
    } catch (err) {
      console.log(err);
    }
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

  const handleImage = async (e) => {
    let file = e.target.files[0];
    setFile(file);
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
      onClick={handleClickEvent}
    >
      {uploading ? "Uploading" : "Please Upload"}
      <form
        className="block lg:grid grid-cols-2 border border-gray-primary bg-white"
        onSubmit={handleSubmit}
      >
        <UploadPostImage
          image={image}
          handleImage={handleImage}
          setImage={setImage}
        />
        <UploadPostDetails
          isInvalid={isInvalid}
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
