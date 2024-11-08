import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const UserRoute = () => {
  const isAuthenticated = useSelector(
    (state) => state.user.isAuthenticated && state.user.userType === "visitor"
  );

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default UserRoute;
