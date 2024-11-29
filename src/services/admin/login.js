import api from "@services/api";

export const loginAdmin = async (email, password) => {
  try {
    const response = await api.post("/admin/login", { email, password });
    return response;
  } catch (error) {
    throw error.response.data;
  }
};
