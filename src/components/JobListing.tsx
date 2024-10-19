// import React, { Dispatch, ReactNode } from 'react'
import Job from './Job'
//npm i react-spinners
import Spinners from './spinners';
// import { useState,useEffect } from 'react';
// import useFetch from '../hooks/useFetch';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState,AppDispatch } from '../store';
// import { fetchJobs } from './jobSlice';
// import { AsyncThunkAction } from '@reduxjs/toolkit';
import { useGetJobsQuery } from '../api/authApiSlice';
import Error from '../pages/ErrorPage';
import { useGetRecentJobsQuery } from '../api/recentJobApiSlice';


interface JobListingProps{
  isHome:boolean
}
const JobListing = ({isHome}:JobListingProps) => {

  //initialing JSON SERVER for our jobs.json file
//to then fetch the data from json-server
//npm i -D json-server
//then, put the following in the package.json scripts
//"server":"json-server --watch src/jobs.json --port 8000"

//fetching Jobs from jobs.json

//   const [jobs,setjobs]=useState<Job[]>([])
// const [loading,setloading]=useState<boolean>(true)

//useEffect provides a sideEffect to a component on its render so what we're doing rightnow is by using useEffect we fetch on rendering of the component so basically when the component renders it has a sideeffect and in our situation it has a sideeffect of fetching the data meanwhile if you talk about reactSuspense it renders while fetching
//now the useEffect hook has 2 arguments first one is a function that contains your sideEffect logic and the second one is the dependency array so for example if we have [name] in our dependency array the useEffect is gonna run every time the name changes
// useEffect(()=>{

//using a timeout just to checkout the loading
//spinner that i used 
  // setTimeout(()=>{


  // const fetchData= async()=>{

    //we replaced the localhost:8000 by /api and we did it by using the concept of proxying you can see that in your viteconfig file
//     const apiUrl= isHome? '/api/jobs?_limit=3':'/api/jobs'
//     try {
      
//     const res= await fetch(apiUrl)
//     const data= await res.json()
//     setjobs(data)
    
//     } catch (error) {
      
//       console.log('Error Fetching ',error)
//     }
//     finally{
      
//       setloading(false)
//     }

    
//   }
//   fetchData()
// },1000)
//the empty[] makes sure it runs once if you dont add the [] it will be an endless loop
// },[])



  //the following line of code the slicing one this is the old way we can ofcourse do this,
  //but since we're using json-server we can limit
  //jobs to 3 by adding '?_limit=3' at the end of our url
  // let joblistings:Job[]= isHome?jobs.slice(0,3):jobs
  
//using REDUX!
// const dispatch= useDispatch<AppDispatch>()
// const {jobs,loading,error}=useSelector((state:RootState)=>state.job)
// useEffect(()=>{

//   dispatch(fetchJobs(isHome))
// },[dispatch,isHome])

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
//USING RTK QUERY!

const {

  data: recentJobsData,
  isLoading: isLoadingRecentJobs,
  isError: isErrorRecentJobs,
  error: recentJobsError,

} = useGetRecentJobsQuery();

const {

  data: jobsData,
  isLoading: isLoadingJobs,
  isError: isErrorJobs,
  error: jobsError,

} = useGetJobsQuery();

// Now decide which data to use based on isHome
const jobs = isHome ? recentJobsData : jobsData;
const isLoading = isHome ? isLoadingRecentJobs : isLoadingJobs;
const isError = isHome ? isErrorRecentJobs : isErrorJobs;
const error = isHome ? recentJobsError! : jobsError!;


  return(
<>
  {/* <!-- Browse Jobs --> */}
  <section className="bg-emerald-400 px-4 py-10 ">
    <div className="container-xl lg:container m-auto">
      <h2 className="text-3xl font-bold text-emerald-600 mb-6 text-center">
        {isHome ? 'Recent Jobs' : 'All Jobs'}
      </h2>

      {isLoading ? (
        <Spinners loading={isLoading} />
      ) : isError ? (
        <Error error={error} />
      ) : (
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs?jobs.map((job:Job) => (
            <Job key={job.jobid} job={job} />
          )):<p>NO JOBS FOUND!</p>}
        </div>
      )}
    </div>
  </section>
</>

  )
}

export default JobListing