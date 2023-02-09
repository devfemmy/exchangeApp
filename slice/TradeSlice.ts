/* eslint-disable quotes */
/* eslint-disable eol-last */
/* eslint-disable no-sequences */
/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from '../app/store'



const initialState = {
  isTradeVisible: false,
  loading: false,
}


export const getTradeStatus = createAsyncThunk(
    'trade/getTradeStatus',
    async (payload: boolean) => {
        return payload
    }
)

export const tradeSlice = createSlice({
    name: 'trade',
    initialState,    
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTradeStatus.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(getTradeStatus.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                    state.isTradeVisible = action.payload;
            });
        builder.addCase(getTradeStatus.rejected, (state) => {
            state.loading = false
        })
    },

})


// Other code such as selectors can use the imported `RootState` type
export const tradeStatus = (state: RootState) => state.trade?.isTradeVisible

export default tradeSlice.reducer