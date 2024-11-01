import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use localStorage for persistence
import rootReducer from "./rootReducer"; // Import the combined rootReducer

// Persist configuration for the user slice
const persistConfig = {
  key: "user", // The key under which the user state is stored
  storage,
  whitelist: ["user"], // Only persist the user slice
};

// Apply persistence to the user slice only
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer here
});

export const persistor = persistStore(store);
