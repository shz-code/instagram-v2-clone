import React from "react";
import Skeleton from "react-loading-skeleton";
import { useAuth } from "../contexts/AuthProvider";
import useUserProfile from "../hooks/useUserProfile";
import Aside from "./Aside";
import Posts from "./Posts";

export default function Feed() {
  const { user } = useAuth();
  const { userProfile, loading } = useUserProfile(user?.uid);
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 mt-8">
      {loading ? (
        <Skeleton count={5} height={550} />
      ) : (
        <Posts userProfile={userProfile} loading={loading} />
      )}
      <div className="side hidden xl:grid w-4/5 mx-auto mt-8">
        <Aside userProfile={userProfile} loading={loading} />
      </div>
    </div>
  );
}
