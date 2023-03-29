
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unreachable */
/* eslint-disable semi */
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../app/store';
import {
  CreateAccountFormDataUi,
  LoginFormData,
  LoginState,
  ProfileFormData,
} from '../utils/types';
import {getRequest, postRequest, getRequestNoToken} from '../utils/server';

import AsyncStorage from '@react-native-async-storage/async-storage';
import config from './config';

const initialState: LoginState = {
  userData: null,
  userInfo: null,
  loading: false,
  error: null,
};

export const createUser = createAsyncThunk(
  'auth/createUser',
  async (payload: CreateAccountFormDataUi, {rejectWithValue}) => {
    const data = {
      emailAddress: payload?.email,
      password: payload?.password,
      firstName: payload?.firstName,
      lastName: payload?.lastName,
      username: payload?.username,
    };
    try {
      const response = await postRequest(
        `${config.api_base_url}/auth/sign-up/user?clientType=browser`,
        data,
      );
      if (response?.status === 200) {
        await AsyncStorage.setItem(
          'keepInfo',
          JSON.stringify(response?.data?.data),
        );
        return response?.data?.data;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const verifyEmailSend = createAsyncThunk(
  'auth/verifyEmailSend',
  async (payload: string) => {
    const response = await getRequest(
      `${config.api_base_url}/users/email-address/verify?emailAddress=${payload}`,
    );
    if (response?.status === 200) {
      return response?.data?.data;
    }
  },
);

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (payload: {token: string; email: string}) => {
    const response = await getRequest(
      `${config.api_base_url}/users/email-address/verify?emailAddress=${payload?.email}&hasVerificationToken=true&verificationToken=${payload.token}`,
    );
    if (response?.status === 200) {
      var profile = await AsyncStorage.getItem('keepInfo').then((req: any) => JSON.parse(req))
      await AsyncStorage.setItem('userInfo', JSON.stringify(profile))
      return profile
     // return response?.data?.data;
    }
  },
);

export const verifySignin = createAsyncThunk(
  'auth/verifySignin',
  async (payload: {token: string; email: string}) => {
    const response = await getRequest(
      `${config.api_base_url}/auth/sign-in/confirmation-token/verify?emailAddress=${payload?.email}&confirmationToken=${payload.token}&role=user&clientType=mobile`,
    );
    if (response?.status === 200) {
      // var profile = await AsyncStorage.getItem('keepInfo').then((req: any) => JSON.parse(req))
      await AsyncStorage.setItem('userInfo', JSON.stringify(response?.data))
     // return profile
     return response?.data;
    }
  },
);

export const generateSigninToken = createAsyncThunk(
  'auth/generateSigninToken',
  async (payload: {email: string}) => {
    const response = await getRequest(
      `${config.api_base_url}/auth/sign-in/confirmation-token/generate?emailAddress=${payload?.email}`,
    );
    if (response?.status === 200) {

     // return response?.data?.data;
    }
  },
);

export const confirmEmail = createAsyncThunk(
  'auth/confirmEmail',
  async (payload: {token: string; email: string}) => {
    const response = await getRequest(
      `${config.api_base_url}/auth/sign-in/confirmation-token/verify?emailAddress=${payload?.email}&confirmationToken=${payload?.token}&role=user&clientType=mobile`,
    );

    if (response?.status === 200) {
      var profile = await AsyncStorage.getItem('keepInfo').then((req: any) => JSON.parse(req))
      await AsyncStorage.setItem('userInfo', JSON.stringify(profile))
      return profile
      //return response?.data?.data;
    }
  },
);

export const verifyPhoneNumberOtp = createAsyncThunk(
  'auth/verifyPhoneNumberOtp',
  async (payload: {token: string; phoneNumber: string; pin: string}) => {
    const response = await getRequest(
      `${config.api_base_url}/users/phone-number/verify?phoneNumber=${payload?.phoneNumber}&hasVerificationToken=true&token=${payload?.token}&pin=${payload?.pin}`,
    );
    if (response?.status === 200) {
      // var profile = await AsyncStorage.getItem('userInfo').then((req: any) => JSON.parse(req))
      // return profile
      // return response?.data?.data
      return response?.data;
    }
  },
);

export const VerifyPhonenumber = createAsyncThunk(
  'auth/VerifyPhonenumber',
  async (payload: {phoneNumber: string}, {rejectWithValue}) => {
    try {
      const response = await getRequest(
        `${config.api_base_url}/users/phone-number/verify?phoneNumber=${payload?.phoneNumber}`,
      );
      if (response?.status === 200) {
        return response?.data;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const signOutUser = createAsyncThunk('auth/signout', async () => {
  try {
    return null;
  } catch (e: any) {
    return console.log(e);
  }
});

export const signInUser = createAsyncThunk(
  'auth/signin',
  async (payload: LoginFormData, {rejectWithValue}) => {
    try {
      const response = await postRequest(
        `${config.api_base_url}/auth/sign-in/user?clientType=mobile`,
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

export const getProfile = createAsyncThunk('auth/getProfile', async () => {
  var profile = await AsyncStorage.getItem('userInfo').then((req: any) =>
    JSON.parse(req),
  );
  return profile;
});

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (
    payload: {
      dateOfBirth: string;
      gender: string;
      country: string;
      houseAddress: string;
      userId: string;
    },
    {rejectWithValue},
  ) => {
    try {
      const data = {
        dateOfBirth: payload?.dateOfBirth,
        gender: payload?.gender,
        country: payload?.country,
        homeAddress: payload?.houseAddress,
      };
      const response = await postRequest(
        `${config.api_base_url}/users/${payload?.userId}/update`,
        data,
      );
      if (response?.status === 200) {
        await AsyncStorage.setItem(
          'userInfo',
          JSON.stringify(response?.data?.data),
        );
        return response?.data;
      }
    } catch (e: any) {
      console.log({e}, e.toJSON());
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (
    payload: {currentPassword: string; newPassword: string},
    {rejectWithValue},
  ) => {
    try {
      const response = await postRequest(
        `${config.api_base_url}/users/change-password`,
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

export const changePin = createAsyncThunk(
  'auth/changePin',
  async (
    payload: {pin: string; password: string},
    {rejectWithValue},
  ) => {
    try {
      const response = await postRequest(
        `${config.api_base_url}/users/set/transaction-pin`,
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

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(signInUser.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        signInUser.fulfilled,
        (state, action: PayloadAction<any>) => {
          (state.loading = false);
          if (!action?.payload?.data?.requiresConfirmation) {
            (state.userInfo = action.payload?.data);
            AsyncStorage.setItem("userInfo", JSON.stringify(action.payload?.data))
          }

        },
      );
    builder.addCase(signInUser.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(createUser.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        createUser.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.userInfo = action.payload
        },
      );
    builder.addCase(createUser.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(verifyEmailSend.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        verifyEmailSend.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        },
      );
    builder.addCase(verifyEmailSend.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(verifyEmail.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        verifyEmail.fulfilled,
        (state, action: PayloadAction<any>) => {
          (state.loading = false);
          state.userData = action.payload;
          state.userInfo = action.payload;
        },
      );
    builder.addCase(verifyEmail.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(confirmEmail.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        confirmEmail.fulfilled,
        (state, action: PayloadAction<any>) => {
          (state.loading = false);
          state.userData = action.payload;
          state.userInfo = action.payload;
        },
      );
    builder.addCase(confirmEmail.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(signOutUser.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(signOutUser.fulfilled, (state, action) => {
        (state.loading = false),
          (state.userInfo = null),

          (state.userData = null);
          AsyncStorage.clear()
      });
    builder.addCase(signOutUser.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(getProfile.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getProfile.fulfilled,
        (state, action: PayloadAction<any>) => {
          (state.loading = false), (state.userData = action.payload);
          state.userInfo = action.payload;
        },
      );
    builder.addCase(getProfile.rejected, (state, action) => {
      (state.loading = false), (state.error = action.error.message);
    });
    builder.addCase(updateProfile.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        updateProfile.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        },
      );
    builder.addCase(updateProfile.rejected, (state, action) => {
      (state.loading = false), (state.error = action.error.message);
    });
    builder.addCase(verifyPhoneNumberOtp.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        verifyPhoneNumberOtp.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        },
      );
    builder.addCase(verifyPhoneNumberOtp.rejected, (state, action) => {
      (state.loading = false), (state.error = action.error.message);
    });
    builder.addCase(VerifyPhonenumber.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        VerifyPhonenumber.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        },
      );
    builder.addCase(VerifyPhonenumber.rejected, (state, action) => {
      (state.loading = false), (state.error = action.error.message);
    });
    builder.addCase(changePassword.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        changePassword.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        },
      );
    builder.addCase(changePassword.rejected, (state, action) => {
      (state.loading = false), (state.error = action.error.message);
    });
    builder.addCase(generateSigninToken.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        generateSigninToken.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        },
      );
    builder.addCase(generateSigninToken.rejected, (state, action) => {
      (state.loading = false), (state.error = action.error.message);
    });
    builder.addCase(verifySignin.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        verifySignin.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          (state.userInfo = action.payload?.data);
          AsyncStorage.setItem("userInfo", JSON.stringify(action.payload?.data))
        },
      );
    builder.addCase(verifySignin.rejected, (state, action) => {
      (state.loading = false), (state.error = action.error.message);
    });
    builder.addCase(changePin.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(changePin.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false
        },
      );
    builder.addCase(changePin.rejected, (state, action) => {
      (state.loading = false), (state.error = action.error.message);
    });
  },
});

export const loginState = (state: RootState) => state.auth.userData;

export const userState = (state: RootState) => state.auth.userInfo;

export default AuthSlice.reducer;
