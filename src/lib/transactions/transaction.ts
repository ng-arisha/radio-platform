import { BASE_URL } from "@/utils/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InitialTrasactionSTate {
  loading: "idle" | "pending" | "succeeded" | "failed";
  masterTransactions: PaginatatedTxnsType | null;
}

const initialState: InitialTrasactionSTate = {
  loading: "idle",
  masterTransactions: null,
};

export const getAllTransactions = createAsyncThunk(
  "shows/getAllTransactions",
  async (
    data: {
      timeRange: string;
      phoneNumber: string;
      type: string;
      page: number;
      limit: number;
    },
    { rejectWithValue, getState }
  ) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(
      `${BASE_URL}/transaction/all-transactions?timeRange=${data.timeRange}&phoneNumber=${data.phoneNumber}&type=${data.type}&page=${data.page}&limit=${data.limit}`,
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
  },
});

export const transactionReducer = transactionSlice.reducer;
export const {} = transactionSlice.actions;
