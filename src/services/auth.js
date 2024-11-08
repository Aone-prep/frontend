import api from "./api";

export const login = async (username, password) => {
  try {
    const response = await api.post("/user/login", { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post("/user/register", userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
