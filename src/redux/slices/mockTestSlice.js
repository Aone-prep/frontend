import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mockTests: [],
  questions: [],
};

const mockTestSlice = createSlice({
  name: "mockTests",
  initialState,
  reducers: {
    setMockTestsData: (state, action) => {
      state.mockTests = action.payload;
    },
    setQuestionsData: (state, action) => {
      state.questions = action.payload;
    },
  },
});

export const { setMockTestsData, setQuestionsData } = mockTestSlice.actions;
export default mockTestSlice.reducer;
