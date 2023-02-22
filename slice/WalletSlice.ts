/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable eol-last */
/* eslint-disable no-sequences */
/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from '../app/store'
import { getRequest } from "../utils/server";
import config from "./config";



const initialState = {
  tradingAccount: null,
  fundingAccount: null,
  loading: false,
  error: null
}


export const getTradingAccount = createAsyncThunk(
    'wallet/getTradingAccount',
    async () => {
        var response = await getRequest(config.wallet_base_url + '/api/balance/trading')
    
        if (response?.status === 200) {
            return response?.data
          }
    }
)

export const walletSlice = createSlice({
    name: 'wallet',
    initialState,    
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTradingAccount.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(getTradingAccount.fulfilled, (state, action) => {
                state.loading = false
                state.tradingAccount = action?.payload
            });
        builder.addCase(getTradingAccount.rejected, (state) => {
            state.loading = false
        })

    },

})


// Other code such as selectors can use the imported `RootState` type
export const tradingAccount = (state: RootState) => state.wallet?.tradingAccount
export const fundingAccount = (state: RootState) => state.wallet?.fundingAccount


export default walletSlice.reducer