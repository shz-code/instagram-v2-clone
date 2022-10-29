import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../lib/firebase";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const navigator = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const authChange = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return authChange;
  }, []);

  const SetProfile = async (user, name, username, email) => {
    const db = getFirestore();
    try {
      await addDoc(collection(db, "users"), {
        userId: user.uid,
        username: username,
        fullName: name,
        profilePhotoUrl: "/images/avaters/default.png",
        emailAddress: email,
        following: [],
        followers: [],
        dateCreated: Date.now(),
        notificationRead: 0,
      });
    } catch (err) {
      console.log("There was an error creating user profile.");
    }
  };

  const signup = async (name, username, email, password) => {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);
    await SetProfile(auth.currentUser, name, username, email);
    await updateProfile(auth.currentUser, { displayName: username });
    setUser({ ...auth.currentUser });
  };

  const login = async (email, password) => {
    const auth = getAuth();
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    const auth = getAuth();
    return signOut(auth);
  };

  const values = {
    login,
    user,
    logout,
    signup,
  };

  return (
    <AuthContext.Provider value={values}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
