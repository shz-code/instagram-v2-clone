import React, { useState } from "react";
import { Link } from "react-router-dom";
import updateFollower from "../services/updateFollower";
import updateFollowing from "../services/updateFollowing";
import updateNotification from "../services/updateNotification";
import Loader from "./Loader";

export default function UserCard({ profile, currentUser, setNewPostTrigger }) {
  const [followed, setFollowed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { username, fullName, userId, docId, profilePhotoUrl } = profile;

  const handleFollowBtn = async () => {
    setLoading(true);
    try {
      await updateFollower(docId, currentUser.userId, true);
      await updateFollowing(currentUser.docId, userId, true);
      await updateNotification(
        currentUser.userId,
        currentUser.username,
        currentUser.profilePhotoUrl,
        "follow",
        userId
      );
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
            <Link to={`/p/${userId}`} className="font-bold cursor-pointer">
              {username}
            </Link>
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
