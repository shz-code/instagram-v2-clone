import React from "react";
import CurrentUserCard from "./CurrentUserCard";
import Footer from "./Footer";
import SuggestedUsers from "./SuggestedUsers";

export default function Aside({ userProfile, loading }) {
  return (
    <div className="aside text-sm w-full">
      <CurrentUserCard userProfile={userProfile} loading={loading} />
      <SuggestedUsers userProfile={userProfile} />
      <Footer />
    </div>
  );
}
