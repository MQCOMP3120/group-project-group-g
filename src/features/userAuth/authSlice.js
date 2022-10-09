import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    hasAccount: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        register: (state) => {
            state.hasAccount = false
        },
        login: (state) => {
            state.hasAccount = true
        },
    },
});

export const {register, login} = authSlice.actions;
export default authSlice.reducer;