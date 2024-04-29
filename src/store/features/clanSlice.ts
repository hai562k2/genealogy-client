import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../axios/axiosClient";

export type TItemClan = {
  id: number;
  name: string;
};

type TClan = {
  data: TItemClan[];
};

const initialState: TClan = {
  data: [],
};

export interface IFilterClan {
  page?: number;
  limit?: number;
  keyword?: string;
  id?: number | null;
}

export interface IFilterMember {
  page?: number;
  limit?: number;
  keyword?: string;
  id?: number | null;
  clanId?: number | null;
}

export const getClanAsync = createAsyncThunk(
  "clan/get-clans",
  async (dataFilter: IFilterClan, thunkAPI) => {
    try {
      const response = await axiosClient.get(
        `clan?page=${dataFilter.page ?? 1}&limit=${dataFilter.limit ?? 10}`
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const clanSlice = createSlice({
  name: "clan",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getClanAsync.fulfilled, (state, action) => {
      state.data = action.payload.data.items;
    });
  },
});

export const getMemberByClanAsync = createAsyncThunk(
  "member/clan",
  async (clanId: number, thunkAPI) => {
    try {
      const response = await axiosClient.get(
        `users?page=1&limit=1000&clanId=${clanId ?? 0}`
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const memberSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getMemberByClanAsync.fulfilled, (state, action) => {
      state.data = action.payload.data.items;
    });
  },
});

export default clanSlice.reducer;
