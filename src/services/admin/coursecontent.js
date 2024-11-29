import api from "@services/api";

// Create new course content
export const createCourseContent = async (contentData) => {
  try {
    const response = await api.post("/admin/contents", contentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update an existing course content
export const updateCourseContent = async (id, contentData) => {
  try {
    const response = await api.put(`/admin/contents/${id}`, contentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete a course content
export const deleteCourseContent = async (id) => {
  try {
    const response = await api.delete(`/admin/contents/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get course content by ID
export const getCourseContentById = async (id) => {
  try {
    const response = await api.get(`/admin/contents/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get all course contents
export const getCourseContents = async () => {
  try {
    const response = await api.get("/user/contents");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get course content categories (if any)
export const getCourseContentCategories = async () => {
  try {
    const response = await api.get("/user/course-content-categories");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
