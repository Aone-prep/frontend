import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
//   const { isAuthenticated, user } = useSelector((state) => state.auth);

//   if (false) {
    // return <Navigate to="/login" />;
//   }

//   if (true) {
    return <Navigate to="/dashboard" />;
//   }

  return <Outlet />;
};

export default AdminRoute;