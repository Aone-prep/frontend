import api from "@services/api";

// Create a new mocktest
export const createMocktest = async (mocktestData) => {
  try {
    const response = await api.post("/admin/mocktests", mocktestData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update an existing mocktest
export const updateMocktest = async (id, mocktestData) => {
  try {
    const response = await api.put(`/admin/mocktests/${id}`, mocktestData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete a mocktest
export const deleteMocktest = async (id) => {
  try {
    const response = await api.delete(`/admin/mocktests/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get mocktest by ID
export const getMocktestById = async (id) => {
  try {
    const response = await api.get(`/mocktests/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get all mocktests
export const getMocktests = async () => {
  try {
    const response = await api.get("/user/mocktests");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get mocktest categories
export const getMocktestCategories = async () => {
  try {
    const response = await api.get("/user/mocktest-categories");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
