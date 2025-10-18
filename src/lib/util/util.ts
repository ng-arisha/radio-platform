
import { mediaDetailsTabs, stationDetailsTabs } from "@/utils/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface InitalUtilState {
    selectedTab: string;
    selectedStationtab: string;
}

const initialState: InitalUtilState = {
    selectedTab: mediaDetailsTabs[0].title,
    selectedStationtab: stationDetailsTabs[0].title,
}


const utilSlice = createSlice({
    name: "util",
    initialState,
    reducers: {
        setSelectedTab(state, action:PayloadAction<string>) {
            state.selectedTab = action.payload;
        },
        setSelectedStationtab(state, action:PayloadAction<string>) {
            state.selectedStationtab = action.payload;
        },
    }
})

export const { setSelectedTab,setSelectedStationtab } = utilSlice.actions;
export const utilReducer = utilSlice.reducer;