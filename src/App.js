import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store"; // Correct single import
import { Header } from "@components/user/layout";
import { PublicRoute, PrivateRoute, UserRoute } from "./routes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LoginPage, PageNotFound, UserDashboard } from "@pages/user";
import { RegisterForm } from "@pages/user/LoginPage";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="h-screen flex flex-col">
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
                  <Route element={<UserRoute />}>
                    <Route path="/dashboard" element={<UserDashboard />} />
                  </Route>
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </GoogleOAuthProvider>
            </div>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
