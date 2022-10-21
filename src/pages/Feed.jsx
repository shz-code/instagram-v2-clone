import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { AUTHENTICATION } from "../Routes";

export default function Feed() {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="bg-red-primary">
      <Link to={AUTHENTICATION}>Go to Authentication</Link>
      <div onClick={handleLogout}>Logout</div>
    </div>
  );
}
