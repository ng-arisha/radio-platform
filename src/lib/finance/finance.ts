import { BASE_URL } from "@/utils/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";



interface InitialFinanceState {
    loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: InitialFinanceState = {
    loading: "idle",
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
    }
})

export const financeReducer = financeSlice.reducer;
export const {} = financeSlice.actions;