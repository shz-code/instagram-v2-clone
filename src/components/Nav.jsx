import "boxicons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import useUserProfile from "../hooks/useUserProfile";
import { HOME, UPLOAD } from "../Routes";

export default function Nav({ currentPage }) {
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
          <Link to={HOME} className="relative top-1 cursor-pointer">
            {currentPage === "home" ? (
              <box-icon type="solid" size="sm" name="home-alt-2"></box-icon>
            ) : (
              <box-icon type="regular" size="sm" name="home-alt-2"></box-icon>
            )}
          </Link>
          <Link to={UPLOAD} className="relative top-1 cursor-pointer">
            {currentPage === "upload" ? (
              <box-icon type="solid" name="image-add"></box-icon>
            ) : (
              <box-icon type="regular" name="image-add" size="sm"></box-icon>
            )}
          </Link>
          <Link className="relative top-1 cursor-pointer">
            <box-icon name="bell" size="sm" s></box-icon>
          </Link>
          <span className="cursor-pointer" onClick={() => setShow((e) => !e)}>
            <img
              src={userProfile.profilePhotoUrl}
              className="w-7 rounded-full"
              alt=""
            />
          </span>
          {show && (
            <div className="nav__user__modal absolute -right-10 -bottom-20 bg-white py-5rounded">
              <div className="w-full px-5 cursor-pointer">
                <Link
                  to={`p/${user.uid}`}
                  className="text-gray-base bg-gray-primary w-full inline-block"
                >
                  Profile
                </Link>
                <div
                  onClick={() => logout()}
                  className="text-gray-base bg-gray-primary mt-2  w-full inline-block"
                >
                  Logout
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
