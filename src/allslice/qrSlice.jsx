import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as APIConstants from '../apistore/apiconstants'

export const get_qrcode = createAsyncThunk('qrcode/get_qrcode', async (payload) =>
{
    const apiURL = APIConstants.ApiBaseUrl + APIConstants.getQrCodeAPI;
    const tokens = localStorage.getItem('tokens');
    const response = await axios.post(apiURL, payload, {
        headers: {
            Authorization: `bearer ${tokens}`,
            // 'Content-Type': 'application/json',
          },
    });
    console.log(response.data,"response")
    return response.data;
})

export const qrcodeSlice = createSlice({
    name: 'qrcode',
    initialState : {
        data: [],
        loading : 'idle',
        error : null
    },
    reducers : {} ,
    extraReducers : (builder) => 
    (
        builder.addCase(get_qrcode.pending ,(state,action)=>
        {
            if(state.loading === 'idle')
            {
                state.loading = 'pending';
            }
        }),
        builder.addCase(get_qrcode.fulfilled , (state,action) =>
        {
            if(state.loading === 'pending')
            {
                state.data = action.payload;
                state.loading = 'idle';
            }
        }),
        builder.addCase(get_qrcode.rejected , (state,action) =>
        {
            if(state.loading === 'pending')
            {
                state.loading = 'idle';
            }
        })
    )
});

export default qrcodeSlice.reducer;