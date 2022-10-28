import React from "react";
import { useAuth } from "../contexts/AuthProvider";
import useNotifications from "../hooks/useNotifications";

export default function UserNotifications() {
  const { user } = useAuth();
  const { userNotis } = useNotifications(user?.uid);

  return (
    <div>
      {userNotis.length > 0 &&
        userNotis.map((noti, index) => (
          <div key={index}>
            <span>
              {noti.sender.username}{" "}
              {noti.type === "like"
                ? "liked"
                : noti.type === "comment"
                ? "commented"
                : null}
              {noti.type === "follow" ? "followd you" : " on your post"}
            </span>
          </div>
        ))}
    </div>
  );
}
