import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


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
  
const recentJobApiSlice=createApi({

    reducerPath:'recentJobs',
    baseQuery:fetchBaseQuery({baseUrl:`${import.meta.env.DEV_BACKEND_URL}`}),
    endpoints:(builder)=>({

        getRecentJobs:builder.query<Job[],void>({
            query:()=>'/recent-jobs?limit=3'
        })
    })
})

export default recentJobApiSlice
export const { useGetRecentJobsQuery } = recentJobApiSlice;
