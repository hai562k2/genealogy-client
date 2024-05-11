import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../axios/axiosClient";
import { FormAddEvent, FormInviteMember } from "../../utils/typeForm";
import { loading, unLoading } from "./spinSlice";

export type TItemEvent = {
  id: number;
  content: string;
  name: string;
  image: string[];
  timeEvent: Date | null;
};

export type TEventItem = {
  items: TItemEvent[];
  page: number;
  limit: number;
  total: number;
};

export type TEvent = {
  data: TEventItem;
};

const initialState: TEvent = {
  data: { items: [], page: 1, limit: 10, total: 0 },
};

type TEventById = {
  data: TItemEvent;
};

const initialStateById: TEventById = {
  data: {
    id: 0,
    content: "",
    name: "",
    image: [],
    timeEvent: new Date("2024-01-10T09:15:13.759Z"),
  },
};

export interface IFilterEvent {
  page?: number;
  limit?: number;
  keyword?: string;
  clanId?: number | null;
}

export const getEventByClanAsync = createAsyncThunk(
  "event/clan",
  async (filter: IFilterEvent, thunkAPI) => {
    try {
      const response = await axiosClient.get(
        `event/list?page=${filter.page}&limit=${filter.limit}&clanId=${
          filter.clanId ?? 0
        }&keyword=${filter.keyword ?? ""}`
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const eventSlice = createSlice({
  name: "member",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getEventByClanAsync.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
  },
});

export const getEventByIdAsync = createAsyncThunk(
  "event/get-event",
  async (id: number, thunkAPI) => {
    try {
      const response = await axiosClient.get(`event/${id}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const eventByIdSlice = createSlice({
  name: "event/:id",
  initialState: initialStateById,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getEventByIdAsync.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
  },
});

export const createEvent = createAsyncThunk(
  "event/create",
  async (params: FormAddEvent, thunkApi) => {
    thunkApi.dispatch(loading());
    try {
      const respone = await axiosClient.post("/event", params);
      thunkApi.dispatch(unLoading());
      return respone.data;
    } catch (error: any) {
      thunkApi.dispatch(unLoading());
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const createEventSlice = createSlice({
  name: "event/create",
  initialState: initialStateById,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createEvent.fulfilled, (state, action) => {
      state = action.payload;
    });
  },
});

export const CreateEventReducer = createEventSlice.reducer;

export const EventByIdReducer = eventByIdSlice.reducer;

export default eventSlice.reducer;
