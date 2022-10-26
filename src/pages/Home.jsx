import React, { useEffect } from "react";
import Feed from "../components/Feed";

export default function Home({setCurrentPage}) {
  useEffect(()=>{
    setCurrentPage("home");
  },[])
  return (
    <div>
      <div
        className="container px-1 w-full md:w-3/4 mx-auto"
        style={{ maxWidth: "850px" }}
      >
        <Feed />
      </div>
    </div>
  );
}
