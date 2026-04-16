import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/LoginPage" replace />;
  }

  // ❌ expired session
  if (Date.now() > user.expiresAt) {
    localStorage.removeItem("user");
    return <Navigate to="/LoginPage" replace />;
  }

  if (!user.isLoggedIn || user.role !== "admin") {
    return <Navigate to="/LoginPage" replace />;
  }

  return children;
};

export default ProtectedRoute;