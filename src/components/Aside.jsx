import React from "react";
import CurrentUserCard from "./CurrentUserCard";
import SuggestedUsers from "./SuggestedUsers";

export default function Aside() {
  return (
    <div className="aside text-sm w-full">
      <CurrentUserCard />
      <SuggestedUsers />
    </div>
  );
}
