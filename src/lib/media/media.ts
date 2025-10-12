import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface MediaHouseInterface {
  loading: "idle" | "pending" | "succeeded" | "failed";
  mediaHouses: MediaHouseType[];
}

const initialState: MediaHouseInterface = {
  loading: "idle",
  mediaHouses: [],
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
  },
});

export const mediaReducer = mediaSlice.reducer;
export const {} = mediaSlice.actions;
