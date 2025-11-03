import { BASE_URL } from "@/utils/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface InitialRevenueState  {
    loading: "idle" | "pending" | "succeeded" | "failed";
    masterRevenueData: {totalDeposits: number; totalPayout: number;netRevenue:number} ;
    loadMasterLineRevenueData: 'idle' | 'pending' | 'succeeded' | 'failed';
    masterLineRevenueData: {deposits:number; payouts:number; net:number; label:string}[];
    loadinMasterMediaHouseBardata: 'idle' | 'pending' | 'succeeded' | 'failed';
    masterMediaHouseBarGraphData: {name:string; value:number,color:string}[];
    loadingMasterDetailedTransactions: 'idle' | 'pending' | 'succeeded' | 'failed';
    masterDetailedTransactions: DetailedMasterTransactionsType | null;
}

const initialState : InitialRevenueState = {
    loading: "idle",
    masterRevenueData: {totalDeposits: 0, totalPayout: 0, netRevenue:0},
    loadMasterLineRevenueData: "idle",
    masterLineRevenueData: [],
    loadinMasterMediaHouseBardata: "idle",
    masterMediaHouseBarGraphData: [],
    loadingMasterDetailedTransactions: "idle",
    masterDetailedTransactions: null,
}

export const getMasterRevenueStats = createAsyncThunk(
    "shorevenues/getMasterRevenueStats",
    async (data: { period: string }, { rejectWithValue, getState }) => {
      const state = getState() as { auth: { token: string } };
      const response = await fetch(`${BASE_URL}/transaction/global-revenue?period=${data.period}`, {
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
      const resData = await response.json();
      return resData;
    }
  );

  export const getMasterLineRevenueData = createAsyncThunk(
    "shorevenues/getMasterLineRevenueData",
    async (data: { range: string }, { rejectWithValue, getState }) => {
      const state = getState() as { auth: { token: string } };
      const response = await fetch(`${BASE_URL}/transaction/global-revenue-line-data?range=${data.range}`, {
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
      const resData = await response.json();
      return resData;
    }
  );

  export const getMasterMediaHouseevenueBarGraphData = createAsyncThunk(
    "shorevenues/getMasterMediaHouseevenueBarGraphData",
    async (data: { range: string }, { rejectWithValue, getState }) => {
      const state = getState() as { auth: { token: string } };
      const response = await fetch(`${BASE_URL}/transaction/master-media-house-bar-graph-data?range=${data.range}`, {
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
      const resData = await response.json();
      return resData;
    }
  );

  export const getMasterDetailedTransactions = createAsyncThunk(
    "shorevenues/getMasterDetailedTransactions",
    async (data:{limit:number; page:number}, { rejectWithValue, getState }) => {
      const state = getState() as { auth: { token: string } };
      const response = await fetch(`${BASE_URL}/transaction/master-detailed-transactions?limit=${data.limit}&page=${data.page}`, {
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
      const resData = await response.json();
      return resData;
    }
  );

  const revenueSlice = createSlice({
    name: "revenue",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // Get Master Revenue Stats
        builder.addCase(getMasterRevenueStats.pending, (state) => {
          state.loading = "pending";
        })
        builder.addCase(getMasterRevenueStats.fulfilled, (state, action) => {
          state.loading = "succeeded";
          state.masterRevenueData = action.payload;
        })
        builder.addCase(getMasterRevenueStats.rejected, (state) => {
          state.loading = "failed";
        });

        // Get Master Line Revenue Data
        builder.addCase(getMasterLineRevenueData.pending, (state) => {
          state.loadMasterLineRevenueData = "pending";
        })
        builder.addCase(getMasterLineRevenueData.fulfilled, (state, action) => {
          state.loadMasterLineRevenueData = "succeeded";
          state.masterLineRevenueData = action.payload;
        })
        builder.addCase(getMasterLineRevenueData.rejected, (state,{payload}) => {
          state.loadMasterLineRevenueData = "failed";
          toast.error(payload as string);
        });

        // Get Master Media House Bar Graph Data
        builder.addCase(getMasterMediaHouseevenueBarGraphData.pending, (state) => {
          state.loadinMasterMediaHouseBardata = "pending";
        })
        builder.addCase(getMasterMediaHouseevenueBarGraphData.fulfilled, (state, action) => {
          state.loadinMasterMediaHouseBardata = "succeeded";
          state.masterMediaHouseBarGraphData = action.payload;
        })
        builder.addCase(getMasterMediaHouseevenueBarGraphData.rejected, (state,{payload}) => {
          state.loadinMasterMediaHouseBardata = "failed";
          toast.error(payload as string);
        });

        // Get Master Detailed Transactions
        builder.addCase(getMasterDetailedTransactions.pending, (state) => {
          state.loadingMasterDetailedTransactions = "pending";
        })
        builder.addCase(getMasterDetailedTransactions.fulfilled, (state, action) => {
          state.loadingMasterDetailedTransactions = "succeeded";
          state.masterDetailedTransactions = action.payload;
        })
        builder.addCase(getMasterDetailedTransactions.rejected, (state,{payload}) => {
          state.loadingMasterDetailedTransactions = "failed";
          toast.error(payload as string);
        });
    },
  })

  export const revenueReducer = revenueSlice.reducer;
  export const {} = revenueSlice.actions;