import { createSlice } from "@reduxjs/toolkit";


interface InitialUthState {
    loading: "idle" | "pending" | "succeeded" | "failed";
    token: string | null;
}

const initialState : InitialUthState = {
    loading: "idle",
    token: null,
}




const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{},
    extraReducers: (builder) => {}
})

export const authReducer = authSlice.reducer;
export const { } = authSlice.actions;