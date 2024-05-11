import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../axios/axiosClient";
import { FormAddClan } from "../../utils/typeForm";
import { loading, unLoading } from "./spinSlice";

export type TItemClan = {
  id: number;
  name: string;
  information: string;
  image: string[];
};

type TClanById = {
  data: TItemClan;
};
const initialStateById: TClanById = {
  data: { id: 0, information: "", name: "", image: [] },
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

export const getClanByIdAsync = createAsyncThunk(
  "clan/get-clan",
  async (clanId: number, thunkAPI) => {
    try {
      const response = await axiosClient.get(`clan/${clanId}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const clanByIdSlice = createSlice({
  name: "clan/:id",
  initialState: initialStateById,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getClanByIdAsync.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
  },
});

export const clanByIdReducer = clanByIdSlice.reducer;

export const createClan = createAsyncThunk(
  "clan/create",
  async (params: FormAddClan, thunkApi) => {
    thunkApi.dispatch(loading());
    try {
      const respone = await axiosClient.post("/clan", params);
      thunkApi.dispatch(unLoading());
      return respone.data;
    } catch (error: any) {
      thunkApi.dispatch(unLoading());
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const updateClanAsync = createAsyncThunk(
  "clan/update",
  async ({ params, id }: { params: TItemClan; id: number }, thunkApi) => {
    thunkApi.dispatch(loading());
    try {
      const respone = await axiosClient.patch(`/clan/${id}`, params);
      thunkApi.dispatch(unLoading());
      return respone.data;
    } catch (error: any) {
      thunkApi.dispatch(unLoading());
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export default clanSlice.reducer;
