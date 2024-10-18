import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const UserRoute = () => {
  //   const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const isAuthenticated = true;
  const userRole = useSelector((state) => state.user?.role) || "user";
  return isAuthenticated && userRole === "user" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};
export default UserRoute;
