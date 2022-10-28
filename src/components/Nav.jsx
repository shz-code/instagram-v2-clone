import "boxicons";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import useUserProfile from "../hooks/useUserProfile";
import { HOME, UPLOAD } from "../Routes";
import UserNotifications from "./UserNotifications";

export default function Nav({ currentPage }) {
  const [show, setShow] = useState(false);
  const [showNotis, setshowNotis] = useState(false);

  const { user, logout } = useAuth();
  const { userProfile, loading } = useUserProfile(user?.uid);

  const navigate = useNavigate();

  return (
    <div className="bg-white py-2 border border-b-1 border-gray-primary">
      <nav
        className="container w-full px-1 lg:w-3/4 mx-auto flex justify-between"
        style={{ maxWidth: "900px" }}
      >
        <Link to="/" className="logo font-bold text-2xl">
          Instagram
        </Link>
        <div className="account flex gap-x-3 items-center relative">
          <Link to={HOME} className="relative cursor-pointer">
            {currentPage === "home" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            )}
          </Link>
          <Link to={UPLOAD} className="relative cursor-pointer">
            {currentPage === "upload" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M11.47 1.72a.75.75 0 011.06 0l3 3a.75.75 0 01-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 01-1.06-1.06l3-3zM11.25 7.5V15a.75.75 0 001.5 0V7.5h3.75a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3h3.75z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                />
              </svg>
            )}
          </Link>
          <Link className="relative top-1 cursor-pointer">
            <box-icon name="bell" size="sm" s></box-icon>
          </Link>
          <span className="cursor-pointer" onClick={() => setShow((e) => !e)}>
            <img
              src={userProfile?.profilePhotoUrl}
              className="w-7 rounded-full"
              alt=""
            />
          </span>
          {showNotis && <UserNotifications />}
          {show && (
            <div className="nav__user__modal absolute -right-10 -bottom-20 z-10 bg-white py-5rounded">
              <div className="w-full px-5 cursor-pointer">
                <Link
                  to={`p/${user?.uid}`}
                  className="text-gray-base bg-gray-primary w-full inline-block"
                >
                  Profile
                </Link>
                <div
                  onClick={() => {
                    logout();
                  }}
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
