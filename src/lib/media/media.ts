
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface MediaHouseInterface {
  loading: "idle" | "pending" | "succeeded" | "failed";
  addingMediaHouse: "idle" | "pending" | "succeeded" | "failed";
  mediaHouses: MediaHouseType[];
  mediaHouse: MediaHouseType | null;
  mediaHouseDashboarddata: {label:string,value:string | number,icon:string,color:string}[];
  loadingDashboardData: "idle" | "pending" | "succeeded" | "failed";
  mediaPieData: {name:string,value:number,color:string}[];
  loadingPieData: "idle" | "pending" | "succeeded" | "failed";
  mediaRevenueByStation:{name:string,value:number}[];
  loadingRevenueByStation: "idle" | "pending" | "succeeded" | "failed";
  mediaRevenueByShow:{name:string,value:number}[];
  loadingRevenueByShow: "idle" | "pending" | "succeeded" | "failed";
  stationSummary: StationUmmaryType[];
  mediaStationAdmins: UserType[];
  mediaShowPresenters: UserType[];
  mediaFinanceSummary: {label:string,value:number,icon:string,color:string}[];
  mediaStationFinancedata: MediaStationFinancedataType[];
  loadingFinanceData: "idle" | "pending" | "succeeded" | "failed";

  mediaShowTransactionHistory: TransactionsType[];
}

