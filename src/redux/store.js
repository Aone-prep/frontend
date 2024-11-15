import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use localStorage for persistence
import rootReducer from "./rootReducer";

// Persist configuration for both user and mockTests slices
const persistConfig = {
  key: "root", // Changed to "root" since we're persisting multiple slices
  storage,
  whitelist: ["user"], // Added mockTests to the whitelist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
