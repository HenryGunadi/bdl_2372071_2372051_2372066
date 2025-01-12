import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

type PrivateRouteProps = {
  children: React.ReactNode;
  path: string;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, path }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded: { role: string } = jwtDecode(token);

    // If the user is an admin and is trying to access "/admins", block them
    if (decoded.role === "admin" && path === "/admins") {
      alert("Admins cannot access this page.");
      return <Navigate to="/" replace />;
    }

    return <>{children}</>;
  } catch (err) {
    console.error("Invalid token:", err);
    localStorage.removeItem("token"); // Clear invalid token
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
