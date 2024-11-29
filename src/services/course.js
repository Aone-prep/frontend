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

// Enroll in Course
export const startCourse = async (payload) => {
  try {
    const response = await api.post(`/user/start`, payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
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

export const getUserCourses = async (id) => {
  try {
    const response = await api.get(`/user/${id}/courses`);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};
