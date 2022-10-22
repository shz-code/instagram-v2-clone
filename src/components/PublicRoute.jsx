import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export default function PublicRoute() {
  const { user } = useAuth();
  return user ? <Navigate to="/" /> : <Outlet />;
}
