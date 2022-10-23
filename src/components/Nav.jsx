import "boxicons";
import React from "react";
import { useAuth } from "../contexts/AuthProvider";
import useUserProfile from "../hooks/useUserProfile";

export default function Nav() {
  const { user } = useAuth();
  const { userProfile, loading, profilePhotoUrl } = useUserProfile(user.uid);
  return (
    <div className="bg-white py-2 border border-b-1 border-gray-primary">
      <nav
        className="container w-full px-1 md:w-3/4 mx-auto flex justify-between"
        style={{ maxWidth: "900px" }}
      >
        <div className="logo font-bold text-2xl">Instagram</div>
        <div className="account flex gap-x-3 items-center">
          <span className="relative top-1 cursor-pointer">
            <box-icon type="solid" size="sm" name="home-alt-2"></box-icon>
          </span>
          <span className="relative top-1 cursor-pointer">
            <box-icon name="image-add" size="sm"></box-icon>
          </span>
          <span className="relative top-1 cursor-pointer">
            <box-icon name="bell" size="sm" s></box-icon>
          </span>
          <span className="cursor-pointer">
            <img
              src={userProfile?.profilePhotoUrl}
              className="w-7 rounded-2xl"
              alt=""
            />
          </span>
        </div>
      </nav>
    </div>
  );
}
