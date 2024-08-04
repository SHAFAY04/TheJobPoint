import React, { ReactNode } from 'react'
import Job from './Job'
//npm i react-spinners
import Spinners from './spinners';
import { useState,useEffect } from 'react';


interface Job {
  id:number;
  type: string;
  title: string;
  description: string;
  salary: string;
  location: string;
}


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

  const [jobs,setjobs]=useState<Job[]>([])
const [loading,setloading]=useState<boolean>(true)

//useEffect provides a sideEffect to a component on its render so what we're doing rightnow is by using useEffect we fetch on rendering of the component so basically when the component renders it has a sideeffect and in our situation it has a sideeffect of fetching the data meanwhile if you talk about reactSuspense it renders while fetching
//now the useEffect hook has 2 arguments first one is a function that contains your sideEffect logic and the second one is the dependency array so for example if we have [name] in our dependency array the useEffect is gonna run every time the name changes
useEffect(()=>{

//using a timeout just to checkout the loading
//spinner that i used 
  setTimeout(()=>{


  const fetchData= async()=>{

    //we replaced the localhost:8000 by /api and we did it by using the concept of proxying you can see that in your viteconfig file
    const apiUrl= isHome? '/api/jobs?_limit=3':'/api/jobs'
    try {
      
    const res= await fetch(apiUrl)
    const data= await res.json()
    setjobs(data)
    
    } catch (error) {
      
      console.log('Error Fetching ',error)
    }
    finally{
      
      setloading(false)
    }

    
  }
  fetchData()
},1000)
//the empty[] makes sure it runs once if you dont add the [] it will be an endless loop
},[])



  //the following line of code the slicing one this is the old way we can ofcourse do this,
  //but since we're using json-server we can limit
  //jobs to 3 by adding '?_limit=3' at the end of our url
  // let joblistings:Job[]= isHome?jobs.slice(0,3):jobs
 
  return(
    <>
      {/* <!-- Browse Jobs --> */}
      <section className="bg-emerald-400 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-emerald-600 mb-6 text-center">
           {isHome?'Recent Jobs':'All Jobs'}
          </h2>
          {loading ? (
  <Spinners loading={loading}/>
) : (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {jobs.map((job) => (
      <Job key={job.id} job={job} />
    ))}
          </div>
)}
            

        </div>
      </section >
      </>
  )
}

export default JobListing