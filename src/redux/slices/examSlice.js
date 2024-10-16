import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentExam: null,
  progress: 0,
  recentScores: [],
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    setCurrentExam: (state, action) => {
      state.currentExam = action.payload;
    },
    updateProgress: (state, action) => {
      state.progress = action.payload;
    },
    addRecentScore: (state, action) => {
      state.recentScores.push(action.payload);
    },
  },
});

export const { setCurrentExam, updateProgress, addRecentScore } =
  examSlice.actions;
export default examSlice.reducer;
