import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Header } from "@components/user/layout";
import { LoginPage, Dashboard, PageNotFound } from "./pages";
import { PublicRoute, PrivateRoute } from "./routes";
import { RegisterForm } from "./pages/LoginPage";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="h-screen flex flex-col bg-gray-100">
          <Header />
          <div style={{ height: "calc(100vh - 4rem)" }}>
            <GoogleOAuthProvider
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            >
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route element={<PublicRoute />}>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterForm />} />
                </Route>
                <Route element={<PrivateRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </GoogleOAuthProvider>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
