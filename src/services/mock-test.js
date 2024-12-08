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

export const getMockTestByCourse = async (courseId = null) => {
  try {
    const endpoint = `user/course/${courseId}/mocktests`;
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch mock tests" };
  }
};

export const getQuestionsByMockTest = async (mockTestId) => {
  try {
    const endpoint = `/user/questions/${mockTestId}`;

    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch questions" };
  }
};

export const startMockTest = async (mockTestId) => {
  try {
    const response = await api.post("/user/mocktests/start", { mockTestId });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to start mock test" };
  }
};

export const submitMockTest = async (testData) => {
  try {
    const response = await api.post("/user/submit", testData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to submit mock test" };
  }
};

export const getMockTestResults = async (mockTestId) => {
  try {
    const response = await api.get(`/user/mocktests/results/${mockTestId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch test results" };
  }
};
