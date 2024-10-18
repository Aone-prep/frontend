import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import RegisterForm from "../registerPage";
import { setUser } from "@redux/slices/userSlice";
import { showToast } from "@utils/helper";
import bgImage from "@assets/images/bg.jpeg";
// You need to replace this with your actual Google Client ID
const LoginForm = ({ toggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
  };

  const handleGoogleSuccess = (response) => {
    console.log("Google Sign-In Successful", response);
    const { credential } = response;

    // Decode the JWT to extract user profile information
    const decodedUser = jwtDecode(credential);
    console.log(decodedUser);

    console.log("Decoded User Info:", decodedUser); // This will contain user profile data

    // Dispatch to your Redux store
    dispatch(setUser(decodedUser));

    navigate("/home");
    showToast("success", "User logged in successfully");
  };

  const handleGoogleFailure = (error) => {
    console.log("Google Sign-In Failed", error);
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
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 mb-4"
            type="submit"
          >
            Sign In
          </button>
        </form>
        <div className="flex items-center justify-center mb-4">
          <hr className="w-full border-blue-300" />
          <span className="px-2 text-blue-500">OR</span>
          <hr className="w-full border-blue-300" />
        </div>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
        />
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
