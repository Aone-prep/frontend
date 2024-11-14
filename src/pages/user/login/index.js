import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import RegisterForm from "../registerPage";
import { setUser } from "@redux/slices/userSlice";
import { showToast } from "@utils/helper";
import bgImage from "@assets/images/bg.jpeg";
import { login } from "@services/auth";
// You need to replace this with your actual Google Client ID
const LoginForm = ({ toggleForm }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login(username, password);

      if (response.status === 200) {
        showToast("success", "Login successful!");
        const { token } = response;
        // Store token in localStorage
        localStorage.setItem("token", token);

        // Update Redux state
        dispatch(
          setUser({
            currentUser: "Suraj",
            isAuthenticated: true,
            userType: "visitor",
          })
        );
        navigate("/home");
      }
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message || "Login failed!!Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = (response) => {
    const { credential } = response;
    const decodedUser = jwtDecode(credential);

    // Store Google token
    localStorage.setItem("google_token", credential);

    dispatch(
      setUser({
        currentUser: decodedUser.name,
        isAuthenticated: true,
        token: credential,
      })
    );

    navigate("/home");
    showToast("success", "Login successful!");
  };

  return (
    <div
      className="h-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
          Login to A-one Prep
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              type="type"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 mb-4 disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        {/* <div className="flex items-center justify-center mb-4">
          <hr className="w-full border-blue-300" />
          <span className="px-2 text-blue-500">OR</span>
          <hr className="w-full border-blue-300" />
        </div>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => showToast("error", "Google sign-in failed")}
        /> */}
        <div className="mt-4 text-center">
          <span className="text-blue-600">Don't have an account? </span>
          <button
            className="text-blue-500 hover:underline"
            onClick={() => toggleForm("register")}
          >
            Register here
          </button>
        </div>
      </div>
    </div>
  );
};

const AuthPage = () => {
  const [formType, setFormType] = useState("login");

  useEffect(() => {
    // Initialize Google OAuth client on component mount
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      {formType === "login" ? (
        <LoginForm toggleForm={setFormType} />
      ) : (
        <RegisterForm toggleForm={setFormType} />
      )}
    </>
  );
};

export default AuthPage;
