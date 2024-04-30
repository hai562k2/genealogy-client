import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../axios/axiosClient";

export type TItemMember = {
  id: number;
  email: string;
  name: string;
  image: string[];
  gender: string;
  birthday: Date | null;
  lunarBirthday: Date | null;
  country: string | null;
  phone: string | null;
  job: string | null;
  workAddress: string | null;
  fatherId: number | null;
  motherId: number | null;
  partnerId: number[];
  description: string | null;
  deadDay: Date | null;
  lunarDeadDay: Date | null;
};

type TMember = {
  data: TItemMember[];
};

const initialState: TMember = {
  data: [],
};

export interface IFilterMember {
  page?: number;
  limit?: number;
  keyword?: string;
  id?: number | null;
  clanId?: number | null;
}

export const getMemberByClanAsync = createAsyncThunk(
  "member/clan",
  async (clanId: number, thunkAPI) => {
    try {
      const response = await axiosClient.get(
        `users?page=1&limit=1000&clanId=${clanId ?? 0}`
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const memberSlice = createSlice({
  name: "member",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getMemberByClanAsync.fulfilled, (state, action) => {
      state.data = action.payload.data.items;
    });
  },
});

export default memberSlice.reducer;
