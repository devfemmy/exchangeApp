/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable eol-last */
/* eslint-disable no-sequences */
/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */

import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import type {RootState} from '../app/store';
import {getRequest, postRequest} from '../utils/server';
import config from './config';

const initialState = {
  isTradeVisible: false,
  loading: false,
  marketData: null,
};

export const getTradeStatus = createAsyncThunk(
  'trade/getTradeStatus',
  async (payload: boolean) => {
    return payload;
  },
);

export const getMarketPrice = createAsyncThunk(
  'trade/getMarketPrice',
  async () => {
    var response = await getRequest(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd',
    );
    if (response?.status === 200) {
      return response?.data;
    }
  },
);

export const transferToken = createAsyncThunk(
  'trade/transferToken',
  async (
    payload: {
      fromAcct: string;
      toAcct: string;
      currency: string;
      amount: string;
    },
    {rejectWithValue},
  ) => {
     console.log({payload})
    try {
      var response = await postRequest(
        `${config.wallet_base_url}/api/transfer`,
        payload,
      );
      if (response?.status === 200) {
        return response?.data;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const tradeSlice = createSlice({
  name: 'trade',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getTradeStatus.pending, state => {
      state.loading = true;
    }),
      builder.addCase(
        getTradeStatus.fulfilled,
        (state, action: PayloadAction<any>) => {
          (state.loading = false), (state.isTradeVisible = action.payload);
        },
      );
    builder.addCase(getTradeStatus.rejected, state => {
      state.loading = false;
    });
    builder.addCase(getMarketPrice.pending, state => {
      state.loading = true;
    }),
      builder.addCase(getMarketPrice.fulfilled, (state, action) => {
        (state.loading = false), (state.marketData = action?.payload);
      });
    builder.addCase(getMarketPrice.rejected, state => {
      state.loading = false;
    });
    builder.addCase(transferToken.pending, state => {
        state.loading = true;
      }),
        builder.addCase(transferToken.fulfilled, (state, action) => {
          state.loading = false
        });
      builder.addCase(transferToken.rejected, state => {
        state.loading = false;
      });
  },
});

// Other code such as selectors can use the imported `RootState` type
export const tradeStatus = (state: RootState) => state.trade?.isTradeVisible;
export const marketInfo = (state: RootState) => state.trade?.marketData;

export default tradeSlice.reducer;
