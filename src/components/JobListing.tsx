import React, { ReactNode } from 'react'
import Job from './Job'

//fetching Jobs from jobs.json

interface Job {
  id:number;
  type: string;
  title: string;
  description: string;
  salary: string;
  location: string;
}
let fetchJobs = () => {
  return fetch('../src/jobs.json')
    .then(res => res.json())
    .then(data => { return data })
    .catch(err => {
      if (err instanceof Error) {
        console.log(err.message)
      }
    })
}
let allJobs: Job[] = await fetchJobs()
console.log(allJobs)
let recentJobs:Job[]=allJobs.slice(0,3)

const JobListing = () => {

  return (
    <>
      {/* <!-- Browse Jobs --> */}
      <section className="bg-emerald-400 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-emerald-600 mb-6 text-center">
            Browse Jobs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentJobs.map(job => (
              <Job key={job.id}  job={job}/>
            ))}

          </div>
        </div>
      </section >
      </>
  )
}

export default JobListing