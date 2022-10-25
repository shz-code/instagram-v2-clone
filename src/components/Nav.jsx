import "boxicons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import useUserProfile from "../hooks/useUserProfile";

export default function Nav() {
  const [show, setShow] = useState(false);
  const { user, logout } = useAuth();
  const { userProfile, loading } = useUserProfile(user?.uid);
  return (
    <div className="bg-white py-2 border border-b-1 border-gray-primary">
      <nav
        className="container w-full px-1 md:w-3/4 mx-auto flex justify-between"
        style={{ maxWidth: "900px" }}
      >
        <Link to="/" className="logo font-bold text-2xl">
          Instagram
        </Link>
        <div className="account flex gap-x-3 items-center relative">
          <span className="relative top-1 cursor-pointer">
            <box-icon type="solid" size="sm" name="home-alt-2"></box-icon>
          </span>
          <span className="relative top-1 cursor-pointer">
            <box-icon name="image-add" size="sm"></box-icon>
          </span>
          <span className="relative top-1 cursor-pointer">
            <box-icon name="bell" size="sm" s></box-icon>
          </span>
          <span className="cursor-pointer" onClick={() => setShow((e) => !e)}>
            <img
              src={userProfile.profilePhotoUrl}
              className="w-7 rounded-2xl"
              alt=""
            />
          </span>
          {show && (
            <div className="nav__user__modal absolute -right-10 -bottom-20 bg-white py-5 px-1 rounded">
              <div className="w-full px-5 bg-gray-primary cursor-pointer">
                <span onClick={() => logout()} className="text-gray-base">
                  Logout
                </span>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
