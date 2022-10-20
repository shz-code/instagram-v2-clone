import React, { useEffect, useState } from "react";
import LoginImg from "../assets/images/iphone-with-profile.jpg";
import InstagramLogo from "../assets/images/logo.png";

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const isInvalid = password === "" || email === "";

  useEffect(() => {
    document.title = "Instagram v2 - Login";
  }, []);

  const handleSubmit = () => {};
  return (
    <div>
      <div className="container flex mx-auto max-w-screen-md items-center h-screen">
        <div className="flex items-center">
          <div className="flex w-3/5">
            <img src={LoginImg} alt="Login Img" />
          </div>
          <div className="flex  p-5 justify-center items-center flex-col w-2/5">
            <h1>
              <img src={InstagramLogo} alt="Logo" />
            </h1>
            <form onSubmit={handleSubmit} method="post" className="w-full mt-3">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="p-2 w-full text-sm text-gray-500 border border-gray-50 rounded"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
              <input
                type="password"
                placeholder="Enter Your Password"
                className="p-2 w-full text-sm text-gray-500 border my-3 border-gray-50 rounded"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
              <button
                className={`text-white bg-blue-500 w-full py-2 rounded ${
                  isInvalid && `opacity-50`
                }`}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
