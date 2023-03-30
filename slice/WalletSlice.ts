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

export const getTradingAccountByCurrency = createAsyncThunk(
    'wallet/getTradingAccountBycurrency',
    async (payload: string) => {
        var response = await getRequest(config.wallet_base_url + `/api/balance/trading?currency=${payload}`)
    
        if (response?.status === 200) {
            return response?.data
          }
    }
)

export const getFundingAccount = createAsyncThunk(
    'wallet/getFundingAccount',
    async () => {
        var response = await getRequest(config.wallet_base_url + '/api/balance/funding')
    
        if (response?.status === 200) {
            return response?.data
          }
    }
)

export const getFundingAccountByCurrency = createAsyncThunk(
    'wallet/getFundingAccountbycurrency',
    async (payload: string) => {
        var response = await getRequest(config.wallet_base_url + `/api/balance/funding?currency=${payload}`)
    
        if (response?.status === 200) {
            return response?.data
          }
    }
)

export const getAssetTransaction = createAsyncThunk(
    'wallet/getAssetTransaction',
    async (payload: {currency: string, type: string, page: number}) => {
        var response = await getRequest(config.wallet_base_url + `/api/transaction/history?page=${payload?.page}&limit=10&currency=${payload?.currency}&transactionType=${payload?.type === "all" ? "" : payload?.type}`)
       
        if (response?.status === 200) {
            return response?.data
          }
    }
)

export const getWalletNetwork = createAsyncThunk(
    'wallet/getWalletNetwork',
    async (payload: string) => {
        var response = await getRequest(config.wallet_base_url + `/api/deposit/address?currency=${payload}`)
       
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

        builder.addCase(getFundingAccount.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(getFundingAccount.fulfilled, (state, action) => {
                state.loading = false
                state.fundingAccount = action?.payload
            });
        builder.addCase(getFundingAccount.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(getFundingAccountByCurrency.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(getFundingAccountByCurrency.fulfilled, (state, action) => {
                state.loading = false
            });
        builder.addCase(getFundingAccountByCurrency.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(getTradingAccountByCurrency.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(getTradingAccountByCurrency.fulfilled, (state, action) => {
                state.loading = false
            });
        builder.addCase(getTradingAccountByCurrency.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(getAssetTransaction.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(getAssetTransaction.fulfilled, (state, action) => {
                state.loading = false
            });
        builder.addCase(getAssetTransaction.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(getWalletNetwork.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(getWalletNetwork.fulfilled, (state, action) => {
                state.loading = false
            });
        builder.addCase(getWalletNetwork.rejected, (state) => {
            state.loading = false
        })



    },

})


// Other code such as selectors can use the imported `RootState` type
export const tradingAccount = (state: RootState) => state.wallet?.tradingAccount
export const fundingAccount = (state: RootState) => state.wallet?.fundingAccount


export default walletSlice.reducer