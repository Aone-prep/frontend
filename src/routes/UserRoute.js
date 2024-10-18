import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserLayout } from "@components/user/layout";

const UserRoute = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default UserRoute;
