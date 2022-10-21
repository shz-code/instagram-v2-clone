import React from "react";
import Posts from "./Posts";

export default function Feed() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 mt-8">
      <Posts />
      <div className="side hidden xl:grid justify-center">side</div>
    </div>
  );
}
