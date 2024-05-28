import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../axios/axiosClient";
import { loading, unLoading } from "./spinSlice";
import { EmailExists, LoginForm, RegisterForm } from "../../utils/typeForm";

type TypeLoginSlice = {
  entity: any;
  error: any;
};

export type UserData = {
  name?: string;
  image?: string[];
  gender?: string;
  lunarBirthday?: string;
  country?: string;
  phone?: string;
  job?: string;
};

export type UserData1 = {
  name?: string;
  gender?: string;
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
      return respone.data;
    } catch (error: any) {
      thunkApi.dispatch(unLoading());
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
    builder.addCase(login.fulfilled, (state, action) => {
      state.entity = action.payload;
    });
  },
});

export const register = createAsyncThunk(
  "auth/email/register",
  async (params: RegisterForm, thunkApi) => {
    thunkApi.dispatch(loading());
    try {
      const respone = await axiosClient.post("/auth/email/register", params);
      thunkApi.dispatch(unLoading());
      return respone.data;
    } catch (error: any) {
      thunkApi.dispatch(unLoading());
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const authRegisterSlice = createSlice({
  name: "register",
  initialState: initialState,
  reducers: {
    clearAuth: (state) => {
      state.entity = null;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.entity = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const updateUserAsync = createAsyncThunk(
  "user/update",
  async (payload: { id: number; data: UserData }, thunkApi) => {
    thunkApi.dispatch(unLoading());
    try {
      const { id, data } = payload;
      const respone = await axiosClient.patch(`/users/${id}`, data);
      thunkApi.dispatch(unLoading());
      return respone.data;
    } catch (error: any) {
      thunkApi.dispatch(unLoading());
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const registerReducer = authRegisterSlice.reducer;

export const { clearAuth } = authSlice.actions;

export default authSlice.reducer;
