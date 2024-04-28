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

export const getClanAsync = createAsyncThunk(
  "clan/get-clans",
  async (dataFilter: IFilterClan, thunkAPI) => {
    try {
      const response = await axiosClient.get(
        `clan?page=${dataFilter.page ?? 0}&limit=${dataFilter.limit ?? 0}`
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

export default clanSlice.reducer;
