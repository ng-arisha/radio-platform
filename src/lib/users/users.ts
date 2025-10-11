import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
interface InitialUserState  {
    loading: "idle" | "pending" | "succeeded" | "failed";
    mediahouseUsers: UserType[];
}

const initialState: InitialUserState = {
    loading: "idle",
    mediahouseUsers: [],
};



export const getMediaHouseUsers = createAsyncThunk("users/mediahouseuser",
    async(_,{rejectWithValue,getState})=>{
        try {
            const state = getState() as {auth:{token:string}}
        const response = await fetch(`${BASE_URL}/user/media-users`,{
            method:"GET",
            headers:{
                "content-type":"application/json",
                Authorization:`Bearer ${state.auth.token}`

            }
        });
        if(!response.ok){
            const errorData = await response.json();
            return rejectWithValue(errorData.message)
        }
        const responseData = await response.json();
        return responseData;
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)

export const createMediaHouseUser = createAsyncThunk("users/createmediahouseuser",
    async(data:{fullName:string,email:string,phoneNumber:string},{rejectWithValue,getState})=>{
        try {
            const state = getState() as {auth:{token:string}}
        const response = await fetch(`${BASE_URL}/user/media-user`,{
            method:"POST",
            headers:{
                "content-type":"application/json",
                Authorization:`Bearer ${state.auth.token}`
            },
            body:JSON.stringify(data)
        });
        if(!response.ok){
            const errorData = await response.json();
            return rejectWithValue(errorData.message)
        }
        const responseData = await response.json();
        return responseData;
            
        } catch (error) {
            return rejectWithValue((error as Error).message)
            
        }
    }
)


const userSlice = createSlice({
    name:"users",
    initialState,
    reducers:{},
    extraReducers(builder){
        // get media house users
        builder.addCase(getMediaHouseUsers.pending,(state)=>{
            state.loading = "pending"
        })
        builder.addCase(getMediaHouseUsers.fulfilled,(state,{payload})=>{
            state.loading = "succeeded"
            state.mediahouseUsers = payload
        })
        builder.addCase(getMediaHouseUsers.rejected,(state,{payload})=>{
            state.loading = "failed"
            state.mediahouseUsers = []
        })

        // create media house user
        builder.addCase(createMediaHouseUser.pending,(state)=>{
            state.loading = "pending"
        })
        builder.addCase(createMediaHouseUser.fulfilled,(state,{payload})=>{
            state.loading = "succeeded"
            state.mediahouseUsers.push(payload)
        })
        builder.addCase(createMediaHouseUser.rejected,(state,{payload})=>{
            state.loading = "failed"
        })
    }
})

export const userReducer = userSlice.reducer;
export const {} = userSlice.actions;