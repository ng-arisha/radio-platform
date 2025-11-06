import { BASE_URL } from "@/utils/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface InitialCommissionState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  masterCommission: MasterCommissionType | null;
  mediaCommission: MediaHousesCommissionType | null;
  stationCommission: StationLevelCommissionType | null;
  loadingRevenueByCodes: "idle" | "pending" | "succeeded" | "failed";
  revenueByStationCodes: { name: string; value: number }[];
}

const initialState: InitialCommissionState = {
  loading: "idle",
  masterCommission: null,
  mediaCommission: null,
  stationCommission: null,
  loadingRevenueByCodes: "idle",
  revenueByStationCodes: [],
};

export const getSMasterPlatformCommission = createAsyncThunk(
  "commission/getSMasterPlatformCommission",
  async (
    data: { range: string; fromDate: string; endDate: string },
    { rejectWithValue, getState }
  ) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(
      `${BASE_URL}/show/performance?range=${data.range}&fromDate=${data.fromDate}&toDate=${data.endDate}`,
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

export const getMediaHouseCommission = createAsyncThunk(
  "commission/getMediaHouseCommission",
  async (
    data: { id: string; range: string; fromDate: string; toDate: string },
    { rejectWithValue, getState }
  ) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(
      `${BASE_URL}/show/commission-by-station/${data.id}?range=${data.range}${data.fromDate ? `&fromDate=${data.fromDate}` : ""}${data.toDate ? `&toDate=${data.toDate}` : ""}`,
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

export const getStationCommission = createAsyncThunk(
  "commission/getStationCommission",
  async (
    data: { id: string; range: string; startDate: string; endDate: string },
    { rejectWithValue, getState }
  ) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(
      `${BASE_URL}/show/commission-by-show/${data.id}?range=${data.range}&fromDate=${data.startDate}&toDate=${data.endDate}`,
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

export const masterSetMediaHouseCommissionRate = createAsyncThunk(
  "commission/masterSetMediaHouseCommissionRate",
  async (data: { id: string; rate: number }, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(
      `${BASE_URL}/commission/assign-media/${data.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.auth.token}`,
        },
        body: JSON.stringify({ rate: data.rate }),
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

export const setMediaHouseCommissionRate = createAsyncThunk(
  "commission/setMediaHouseCommissionRate",
  async (data: { id: string; rate: number }, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(
      `${BASE_URL}/commission/assign-station/${data.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.auth.token}`,
        },
        body: JSON.stringify({ rate: data.rate }),
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

export const setStationCommissionRate = createAsyncThunk(
  "commission/setStationCommissionRate",
  async (data: { id: string; rate: number }, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(
      `${BASE_URL}/commission/assign-show/${data.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.auth.token}`,
        },
        body: JSON.stringify({ rate: data.rate }),
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

export const setStationRevenueByCodes = createAsyncThunk(
  "commission/setStationRevenueByCodes",
  async (
    data: { range: string; startDate: string; endDate: string },
    { rejectWithValue, getState }
  ) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(
      `${BASE_URL}/commission/revenue-distribution-by-show/?range=${data.range}&fromDate=${data.startDate}&toDate=${data.endDate}`,
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

const commissionSlice = createSlice({
  name: "commission",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Master Platform Commission

    builder.addCase(getSMasterPlatformCommission.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getSMasterPlatformCommission.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.masterCommission = action.payload;
    });
    builder.addCase(
      getSMasterPlatformCommission.rejected,
      (state, { payload }) => {
        state.loading = "failed";
        toast.error(payload as string);
      }
    );

    // Set Media House Commission Rate
    builder.addCase(masterSetMediaHouseCommissionRate.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(
      masterSetMediaHouseCommissionRate.fulfilled,
      (state, action) => {
        state.loading = "succeeded";
        toast.success("Media House Commission Rate Updated Successfully");
      }
    );
    builder.addCase(
      masterSetMediaHouseCommissionRate.rejected,
      (state, { payload }) => {
        state.loading = "failed";
        toast.error(payload as string);
      }
    );

    // Get Media House Commission
    builder.addCase(getMediaHouseCommission.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getMediaHouseCommission.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.mediaCommission = action.payload;
    });
    builder.addCase(getMediaHouseCommission.rejected, (state, { payload }) => {
      state.loading = "failed";
      toast.error(payload as string);
    });

    // Set Station Commission Rate
    builder.addCase(setMediaHouseCommissionRate.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(setMediaHouseCommissionRate.fulfilled, (state, action) => {
      state.loading = "succeeded";
      toast.success("Station Commission Rate Updated Successfully");
    });
    builder.addCase(
      setMediaHouseCommissionRate.rejected,
      (state, { payload }) => {
        state.loading = "failed";
        toast.error(payload as string);
      }
    );

    // Get Station Commission
    builder.addCase(getStationCommission.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getStationCommission.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.stationCommission = action.payload;
    });
    builder.addCase(getStationCommission.rejected, (state, { payload }) => {
      state.loading = "failed";
      toast.error(payload as string);
    });

    // Set Station Commission Rate
    builder.addCase(setStationCommissionRate.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(setStationCommissionRate.fulfilled, (state, action) => {
      state.loading = "succeeded";
      toast.success("Show Commission Rate Updated Successfully");
    });
    builder.addCase(setStationCommissionRate.rejected, (state, { payload }) => {
      state.loading = "failed";
      toast.error(payload as string);
    });

    // Get Revenue Distribution by Show Codes
    builder.addCase(setStationRevenueByCodes.pending, (state) => {
      state.loadingRevenueByCodes = "pending";
    });
    builder.addCase(
      setStationRevenueByCodes.fulfilled,
      (state, action) => {
        state.loadingRevenueByCodes = "succeeded";
        state.revenueByStationCodes = action.payload;
      }
    );
    builder.addCase(
      setStationRevenueByCodes.rejected,
      (state, { payload }) => {
        state.loadingRevenueByCodes = "failed";
        toast.error(payload as string);
      }
    );
  },
});

export const commissionReducer = commissionSlice.reducer;
export const {} = commissionSlice.actions;
