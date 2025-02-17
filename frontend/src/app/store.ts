import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { apiSlice } from "./api/api.slice";
import authReducer from "@/app/auth/auth.slice";
import livestockReducer from "@/app/livestock/livestock.slice";

/**
 * Redux store with slice reducers and middleware.
 */
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    livestock: livestockReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: false,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
