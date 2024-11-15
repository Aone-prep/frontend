import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  courseCategories: [],
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCoursesData: (state, action) => {
      state.courses = action.payload;
    },
    setCourseCategoriesData: (state, action) => {
      state.courseCategories = action.payload;
    },
  },
});

export const { setCoursesData, setCourseCategoriesData } = courseSlice.actions;
export default courseSlice.reducer;
