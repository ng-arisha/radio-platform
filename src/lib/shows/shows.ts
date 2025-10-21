import { BASE_URL } from "@/utils/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InitialShowState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  show: ShowsType | null;
}

const initialState: InitialShowState = {
  loading: "idle",
  show: null,
};

export const getShowDetails = createAsyncThunk(
  "shows/getShowDetails",
  async (data: { id: string }, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(`${BASE_URL}/show/details/${data.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.auth.token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message);
    }
    const showData = await response.json();
    return showData;
  }
);

const showSlice = createSlice({
  name: "show",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Show Details

    builder.addCase(getShowDetails.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getShowDetails.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.show = action.payload;
    });
    builder.addCase(getShowDetails.rejected, (state) => {
      state.loading = "failed";
    });
  },
});

export const showReducer = showSlice.reducer;
export const {} = showSlice.actions;
