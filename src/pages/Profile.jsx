import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import ProfileSummary from "../components/ProfileSummary";
import UserPosts from "../components/UserPosts";
import useUserPosts from "../hooks/useUserPosts";
import useUserProfile from "../hooks/useUserProfile";

export default function Profile({ setCurrentPage }) {
  const { id } = useParams();
  const { userProfile, loading, error } = useUserProfile(id);
  const { userPosts, loadingUP } = useUserPosts(id);

  useEffect(() => {
    setCurrentPage("profile");
  }, []);

  return (
    <div>
      <div
        className="container px-1 w-full md:w-3/4 mx-auto"
        style={{ maxWidth: "850px" }}
      >
        {loading && !error && (
          <div className="block md:grid grid-cols-[30%_70%] gap-10 mt-8">
            <Skeleton count={1} circle={true} height={250} />
            <Skeleton count={1} height={250} />
          </div>
        )}
        {loading && error && <div className="flex mt-8">No user found</div>}
        {!loading && !error && (
          <ProfileSummary
            userProfile={userProfile}
            userPostsCount={userPosts?.length}
          />
        )}
        {loadingUP && !error && (
          <div className="block md:grid grid-cols-3 gap-10 mt-8">
            <Skeleton count={1} width={280} />
            <Skeleton count={1} width={280} />
            <Skeleton count={1} width={295} />
          </div>
        )}
        {!loading && !error && <UserPosts userPosts={userPosts} />}
      </div>
    </div>
  );
}
