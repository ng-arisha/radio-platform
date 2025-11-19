import { BASE_URL } from "@/utils/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


interface InitialWalletState {
    loading:"idle" | "pending" | "succeeded" | "failed";
}

const initialState: InitialWalletState = {
    loading: "idle",
}



export const withdraw = createAsyncThunk("wallet/withdraw",
    async (data:{amount:number,showId:string},{rejectWithValue,getState})=>{
        const state = getState() as { auth: { token: string } };
    const response = await fetch(`${BASE_URL}/wallet/withdraw`,{
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
});



const walletSlice = createSlice({
    name:"Wallet",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

        // Withdraw
        builder.addCase(withdraw.pending,(state)=>{
            state.loading = "pending";
        });
        builder.addCase(withdraw.fulfilled,(state)=>{
            state.loading = "succeeded";
            toast.success("Withdrawal request initiated successfully");
        });
        builder.addCase(withdraw.rejected,(state,{payload})=>{
            state.loading = "failed";
            toast.error(payload as string);
        });
    }
})

export const walletReducer = walletSlice.reducer;
export const {} = walletSlice.actions;