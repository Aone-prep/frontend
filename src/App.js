import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Header } from "@components/user/layout";
import { PublicRoute, UserRoute } from "./routes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AdminPanel from "@components/admin/AdminPanel";
import {
  LoginPage,
  PageNotFound,
  RegisterForm,
  Home,
  CourseContents,
  MockTest,
  Forums,
} from "@pages/user";
import UserLayout from "@components/user/layout/UserLayout";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import CourseDetails from "@components/user/layout/CourseDetailPage";
import AdminLoginPage from "@pages/admin/login";
import AdminRoute from "@routes/AdminRoute";

function App() {
  const userAuth = useSelector((state) => ({
    isAuthenticated: state.user.isAuthenticated,
    userType: state.user.userType,
  }));

  // Helper function to determine the redirect path based on auth status
  const getHomePath = () => {
    if (!userAuth.isAuthenticated) return "/login";
    return userAuth.userType === "admin" ? "/admin/dashboard" : "/home";
  };

  return (
    <Router>
      <div className="h-screen flex flex-col">
        <Header />
        <div className="flex-1 overflow-hidden">
          <GoogleOAuthProvider
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          >
            <Routes>
              {/* Root redirect */}
              <Route
                path="/"
                element={<Navigate to={getHomePath()} replace />}
              />

              {/* Public routes */}
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterForm />} />
              </Route>

              {/* Admin routes */}
              <Route path="/admin">
                <Route
                  path="login"
                  element={
                    userAuth.isAuthenticated &&
                    userAuth.userType === "admin" ? (
                      <Navigate to="/admin/dashboard" replace />
                    ) : (
                      <AdminLoginPage />
                    )
                  }
                />
                <Route element={<AdminRoute />}>
                  <Route path="dashboard" element={<AdminPanel />} />
                  {/* Add other admin routes here */}
                </Route>
              </Route>

              {/* User routes */}
              <Route element={<UserRoute />}>
                <Route element={<UserLayout />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/courses" element={<CourseContents />} />
                  <Route
                    path="/courses/:courseId"
                    element={<CourseDetails />}
                  />
                  <Route path="/mock-test" element={<MockTest />} />
                  <Route path="/forums" element={<Forums />} />
                </Route>
              </Route>

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </GoogleOAuthProvider>
          <Toaster />
        </div>
      </div>
    </Router>
  );
}

export default App;
