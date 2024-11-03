import { useSelector } from "react-redux"
import Hero from "../components/Hero"
import HomeCards from "../components/HomeCards"
import JobListing from "../components/JobListing"
import ViewAllJobs from "../components/ViewAllJobs"
import { RootState } from "../store"
{/*React Router and setting multiple pages*/}

const homepage = () => {

  const access= useSelector((state:RootState)=>state.auth.accessToken)
  const name= useSelector((state:RootState)=>state.auth.username)
  const sub= access?`WELCOME ${name}`:undefined
  return (
    <>
     <Hero title='TheJobPoint' subtitle={sub}>
Your All in One Jobs Solution!      </Hero>
      <HomeCards />
      <JobListing isHome={true}/>
      <ViewAllJobs />
    </>
  )
}

export default homepage