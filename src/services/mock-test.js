import api from "./api";

export const getMockTests = async () => {
  try {
    const response = await api.get("/user/mocktests");
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const getQuestions = async () => {
  try {
    const response = await api.get("/user/questions");
    return response;
  } catch (error) {
    throw error.response.data;
  }
};
