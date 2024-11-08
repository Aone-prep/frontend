import api from "@services/api";

// Create a new course
export const createCourse = async (courseData) => {
  try {
    const response = await api.post("admin/add-courses", courseData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update an existing course
export const updateCourse = async (id, courseData) => {
  try {
    const response = await api.put(`/courses/${id}`, courseData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete a course
export const deleteCourse = async (id) => {
  try {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get course by ID
export const getCourseById = async (id) => {
  try {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
