import React from "react";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import ProfileSummary from "../components/ProfileSummary";
import UserPosts from "../components/UserPosts";
import useUserPosts from "../hooks/useUserPosts";
import useUserProfile from "../hooks/useUserProfile";

export default function Profile() {
  const { id } = useParams();
  const { userProfile, loading } = useUserProfile(id);
  const { userPosts, loadingUP } = useUserPosts(id);

  return (
    <div>
      <Nav />
      <div
        className="container px-1 w-full md:w-3/4 mx-auto"
        style={{ maxWidth: "850px" }}
      >
        {loading ? (
          <div className="grid grid-cols-[30%_70%] gap-10">
            <Skeleton count={1} circle={true} height={250} />
            <Skeleton count={1} height={250} />
          </div>
        ) : (
          <ProfileSummary
            userProfile={userProfile}
            userPostsCount={userPosts?.length}
          />
        )}
        {loadingUP ? (
          <div className="flex gap-10">
            <Skeleton count={1} height={250} />
            <Skeleton count={1} height={250} />
            <Skeleton count={1} height={250} />
          </div>
        ) : (
          <UserPosts userPosts={userPosts} />
        )}
      </div>
    </div>
  );
}
