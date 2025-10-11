import { createSlice } from "@reduxjs/toolkit";


interface MediaHouseInterface {
    loading: "idle" | "pending" | "succeeded" | "failed";
    mediaHouses: MediaHouseType[];
}

const initialState: MediaHouseInterface = {
    loading: "idle",
    mediaHouses: [],
};






const mediaSlice = createSlice({
    name: "media",
    initialState,
    reducers:{},
    extraReducers(builder) {
        
    },
})

export const mediaReducer = mediaSlice.reducer;
export const {} = mediaSlice.actions;