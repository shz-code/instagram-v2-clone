import "boxicons";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import useNotifications from "../hooks/useNotifications";
import useUserProfile from "../hooks/useUserProfile";
import { HOME, UPLOAD } from "../Routes";
import updateUserNotiCount from "../services/updateUserNotiCount";
import UserNotifications from "./UserNotifications";

export default function Nav({ currentPage }) {
  const [show, setShow] = useState(false);
  const [showNotis, setshowNotis] = useState(false);
  const [newNoti, setNewNoti] = useState(false);
  const [notiCount, setNotiCount] = useState(0);

  const { user, logout } = useAuth();
  const { userProfile, loading } = useUserProfile(user?.uid);
  const { userNotis, notiLoading } = useNotifications(user?.uid);

  const { notificationRead, docId, profilePhotoUrl } = userProfile;

  const navigate = useNavigate();

  useEffect(() => {
    if (notificationRead < userNotis?.length) {
      setNewNoti(true);
      setNotiCount(userNotis.length - notificationRead);
    }
  }, [notificationRead, userNotis.length]);

  const handleNotiCountUpdate = async () => {
    setshowNotis((e) => !e);
    if (show) setShow(false);
    let count = notificationRead + (userNotis.length - notificationRead);
    try {
      await updateUserNotiCount(docId, user.uid, count);
    } catch (err) {
      console.log(err);
    }
    setNewNoti(false);
  };
  return (
    <div className="bg-white py-2 border border-b-1 border-gray-primary px-2 lg:px-0">
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
          <span
            className="relative cursor-pointer"
            onClick={handleNotiCountUpdate}
          >
            {showNotis ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <>
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
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
                {newNoti && (
                  <span className="absolute -top-2 -right-2 text-sm bg-red-primary text-white rounded-full px-2">
                    {notiCount}
                  </span>
                )}
              </>
            )}
          </span>
          <span
            className="cursor-pointer"
            onClick={() => {
              setShow((e) => !e);
              if (showNotis) setshowNotis(false);
            }}
          >
            <img
              src={
                profilePhotoUrl
                  ? profilePhotoUrl
                  : "./images/avaters/default.png"
              }
              className="w-7 rounded-full"
              alt={`${user?.displayName}'s Profile Picture.`}
            />
          </span>
          {showNotis && (
            <UserNotifications
              userNotis={userNotis}
              notiLoading={notiLoading}
            />
          )}
          {show && (
            <div className="nav__user__modal absolute right-1 -bottom-20 z-10 bg-white py-1 rounded border border-gray-primary">
              <div className="cursor-pointer">
                <Link
                  to={`p/${user?.uid}`}
                  className=" w-full inline-block text-center hover:bg-gray-background px-2"
                >
                  Profile
                </Link>
                <div
                  onClick={() => {
                    logout();
                  }}
                  className=" mt-2 w-full inline-block text-center hover:bg-gray-background px-2"
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