const initialState: MediaHouseInterface = {
  loading: "idle",
  mediaHouses: [],
  addingMediaHouse: "idle",
  mediaHouse: null,
  mediaHouseDashboarddata: [],
  loadingDashboardData: "idle",
  mediaPieData: [],
  loadingPieData: "idle",
  mediaRevenueByStation: [],
  loadingRevenueByStation: "idle",
  mediaRevenueByShow: [],
  loadingRevenueByShow: "idle",
  stationSummary: [],
  mediaStationAdmins: [],
  mediaShowPresenters: [],
  mediaFinanceSummary: [],
  mediaStationFinancedata: [],
  loadingFinanceData: "idle",
  mediaShowTransactionHistory: [],
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
  async (data:{id:string,range:string,fromDate:string,toDate:string}, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const response = await fetch(`${BASE_URL}/media/media-dashboard/${data.id}?range=${data.range}&fromDate=${data.fromDate}&toDate=${data.toDate}`, {
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
      console.log(responseData);
      return responseData;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getMediaHousePieData = createAsyncThunk(
  "media/getMediaHousePieData",
  async (data:{id:string}, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const response = await fetch(`${BASE_URL}/media/media-pie-data/${data.id}`, {
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

export const getMediaRevenueByStation = createAsyncThunk(
  "media/getMediaRevenueByStation",
  async (data:{id:string,range:string}, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const response = await fetch(`${BASE_URL}/media/media-station-data/${data.id}?range=${data.range}`, {
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


export const getMediaRevenueByShow = createAsyncThunk(
  "media/getMediaRevenueByShow",
  async (data:{id:string,range:string}, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const response = await fetch(`${BASE_URL}/media/media-show-revenue-data/${data.id}?range=${data.range}`, {
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

export const getStationSummary = createAsyncThunk(
  "media/getStationSummary",
  async (data:{id:string}, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const response = await fetch(`${BASE_URL}/media/media-house-stations/${data.id}`, {
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


export const getMediaStationAdmins = createAsyncThunk(
  "media/getMediaStationAdmins",
  async (data:{id:string}, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const response = await fetch(`${BASE_URL}/media/media-house-station-admins/${data.id}`, {
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


export const getMediaStationShowPresenters = createAsyncThunk(
  "media/getMediaStationShowPresenters",
  async (data:{id:string}, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const response = await fetch(`${BASE_URL}/media/media-house-show-presenters/${data.id}`, {
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

export const getMediaFinanceSummary = createAsyncThunk(
  "media/getMediaFinanceSummary",
  async (data:{id:string}, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const response = await fetch(`${BASE_URL}/media/media-finance-summary/${data.id}`, {
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


export const getMediaStationFinanceData = createAsyncThunk(
  "media/getMediaStationFinanceData",
  async (data:{id:string}, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const response = await fetch(`${BASE_URL}/media/media-station-finance-data/${data.id}`, {
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

export const getMediaTransactionHistory = createAsyncThunk(
  "media/getMediaTransactionHistory",
  async (data:{id:string}, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const response = await fetch(`${BASE_URL}/media/media-show-transaction-history/${data.id}`, {
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

export const updateMiadHouse = createAsyncThunk(
  "media/updateMiadHouse",
  async (data:{id:string;name?:string; address?:string;}, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const response = await fetch(`${BASE_URL}/media/update-media-house/${data.id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${state.auth.token}`,
        },
        body:JSON.stringify({
          name: data.name,
          address: data.address,
        })
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

    // Get Media House Pie Data
    builder.addCase(getMediaHousePieData.pending, (state) => {
      state.loadingPieData = "pending";
    });
    builder.addCase(getMediaHousePieData.fulfilled, (state, action) => {
      state.loadingPieData = "succeeded";
      console.log(action.payload);
      state.mediaPieData = action.payload;
    });
    builder.addCase(getMediaHousePieData.rejected, (state) => {
      state.loadingPieData = "failed";
    });

    // Get Media Revenue By Station
    builder.addCase(getMediaRevenueByStation.pending, (state) => {
      state.loadingRevenueByStation = "pending";
    });
    builder.addCase(getMediaRevenueByStation.fulfilled, (state, action) => {
      state.loadingRevenueByStation = "succeeded";
      console.log(action.payload);
      state.mediaRevenueByStation = action.payload;
    });
    builder.addCase(getMediaRevenueByStation.rejected, (state) => {
      state.loadingRevenueByStation = "failed";
    });

    // Get Media Revenue By Show
    builder.addCase(getMediaRevenueByShow.pending, (state) => {
      state.loadingRevenueByShow = "pending";
    });
    builder.addCase(getMediaRevenueByShow.fulfilled, (state, action) => {
      state.loadingRevenueByShow = "succeeded";
      console.log(action.payload);
      state.mediaRevenueByShow = action.payload;
    });
    builder.addCase(getMediaRevenueByShow.rejected, (state) => {
      state.loadingRevenueByShow = "failed";
    });

    // Get Station Summary
    builder.addCase(getStationSummary.pending, (state) => {
       state.loading = "pending";
    });
    builder.addCase(getStationSummary.fulfilled, (state, action) => {
      state.loading = "succeeded";
      console.log(action.payload);
      state.stationSummary = action.payload;
    });
    builder.addCase(getStationSummary.rejected, (state) => {
      state.loading = "failed";
    });

    // Get Media Station Admins
    builder.addCase(getMediaStationAdmins.pending, (state) => {
       state.loading = "pending";
    });
    builder.addCase(getMediaStationAdmins.fulfilled, (state, action) => {
      state.loading = "succeeded";
      console.log(action.payload);
      state.mediaStationAdmins = action.payload;
    });
    builder.addCase(getMediaStationAdmins.rejected, (state) => {
      state.loading = "failed";
    });

    // Get Media Show Presenters
    builder.addCase(getMediaStationShowPresenters.pending, (state) => {
       state.loading = "pending";
    });
    builder.addCase(getMediaStationShowPresenters.fulfilled, (state, action) => {
      state.loading = "succeeded";
      console.log(action.payload);
      state.mediaShowPresenters = action.payload;
    });
    builder.addCase(getMediaStationShowPresenters.rejected, (state) => {
      state.loading = "failed";
    });

    // Get Media Finance Summary
    builder.addCase(getMediaFinanceSummary.pending, (state) => {
       state.loading = "pending";
    });
    builder.addCase(getMediaFinanceSummary.fulfilled, (state, action) => {
      state.loading = "succeeded";
      console.log(action.payload);
      state.mediaFinanceSummary = action.payload;
    });
    builder.addCase(getMediaFinanceSummary.rejected, (state) => {
      state.loading = "failed";
    });

    // Get Media Station Finance Data
    builder.addCase(getMediaStationFinanceData.pending, (state) => {
       state.loadingFinanceData = "pending";
    });
    builder.addCase(getMediaStationFinanceData.fulfilled, (state, action) => {
      state.loadingFinanceData = "succeeded";
      console.log(action.payload);
      state.mediaStationFinancedata = action.payload;
    });
    builder.addCase(getMediaStationFinanceData.rejected, (state) => {
      state.loadingFinanceData = "failed";
    });

    // Get Media Transaction History
    builder.addCase(getMediaTransactionHistory.pending, (state) => {
       state.loading = "pending";
    });
    builder.addCase(getMediaTransactionHistory.fulfilled, (state, action) => {
      state.loading = "succeeded";
      console.log(action.payload);
      state.mediaShowTransactionHistory = action.payload;
    });
    builder.addCase(getMediaTransactionHistory.rejected, (state) => {
      state.loading = "failed";
    });

    // Update Media House
    builder.addCase(updateMiadHouse.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(updateMiadHouse.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.mediaHouse = action.payload;
      toast.success("Media House updated successfully");
    });
    builder.addCase(updateMiadHouse.rejected, (state,{payload}) => {
      state.loading = "failed";
      toast.error(payload as string);
    });
  },
});

export const mediaReducer = mediaSlice.reducer;
export const {} = mediaSlice.actions;
