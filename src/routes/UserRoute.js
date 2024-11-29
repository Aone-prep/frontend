import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const UserRoute = () => {
  const isUserAuthenticated = useSelector(
    (state) => state.user.isAuthenticated && state.user.role === "user"
  );

  return isUserAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default UserRoute;
