import { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const isAuthenticated = (): boolean => {
  return localStorage.getItem("authToken") !== null; //TODO: implement authentication
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}
