/* eslint-disable eol-last */
import { configureStore } from '@reduxjs/toolkit';
import TradeReducer from '../slice/TradeSlice';
import AuthReducer from "../slice/AuthSlice"
import WalletReducer from '../slice/WalletSlice';
import ZendReducer from '../slice/ZendSlice';

export const store = configureStore({
  reducer: {
    trade: TradeReducer,
    auth: AuthReducer,
    wallet: WalletReducer,
    zend: ZendReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch