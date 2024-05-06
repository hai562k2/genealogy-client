import { configureStore } from "@reduxjs/toolkit";
import spinSlice from "./features/spinSlice";
import authSlice, { registerReducer } from "./features/authSlice";
import clanSlice, { clanByIdReducer } from "./features/clanSlice";
import memberSlice from "./features/memberSlice";

export const store = configureStore({
  reducer: {
    // Add reducer...
    spinSlice,
    authSlice,
    clanSlice,
    memberSlice,
    clanByIdReducer,
    registerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
