import React, { useEffect, useState } from "react";
import LoginImg from "../assets/images/iphone-with-profile.jpg";
import Footer from "../components/Footer";
import Login from "../components/Login";
import Signup from "../components/Signup";

export default function Authentication({ setCurrentPage }) {
  const [currentAuth, setCurrentAuth] = useState("login");
  useEffect(() => {
    setCurrentPage("auth");
  }, []);

  return (
    <div className="container grid gap-y-4 mx-auto max-w-screen-md items-center justify-center h-screen">
      <div className="flex h-3/4">
        <div className="sm:flex w-full block items-center">
          <div className="hidden w-3/5 sm:flex">
            <img src={LoginImg} alt="Login Img" />
          </div>
          <div className="flex justify-center flex-col  sm:w-2/5">
            {currentAuth === "login" ? (
              <Login setCurrentAuth={setCurrentAuth} />
            ) : (
              <Signup setCurrentAuth={setCurrentAuth} />
            )}
          </div>
        </div>
      </div>
      <Footer justifyCenter="justify-center" textCenter="text-center" />
    </div>
  );
}
