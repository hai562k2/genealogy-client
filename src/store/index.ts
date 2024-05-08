import { configureStore } from "@reduxjs/toolkit";
import spinSlice from "./features/spinSlice";
import authSlice, { registerReducer } from "./features/authSlice";
import clanSlice, { clanByIdReducer } from "./features/clanSlice";
import memberSlice, {
  AllMemberReducer,
  InviteMemberReducer,
} from "./features/memberSlice";

export const store = configureStore({
  reducer: {
    // Add reducer...
    spinSlice,
    authSlice,
    clanSlice,
    memberSlice,
    clanByIdReducer,
    registerReducer,
    InviteMemberReducer,
    AllMemberReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
