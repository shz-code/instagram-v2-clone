import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import useUserProfile from "../hooks/useUserProfile";
import updateFollower from "../services/updateFollower";
import updateFollowing from "../services/updateFollowing";
import updateNotification from "../services/updateNotification";

export default function ProfileSummary({
  userProfile: visitingUserProfile,
  userPostsCount,
}) {
  const { user } = useAuth();
  const { userProfile } = useUserProfile(user.uid);

  const [followUser, setFollowUser] = useState(false);

  const {
    username,
    userId,
    fullName,
    profilePhotoUrl,
    followers,
    following,
    bio,
    docId,
  } = visitingUserProfile;

  useEffect(() => {
    if (user.uid !== userId && followers.includes(user.uid)) {
      setFollowUser(true);
    }
  }, []);

  const handleFollow = async (e) => {
    e.preventDefault();
    try {
      if (followUser) {
        setFollowUser(false);
        await updateFollower(docId, user.uid, false);
        await updateFollowing(userProfile.docId, userId, false);
      } else {
        setFollowUser(true);
        await updateFollower(docId, userProfile.userId, true);
        await updateFollowing(userProfile.docId, userId, true);
        await updateNotification(
          userProfile.userId,
          userProfile.username,
          userProfile.profilePhotoUrl,
          "follow",
          userId
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

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
          {user.uid === userId ? (
            <span className="border border-gray-primary px-2 py-1 rounded cursor-pointer">
              Edit Profile
            </span>
          ) : (
            <span
              className="bg-blue-medium text-white px-2 py-1 rounded cursor-pointer"
              onClick={handleFollow}
            >
              {followUser ? "Following" : "Follow"}
            </span>
          )}
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
