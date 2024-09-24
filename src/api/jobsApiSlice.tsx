// apiSlice.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// Define the Job interface
interface Job {
  id: string
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


// Create the API slice
const jobsApiSlice = createApi({

  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({

    //returns the first and takes the second in <,>
    getJobs: builder.query<Job[], void>({
      query: () => '/jobs',
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
        method: "DELETE",
        body:job
      })
    }),
    getJob: builder.query({
      query: (id) => `/jobs/${id}`
    })
  }),
});

// Export hooks for usage in functional components
export const { useGetJobsQuery, useGetJobQuery, useEditJobMutation, useAddJobMutation } = jobsApiSlice;

// Export the API slice itself
export default jobsApiSlice;


