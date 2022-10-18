import React from "react";
import { Link } from "react-router-dom";
import LoginImg from "../assets/images/iphone-with-profile.jpg";

export default function Login() {
  return (
    <div>
      <Link to="/">
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
          <div className="flex items-center">
            <div className="flex w-3/5">
              <img src={LoginImg} alt="Login Img" />
            </div>
            <div className="flex bg-red-500 h-20 justify-center items-center flex-col w-2/5">
              <h1>This is Going to be the form</h1>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
