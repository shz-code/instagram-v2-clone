import React from "react";
import Aside from "./Aside";
import Posts from "./Posts";

export default function Feed() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 mt-8">
      <Posts />
      <div className="side hidden xl:grid w-4/5 mx-auto mt-8">
        <Aside />
      </div>
    </div>
  );
}
