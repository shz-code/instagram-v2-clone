import React from "react";
import Feed from "../components/Feed";
import Nav from "../components/Nav";

export default function Home() {
  return (
    <div>
      <Nav />
      <div
        className="container px-1 w-full md:w-3/4 mx-auto"
        style={{ maxWidth: "850px" }}
      >
        <Feed />
      </div>
    </div>
  );
}
