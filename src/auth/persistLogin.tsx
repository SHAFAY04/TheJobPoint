import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { RootState } from '../store'
import { useRefreshQuery } from '../api/refreshApiSlice'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { SerializedError } from '@reduxjs/toolkit/react'
import { setCredentials } from './authSlice'
import { AppDispatch } from '../store'


const errorBlock=(e: FetchBaseQueryError | SerializedError,setLoading: any)=>{
   
        if ('status' in (e as FetchBaseQueryError)) {
          const error = e as FetchBaseQueryError;  // Narrowing e to FetchBaseQueryError
          
          if (error.status&& error.data && typeof error.data === 'object' && 'message' in error.data) {

            console.log(error.status+': '+error.data.message);
          }
        }
        
        else{
          if('message' in (e as SerializedError)){
            console.log(`${(e as SerializedError).code}: ${(e as SerializedError).message}`)
          }
        }
        setLoading(false)
    
}

 const persistLogin=()=>{

    const dispatch =useDispatch<AppDispatch>()
    const [loading,setLoading]=useState(true)
const accessToken=useSelector((state:RootState)=>state.auth.accessToken)

const { data, isError, error } = useRefreshQuery(null);

useEffect(()=>{

    if(!accessToken){

        if(isError){
            errorBlock(error,setLoading)
        }
        else if(data){
            dispatch(setCredentials({...data}))
            setLoading(false)
        }
        else{
            setLoading(false)
        }
    }

},[accessToken,data,isError])

return (
    <div>{loading?<p>Loading</p>:<Outlet/>}</div>
)
}

export default persistLogin