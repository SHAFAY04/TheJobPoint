import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../auth/authSlice";
import { RootState } from "../store";

interface Creds {

    username: string,
    password: string
}

type loginReturn={
    
    accessToken:string,
    roles:object
}
// Define the Job interface
interface Job{
  employer:string;
  jobid:string;
  jobtype: string;
  title: string;
  jobdescription: string;
  salary: string;
  location: string;
  company:{
    name:string,
    description:string,
    contactphone:string,
    contactemail:string,
  }
}

//you need credentials include to send that secure http only cookie
const baseQuery= fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}`, credentials: 'include', prepareHeaders(headers, { getState }) {

        const token = (getState() as RootState).auth.accessToken

        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
    },
})

const baseQueryWithReAuth= async (args: string | FetchArgs,api: BaseQueryApi,extraOptions: {})=>{

  console.log('sending initial request')
    //you are basically sending an access token request here and if the request gets an error 403 forbidden which means the current access token has expired and now we will be sending the refreshToken to get a new access token
    let result= await baseQuery(args,api,extraOptions)
  console.log(result)
    if(result?.error?.status===403 ){
        console.log('Sending refresh token')
        //send refresh token to get new access token 
        const refreshResult=await baseQuery('/refresh',api,extraOptions)
        console.log(refreshResult)
        if(refreshResult?.data){
          
            //store the new token
            //if you dont spread it like this... the payload will have refreshResult object and then the setCredentials wont be able to find the access token
            api.dispatch(setCredentials({...refreshResult.data}))
            //retrying the original query with new access token
            result= await baseQuery(args,api,extraOptions)
        }
        //other error will likely be a 401 unauthorized or any error 400 or 500 series
        else{
          console.log('Refresh token expired or invalid, logging out...');
            api.dispatch(logOut())
        }
    }
    return result 
}

 const authApiSlice=createApi({

    //The reducerPath is a unique key that your service will be mounted to in your store. If you call createApi more than once in your application, you will need to provide a unique value each time. Defaults to 'api'.
    //https://stackoverflow.com/questions/75126245/cannot-read-properties-of-undefined-reading-invalidatestags
    //If we either provide same name to reducerPath or not providing reducerPath at all, this error will be thrown.
    //by default reducerPath is /api
    reducerPath:'authApi',
    //baseQuery allows you to encapsulate common logic that should be applied across multiple API requests. For example, setting up authorization headers, handling token expiration, error handling, etc.It essentially preprocesses every API request, applying the logic you define (like adding headers or managing token renewal) before making the actual request to the server.
    baseQuery:baseQueryWithReAuth,
    // baseQuery:fetchBaseQuery({baseUrl:'/api'}),
    endpoints:(builder)=>({

        //this endpoint will go through the reauthbaseQuery as well but since the state wont have any access token it would skip the setting access token in the request headers part
        //even if a user is already logged in and the accessToken is sent with the request it doesnt matter the redux username roles and accessToken will be overwritten because the auth route doesnt use the verifyJwt controller which simply means we wont be getting a 403 response even if the accessToken is incorrect or expired 
        //there is no point of jwtVerification for a login route in the backend because the login route is the one that actually assigns refresh token in the cookies and sets your access token in the global redux state
        //that is why since login and logout routes uses the base query its not a problem because you are attaching the access token of an already existing user but since no errors will occur related to jwt the pre existing user will be replaced 
        login:builder.mutation<loginReturn,Creds>({

            query:(credentials)=>({

               url:'/auth',
               method:'POST',
               //if you dont spread this in as well it will have an error username and password required because this will be sending a credentials object with username and password properties while your 
               body:{...credentials}
            })
        }),
        logOut:builder.mutation<void,void>({

            query:()=>({url:'/logout'}),
            //The logic inside onQueryStarted only handles client-side side effects (like Redux state updates). If that logic fails, the backend logic (removal of refresh token, etc.) is still executed.
            async onQueryStarted(_arg, api) {
               
                try{
                    api.dispatch(logOut())
                }
                catch(e){
                    console.log('Error During Logout: ',e)
                }
            },
        }),
        getJobs: builder.query<Job[],void>({
            query: () =>'/jobs',
          }),
          addJob: builder.mutation<void, Job>({
            query: (job: Job
      
            ) => ({
              url: '/jobs',
              method: 'POST',
              body: job
            })
          }),
          editJob: builder.mutation<void, Job>({
            query: (job: Job) => ({
      
              url: `/jobs`,
              method: 'PUT',
              body: job,
            })
          }),
          deleteJob: builder.mutation<void,Job>({
      
            query: (job: Job) => ({
              url: '/jobs',
              method: 'DELETE',
              body:job
            })
          }),
          getJob: builder.query({
            query: (id) => `/jobs/${id}`
          })
    })
})
export default authApiSlice
export const {useLoginMutation,useLogOutMutation,useAddJobMutation,useEditJobMutation,useDeleteJobMutation,useGetJobsQuery,useGetJobQuery}=authApiSlice