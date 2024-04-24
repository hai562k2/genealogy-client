import { configureStore } from "@reduxjs/toolkit";
import spinSlice from "./features/spinSlice";
import authSlice from "./features/authSlice";

export const store = configureStore({
  reducer: {
    // Add reducer...
    spinSlice,
    authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
