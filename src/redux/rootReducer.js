import { combineReducers } from "@reduxjs/toolkit";
import { userSlice, examSlice, courseSlice, mockTestSlice } from "./slices";

const rootReducer = combineReducers({
  user: userSlice, // Add the user slice
  exam: examSlice, // Add the exam slice
  course: courseSlice, // Add the course slice
  mockTests: mockTestSlice, // Add the mockTest slice
});

export default rootReducer;
