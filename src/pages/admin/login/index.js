import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
// import RegisterForm from "../registerPage";
import { setUser } from "@redux/slices/userSlice";
import { showToast } from "@utils/helper";
import { loginAdmin } from "@services/admin/login";

// You need to replace this with your actual Google Client ID
const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await loginAdmin(email, password);
console.log(response)

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
            userType: "admin"
          })
        );

        navigate("/admin/dashboard");
      }
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message || "Login failed!!Please try again."
      );
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-cover bg-center">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Admin Login
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
      </div>
    </div>
  );
};
export default AdminLoginPage;
