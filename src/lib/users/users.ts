import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
interface InitialUserState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  addingUser: "idle" | "pending" | "succeeded" | "failed";
  mediahouseUsers: UserType[];
  presenterUsers: UserType[];
  stationAdminUsers: UserType[];
  userDistribution: {
    date: string;
    mediaHouse: number;
    stationAdmin: number;
    presenter: number;
    customerCare: number;
    financeOfficer: number;
  }[];
}

const initialState: InitialUserState = {
  loading: "idle",
  addingUser: "idle",
  mediahouseUsers: [],
  presenterUsers: [],
  stationAdminUsers: [],
  userDistribution: [],
};

export const getMediaHouseUsers = createAsyncThunk(
  "users/mediahouseuser",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const response = await fetch(`${BASE_URL}/user/media-users`, {
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

export const getStationAdminUsers = createAsyncThunk(
  "users/getStationAdminUsers",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const response = await fetch(`${BASE_URL}/user/station-admins`, {
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

export const getShowPresenters = createAsyncThunk(
  "users/getShowPresenters",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const response = await fetch(`${BASE_URL}/user/presenters`, {
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

export const createMediaHouseUser = createAsyncThunk(
  "users/createmediahouseuser",
  async (
    data: {
      fullName: string;
      email: string;
      phoneNumber: string;
      showId?: string;
      path: string;
    },
    { rejectWithValue, getState }
  ) => {
    const state = getState() as { auth: { token: string } };
    const response = await fetch(`${BASE_URL}/user/${data.path}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${state.auth.token}`,
      },
      body: JSON.stringify({
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        showId: data.showId,
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

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (
    data: {
      id: string;
      fullName: string;
      email: string;
      phoneNumber: string;
      status: string;
    },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as { auth: { token: string } };
      const response = await fetch(`${BASE_URL}/user/update-user/${data.id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${state.auth.token}`,
        },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          status: data.status,
        }),
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

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (
    data: {
      id: string;
    },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as { auth: { token: string } };
      const response = await fetch(`${BASE_URL}/user/delete-user/${data.id}`, {
        method: "DELETE",
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

export const getUserDistribution = createAsyncThunk(
  "user/getUserDistribution",
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } };
    console.log(`Tone: ${state.auth.token}`);
    const response = await fetch(`${BASE_URL}/user/user-distribution`, {
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
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // get media house users
    builder.addCase(getMediaHouseUsers.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getMediaHouseUsers.fulfilled, (state, { payload }) => {
      state.loading = "succeeded";
      state.mediahouseUsers = payload;
    });
    builder.addCase(getMediaHouseUsers.rejected, (state, { payload }) => {
      state.loading = "failed";
      state.mediahouseUsers = [];
    });

    // create media house user
    builder.addCase(createMediaHouseUser.pending, (state) => {
      state.addingUser = "pending";
    });
    builder.addCase(createMediaHouseUser.fulfilled, (state, { payload }) => {
      state.addingUser = "succeeded";
      if (payload.role === "media-house") {
        state.mediahouseUsers.push(payload);
      } else if (payload.role === "station-admin") {
        state.stationAdminUsers.push(payload);
      } else {
        state.presenterUsers.push(payload);
      }

      toast.success("User added successfully");
    });
    builder.addCase(createMediaHouseUser.rejected, (state, { payload }) => {
      state.addingUser = "failed";
      toast.error((payload as string) || "Failed to add user");
    });

    // get station admin users
    builder.addCase(getStationAdminUsers.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getStationAdminUsers.fulfilled, (state, { payload }) => {
      state.loading = "succeeded";
      state.stationAdminUsers = payload;
    });
    builder.addCase(getStationAdminUsers.rejected, (state, { payload }) => {
      state.loading = "failed";
      state.stationAdminUsers = [];
    });

    // get show presenters
    builder.addCase(getShowPresenters.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getShowPresenters.fulfilled, (state, { payload }) => {
      state.loading = "succeeded";
      state.presenterUsers = payload;
    });
    builder.addCase(getShowPresenters.rejected, (state, { payload }) => {
      state.loading = "failed";
      state.presenterUsers = [];
    });

    // update user
    builder.addCase(updateUser.pending, (state) => {
      state.addingUser = "pending";
    });

    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.addingUser = "succeeded";
      const updateInArray = (arr: UserType[]) => {
        const index = arr.findIndex((user) => user._id === payload._id);
        if (index !== -1) {
          arr[index] = payload;
        }
      };
      updateInArray(state.mediahouseUsers);
      updateInArray(state.stationAdminUsers);
      updateInArray(state.presenterUsers);
      toast.success("User updated successfully");
    });
    // delete user
    builder.addCase(deleteUser.pending, (state) => {
      state.addingUser = "pending";
    });
    builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
      state.addingUser = "succeeded";
      const deleteFromArray = (arr: UserType[]) => {
        return arr.filter((user) => user._id !== payload._id);
      };
      state.mediahouseUsers = deleteFromArray(state.mediahouseUsers);
      state.stationAdminUsers = deleteFromArray(state.stationAdminUsers);
      state.presenterUsers = deleteFromArray(state.presenterUsers);
      toast.success("User deleted successfully");
    });
    builder.addCase(deleteUser.rejected, (state, { payload }) => {
      state.addingUser = "failed";
      toast.error((payload as string) || "Failed to delete user");
    });

    builder.addCase(getUserDistribution.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getUserDistribution.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.userDistribution = action.payload;
    });
    builder.addCase(getUserDistribution.rejected, (state) => {
      state.loading = "failed";
    });
  },
});

export const userReducer = userSlice.reducer;
export const {} = userSlice.actions;
