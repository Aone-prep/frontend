import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const isAdminAuthenticated = useSelector(
    (state) => state.user.isAuthenticated && state.user.userType === "admin"
  );

  return isAdminAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;
