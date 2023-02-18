/* eslint-disable eol-last */
import { configureStore } from '@reduxjs/toolkit';
import TradeReducer from '../slice/TradeSlice';
import AuthReducer from "../slice/AuthSlice"

export const store = configureStore({
  reducer: {
    trade: TradeReducer,
    auth: AuthReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch