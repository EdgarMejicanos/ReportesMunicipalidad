import { Outlet, Navigate } from "react-router-dom";
import authProvider  from "../auth/AuthProvider";

export default function ProtectedRoute() {
  return authProvider.checkAuth() ? <Outlet /> : <Navigate to="/login" />;
}