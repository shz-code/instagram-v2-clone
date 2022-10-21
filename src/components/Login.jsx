import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InstagramLogo from "../assets/images/logo.png";
import { useAuth } from "../contexts/AuthProvider";
import Loader from "./Loader";

export default function Login({ setCurrentAuth }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigater = useNavigate();

  const isInvalid = password.length < 3 || email === "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    try {
      await login(email, password);
      setLoading(false);
      navigater("/");
    } catch (err) {
      setLoading(false);
      if (err.code === "auth/invalid-email")
        setError("Invalid email. Try again!");
      else if (err.code === "auth/user-not-found")
        setError("User not found. Try again!");
      else if (err.code === "auth/wrong-password")
        setError("Password do not match. Try again!");
    }
  };

  return (
    <>
      <div className="bg-white flex-col flex items-center p-5 rounded border border-gray-primary">
        <h1>
          <img src={InstagramLogo} alt="Logo" />
        </h1>
        {error && (
          <span className="text-sm font-bold bg-gray-background w-full text-center py-1 rounded text-red-primary mt-2">
            {error}
          </span>
        )}
        <form
          onSubmit={handleSubmit}
          method="post"
          className="w-full mt-3 grid gap-y-3"
        >
          <input
            type="email"
            placeholder="Enter Your Email"
            className="py-1 px-2 bg-gray-background focus:outline-none w-full text-sm text-gray-base border border-gray-primary rounded"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            className="py-1 px-2 bg-gray-background focus:outline-none w-full text-sm text-gray-base border border-gray-primary rounded"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <button
            className={`text-white bg-blue-medium
                ${
                  !isInvalid && !loading && `hover:bg-blue-primary`
                } w-full p-1 rounded ${isInvalid && `opacity-50`}`}
            disabled={(loading || isInvalid) && true}
          >
            {loading ? <Loader /> : "Login"}
          </button>
        </form>
      </div>
      <div className="mt-2 bg-white w-full text-center rounded border border-gray-primary py-2">
        Don't have an account?
        <span
          className="text-blue-medium font-bold cursor-pointer"
          onClick={() => setCurrentAuth("signup")}
        >
          {" "}
          Sign Up
        </span>
      </div>
    </>
  );
}
