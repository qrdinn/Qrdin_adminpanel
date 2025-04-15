import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as APIConstants from '../apistore/apiconstants'

export const login_api = createAsyncThunk('login/login_api', async (payload) =>
{
    const apiURL = APIConstants.ApiBaseUrl + APIConstants.loginAPI;
    const response = await axios.post(apiURL, payload);
    console.log(response.data.status,"login response")
    return response.data;
})

export const clearlogin = createAsyncThunk('login/clearlogin', async (payload) => {
    return {}
  })

export const loginSlice = createSlice({
    name: 'login',
    initialState : {
        data: [],
        loading : 'idle',
        error : null
    },
    reducers : {} ,
    extraReducers : (builder) => 
    (
        builder.addCase(login_api.pending ,(state,action)=>
        {
            if(state.loading === 'idle')
            {
                state.loading = 'pending';
            }
        }),
        builder.addCase(login_api.fulfilled , (state,action) =>
        {
            if(state.loading === 'pending')
            {
                state.data = action.payload;
                state.loading = 'idle';
            }
        }),
        builder.addCase(login_api.rejected , (state,action) =>
        {
            if(state.loading === 'pending')
            {
                state.loading = 'idle';
            }
        }),
        builder.addCase(clearlogin.pending, (state, action) => {
      
            // // console.log("getting1", state.feedbackloading, action);
            if (state.loading === 'idle') {
              state.data = [];
            }
          })
    )
});

export default loginSlice.reducer;