import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showToast } from "@utils/helper";
import bgImage from "@assets/images/bg.jpeg";
import { register } from "@services/auth";

const RegisterForm = ({ toggleForm }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register(formData);
      showToast("success", "Registration successful! Please login.");
      toggleForm("login");
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-600">
          Register for A-one Prep
        </h2>
        <form onSubmit={handleRegister}>
          <div className="mb-6">
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-blue-600">Already have an account? </span>
          <button
            className="text-green-500 hover:underline"
            onClick={() => toggleForm("login")}
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};
export default RegisterForm;
