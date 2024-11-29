import api from "@services/api";

// Create a new question
export const createQuestion = async (questionData) => {
  try {
    const response = await api.post("/admin/questions", questionData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update an existing question
export const updateQuestion = async (id, questionData) => {
  try {
    const response = await api.put(`/admin/questions/${id}`, questionData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete a question
export const deleteQuestion = async (id) => {
  try {
    const response = await api.delete(`/admin/questions/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get question by ID
export const getQuestionById = async (id) => {
  try {
    const response = await api.get(`admin/questions/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get all questions
export const getQuestions = async () => {
  try {
    const response = await api.get("/user/questions");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get question categories (if applicable)
export const getQuestionCategories = async () => {
  try {
    const response = await api.get("/user/question-categories");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getQuestionTypes = async () => {
  try {
    const response = await api.get("/user/questionType");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
