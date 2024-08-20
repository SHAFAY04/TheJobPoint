// store.ts

import { Reducer } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import jobReducer, { JobState } from './components/jobSlice';
import { apiSlice } from './api/apiSlice'; // Adjust the path as needed
import { Middleware } from '@reduxjs/toolkit';

// Example type assertion
const apiMiddleware: Middleware = apiSlice.middleware;
const apiReducer:Reducer = apiSlice.reducer as Reducer;

const store = configureStore({
  reducer: {
    job: jobReducer,
    api: apiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
  });

// Define types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
