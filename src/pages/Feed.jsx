import React from "react";
import { Link } from "react-router-dom";

export default function Feed() {
  return (
    <div className="bg-red-500">
      <Link to="/login">Go to Login</Link>
    </div>
  );
}
