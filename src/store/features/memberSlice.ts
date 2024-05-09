import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../axios/axiosClient";
import { FormInviteMember } from "../../utils/typeForm";
import { loading, unLoading } from "./spinSlice";
import { useNavigate } from "react-router-dom";

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
  fatherName: string | null;
  motherId: number | null;
  motherName: string | null;
  partnerId: number[];
  description: string | null;
  deadDay: Date | null;
  lunarDeadDay: Date | null;
};

export type TMemberItem = {
  items: TItemMember[];
  page: number;
  limit: number;
  total: number;
};

export type TMember = {
  data: TMemberItem;
};

export type AllMember = {
  data: TItemMember[];
};

const initialAllMemberState: AllMember = {
  data: [],
};

const initialState: TMember = {
  data: { items: [], page: 1, limit: 10, total: 0 },
};

export interface IFilterMember {
  page?: number;
  limit?: number;
  keyword?: string;
  id?: number | null;
  clanId?: number | null;
}

export interface IfilterMemberById {
  clanId?: number;
  userId?: number;
}

export type TItemMemberById = {
  id: number;
  userId: number;
  clanId: number;
  roleCd: number;
  __members__: TItemMember;
};

export type MemberById = {
  data: TItemMemberById;
};

const initialStateById: MemberById = {
  data: {
    id: 0,
    userId: 0,
    clanId: 0,
    roleCd: 0,
    __members__: {
      id: 0,
      email: "",
      name: "",
      image: [],
      gender: "",
      birthday: null,
      lunarBirthday: null,
      country: null,
      phone: null,
      job: null,
      workAddress: null,
      fatherId: null,
      fatherName: null,
      motherName: null,
      motherId: null,
      partnerId: [],
      description: null,
      deadDay: null,
      lunarDeadDay: null,
    },
  },
};

export const getMemberByClanAsync = createAsyncThunk(
  "member/clan",
  async (filter: IFilterMember, thunkAPI) => {
    try {
      const response = await axiosClient.get(
        `users?page=${filter.page}&limit=${filter.limit}&clanId=${
          filter.clanId ?? 0
        }&keyword=${filter.keyword ?? ""}`
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
      state.data = action.payload.data;
    });
  },
});

export const getUserByIdAsync = createAsyncThunk(
  "user/get-user",
  async (filter: IfilterMemberById, thunkAPI) => {
    try {
      const response = await axiosClient.get(
        `clan/role-member/user?clanId=${filter.clanId}&userId=${filter.userId}`
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const userByIdSlice = createSlice({
  name: "user/:id",
  initialState: initialStateById,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUserByIdAsync.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
  },
});

export const inviteMember = createAsyncThunk(
  "members/invite",
  async (
    { params, id }: { params: FormInviteMember; id: number },
    thunkApi
  ) => {
    thunkApi.dispatch(loading());
    try {
      const response = await axiosClient.post(
        `/clan/${id}/members/invite`,
        params
      );
      thunkApi.dispatch(unLoading());
      return response.data;
    } catch (error: any) {
      thunkApi.dispatch(unLoading());
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

const inviteMemberSlice = createSlice({
  name: "clan/invite/member",
  initialState: initialStateById,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(inviteMember.fulfilled, (state, action) => {
      state = action.payload;
    });
  },
});

export const getAllMemberByClanAsync = createAsyncThunk(
  "member/all",
  async (clanId: number, thunkAPI) => {
    try {
      const response = await axiosClient.get(`users/all/${clanId}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const allMemberSlice = createSlice({
  name: "all-member",
  initialState: initialAllMemberState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllMemberByClanAsync.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
  },
});

export const AllMemberReducer = allMemberSlice.reducer;

export const InviteMemberReducer = inviteMemberSlice.reducer;

export const UserByIdReducer = userByIdSlice.reducer;

export default memberSlice.reducer;
