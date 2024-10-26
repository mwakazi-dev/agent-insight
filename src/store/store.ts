"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import userReducer from "@/slices/userSlice";

const dataCollectedPersistConfig = {
  key: "dataCollected",
  storage,
};

const rootReducer = combineReducers({
  // dataCollected: persistReducer(dataCollectedPersistConfig, cartReducer)
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
