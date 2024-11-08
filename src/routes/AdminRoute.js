import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const isAdminAuthenticated = useSelector(
    (state) => state.isAdminAuthenticated
  );

  return false ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;
