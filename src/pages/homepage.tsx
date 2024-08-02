import React from 'react'
import Hero from "../components/Hero"
import HomeCards from "../components/HomeCards"
import JobListing from "../components/JobListing"
import ViewAllJobs from "../components/ViewAllJobs"
{/*React Router and setting multiple pages*/}

const homepage = () => {
  return (
    <>
     <Hero title='React Props' subtitle="THIS IS TEST SUBTITLE">
     Now this is the reactNode, this is how you pass it to the component
      </Hero>
      <HomeCards />
      <JobListing isHome={true}/>
      <ViewAllJobs />
    </>
  )
}

export default homepage