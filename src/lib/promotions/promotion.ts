import { BASE_URL } from "@/utils/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface InitialPromotionsState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  loadingPromotions: "idle" | "pending" | "succeeded" | "failed";
  stationPromotions: PromotionType[];
  stationPromotionPieData: { name: string; value: number; color: string }[];
  loadingPromotionPieData: "idle" | "pending" | "succeeded" | "failed";
  masterPromotions: PromotionType[];
  masterPromotionsPiedata: { name: string; value: number; color: string }[];
}

const initialState: InitialPromotionsState = {
  loading: "idle",
  loadingPromotions: "idle",
  stationPromotions: [],
  stationPromotionPieData: [],
  loadingPromotionPieData: "idle",
  masterPromotions: [],
  masterPromotionsPiedata: [],
};

export const createNewPromotion = createAsyncThunk(
  "promotions/createNewPromotion",
  async (
    data: {
      name: string;
      amount: number;
      expiryDate: string;
      showId: string;
      type: string;
      numberOfBeneficiaries?: number;
    },
    { rejectWithValue, getState }
  ) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(`${BASE_URL}/promotion/new`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${state.auth.token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      return rejectWithValue(errorResponse.message);
    }
    const promotion = await response.json();
    return promotion;
  }
);

export const editPromotion = createAsyncThunk(
  "promotions/editPromotion",
  async (
    data: {
      id: string;
      name?: string;
      amount?: number;
      expiryDate?: string;
      showId?: string;
      type?: string;
      numberOfBeneficiaries?: number;
    },
    { rejectWithValue, getState }
  ) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(`${BASE_URL}/promotion/update/${data.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${state.auth.token}`,
      },
      body: JSON.stringify({
        name: data.name,
        amount: data.amount,
        expiryDate: data.expiryDate,
        showId: data.showId,
        type: data.type,
        numberOfBeneficiaries: data.numberOfBeneficiaries,
      }),
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      return rejectWithValue(errorResponse.message);
    }
    const promotion = await response.json();
    return promotion;
  }
);

export const deletePromotion = createAsyncThunk(
  "promotions/deletePromotion",
  async (
    data: {
      id: string;
    },
    { rejectWithValue, getState }
  ) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(`${BASE_URL}/promotion/delete/${data.id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${state.auth.token}`,
      },
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      return rejectWithValue(errorResponse.message);
    }
    const promotion = await response.json();
    return promotion;
  }
);

export const getStationPromotions = createAsyncThunk(
  "promotions/getStationPromotions",
  async (data: { id: string }, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(
      `${BASE_URL}/promotion/station-promotions/${data.id}`,
      {
        method: "Get",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${state.auth.token}`,
        },
      }
    );
    if (!response.ok) {
      const errorResponse = await response.json();
      return rejectWithValue(errorResponse.message);
    }
    const promotion = await response.json();
    return promotion;
  }
);

export const getMasterPromotions = createAsyncThunk(
  "promotions/getMasterPromotions",
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(`${BASE_URL}/promotion/all-promotions`, {
      method: "Get",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${state.auth.token}`,
      },
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      return rejectWithValue(errorResponse.message);
    }
    const promotion = await response.json();
    return promotion;
  }
);

export const getStationPromotionsPiedata = createAsyncThunk(
  "promotions/getStationPromotionsPiedata",
  async (data: { id: string }, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(
      `${BASE_URL}/promotion/promotions-pie-data/${data.id}`,
      {
        method: "Get",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${state.auth.token}`,
        },
      }
    );
    if (!response.ok) {
      const errorResponse = await response.json();
      return rejectWithValue(errorResponse.message);
    }
    const promotion = await response.json();
    return promotion;
  }
);

export const getMasterPromotionsPiedata = createAsyncThunk(
  "promotions/getMasterPromotionsPiedata",
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(
      `${BASE_URL}/promotion/all-promotions-pie-data`,
      {
        method: "Get",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${state.auth.token}`,
        },
      }
    );
    if (!response.ok) {
      const errorResponse = await response.json();
      return rejectWithValue(errorResponse.message);
    }
    const promotion = await response.json();
    return promotion;
  }
);

const promotionSlice = createSlice({
  name: "promotions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create new promotion
    builder.addCase(createNewPromotion.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(createNewPromotion.fulfilled, (state) => {
      state.loading = "succeeded";
      toast.success("Promotion created successfully");
    });
    builder.addCase(createNewPromotion.rejected, (state, { payload }) => {
      state.loading = "failed";
      toast.error(payload as string);
    });

    // get station promotions
    builder.addCase(getStationPromotions.pending, (state) => {
      state.loadingPromotions = "pending";
    });
    builder.addCase(getStationPromotions.fulfilled, (state, { payload }) => {
      state.loadingPromotions = "succeeded";
      state.stationPromotions = payload;
    });
    builder.addCase(getStationPromotions.rejected, (state, { payload }) => {
      state.loadingPromotions = "failed";
      state.stationPromotions = [];
      toast.error(payload as string);
    });

    // get station promotions pie data
    builder.addCase(getStationPromotionsPiedata.pending, (state) => {
      state.loadingPromotionPieData = "pending";
    });
    builder.addCase(
      getStationPromotionsPiedata.fulfilled,
      (state, { payload }) => {
        state.loadingPromotionPieData = "succeeded";
        state.stationPromotionPieData = payload;
      }
    );
    builder.addCase(
      getStationPromotionsPiedata.rejected,
      (state, { payload }) => {
        state.loadingPromotionPieData = "failed";
        state.stationPromotionPieData = [];
        toast.error(payload as string);
      }
    );

    // get master promotions
    builder.addCase(getMasterPromotions.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getMasterPromotions.fulfilled, (state, { payload }) => {
      state.loading = "succeeded";
      state.masterPromotions = payload;
    });
    builder.addCase(getMasterPromotions.rejected, (state, { payload }) => {
      state.loading = "failed";
      state.masterPromotions = [];
      toast.error(payload as string);
    });

    // get master pie data
    builder.addCase(getMasterPromotionsPiedata.pending, (state) => {
      state.loadingPromotionPieData = "pending";
    });
    builder.addCase(
      getMasterPromotionsPiedata.fulfilled,
      (state, { payload }) => {
        state.loadingPromotionPieData = "succeeded";
        state.masterPromotionsPiedata = payload;
      }
    );
    builder.addCase(
      getMasterPromotionsPiedata.rejected,
      (state, { payload }) => {
        state.loadingPromotionPieData = "failed";
        state.masterPromotionsPiedata = [];
        toast.error(payload as string);
      }
    );

    // update promotion
    builder.addCase(editPromotion.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(editPromotion.fulfilled, (state) => {
      state.loading = "succeeded";
      toast.success("Promotion updated successfully");
    });
    builder.addCase(editPromotion.rejected, (state, { payload }) => {
      state.loading = "failed";
      toast.error(payload as string);
    });

    // delete promotion
    builder.addCase(deletePromotion.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(deletePromotion.fulfilled, (state) => {
      state.loading = "succeeded";
      toast.success("Promotion deleted successfully");
    });
    builder.addCase(deletePromotion.rejected, (state, { payload }) => {
      state.loading = "failed";
      toast.error(payload as string);
    });
  },
});

export const promotionReducer = promotionSlice.reducer;
export const {} = promotionSlice.actions;
