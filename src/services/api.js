import axios from "axios";
import { clearUser } from "@redux/slices/userSlice";
import { store } from "@redux/store";
import { showToast } from "@utils/helper";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3030";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors and token management
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if the error is due to unauthorized access
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      // Remove the invalid token
      localStorage.removeItem("token");

      // Clear user from Redux store
      store.dispatch(clearUser());

      // Redirect to login page
      window.location.href = "/login";
      showToast("error", "Session expired. Please login again.");
    }
    return Promise.reject(error);
  }
);

// Utility function to set token after login
export const setAuthToken = (token) => {
  if (token) {
    // Save token to localStorage
    localStorage.setItem("token", token);

    // Set token in axios default headers
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Remove token from localStorage and axios headers
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;
