import React, { createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }) {
  return (
    <AuthContext.Provider value={{ yes: "yes" }}>
      {children}
    </AuthContext.Provider>
  );
}
