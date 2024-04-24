import { createSlice } from "@reduxjs/toolkit";

const spinSlice = createSlice({
    name: "spin",
    initialState: { value: false },
    reducers: {
        loading: (state) => {
            state.value = true;
        },
        unLoading: (state) => {
            state.value = false;
        }
    }
});

export const { loading, unLoading } = spinSlice.actions;

export default spinSlice.reducer;