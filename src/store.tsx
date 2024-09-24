// store.ts

import { Reducer } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import jobReducer from './components/jobSlice';
import  jobsApiSlice  from './api/jobsApiSlice'; // Adjust the path as needed
import { Middleware } from '@reduxjs/toolkit';
import registerApiSlice from './api/registerApiSlice'
import authApiSlice from './api/authApiSlice';

// Example type assertion
const jobsApiMiddleware: Middleware = jobsApiSlice.middleware;
const jobsApiReducer:Reducer = jobsApiSlice.reducer as Reducer;
const registerApiMiddleware:Middleware=registerApiSlice.middleware
const registerApiReducer:Reducer=registerApiSlice.reducer
const authApiReducer:Reducer=authApiSlice.reducer
const authApiMiddleware:Middleware=authApiSlice.middleware

const store = configureStore({
  reducer: {
    job: jobReducer,
    api: jobsApiReducer,
    registerApi:registerApiReducer,
    authApi:authApiReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobsApiMiddleware,registerApiMiddleware,authApiMiddleware),
  });

// Define types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
