// store.ts

import { Reducer } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import jobReducer from './components/jobSlice';
import  apiSlice  from './api/apiSlice'; // Adjust the path as needed
import { Middleware } from '@reduxjs/toolkit';
import usersApiSlice from './api/usersApiSlice';

// Example type assertion
const apiMiddleware: Middleware = apiSlice.middleware;
const apiReducer:Reducer = apiSlice.reducer as Reducer;

const store = configureStore({
  reducer: {
    job: jobReducer,
    api: apiReducer,
    usersApi:usersApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware,usersApiSlice.middleware),
  });

// Define types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
