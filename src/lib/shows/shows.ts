import { BASE_URL } from "@/utils/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InitialShowState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  loadingStats: "idle" | "pending" | "succeeded" | "failed";
  show: ShowType | null;
  showStats:{label:string,value:string,icon:string,color:string}[];
}

const initialState: InitialShowState = {
  loading: "idle",
  loadingStats: "idle",
  show: null,
  showStats:[],
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

export const getShowStats = createAsyncThunk("shows/getShowStats",
  async (data: { id: string }, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(`${BASE_URL}/transaction/show-stats/${data.id}`, {
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
    const statsData = await response.json();
    return statsData;
  }
)

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

    // Get Show Stats
    builder.addCase(getShowStats.pending, (state) => {
      state.loadingStats = "pending";
    });
    builder.addCase(getShowStats.fulfilled, (state, action) => {
      state.loadingStats = "succeeded";
      state.showStats = action.payload;
    });
    builder.addCase(getShowStats.rejected, (state) => {
      state.loadingStats = "failed";
    });
  },
});

export const showReducer = showSlice.reducer;
export const {} = showSlice.actions;
