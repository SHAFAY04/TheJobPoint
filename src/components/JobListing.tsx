import React, { ReactNode } from 'react'
import Job from './Job'

interface Job {
  id:number;
  type: string;
  title: string;
  description: string;
  salary: string;
  location: string;
}
//fetching Jobs from jobs.json

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
              <Job key={job.id}>
                <div className="p-4">
                  <div className="mb-6">
                    <div className="text-gray-600 my-2">{job.type}</div>
                    <h3 className="text-xl font-bold">{job.title}</h3>
                  </div>
                  <div className="mb-5">
                    {job.description}
                  </div>
                  <h3 className="text-indigo-500 mb-2">{job.salary}</h3>

                  <div className="border border-gray-100 mb-5"></div>

                  <div className="flex flex-col lg:flex-row justify-between mb-4">
                    <div className="text-orange-700 mb-3">
                      <i className="fa-solid fa-location-dot text-lg"></i>
                      {job.location}
                    </div>
                    <a
                      href={`/job/${job.id}`}
                      className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg text-center text-sm"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </Job>
            ))}

          </div>
        </div>
      </section >
      </>
  )
}

export default JobListing