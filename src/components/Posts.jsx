import React from "react";
import Skeleton from "react-loading-skeleton";
import { useAuth } from "../contexts/AuthProvider";
import usePosts from "../hooks/usePosts";
import Post from "./Post";

export default function Posts({ userProfile }) {
  const { user } = useAuth();
  const { posts, loading } = usePosts(userProfile);

  return (
    <div className="grid gap-y-8 overflow-x-hidden">
      {loading ? (
        <Skeleton count={5} height={550} />
      ) : posts.length > 0 ? (
        posts.map((post, index) => (
          <Post post={post} key={index} userProfile={userProfile} />
        ))
      ) : (
        "No Posts to show. Please follow a user to see his/her posts."
      )}
    </div>
  );
}
