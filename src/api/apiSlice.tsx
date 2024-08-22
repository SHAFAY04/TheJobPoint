// apiSlice.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// Define the Job interface
interface Job {
    id: string|undefined;
    type: string;
    title: string;
    description: string;
    salary: string;
    location: string;
    company: {
      name: string;
      description: string;
      contactPhone: string;
      contactEmail: string;
    };
  }
  type editedJobType={
    editedJob:Job,
    id:string|undefined,
  }
  
// Create the API slice
export const apiSlice = createApi({
    
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({

    //returns the first and takes the second in <,>
    getJobs: builder.query<Job[], void>({
      query: () => '/jobs',
    }),
    addJob:builder.mutation<void,Job>({
      query:(job:Job

      )=>({
        url:'/jobs',
        method:'POST',
        body:job
      })
    }),
    editJob:builder.mutation<void,editedJobType>({
      query:({editedJob,id})=>({

        url:`/jobs/${id}`,
        method: 'PUT',
        body: editedJob,
      })
    }),
    getJob:builder.query({
      query:(id)=>`/jobs/${id}`
    })
  }),
});

// Export hooks for usage in functional components
export const { useGetJobsQuery,useGetJobQuery,useEditJobMutation, useAddJobMutation } = apiSlice;

// Export the API slice itself
export default apiSlice.reducer;


