import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
interface InitialStatState {
    loading: "idle" | "pending" | "succeeded" | "failed";
    loadingAllocations: "idle" | "pending" | "succeeded" | "failed";
    loadingMediaHousePerformance: "idle" | "pending" | "succeeded" | "failed";
    dashboardSummary: MasterSummaryType[];
    financeAllocations: FinanceAllocationsType[];
    mediaHousePerformance:MediaHousePerformanceType[];
}


const initialState: InitialStatState = {
    loading: "idle",
    dashboardSummary: [],
    financeAllocations: [],
    loadingAllocations: "idle",
    mediaHousePerformance:[],
    loadingMediaHousePerformance: "idle",
   
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

export const getFinanceAllocations = createAsyncThunk("stats/getFinanceAllocations",
    async(_,{rejectWithValue, getState})=>{
        const state = getState() as {auth:{token:string}}
        const response = await fetch(`${BASE_URL}/finance/all`,{
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

export const getMediaHousePerformance = createAsyncThunk("stats/getMediaHousePerformance",
    async(_,{rejectWithValue, getState})=>{
        const state = getState() as {auth:{token:string}}
        const response = await fetch(`${BASE_URL}/finance/allocation-summary`,{
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
        });
        builder.addCase(getDashboardSummary.fulfilled,(state,action)=>{
            state.loading = "succeeded"
            state.dashboardSummary = action.payload
        });
        builder.addCase(getDashboardSummary.rejected,(state,action)=>{
            state.loading = "failed"
            toast.error(action.payload as string)
            
        });

        // get finance allocations
        builder.addCase(getFinanceAllocations.pending,(state)=>{
            state.loadingAllocations = "pending"
        });
        builder.addCase(getFinanceAllocations.fulfilled,(state,action)=>{
            state.loadingAllocations = "succeeded"
            state.financeAllocations = action.payload
        });
        builder.addCase(getFinanceAllocations.rejected,(state,action)=>{
            state.loadingAllocations = "failed"
            toast.error(action.payload as string)
            
        });

        // get media house performance
        builder.addCase(getMediaHousePerformance.pending,(state)=>{
            state.loadingMediaHousePerformance = "pending"
        });
        builder.addCase(getMediaHousePerformance.fulfilled,(state,action)=>{
            state.loadingMediaHousePerformance = "succeeded"
            state.mediaHousePerformance = action.payload
        });
        builder.addCase(getMediaHousePerformance.rejected,(state,action)=>{
            state.loadingMediaHousePerformance = "failed"
            toast.error(action.payload as string)
            
        });
    }
})

export const statsReducer = statsSlice.reducer;
export const { } = statsSlice.actions;