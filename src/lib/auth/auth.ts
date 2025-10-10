import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Cookie from "js-cookie";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface InitialUthState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  token: string | null;
}

const initialState: InitialUthState = {
  loading: "idle",
  token: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message);
    }
    const responseData = await response.json();
    return responseData;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // handle login
    builder.addCase(login.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loading = "succeeded";
      if (payload.access_token) {
        state.token = payload.access_token;
        console.log("Login Payload:", payload.access_token);
        Cookie.set("token", payload.access_token, { expires: 1});
        toast.success("Login successful");
      } else {
        state.token = null;
        toast.success(payload.message);
      }
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.loading = "failed";
      state.token = null;
      toast.error(payload as string);
    });
  },
});

export const authReducer = authSlice.reducer;
export const {} = authSlice.actions;
