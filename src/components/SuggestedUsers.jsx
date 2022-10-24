import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useAuth } from "../contexts/AuthProvider";
import useSuggestedProfile from "../hooks/useSuggestedProfiles";
import UserCard from "./UserCard";

export default function SuggestedUsers({ userProfile }) {
  const [newPostTrigger, setNewPostTrigger] = useState(false);
  const { user } = useAuth();
  const { suggestedProfiles, loading } = useSuggestedProfile(user.uid);

  return (
    <div className="relative">
      {newPostTrigger && (
        <div className="newUser__follow__alert absolute -top-24 -left-1/2 -translate-x-1/2">
          <span
            className=" py-2 px-3 bg-gray-background rounded-md font-bold drop-shadow-md cursor-pointer"
            onClick={() => location.reload()}
          >
            New Posts
          </span>
        </div>
      )}
      {loading ? (
        <Skeleton count={3} height={61} />
      ) : (
        <div className="aside__body">
          <div className="flex justify-between">
            <span className="text-gray-base">Suggestions For You</span>
            <span className="font-bold">See All</span>
          </div>
          <div className="aside__body__userCards">
            {suggestedProfiles.map(
              (profile, index) =>
                index < 5 && (
                  <UserCard
                    currentUser={userProfile}
                    key={index}
                    profile={profile}
                    setNewPostTrigger={setNewPostTrigger}
                  />
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
