import { BASE_URL } from "@/utils/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface InitialTrasactionSTate {
  loading: "idle" | "pending" | "succeeded" | "failed";
  masterTransactions: PaginatatedTxnsType | null;
  mediaTransactions: PaginatatedTxnsType | null;
}

const initialState: InitialTrasactionSTate = {
  loading: "idle",
  masterTransactions: null,
  mediaTransactions: null,
};

export const getAllTransactions = createAsyncThunk(
  "transactions/getAllTransactions",
  async (
    data: {
      timeRange: string;
      phoneNumber: string;
      type: string;
      page: number;
      limit: number;
      startDate:string;
      endDate:string
    },
    { rejectWithValue, getState }
  ) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(
      `${BASE_URL}/transaction/all-transactions?timeRange=${data.timeRange}&phoneNumber=${data.phoneNumber}&type=${data.type}&page=${data.page}&limit=${data.limit}&startDate=${data.startDate}&endDate=${data.endDate}`,
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

export const getMediaTransactions = createAsyncThunk(
    "transactions/getMediaTransactions",
    async (
      data: {
        id:string
        timeRange: string;
        phoneNumber: string;
        type: string;
        page: number;
        limit: number;
        startDate:string;
        endDate:string
      },
      { rejectWithValue, getState }
    ) => {
      const state = getState() as { auth: { token: string } };
      const response = await fetch(
        `${BASE_URL}/media/media-show-transaction-history-paginated/${data.id}?timeRange=${data.timeRange}&phoneNumber=${data.phoneNumber}&type=${data.type}&page=${data.page}&limit=${data.limit}&startDate=${data.startDate}&endDate=${data.endDate}`,
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


  export const processPayouts = createAsyncThunk(
    "transactions/processPayouts",
    async (
      data: {
        phoneNumber:string,
        amount:number,
        showId:string,
        promotionId:string
      },
      { rejectWithValue, getState }
    ) => {
      const state = getState() as { auth: { token: string } };
      const response = await fetch(
        `${BASE_URL}/transaction/payout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.auth.token}`,
          },
          body:JSON.stringify(data)
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

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All Transactions
    builder.addCase(getAllTransactions.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getAllTransactions.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.masterTransactions = action.payload;
      console.log("Transactions fetched:", action.payload);
    });
    builder.addCase(getAllTransactions.rejected, (state) => {
      state.loading = "failed";
    });

    // Get Media Transactions
    builder.addCase(getMediaTransactions.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getMediaTransactions.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.mediaTransactions = action.payload;
      console.log("Media Transactions fetched:", action.payload);
    });
    builder.addCase(getMediaTransactions.rejected, (state) => {
      state.loading = "failed";
    });

    // Process Payouts
    builder.addCase(processPayouts.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(processPayouts.fulfilled, (state, action) => {
      state.loading = "succeeded";
      console.log("Payout processed:", action.payload);
      toast.success("Payout processed successfully");
    });
    builder.addCase(processPayouts.rejected, (state) => {
      state.loading = "failed";
      toast.error("Failed to process payout");
    });
  },
});

export const transactionReducer = transactionSlice.reducer;
export const {} = transactionSlice.actions;
