import React, { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import userNameExists from "../services/userNameExists";
import Loader from "./Loader";

export default function Signup({ setCurrentAuth }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signup } = useAuth();

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
    } catch (err) {
      setLoading(false);
      if (err.code === "auth/email-already-in-use")
        setError(`${email} is already in use.`);
      else if (err.code === "auth/weak-password")
        setError("Password must be atleast 6 characters");
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
        <span className="logo font-bold text-4xl">Instagram</span>
        {error && (
          <span className="text-sm  font-bold bg-gray-background w-full text-center py-1 rounded text-red-primary mt-2">
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
            className="py-1 px-2 bg-gray-background focus:outline-none w-full text-sm text-gray-base border border-gray-primary rounded"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          <input
            type="text"
            placeholder="Enter Your Username"
            className="py-1 px-2 bg-gray-background focus:outline-none w-full text-sm text-gray-base border border-gray-primary rounded"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
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
          <input
            type="password"
            placeholder="Confirm Your Password"
            className="py-1 px-2 bg-gray-background focus:outline-none w-full text-sm text-gray-base border  border-gray-primary rounded"
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
            {loading ? <Loader /> : "Signup"}
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
