import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { RootState } from '../store'
import { useRefreshQuery } from '../api/refreshApiSlice'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { SerializedError } from '@reduxjs/toolkit/react'
import { setCredentials } from './authSlice'
import { AppDispatch } from '../store'
import Spinners from '../components/spinners'


const errorBlock=(e: FetchBaseQueryError | SerializedError)=>{
   
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
    
}

 const persistLogin=()=>{

    const dispatch =useDispatch<AppDispatch>()
    const [loading,setLoading]=useState(true)
const accessToken=useSelector((state:RootState)=>state.auth.accessToken)

const { data, isError, error } = useRefreshQuery();

useEffect(()=>{

    if(!accessToken){
      console.log('access token state lost')
        if(isError){
          console.log('you got no refresh token since you are not logged in now this error block will set the loading state to false allowing you to proceed to the requireAuth component which will ask you to log in but just telling you that when you are not logged in and you try to access the jobs page or any restricted page it first goes to this persist login component and makes a useless request to /refresh route with no cookies since you are not logged in now to remove this useless request i tried adding a conditional render of this persistlogin component based on if the browser has jwt cookie or not but turns out my cookie is an http only cookie and because of that i am unable to access that cookie and place a condition where persistLogin component will only work if the browser has cookies  '+error)
            errorBlock(error)
            setLoading(false)
        }
        if(data){
          console.log(data)
          console.log('setting data to state')
            dispatch(setCredentials({...data}))
            setLoading(false)
        }
       
    }
    else{
      setLoading(false)
    }
    

},[accessToken,data,isError])

return (
    <div>{loading?   <div className='mt-64'><Spinners loading={true} /></div>:<Outlet/>}</div>
)
}

export default persistLogin