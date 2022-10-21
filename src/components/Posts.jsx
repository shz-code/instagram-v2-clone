import React from "react";
import Post from "./Post";

export default function Posts() {
  return (
    <div className="grid gap-y-8">
      <Post />
      <Post />
    </div>
  );
}
