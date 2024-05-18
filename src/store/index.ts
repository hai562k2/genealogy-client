import { configureStore } from "@reduxjs/toolkit";
import spinSlice from "./features/spinSlice";
import authSlice, { registerReducer } from "./features/authSlice";
import clanSlice, { clanByIdReducer } from "./features/clanSlice";
import memberSlice, {
  AllMemberReducer,
  InviteMemberReducer,
  RoleMemberByIdReducer,
  UserByIdReducer,
  UserInfoByIdReducer,
} from "./features/memberSlice";
import EventSlice, {
  CreateEventReducer,
  EventByIdReducer,
  eventCommentReducer,
} from "./features/EventSlice";

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
    UserByIdReducer,
    CreateEventReducer,
    EventByIdReducer,
    EventSlice,
    UserInfoByIdReducer,
    RoleMemberByIdReducer,
    eventCommentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
