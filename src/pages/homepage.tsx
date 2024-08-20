import React from 'react'
import Hero from "../components/Hero"
import HomeCards from "../components/HomeCards"
import JobListing from "../components/JobListing"
import ViewAllJobs from "../components/ViewAllJobs"
{/*React Router and setting multiple pages*/}

const homepage = () => {
  return (
    <>
     <Hero title='React Jobs' subtitle="THIS IS TEST SUBTITLE">
Your All in One React Jobs Solution!      </Hero>
      <HomeCards />
      <JobListing isHome={true}/>
      <ViewAllJobs />
    </>
  )
}

export default homepage