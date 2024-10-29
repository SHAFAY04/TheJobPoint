// store.ts

import { Reducer } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import jobReducer from './components/jobSlice';
import { Middleware } from '@reduxjs/toolkit';
import registerApiSlice from './api/registerApiSlice'
import authApiSlice from './api/authApiSlice';
import authReducer from './auth/authSlice'
import recentJobApiSlice from './api/recentJobApiSlice';
import { refreshApiSlice } from './api/refreshApiSlice';

// Example type assertion
const registerApiMiddleware:Middleware=registerApiSlice.middleware
const registerApiReducer:Reducer=registerApiSlice.reducer
const authApiReducer:Reducer=authApiSlice.reducer
const authApiMiddleware:Middleware=authApiSlice.middleware
const recentJobApiReducer:Reducer=recentJobApiSlice.reducer
const recentJobApiMiddleware:Middleware=recentJobApiSlice.middleware
const refreshApiReducer:Reducer=refreshApiSlice.reducer
const refreshApiMiddleware:Middleware=refreshApiSlice.middleware

//just remember the name of standard slices and the reducerPath of apiSlices should be unique if any of them has the same name or ReducerPaths they can overwrite each other's states 
const store = configureStore({
  reducer: {
    auth:authReducer,//authSlice reducer
    job: jobReducer,
    registerApi:registerApiReducer,
    authApi:authApiReducer, //rtk query authApiSlice reducer
    recentJobs:recentJobApiReducer,
    refreshApi:refreshApiReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(registerApiMiddleware,authApiMiddleware,recentJobApiMiddleware,refreshApiMiddleware),
  devTools:true
  });

// Define types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
