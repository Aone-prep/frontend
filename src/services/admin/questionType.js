import api from "@services/api";

// Create a new question type (admin only)
export const createQuestionType = async (questionTypeData) => {
  try {
    const response = await api.post("/admin/questionType", questionTypeData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update an existing question type (admin only)
export const updateQuestionType = async (id, questionTypeData) => {
  try {
    const response = await api.put(`/admin/questionType/${id}`, questionTypeData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete a question type (admin only)
export const deleteQuestionType = async (id) => {
  try {
    const response = await api.delete(`/admin/questionType/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get a specific question type by ID (admin only)
export const getQuestionTypeById = async (id) => {
  try {
    const response = await api.get(`/admin/questionType/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get all question types (admin only)
export const getQuestionTypes = async () => {
  try {
    const response = await api.get("/user/questionType");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
