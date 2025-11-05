import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface InitialStationType {
  loading: "idle" | "pending" | "succeeded" | "failed";
  addingStation: "idle" | "pending" | "succeeded" | "failed";
  mediaStations: StationType[];
  allStations: StationType[];
  station: StationType | null;
  stationDashboard: {
    label: string;
    value: string;
    icon: string;
    color: string;
  }[];
  stationPiedata: { name: string; value: number; color: string }[];
  loadingPieData: "idle" | "pending" | "succeeded" | "failed";
  stationBarData: { showName: string; revenue: number }[];
  loadingBarData: "idle" | "pending" | "succeeded" | "failed";
  stationPresenters: UserType[];
}

const initialState: InitialStationType = {
  loading: "idle",
  addingStation: "idle",
  mediaStations: [],
  allStations: [],
  station: null,
  stationDashboard: [],
  stationPiedata: [],
  loadingPieData: "idle",
  stationBarData: [],
  loadingBarData: "idle",
  stationPresenters: [],
};

export const newStation = createAsyncThunk(
  "stations/newStation",
  async (
    data: {
      name: string;
      address: string;
      frequency: string;
      code: string;
      userId: string;
      mediaHouseId: string;
    },
    { rejectWithValue, getState }
  ) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(`${BASE_URL}/station/create`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${state.auth.token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message);
    }
    const responseData = await response.json();
    return responseData;
  }
);

