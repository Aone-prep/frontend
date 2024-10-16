import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Header } from "./components/layout";
import { LoginPage, RegisterPage, Dashboard, PageNotFound } from "./pages";
import { PublicRoute, PrivateRoute } from "./routes";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main className="container mx-auto py-4">
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />

              <Route element={<PublicRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Route>
              {/* <Route element={<PrivateRoute />}> */}
              <Route path="/dashboard" element={<Dashboard />} />
              {/* </Route> */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
