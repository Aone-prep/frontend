import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice"; // Import your user slice
import examSlice from "./slices/examSlice"; // Import your other slices
import courseSlice from "./slices/courseSlice"; // Import your other slices

const rootReducer = combineReducers({
  user: userSlice, // Add the user slice
  exam: examSlice, // Add the exam slice
  course: courseSlice, // Add the course slice
});

export default rootReducer;
