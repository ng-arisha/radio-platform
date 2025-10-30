import { BASE_URL } from "@/utils/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface InitialShowState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  loadingStats: "idle" | "pending" | "succeeded" | "failed";
  loadingRevenue: "idle" | "pending" | "succeeded" | "failed";
  loadingShosTransactionsdata: "idle" | "pending" | "succeeded" | "failed";
  updatingShow: "idle" | "pending" | "succeeded" | "failed";
  show: ShowType | null;
  showStats: { label: string; value: string; icon: string; color: string }[];
  showRevenue: { time: string; revenue: number }[];
  showTransactionsdata: { time: string; revenue: number }[];
  showPresnters: PresenterType[];
  showPromotions: PromotionType[];
  showTransactions: PaginatatedTxnsType | null;
  stationShows: ShowType[];
  mediaHouseShows: ShowType[];
  randomShowTransaction: TransactionsType | null;
  allShows: ShowType[];
}

const initialState: InitialShowState = {
  loading: "idle",
  loadingStats: "idle",
  updatingShow: "idle",
  show: null,
  showStats: [],
  showRevenue: [],
  loadingRevenue: "idle",
  loadingShosTransactionsdata: "idle",
  showTransactionsdata: [],
  showPresnters: [],
  showPromotions: [],
  showTransactions: null,
  stationShows: [],
  mediaHouseShows: [],
  randomShowTransaction: null,
  allShows: [],
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

export const getAllShows = createAsyncThunk(
  "shows/getAllShows",
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(`${BASE_URL}/show/all`, {
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

export const createNewShow = createAsyncThunk(
  "shows/createNewShow",
  async (
    data: {
      name: string;
      code: string;
      startTime: string;
      endTime: string;
      stationId: string;
    },
    { rejectWithValue, getState }
  ) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(`${BASE_URL}/show/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.auth.token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message);
    }
    const showData = await response.json();
    return showData;
  }
);

export const updateShow = createAsyncThunk(
  "shows/updateShow",
  async (
    data: {
      id: string;
      name: string;
      code: string;
      startTime: string;
      endTime: string;
    },
    { rejectWithValue, getState }
  ) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(`${BASE_URL}/show/update-show/${data.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.auth.token}`,
      },
      body: JSON.stringify({
        name: data.name,
        code: data.code,
        startTime: data.startTime,
        endTime: data.endTime,
      }),
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

export const getMediaHouseShows = createAsyncThunk(
  "shows/getMediaHouseShows",
  async (data: { id: string }, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(
      `${BASE_URL}/media/media-house-shows/${data.id}`,
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

export const getShowTransactions = createAsyncThunk(
  "shows/getShowTransactions",
  async (
    data: {
      id: string;
      search: string;
      type: string;
      range: string;
      page: number;
      limit: number;
    },
    { rejectWithValue, getState }
  ) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(
      `${BASE_URL}/transaction/show-transactions/${data.id}?search=${data.search}&type=${data.type}&range=${data.range}&page=${data.page}&limit=${data.limit}`,
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

export const getRandomTransaction = createAsyncThunk(
  "shows/getRandomTransaction",
  async (data: { id: string }, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(
      `${BASE_URL}/transaction/show-transactions-summary/${data.id}`,
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

export const getShowInStation = createAsyncThunk(
  "shows/getShowInStation",
  async (
    data: { id: string; search?: string; status?: string; range?: string },
    { rejectWithValue, getState }
  ) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(
      `${BASE_URL}/show/shows/${data.id}?search=${data.search}&status=${data.status}&range=${data.range}`,
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

    // Get Show Transactions
    builder.addCase(getShowTransactions.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getShowTransactions.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.showTransactions = action.payload;
    });
    builder.addCase(getShowTransactions.rejected, (state) => {
      state.loading = "failed";
    });

    // Get Shows in Station
    builder.addCase(getShowInStation.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getShowInStation.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.stationShows = action.payload;
    });
    builder.addCase(getShowInStation.rejected, (state) => {
      state.loading = "failed";
    });

    // handle new show
    builder.addCase(createNewShow.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(createNewShow.fulfilled, (state, action) => {
      state.loading = "succeeded";
      // Optionally, you can push the new show to stationShows or handle it as needed
      state.stationShows.push(action.payload);
      toast.success("New show created successfully!");
    });
    builder.addCase(createNewShow.rejected, (state) => {
      state.loading = "failed";
    });

    // handle update show
    builder.addCase(updateShow.pending, (state) => {
      state.updatingShow = "pending";
    });
    builder.addCase(updateShow.fulfilled, (state, action) => {
      state.updatingShow = "succeeded";
      // Update the show in stationShows
      const index = state.stationShows.findIndex(
        (show) => show._id === action.payload._id
      );
      if (index !== -1) {
        state.stationShows[index] = action.payload;
      }
      toast.success("Show updated successfully!");
    });
    builder.addCase(updateShow.rejected, (state) => {
      state.updatingShow = "failed";
    });

    // Get Media House Shows
    builder.addCase(getMediaHouseShows.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getMediaHouseShows.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.mediaHouseShows = action.payload;
    });
    builder.addCase(getMediaHouseShows.rejected, (state) => {
      state.loading = "failed";
    });

    // Get Random Show Transaction
    builder.addCase(getRandomTransaction.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getRandomTransaction.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.randomShowTransaction = action.payload;
    });
    builder.addCase(getRandomTransaction.rejected, (state) => {
      state.loading = "failed";
    });

    // Get All Shows
    builder.addCase(getAllShows.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getAllShows.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.allShows = action.payload;
    });
    builder.addCase(getAllShows.rejected, (state) => {
      state.loading = "failed";
    });
  },
});

export const showReducer = showSlice.reducer;
export const {} = showSlice.actions;
