import { BASE_URL } from "@/utils/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface InitialPromotionsState {
    loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: InitialPromotionsState = {
    loading: "idle",
}


export const createNewPromotion = createAsyncThunk("promotions/createNewPromotion",
    async(data:{name:string,amount:number,expiryDate:string,showId:string,type:string},{rejectWithValue,getState})=>{
        const state = getState() as { auth: { token: string } };
        const response = await fetch(`${BASE_URL}/promotion/new`,{
            method: "POST",
            headers:{
                "content-type":"application/json",
                Authorization: `Bearer ${state.auth.token}`
            },
            body: JSON.stringify(data)
        });
        if(!response.ok){
            const errorResponse = await response.json();
            return rejectWithValue(errorResponse.message);
        }
        const promotion = await response.json();
        return promotion;
    }
)



const promotionSlice = createSlice({
    name:"promotions",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        // create new promotion
        builder.addCase(createNewPromotion.pending,(state)=>{
            state.loading = "pending";
        });
        builder.addCase(createNewPromotion.fulfilled,(state)=>{
            state.loading = "succeeded";
            toast.success("Promotion created successfully");
        });
        builder.addCase(createNewPromotion.rejected,(state,{payload})=>{
            state.loading = "failed";
            toast.error(payload as string);
        });
    }
})


export const promotionReducer = promotionSlice.reducer;
export const { } = promotionSlice.actions;