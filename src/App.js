import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { Header } from "@components/user/layout";
import { PublicRoute, UserRoute } from "./routes";
import { GoogleOAuthProvider } from "@react-oauth/google";
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

function App() {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

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
                <Route path="/register" element={<RegisterForm />} />
              </Route>
              <Route element={<UserRoute />}>
                <Route element={<UserLayout />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/course-contents" element={<CourseContents />} />
                  <Route path="/mock-test" element={<MockTest />} />
                  {/* <Route path="/test-history" element={<TestHistory />} /> */}
                  <Route path="/forums" element={<Forums />} />
                </Route>
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </GoogleOAuthProvider>
        </div>
      </div>
    </Router>
  );
}

export default App;
