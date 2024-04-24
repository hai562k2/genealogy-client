import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../axios/axiosClient";
import { loading, unLoading } from "./spinSlice";
import { EmailExists, LoginForm } from "../../utils/typeForm";

type TypeLoginSlice = {
  entity: any;
  error: any;
};

const initialState: TypeLoginSlice = {
  entity: null,
  error: null,
};

export const exists = createAsyncThunk(
  "auth/email/exists",
  async (params: EmailExists, thunkApi) => {
    thunkApi.dispatch(loading());
    try {
      const respone = await axiosClient.post("/auth/email/exists", params);
      thunkApi.dispatch(unLoading());
      return respone.data;
    } catch (error: any) {
      thunkApi.dispatch(unLoading());
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/email/login",
  async (params: LoginForm, thunkApi) => {
    thunkApi.dispatch(loading());
    try {
      const respone = await axiosClient.post("/auth/email/login", params);
      thunkApi.dispatch(unLoading());
      console.log(respone.data);
      return respone.data;
    } catch (error: any) {
      thunkApi.dispatch(unLoading());
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    clearAuth: (state) => {
      state.entity = null;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.entity = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearAuth } = authSlice.actions;

export default authSlice.reducer;
