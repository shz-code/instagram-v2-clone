import React from "react";

export default function ProfileSummary({ userProfile, userPostsCount }) {
  const { username, fullName, profilePhotoUrl, followers, following, bio } =
    userProfile;
  return (
    <div className="block md:grid grid-cols-[30%_70%] gap-10 mt-8 border-b border-gray-primary pb-10 mx-auto">
      <div className="profile__photo flex justify-center items-center">
        <img
          src={profilePhotoUrl}
          className="rounded-full w-1/4 md:w-2/3"
          alt=""
        />
      </div>
      <div className="user__details grid gap-y-5 justify-center md:justify-start">
        <div className="row flex justify-center md:justify-start items-center gap-x-4 mt-4">
          <span className=" text-2xl">{username}</span>
          <span className="border border-gray-primary px-2 py-1 rounded">
            Edit Profile
          </span>
        </div>
        <div className="row flex items-center justify-center md:justify-start gap-x-4 py-4">
          <div>
            <span className="font-bold">
              {userPostsCount ? userPostsCount : 0}
            </span>{" "}
            posts
          </div>
          <div>
            <span className="font-bold">{followers.length}</span> followers
          </div>
          <div>
            <span className="font-bold">{following.length}</span> following
          </div>
        </div>
        <div className="user__info text-center md:text-start">
          <p className="font-bold">{fullName}</p>
          <p className="w-full md:w-2/3 px-2 md:px-0">{bio ? bio : "No Bio"}</p>
        </div>
      </div>
    </div>
  );
}
