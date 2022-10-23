import React, { memo } from "react";
import Skeleton from "react-loading-skeleton";
import { useAuth } from "../contexts/AuthProvider";

function CurrentUserCard({ userProfile, loading }) {
  const { user, logout } = useAuth();
  const { username, fullName } = userProfile;
  return (
    <>
      {loading ? (
        <Skeleton count={1} height={61} />
      ) : (
        <div className="aside__header py-4 flex justify-between items-center">
          <div className="user__avater flex gap-x-2 items-center">
            <div className="user__profile">
              <img
                src="./images/avaters/dali.jpg"
                className="w-12 rounded-full"
                alt=""
              />
            </div>
            <div className="user__name grid">
              <span className="font-bold">{username}</span>
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
