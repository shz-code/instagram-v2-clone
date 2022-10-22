import React from "react";
import Skeleton from "react-loading-skeleton";
import { useAuth } from "../contexts/AuthProvider";
import useSuggestedProfile from "../hooks/useSuggestedProfiles";
import UserCard from "./UserCard";

export default function SuggestedUsers() {
  const { user } = useAuth();
  const { suggestedProfiles, loading } = useSuggestedProfile(user.uid);
  return (
    <>
      {loading ? (
        <Skeleton count={3} height={61} />
      ) : (
        <div className="aside__body">
          <div className="flex justify-between">
            <span className="text-gray-base">Suggestions For You</span>
            <span className="font-bold">See All</span>
          </div>
          <div className="aside__body__userCards">
            {suggestedProfiles.map((profile, index) => (
              <UserCard key={index} profile={profile} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
