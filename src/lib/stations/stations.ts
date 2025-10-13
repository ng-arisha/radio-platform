import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface InitialStationType {
  loading: "idle" | "pending" | "succeeded" | "failed";
  addingStation: "idle" | "pending" | "succeeded" | "failed";
  mediaStations: StationType[];
  station: StationType | null;
}

const initialState: InitialStationType = {
  loading: "idle",
  addingStation: "idle",
  mediaStations: [],
  station: null,
};

export const newStation = createAsyncThunk(
  "stations/newStation",
  async (
    data: {
      name: string;
      address: string;
      frequency: string;
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


const stationSlice = createSlice({
    name: "stations",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
            // New Media Station
        builder.addCase(newStation.pending,(state)=>{
            state.addingStation = "pending"
        });
        builder.addCase(newStation.fulfilled,(state,action)=>{
            state.addingStation = "succeeded"
            state.mediaStations.push(action.payload)
        });
        builder.addCase(newStation.rejected,(state,{payload})=>{
            state.addingStation = "failed"
            toast.error(payload as string)
        });

        // Get Media Stations
       builder.addCase(getMediaStations.pending,(state)=>{
            state.loading = "pending"
        });
        builder.addCase(getMediaStations.fulfilled,(state,action)=>{
            state.loading = "succeeded"
            state.mediaStations = action.payload
        });
        builder.addCase(getMediaStations.rejected,(state)=>{
            state.loading = "failed"
        });
    }
})

export const stationReducer = stationSlice.reducer;
export const {} = stationSlice.actions;
