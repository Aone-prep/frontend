import api from "@services/api";

// Create a new course category (admin only)
export const createCategory = async (categoryData) => {
  try {
    const response = await api.post("/admin/categories", categoryData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update an existing course category (admin only)
export const updateCategory = async (id, categoryData) => {
  try {
    const response = await api.put(`/admin/categories/${id}`, categoryData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete a course category (admin only)
export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/admin/categories/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get a specific course category by ID (user and admin)
export const getCategoryById = async (id) => {
  try {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get all course categories (user and admin)
export const getCategories = async () => {
  try {
    const response = await api.get("/user/categories");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
