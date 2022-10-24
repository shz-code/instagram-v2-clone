import React, { useState } from "react";
import updateFollower from "../services/updateFollower";
import updateFollowing from "../services/updateFollowing";
import Loader from "./Loader";

export default function UserCard({ profile, currentUser, setNewPostTrigger }) {
  const [followed, setFollowed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { username, fullName, userId, docId, profilePhotoUrl } = profile;

  const handleFollowBtn = async () => {
    setLoading(true);
    try {
      await updateFollowing(docId, currentUser.userId);
      await updateFollower(currentUser.docId, userId);
      setFollowed(true);
      setLoading(false);
      setNewPostTrigger(true);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <div className=" flex justify-between items-center py-4">
        <div className="user__avater flex gap-x-2 items-center">
          <div className="user__profile">
            <img src={profilePhotoUrl} className="w-12 rounded-full" alt="" />
          </div>
          <div className="user__name grid">
            <span className="font-bold">{username}</span>
            <span className="text-gray-base">{fullName}</span>
          </div>
        </div>
        <div>
          {loading ? (
            <Loader stroke="#000" />
          ) : followed ? (
            <div className="logout text-gray-base font-bold cursor-pointer">
              Following
            </div>
          ) : (
            <div
              className="logout text-blue-medium font-bold cursor-pointer"
              onClick={handleFollowBtn}
            >
              Follow
            </div>
          )}
        </div>
      </div>
    </>
  );
}
