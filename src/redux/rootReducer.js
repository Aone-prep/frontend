import { combineReducers } from "@reduxjs/toolkit";
import { userSlice, examSlice } from "./slices";

const rootReducer = combineReducers({
  user: userSlice,
  exam: examSlice,
});

export default rootReducer;
