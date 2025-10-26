import { BASE_URL } from "@/utils/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


interface InitialMasterState {
    loading: "idle" | "pending" | "succeeded" | "failed";
    masterDashboardData:{label:string;value:number | string, icon:string, color:string}[];
    revenueData:{month:string; amount:number}[];
    loadingRevenueData: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: InitialMasterState = {
    loading: "idle",
    masterDashboardData:[],
    revenueData:[],
    loadingRevenueData: "idle",
}


export const getPlatformDashboardData = createAsyncThunk(
    "master/getPlatformDashboardData",
    async (_, { rejectWithValue, getState }) => {
      try {
        const state = getState() as { auth: { token: string } };
        const response = await fetch(`${BASE_URL}/show/platform-summary`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${state.auth.token}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          return rejectWithValue(errorData.message);
        }
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    }
  );

  export const getPlatformRevenueData = createAsyncThunk(
    "master/getPlatformRevenueData",
    async (_, { rejectWithValue, getState }) => {
      try {
        const state = getState() as { auth: { token: string } };
        const response = await fetch(`${BASE_URL}/show/generated-revenue`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${state.auth.token}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          return rejectWithValue(errorData.message);
        }
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    }
  );


const masterSlice = createSlice({
    name: "master",
    initialState,
    reducers:{},
    extraReducers: (builder) => {

        // Get Platform Dashboard Data
        builder.addCase(getPlatformDashboardData.pending, (state) => {
            state.loading = "pending";
        });
        builder.addCase(getPlatformDashboardData.fulfilled, (state, action) => {
            state.loading = "succeeded";
          
            state.masterDashboardData = action.payload;
        });
        builder.addCase(getPlatformDashboardData.rejected, (state) => {
            state.loading = "failed";
        });

        // Get Platform Revenue Data
        builder.addCase(getPlatformRevenueData.pending, (state) => {
            state.loadingRevenueData = "pending";
        });
        builder.addCase(getPlatformRevenueData.fulfilled, (state, action) => {
            state.loadingRevenueData = "succeeded";
          
            state.revenueData = action.payload;
        });
        builder.addCase(getPlatformRevenueData.rejected, (state) => {
            state.loadingRevenueData = "failed";
        });
    },
})


export const masterReducer = masterSlice.reducer;
export const {} = masterSlice.actions;