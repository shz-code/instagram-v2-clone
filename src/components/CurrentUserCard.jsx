import React, { memo } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

function CurrentUserCard({ userProfile, loading }) {
  const { user, logout } = useAuth();
  const { username, fullName, profilePhotoUrl } = userProfile;
  return (
    <>
      {loading ? (
        <Skeleton count={1} height={61} />
      ) : (
        <div className="aside__header py-4 flex justify-between items-center">
          <div className="user__avater flex gap-x-2 items-center">
            <div className="user__profile">
              <img src={profilePhotoUrl} className="w-12 rounded-full" alt="" />
            </div>
            <div className="user__name grid">
              <Link to={`p/${user.uid}`} className="font-bold cursor-pointer">
                {username}
              </Link>
              <span className="text-gray-base">{fullName}</span>
            </div>
          </div>
          <div
            className="logout text-blue-medium font-bold cursor-pointer"
            onClick={logout}
          >
            Logout
          </div>
        </div>
      )}
    </>
  );
}

export default memo(CurrentUserCard);
