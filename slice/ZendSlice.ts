/* eslint-disable @typescript-eslint/func-call-spacing */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unreachable */
/* eslint-disable semi */
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../app/store';
import {
  CreateAccountFormDataUi,
  CreateUsd,
  LoginFormData,
  LoginState,
} from '../utils/types';
import {getRequest, postRequest, getRequestNoToken} from '../utils/server';


import config from './config';

const initialState = {
  loading: false,
  error: null,
};

export const createUsd = createAsyncThunk(
  'zend/createUsd',
  async (payload: CreateUsd, {rejectWithValue}) => {
    
    try {
      const response = await postRequest(
        `${config.transaction_url}/zend-usd/create?userID=637e1e4d043ba0a69089bd2c`,
        payload,
      );
      if (response?.status === 200) {
        return response?.data
      }
    } catch (e: any) {

      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const verifyOrganisation = createAsyncThunk(
    'zend/verifyOrganisation',
    async (payload: {CACNumber: string,registeredName: string, isUpload: boolean}, {rejectWithValue}) => {
      const data = {
        CACNumber: payload?.CACNumber,
        registeredName: payload?.registeredName,
        CACDocument: {
            isUploaded: payload?.isUpload
        }
      }
      try {
        const response = await postRequest(
          `${config.api_base_url}/users/organization/verify?userID=637e1e4d043ba0a69089bd2c`,
          data,
        );
        if (response?.status === 200) {
            return response?.data
        }
      } catch (e: any) {
        return rejectWithValue(e?.response?.data?.message);
      }
    },
  );


  export const getRate = createAsyncThunk(
    'zend/getRate',
    async () => {
          var response = await getRequest(`${config.transaction_url}/zend-usd/rates/find/one?currency=USDT`)
          if (response?.status === 200) {
              return response?.data
            }
    }
  )








export const ZendSlice = createSlice({
  name: 'zend',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createUsd.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        createUsd.fulfilled,
        (state, action: PayloadAction<any>) => {
          (state.loading = false);
        },
      );
    builder.addCase(createUsd.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(verifyOrganisation.pending, (state, action) => {
        state.loading = true;
      }),
        builder.addCase(
          verifyOrganisation.fulfilled,
          (state, action: PayloadAction<any>) => {
            (state.loading = false);
          },
        );
      builder.addCase(verifyOrganisation.rejected, (state, action) => {
        // state.error = action.error.message
      });
      builder.addCase(getRate.pending, (state, action) => {
        state.loading = true;
      }),
        builder.addCase(
          getRate.fulfilled,
          (state, action: PayloadAction<any>) => {
            (state.loading = false);
          },
        );
      builder.addCase(getRate.rejected, (state, action) => {
        // state.error = action.error.message
      });
}
});


export default ZendSlice.reducer;
