import { createSlice } from "@reduxjs/toolkit";

interface authInitState{

}
const authSlice= createSlice({

    name:'auth',
    initialState:{username:null,accessToken:null,roles:[0]},
    reducers:{
        setCredentials:(state,action)=>{

            const {user,accessToken,roles}=action.payload
            state.username=user
            state.accessToken=accessToken
            state.roles=roles
        },
        logOut:(state,action)=>{
             
            state.username=null,
            state.accessToken=null
            state.roles=[]
        }
    },
})

export const {setCredentials,logOut}=authSlice.actions

export default authSlice.reducer
