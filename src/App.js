import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Header } from "@components/user/layout";
import { PublicRoute, UserRoute, eAdminRoute } from "./routes"; // Add AdminRoute
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
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const isAdminAuthenticated = useSelector(
    (state) => state.isAdminAuthenticated
  ); // Separate admin auth state

  return (
    <Router>
      <div className="h-screen flex flex-col">
        <Header />
        <div className="flex-1 overflow-hidden">
          <GoogleOAuthProvider
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          >
            <Routes>
              <Route
                path="/"
                element={
                  isAuthenticated ? (
                    <Navigate to="/home" replace />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/register" element={<RegisterForm />} />
              </Route>
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
              <Route path="/admin" element={<AdminRoute />}>
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin/dashboard" element={<AdminPanel />} />
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
