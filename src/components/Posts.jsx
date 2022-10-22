import React from "react";
import Skeleton from "react-loading-skeleton";
import usePosts from "../hooks/usePosts";
import Post from "./Post";

export default function Posts() {
  const { posts, loading } = usePosts();

  return (
    <div className="grid gap-y-8">
      {loading ? (
        <Skeleton count={1} height={550} />
      ) : (
        posts.map((post, index) => <Post post={post} key={index} />)
      )}
    </div>
  );
}
