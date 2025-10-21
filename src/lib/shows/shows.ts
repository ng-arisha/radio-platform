import { BASE_URL } from "@/utils/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InitialShowState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  loadingStats: "idle" | "pending" | "succeeded" | "failed";
  loadingRevenue: "idle" | "pending" | "succeeded" | "failed";
  loadingShosTransactionsdata: "idle" | "pending" | "succeeded" | "failed";
  show: ShowType | null;
  showStats: { label: string; value: string; icon: string; color: string }[];
  showRevenue: { time: string; revenue: number }[];
  showTransactionsdata: { time: string; revenue: number }[];
  showPresnters: PresenterType[];
  showPromotions: PromotionType[];
}

const initialState: InitialShowState = {
  loading: "idle",
  loadingStats: "idle",
  show: null,
  showStats: [],
  showRevenue: [],
  loadingRevenue: "idle",
  loadingShosTransactionsdata: "idle",
  showTransactionsdata: [],
  showPresnters: [],
  showPromotions: [],
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

export const getShowStats = createAsyncThunk(
  "shows/getShowStats",
  async (data: { id: string }, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(
      `${BASE_URL}/transaction/show-stats/${data.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.auth.token}`,
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message);
    }
    const statsData = await response.json();
    return statsData;
  }
);

export const getShowTransactionsdata = createAsyncThunk(
  "shows/getShowTransactionsdata",
  async (data: { id: string }, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(
      `${BASE_URL}/transaction/transactions/${data.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.auth.token}`,
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message);
    }
    const transactionsData = await response.json();
    console.log("transactionsData", transactionsData);
    return transactionsData;
  }
);

export const getShowRevenue = createAsyncThunk(
  "shows/getShowRevenue",
  async (data: { id: string }, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(
      `${BASE_URL}/transaction/revenue-data/${data.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.auth.token}`,
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message);
    }
    const revenueData = await response.json();
    return revenueData;
  }
);

export const getShowPresenters = createAsyncThunk(
  "shows/getShowPresenters",
  async (data: { id: string }, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(
      `${BASE_URL}/transaction/team-members/${data.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.auth.token}`,
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message);
    }
    const revenueData = await response.json();
    return revenueData;
  }
);
export const getShowPromotions = createAsyncThunk(
  "shows/getShowPromotions",
  async (data: { id: string }, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(`${BASE_URL}/promotion/active/${data.id}`, {
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
    const revenueData = await response.json();
    return revenueData;
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

    // Get Show Revenue
    builder.addCase(getShowRevenue.pending, (state) => {
      state.loadingRevenue = "pending";
    });
    builder.addCase(getShowRevenue.fulfilled, (state, action) => {
      state.loadingRevenue = "succeeded";
      state.showRevenue = action.payload;
    });
    builder.addCase(getShowRevenue.rejected, (state) => {
      state.loadingRevenue = "failed";
    });

    // Get Show Transactions Data
    builder.addCase(getShowTransactionsdata.pending, (state) => {
      state.loadingShosTransactionsdata = "pending";
    });
    builder.addCase(getShowTransactionsdata.fulfilled, (state, action) => {
      state.loadingShosTransactionsdata = "succeeded";
      state.showTransactionsdata = action.payload;
    });
    builder.addCase(getShowTransactionsdata.rejected, (state) => {
      state.loadingShosTransactionsdata = "failed";
    });

    // Get Show Presenters
    builder.addCase(getShowPresenters.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getShowPresenters.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.showPresnters = action.payload;
    });
    builder.addCase(getShowPresenters.rejected, (state) => {
      state.loading = "failed";
    });

    // Get Show Promotions
    builder.addCase(getShowPromotions.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getShowPromotions.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.showPromotions = action.payload;
    });
    builder.addCase(getShowPromotions.rejected, (state) => {
      state.loading = "failed";
    });
  },
});

export const showReducer = showSlice.reducer;
export const {} = showSlice.actions;
