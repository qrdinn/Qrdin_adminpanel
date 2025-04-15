import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
 import * as APIConstants from '../apistore/apiconstants';


 export const foodmenu = createAsyncThunk('menu/foodmenu', async (payload) =>
{
        const apiURL = APIConstants.ApiBaseUrl + APIConstants.MenuAPI;
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

export const getfoodmenu = createAsyncThunk('menu/getfoodmenu', async (payload)=>
{
    
    const apiURL = APIConstants.ApiBaseUrl + APIConstants.getMenuAPI;
    const response = await axios.post(apiURL, payload);
    console.log(response,"responseddd")
    return response.data
})

export const menuSlice = createSlice({
    name : 'menu',
    initialState : {
        data : [],
        loading : 'idle',
        getdata: [],
        getloading : 'idle',
        error : null,
    },
    reducers : {},
    extraReducers : (builder) => (
        builder.addCase(foodmenu.pending , (state,action) =>
        {
            if(state.loading === 'idle')
            {
                state.loading = 'pending';
            }
        }),

        builder.addCase(foodmenu.fulfilled , (state,action) =>
        {
            if(state.loading === 'pending')
            {
                state.data = action.payload;
                state.loading = 'idle';
            }
        }),
        
        builder.addCase(foodmenu.rejected, (state, action) =>
        {
            
            if(state.loading  === 'pending')
            {
                state.loading = 'idle';
            }
        }),

        builder.addCase(getfoodmenu.pending , (state,action)=>
        {
            
            if(state.getloading === 'idle')
            {
                state.getloading = 'pending';
            }
        }),

        builder.addCase(getfoodmenu.fulfilled , (state, action) =>
        {
            if(state.getloading === 'pending')
            {

                state.getdata = action.payload;
                state.getloading = 'idle';
            }
        }),

        builder.addCase(getfoodmenu.rejected , (state,action)=>
        {
            if(state.getloading === 'pending')
                {
                    state.getloading = 'idle';
                    state.error = 'Error occured';
                }
        })
    )
});

export default menuSlice.reducer;



