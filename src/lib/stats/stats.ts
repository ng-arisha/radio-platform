import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
interface InitialStatState {
    loading: "idle" | "pending" | "succeeded" | "failed";
    dashboardSummary: MasterSummaryType[];
}


const initialState: InitialStatState = {
    loading: "idle",
    dashboardSummary: [],
}


export const getDashboardSummary = createAsyncThunk("stats/getDashboardSummary",
    async(_,{rejectWithValue, getState})=>{
        const state = getState() as {auth:{token:string}}
        const response = await fetch(`${BASE_URL}/finance/stats`,{
            method:"GET",
            headers:{
                "content-type":"application/json",
                Authorization:`Bearer ${state.auth.token}`
            }
        });
        if(!response.ok){
            const errorResponse = await response.json();
            return rejectWithValue(errorResponse.message)
        }
        const data = await response.json();
        return data;

    }
)

const statsSlice = createSlice({
    name:"stats",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

        // get dashboard summary
        builder.addCase(getDashboardSummary.pending,(state)=>{
            state.loading = "pending"
        })
        builder.addCase(getDashboardSummary.fulfilled,(state,action)=>{
            state.loading = "succeeded"
            state.dashboardSummary = action.payload
        })
        builder.addCase(getDashboardSummary.rejected,(state,action)=>{
            state.loading = "failed"
            toast.error(action.payload as string)
            
        })
    }
})

export const statsReducer = statsSlice.reducer;
export const { } = statsSlice.actions;