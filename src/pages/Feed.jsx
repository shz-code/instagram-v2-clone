import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export default function Feed() {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="bg-red-500">
      <Link to="/login">Go to Login</Link>
      <div onClick={handleLogout}>Logout</div>
    </div>
  );
}
