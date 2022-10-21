import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InstagramLogo from "../assets/images/logo.png";
import { useAuth } from "../contexts/AuthProvider";
import userNameExists from "../services/userNameExists";

export default function Signup({ setCurrentAuth }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signup } = useAuth();
  const navigater = useNavigate();

  const isInvalid =
    password !== confirmPassword ||
    password === "" ||
    username === "" ||
    email === "" ||
    name === "";

  const handleSignUp = async () => {
    try {
      await signup(name, username, email, password);
      setLoading(false);
      navigater("/");
    } catch (err) {
      setLoading(false);
      if (err.code === "auth/email-already-in-use")
        setError(`${email} is already in use.`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    userNameExists(username).then((data) => {
      if (data === true) {
        setError("Username Already Exists");
        setLoading(false);
      } else {
        handleSignUp();
      }
    });
  };

  return (
    <>
      <div className="bg-white flex-col flex items-center p-5 rounded border border-gray-primary">
        <h1>
          <img src={InstagramLogo} alt="Logo" />
        </h1>
        {error && (
          <span className="text-sm bg-blue-50 w-full text-center py-1 rounded text-red-primary mt-2">
            {error}
          </span>
        )}
        <form
          onSubmit={handleSubmit}
          method="post"
          className="w-full mt-3 grid gap-y-3"
        >
          <input
            type="text"
            placeholder="Enter Your Full Name"
            className="p-2 w-full text-sm text-gray-base border border-gray-primary rounded"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          <input
            type="text"
            placeholder="Enter Your Username"
            className="p-2 w-full text-sm text-gray-base border border-gray-primary rounded"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <input
            type="email"
            placeholder="Enter Your Email"
            className="p-2 w-full text-sm text-gray-base border border-gray-primary rounded"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            className="p-2 w-full text-sm text-gray-base border border-gray-primary rounded"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Your Password"
            className="p-2 w-full text-sm text-gray-base border  border-gray-primary rounded"
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
          />
          <button
            className={`text-white bg-blue-medium
                ${
                  !isInvalid && !loading && `hover:bg-blue-primary`
                } w-full p-1 rounded ${isInvalid && `opacity-50`}`}
            disabled={(loading || isInvalid) && true}
          >
            Signup
          </button>
        </form>
      </div>
      <div className="mt-2 bg-white w-full text-center rounded border border-gray-primary py-2">
        Already a member?
        <span
          className="text-blue-medium font-bold cursor-pointer"
          onClick={() => setCurrentAuth("login")}
        >
          {" "}
          Login
        </span>
      </div>
    </>
  );
}
