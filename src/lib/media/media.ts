
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface MediaHouseInterface {
  loading: "idle" | "pending" | "succeeded" | "failed";
  addingMediaHouse: "idle" | "pending" | "succeeded" | "failed";
  mediaHouses: MediaHouseType[];
  mediaHouse: MediaHouseType | null;
  mediaHouseDashboarddata: {label:string,value:string,icon:string,color:string}[];
  loadingDashboardData: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: MediaHouseInterface = {
  loading: "idle",
  mediaHouses: [],
  addingMediaHouse: "idle",
  mediaHouse: null,
  mediaHouseDashboarddata: [],
  loadingDashboardData: "idle",
};

export const getAllMediaHouses = createAsyncThunk(
  "media/getAllMediaHouses",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const response = await fetch(`${BASE_URL}/media/all`, {
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

export const getSingleMediaHouse = createAsyncThunk(
  "media/getSingleMediaHouse",
  async (data:{id:string}, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const response = await fetch(`${BASE_URL}/media/${data.id}`, {
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

export const getMediaHouseDahsboardData = createAsyncThunk(
  "media/getMediaHouseDahsboardData",
  async (data:{id:string}, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const response = await fetch(`${BASE_URL}/media/media-dashboard/${data.id}`, {
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

export const newMedia = createAsyncThunk(
  "media/newMedia",
  async (data:{name:string; address:string; userId:string}, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const response = await fetch(`${BASE_URL}/media/new`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${state.auth.token}`,
        },
        body:JSON.stringify(data)
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

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Get All Media Houses
    builder.addCase(getAllMediaHouses.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getAllMediaHouses.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.mediaHouses = action.payload;
    });
    builder.addCase(getAllMediaHouses.rejected, (state) => {
      state.loading = "failed";
    });

    // Create New Media House
    builder.addCase(newMedia.pending, (state) => {
      state.addingMediaHouse = "pending";
    });
    builder.addCase(newMedia.fulfilled, (state, action) => {
      state.addingMediaHouse = "succeeded";
      state.mediaHouses.push(action.payload);
    });
    builder.addCase(newMedia.rejected, (state,{payload}) => {
      state.addingMediaHouse = "failed";
      toast.error(payload as string);
    });

    // Get Single Media House
    builder.addCase(getSingleMediaHouse.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getSingleMediaHouse.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.mediaHouse = action.payload;
      console.log(action.payload);
    });
    builder.addCase(getSingleMediaHouse.rejected, (state) => {
      state.loading = "failed";
    });

    // Get Media House Dashboard Data
    builder.addCase(getMediaHouseDahsboardData.pending, (state) => {
      state.loadingDashboardData = "pending";
    });
    builder.addCase(getMediaHouseDahsboardData.fulfilled, (state, action) => {
      state.loadingDashboardData = "succeeded";
      console.log(action.payload);
      state.mediaHouseDashboarddata = action.payload;
    });
    builder.addCase(getMediaHouseDahsboardData.rejected, (state) => {
      state.loadingDashboardData = "failed";
    });
  },
});

export const mediaReducer = mediaSlice.reducer;
export const {} = mediaSlice.actions;