export const editStation = createAsyncThunk(
  "stations/editStation",
  async (
    data: {
      id: string;
      name?: string;
      address?: string;
      frequency?: string;
      userId?: string;
      mediaHouseId?: string;
    },
    { rejectWithValue, getState }
  ) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(`${BASE_URL}/station/edit/${data.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${state.auth.token}`,
      },
      body: JSON.stringify({
        name: data.name,
        address: data.address,
        frequency: data.frequency,
        userId: data.userId,
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

export const stationDetails = createAsyncThunk(
  "stations/stationDetails",
  async (data: { id: string }, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    console.log(`Tone: ${state.auth.token}`);
    const response = await fetch(`${BASE_URL}/station/station/${data.id}`, {
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
    console.log("Station Details Response:", responseData);
    return responseData;
  }
);

export const getMediaStations = createAsyncThunk(
  "stations/getMediaStations",
  async (data: { id: string }, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(`${BASE_URL}/station/media/${data.id}`, {
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
  }
);
export const getAllStations = createAsyncThunk(
  "stations/getAllStations",
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(`${BASE_URL}/station/all`, {
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
  }
);

export const getStationDashBoard = createAsyncThunk(
  "stations/ggetStationDashBoard",
  async (
    data: { id: string; range: string; startDate: string; endDate: string },
    { rejectWithValue, getState }
  ) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(
      `${BASE_URL}/station/station-dashboard/${data.id}?range=${data.range}&startDate=${data.startDate}&endDate=${data.endDate}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
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

export const getStationPiedata = createAsyncThunk(
  "stations/getStationPiedata",
  async (data: { id: string }, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(
      `${BASE_URL}/station/station-pie-data/${data.id}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${state.auth.token}`,
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message);
    }
    const responseData = await response.json();
    console.log("Fetching Pie Data for Station ID:", data.id);
    console.log("Pie Data Response:", responseData);
    return responseData;
  }
);
export const getStationBardata = createAsyncThunk(
  "stations/getStationBardata",
  async (
    data: { id: string; range: string; startDate: string; endDate: string },
    { rejectWithValue, getState }
  ) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(
      `${BASE_URL}/station/station-bar-data/${data.id}?range=${data.range}&startDate=${data.startDate}&endDate=${data.endDate}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
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

export const getStationPresenters = createAsyncThunk(
  "stations/getStationPresenters",
  async (data: { id: string }, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(
      `${BASE_URL}/station/station-presenters/${data.id}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
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

export const updateStationStatus = createAsyncThunk(
  "stations/updateStationStatus",
  async (
    data: { id: string; status: string },
    { rejectWithValue, getState }
  ) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(`${BASE_URL}/station/status/${data.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${state.auth.token}`,
      },
      body: JSON.stringify({ status: data.status }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message);
    }
    const responseData = await response.json();
    return responseData;
  }
);

const stationSlice = createSlice({
  name: "stations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // New Media Station
    builder.addCase(newStation.pending, (state) => {
      state.addingStation = "pending";
    });
    builder.addCase(newStation.fulfilled, (state, action) => {
      state.addingStation = "succeeded";
      state.mediaStations.push(action.payload);
      toast.success("Station created successfully");
    });
    builder.addCase(newStation.rejected, (state, { payload }) => {
      state.addingStation = "failed";
      toast.error(payload as string);
      console.log(`Error creating station: ${payload}`);
    });

    // Get Media Stations
    builder.addCase(getMediaStations.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getMediaStations.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.mediaStations = action.payload;
    });
    builder.addCase(getMediaStations.rejected, (state) => {
      state.loading = "failed";
    });

    // Edit Station
    builder.addCase(editStation.pending, (state) => {
      state.addingStation = "pending";
    });
    builder.addCase(editStation.fulfilled, (state, action) => {
      state.addingStation = "succeeded";
      const index = state.mediaStations.findIndex(
        (station) => station._id === action.payload._id
      );
      if (index !== -1) {
        state.mediaStations[index] = action.payload;
      }
      toast.success("Station updated successfully");
    });

    builder.addCase(editStation.rejected, (state, { payload }) => {
      state.addingStation = "failed";
      toast.error(payload as string);
    });

    // Station Details
    builder.addCase(stationDetails.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(stationDetails.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.station = action.payload;
    });
    builder.addCase(stationDetails.rejected, (state, { payload }) => {
      state.loading = "failed";
      toast.error(payload as string);
    });

    // Get All Stations
    builder.addCase(getAllStations.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getAllStations.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.allStations = action.payload;
    });
    builder.addCase(getAllStations.rejected, (state, { payload }) => {
      state.loading = "failed";
      toast.error(payload as string);
    });

    // Get Station Dashboard
    builder.addCase(getStationDashBoard.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getStationDashBoard.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.stationDashboard = action.payload;
    });
    builder.addCase(getStationDashBoard.rejected, (state, { payload }) => {
      state.loading = "failed";
      toast.error(payload as string);
    });

    //
    // Get Station Pie data
    builder.addCase(getStationPiedata.pending, (state) => {
      state.loadingPieData = "pending";
    });
    builder.addCase(getStationPiedata.fulfilled, (state, action) => {
      state.loadingPieData = "succeeded";
      state.stationPiedata = action.payload;
      console.log("Station Pie Data Fetched:", action.payload);
    });
    builder.addCase(getStationPiedata.rejected, (state, { payload }) => {
      state.loadingPieData = "failed";
      toast.error(payload as string);
    });

    // Get Station Bar data
    builder.addCase(getStationBardata.pending, (state) => {
      state.loadingBarData = "pending";
    });
    builder.addCase(getStationBardata.fulfilled, (state, action) => {
      state.loadingBarData = "succeeded";
      state.stationBarData = action.payload;
    });
    builder.addCase(getStationBardata.rejected, (state, { payload }) => {
      state.loadingBarData = "failed";
      toast.error(payload as string);
    });

    // Get Station Presenters
    builder.addCase(getStationPresenters.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getStationPresenters.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.stationPresenters = action.payload;
    });
    builder.addCase(getStationPresenters.rejected, (state, { payload }) => {
      state.loading = "failed";
      toast.error(payload as string);
    });

    // Update Station Status
    builder.addCase(updateStationStatus.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(updateStationStatus.fulfilled, (state, action) => {
      state.loading = "succeeded";
      const index = state.allStations.findIndex(
        (station) => station._id === action.payload._id
      );
      if (index !== -1) {
        state.allStations[index] = action.payload;
      }
      toast.success("Station status updated successfully");
    });
    builder.addCase(updateStationStatus.rejected, (state, { payload }) => {
      state.loading = "failed";
      toast.error(payload as string);
    });
  },
});

export const stationReducer = stationSlice.reducer;
export const {} = stationSlice.actions;
