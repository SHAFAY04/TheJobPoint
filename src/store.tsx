import { configureStore } from "@reduxjs/toolkit";
import jobReducer ,{ JobState }from './components/jobSlice';

const store= configureStore({

    //we are going to put in the reducers that we create in this reducer object
    reducer:{
        job:jobReducer
    }
})
//this rootState is the type of our entire Redux state
export type RootState = {
    job: JobState;
}
export type AppDispatch = typeof store.dispatch;
export default store;