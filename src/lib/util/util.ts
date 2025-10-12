
import { mediaDetailsTabs } from "@/utils/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface InitalUtilState {
    selectedTab: string;
}

const initialState: InitalUtilState = {
    selectedTab: mediaDetailsTabs[0].title,
}


const utilSlice = createSlice({
    name: "util",
    initialState,
    reducers: {
        setSelectedTab(state, action:PayloadAction<string>) {
            state.selectedTab = action.payload;
        }
    }
})

export const { setSelectedTab } = utilSlice.actions;
export const utilReducer = utilSlice.reducer;