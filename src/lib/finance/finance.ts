import { BASE_URL } from "@/utils/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";



interface InitialFinanceState {
    loading: "idle" | "pending" | "succeeded" | "failed";
    stationFinancialPieData:{name:string,value:number,color:string}[];
    stationFinancialsShowData: AllocationType[];
    loadingShowData: "idle" | "pending" | "succeeded" | "failed";
}   

const initialState: InitialFinanceState = {
    loading: "idle",
    stationFinancialPieData:[],
    stationFinancialsShowData:[],
    loadingShowData: "idle"


}


export const allocateFundsToMediaHouse = createAsyncThunk("finance/allocateFundsToMediaHouse",
    async(data:{allocated:number,mediaHouseId:string},{rejectWithValue,getState})=>{
        const state = getState() as {auth:{token:string}};
        const response = await fetch(`${BASE_URL}/finance/allocate`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${state.auth.token}`
            },
            body:JSON.stringify(data)
        });
        if(!response.ok){
            const errorData = await response.json();
            return rejectWithValue(errorData.message);
        }
        const responseData = await response.json();
        return responseData;
    }
)


export const getStationFinancialPieData = createAsyncThunk("finance/getStationFinancialPieData",
    async(data:{id:string},{rejectWithValue,getState})=>{
        const state = getState() as {auth:{token:string}};
        const response = await fetch(`${BASE_URL}/finance/station-allocation-summary/${data.id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${state.auth.token}`
            },
           
        });
        if(!response.ok){
            const errorData = await response.json();
            return rejectWithValue(errorData.message);
        }
        const responseData = await response.json();
        return responseData;
    }
)


export const getStationFinancialShowData = createAsyncThunk("finance/getStationFinancialShowData",
    async(data:{id:string},{rejectWithValue,getState})=>{
        const state = getState() as {auth:{token:string}};
        const response = await fetch(`${BASE_URL}/finance/show-allocations/${data.id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${state.auth.token}`
            },
           
        });
        if(!response.ok){
            const errorData = await response.json();
            return rejectWithValue(errorData.message);
        }
        const responseData = await response.json();
        return responseData;
    }
)

const financeSlice = createSlice({
    name:"finance",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(allocateFundsToMediaHouse.pending,(state)=>{
            state.loading = "pending";
        });
        builder.addCase(allocateFundsToMediaHouse.fulfilled,(state)=>{
            state.loading = "succeeded";
            toast.success("Funds allocated successfully");
        });
        builder.addCase(allocateFundsToMediaHouse.rejected,(state,{payload})=>{
            state.loading = "failed";
            toast.error(payload as string || "Failed to allocate funds");
        });

        // get station financial pie data

        builder.addCase(getStationFinancialPieData.pending,(state)=>{
            state.loading = "pending";
        });
        builder.addCase(getStationFinancialPieData.fulfilled,(state,{payload})=>{
            state.loading = "succeeded";
            state.stationFinancialPieData = payload;
        });
        builder.addCase(getStationFinancialPieData.rejected,(state,{payload})=>{
            state.loading = "failed";
            toast.error(payload as string || "Failed to fetch financial data");
        });

        // get station financial show data
        builder.addCase(getStationFinancialShowData.pending,(state)=>{
            state.loadingShowData = "pending";
        });
        builder.addCase(getStationFinancialShowData.fulfilled,(state,{payload})=>{
            state.loadingShowData = "succeeded";
            state.stationFinancialsShowData = payload;
        });
        builder.addCase(getStationFinancialShowData.rejected,(state,{payload})=>{
            state.loadingShowData = "failed";
            toast.error(payload as string || "Failed to fetch show financial data");
        });
    }
})

export const financeReducer = financeSlice.reducer;
export const {} = financeSlice.actions;