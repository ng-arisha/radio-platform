import { BASE_URL } from "@/utils/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface InitialFinanceState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  stationFinancialPieData: { name: string; value: number; color: string }[];
  stationFinancialsShowData: AllocationType[];
  loadingShowData: "idle" | "pending" | "succeeded" | "failed";
  stationTransactionsData: TransactionsType[];
}

const initialState: InitialFinanceState = {
  loading: "idle",
  stationFinancialPieData: [],
  stationFinancialsShowData: [],
  loadingShowData: "idle",
  stationTransactionsData: [],
};

export const allocateFundsToMediaHouse = createAsyncThunk(
  "finance/allocateFundsToMediaHouse",
  async (
    data: { id: string; allocated: number; mediaHouseId: string },
    { rejectWithValue, getState }
  ) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(`${BASE_URL}/finance/allocate/${data.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.auth.token}`,
      },
      body: JSON.stringify({
        allocated: data.allocated,
        mediaHouseId: data.mediaHouseId,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message);
    }
    const responseData = await response.json();
    return responseData;
  }
);

export const allocateFundsToStation = createAsyncThunk(
  "finance/allocateFundsToStation",
  async (
    data: { id: string; allocated: number; stationId: string },
    { rejectWithValue, getState }
  ) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(
      `${BASE_URL}/finance/allocate-station/${data.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.auth.token}`,
        },
        body: JSON.stringify({
          allocated: data.allocated,
          stationId: data.stationId,
        }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message);
    }
    const responseData = await response.json();
    return responseData;
  }
);

export const getStationFinancialPieData = createAsyncThunk(
  "finance/getStationFinancialPieData",
  async (data: { id: string }, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(
      `${BASE_URL}/finance/station-allocation-summary/${data.id}`,
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
    const responseData = await response.json();
    return responseData;
  }
);

export const getStationFinancialShowData = createAsyncThunk(
  "finance/getStationFinancialShowData",
  async (data: { id: string }, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(
      `${BASE_URL}/finance/show-allocations/${data.id}`,
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
    const responseData = await response.json();
    return responseData;
  }
);

export const getStationTransactions = createAsyncThunk(
  "finance/getStationTransactions",
  async (data: { id: string }, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(
      `${BASE_URL}/transaction/station-transactions/${data.id}`,
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
    const responseData = await response.json();
    return responseData;
  }
);

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(allocateFundsToMediaHouse.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(allocateFundsToMediaHouse.fulfilled, (state) => {
      state.loading = "succeeded";
      toast.success("Funds allocated successfully");
    });
    builder.addCase(
      allocateFundsToMediaHouse.rejected,
      (state, { payload }) => {
        state.loading = "failed";
        toast.error((payload as string) || "Failed to allocate funds");
      }
    );

    // get station financial pie data

    builder.addCase(getStationFinancialPieData.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(
      getStationFinancialPieData.fulfilled,
      (state, { payload }) => {
        state.loading = "succeeded";
        state.stationFinancialPieData = payload;
      }
    );
    builder.addCase(
      getStationFinancialPieData.rejected,
      (state, { payload }) => {
        state.loading = "failed";
        toast.error((payload as string) || "Failed to fetch financial data");
      }
    );

    // get station financial show data
    builder.addCase(getStationFinancialShowData.pending, (state) => {
      state.loadingShowData = "pending";
    });
    builder.addCase(
      getStationFinancialShowData.fulfilled,
      (state, { payload }) => {
        state.loadingShowData = "succeeded";
        state.stationFinancialsShowData = payload;
      }
    );
    builder.addCase(
      getStationFinancialShowData.rejected,
      (state, { payload }) => {
        state.loadingShowData = "failed";
        toast.error(
          (payload as string) || "Failed to fetch show financial data"
        );
      }
    );

    // get station transactions data
    builder.addCase(getStationTransactions.pending, (state) => {
      state.loadingShowData = "pending";
    });
    builder.addCase(getStationTransactions.fulfilled, (state, { payload }) => {
      state.loadingShowData = "succeeded";
      state.stationTransactionsData = payload;
    });
    builder.addCase(getStationTransactions.rejected, (state, { payload }) => {
      state.loadingShowData = "failed";
      toast.error(
        (payload as string) || "Failed to fetch station transactions data"
      );
    });

    // allocate funds to station
    builder.addCase(allocateFundsToStation.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(allocateFundsToStation.fulfilled, (state) => {
      state.loading = "succeeded";
      toast.success("Funds allocated to station successfully");
    });
    builder.addCase(allocateFundsToStation.rejected, (state, { payload }) => {
      state.loading = "failed";
      toast.error((payload as string) || "Failed to allocate funds to station");
    });
  },
});

export const financeReducer = financeSlice.reducer;
export const {} = financeSlice.actions;
