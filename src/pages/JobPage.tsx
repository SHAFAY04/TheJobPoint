import { useParams } from 'react-router-dom'
import Back from '../components/JobBack'
import JobIntro from '../components/JobIntro'
import JobDesc from '../components/JobDesc'
import JobCompanyInfo from '../components/JobCompanyInfo'
import JobManage from '../components/JobManage'
import Spinners from '../components/spinners'
import Errorpage from './ErrorPage'
import { useGetJobQuery } from '../api/authApiSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useEffect, useState } from 'react'


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

// dataLoader is from the react-router-dom and since it is linked to the router it has an object pram which kinda helps you getting the path prams like id of job to fetch so that you dont have to use useLocation or usePrams hook
// const JobLoader: LoaderFunction = async ({ params }) => {
//   try {
//     const res = await fetch(`/api/jobs/${params.id}`);
//     const data: Job = await res.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//     return null; // Return null on error or when data is not found
//   }
// };

const JobPage =() => {

  //to get the id from the route path i can normally use the usePrams hook its specifically designed for that purpose it can fetch all your prams in your path as in my case path='jobs/:id' my only pram is :id so i can do ,const { id } = useParams(); and easily get the id

  //useLocation is detailed mostly used to get details like hash location changes etc
  //to get our path from the route we can do location.pathname as i have used below
  // const location = useLocation()
  const { id } = useParams()

  //i am gonna comment this useEffect out because we can use dataLoader and you will see it outside the JobPage function ofcourse because it technically gets exported
  // useEffect(() => {

  //   const fetchJob = async () => {

  //     try {
  //       const res = await fetch('/api' + location.pathname)
  //       const data = await res.json()
  //       setJob(data)

  //     } catch (error) {
  //       console.log('Error Fetching ', error)
  //     }
  //     finally {
  //       setLoading(false)
  //     }

  //   }
  //   fetchJob()

  // }, [])

  const { data: job, isLoading, isError, error } = useGetJobQuery(id);
  // const dispatch= useDispatch<AppDispatch>()

  // useEffect(()=>{
  //   dispatch(jobGet(id))
  //   getJob(id)

  // },[dispatch,id])
  // const {job,error,loading}=useSelector((state:RootState)=>state.job)

  const user=useSelector((State:RootState)=>State.auth.username)
 
  const [jobPoster,setJobPoster]=useState(false)
  
useEffect(() => {
  // Only run the effect if the data is fetched and job is not undefined
  if (job && !isLoading && !isError) {
    console.log(job.employer)
    user===job.employer?setJobPoster(true):setJobPoster(false)
  }
}, [job, isLoading, isError]);  // Depend on job, isLoading, and isError
console.log(job)
  return (
   
      
        <>

          <Back />
          {isLoading ? (
            <div className='mt-64'>  <Spinners loading={isLoading} />
</div>
) : isError ? (
  <Errorpage error={error} />
) : (
  <section className="bg-emerald-300 h-screen">
    <div className="container m-auto py-10 px-4">
      <div className="grid sm:grid-cols-1 md:grid-cols-[70%_30%] lg:grid-cols-[7fr_3fr] w-full gap-6">
        <main>
        <JobIntro job={job as Job} />
        <JobDesc job={job as Job} />
        </main>
        <aside>
          <JobCompanyInfo job={job as Job} />
          {jobPoster?<JobManage job={job as Job}/>:null}
        </aside>
      </div>
    </div>
  </section>
)}

        </>
      
  );
  
}

export {JobPage as default}