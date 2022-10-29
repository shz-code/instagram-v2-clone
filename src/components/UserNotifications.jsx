import React from "react";
import Skeleton from "react-loading-skeleton";
import UserNoti from "./UserNoti";

export default function UserNotifications({ userNotis, notiLoading }) {
  return (
    <div className="absolute grid gap-y-2 bg-white top-14 right-0 py-2 px-3 w-80 sm:w-96 border border-gray-primary z-20">
      {notiLoading ? (
        <Skeleton count={1} height={50} />
      ) : userNotis?.length > 0 ? (
        <>
          <h1 className="font-bold text-gray-base">All Notifications</h1>
          {userNotis.map((noti, index) => (
            <UserNoti key={index} noti={noti} />
          ))}
        </>
      ) : (
        "No new Notifications"
      )}
    </div>
  );
}
