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
