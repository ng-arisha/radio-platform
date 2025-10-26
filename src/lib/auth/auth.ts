import { BASE_URL } from "@/utils/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";



interface InitialAuthState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  token: string | null;
  tokenuser:JwtPayloadType | null
}

const initialState: InitialAuthState = {
  loading: "idle",
  token: null,
  tokenuser:null
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


export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data: { email: string}, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
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

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data: { email: string,token:string,newPassword:string}, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/auth/reset-password`, {
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
  reducers: {
    setUserFromToken: (state) => {
      const token = state.token || Cookie.get("token");
      if (token) {
        try {
          const decodedToken = jwtDecode<JwtPayloadType>(token);
          state.tokenuser = decodedToken;
        } catch (error) {
          console.log("Error decoding token:", error);
          state.tokenuser = null;
        }
      } else {
        state.tokenuser = null;
      }
    },
    logout: (state) => {
      state.token = null;
      state.tokenuser = null;
      Cookie.remove("token");
      toast.success("Logged out successfully");
    }
  },
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

    // handle forgot password
    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(forgotPassword.fulfilled, (state, { payload }) => {
      state.loading = "succeeded";
      toast.success(payload.message);
    });
    builder.addCase(forgotPassword.rejected, (state, { payload }) => {
      state.loading = "failed";
      toast.error(payload as string);
    });

    // handle reset password
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(resetPassword.fulfilled, (state, { payload }) => {
      state.loading = "succeeded";
      toast.success(payload.message);
    });
    builder.addCase(resetPassword.rejected, (state, { payload }) => {
      state.loading = "failed";
      toast.error(payload as string);
    });
  },
});

export const authReducer = authSlice.reducer;
export const {setUserFromToken,logout} = authSlice.actions;
