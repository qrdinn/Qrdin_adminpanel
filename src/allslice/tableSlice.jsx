import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as APIConstants from '../apistore/apiconstants'

export const get_table = createAsyncThunk('table/get_table', async (payload) =>
{
    const apiURL = APIConstants.ApiBaseUrl + APIConstants.getTableAPI;
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

export const order_complete = createAsyncThunk('table/order_complete', async (payload) =>
    {
        const apiURL = APIConstants.ApiBaseUrl + APIConstants.tableorderCompleteAPI;
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

export const tableSlice = createSlice({
    name: 'table',
    initialState : {
        data: [],
        loading : 'idle',
        orderdata: [],
        orderloading : 'idle',
        error : null
    },
    reducers : {} ,
    extraReducers : (builder) => 
    (
        builder.addCase(get_table.pending ,(state,action)=>
        {
            if(state.loading === 'idle')
            {
                state.loading = 'pending';
            }
        }),
        builder.addCase(get_table.fulfilled , (state,action) =>
        {
            if(state.loading === 'pending')
            {
                state.data = action.payload;
                state.loading = 'idle';
            }
        }),
        builder.addCase(get_table.rejected , (state,action) =>
        {
            if(state.loading === 'pending')
            {
                state.loading = 'idle';
            }
        }),
        builder.addCase(order_complete.pending ,(state,action)=>
            {
                if(state.orderloading === 'idle')
                {
                    state.orderloading = 'pending';
                }
            }),
            builder.addCase(order_complete.fulfilled , (state,action) =>
            {
                if(state.orderloading === 'pending')
                {
                    state.orderdata = action.payload;
                    state.orderloading = 'idle';
                }
            }),
            builder.addCase(order_complete.rejected , (state,action) =>
            {
                if(state.orderloading === 'pending')
                {
                    state.orderloading = 'idle';
                }
            })
    )
});

export default tableSlice.reducer;