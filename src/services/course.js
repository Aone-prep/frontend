import api from "./api";

export const getCourses = async () => {
  try {
    const response = await api.get("/user/courses");
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const getCourseCategories = async () => {
  try {
    const response = await api.get("/user/categories");
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

// Get course by ID
export const getCourseById = async (id) => {
  try {
    const response = await api.get(`/user/courses/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
