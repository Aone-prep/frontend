import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const isAdmin = useSelector((state) => state.user.isAdmin); // Assuming you store user roles
  const location = useLocation();

  // Check if the current path is for admin
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isAdminRoute && !isAdmin) {
    // If user tries to access an admin route but is not an admin
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AdminRoute;
