import  {  useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDeleteJobMutation } from '../api/authApiSlice'

interface Job{
  employer:string
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
interface jobManageProps {
  job: Job;
}
const JobManage = ({job}:jobManageProps) => {

  const [deleteJob,{isLoading,isError,isSuccess}]=useDeleteJobMutation()
const [submitted,setSubmitted]=useState(false)

  const navigate=useNavigate()

  async function onButtonDelete() {

    let confirm=window.confirm('Are you sure you wanna do this?')
    if(!confirm)return

    setSubmitted(true)

    await deleteJob(job).unwrap()

    toast.success('Job Deleted Succesfully!')

    navigate('/jobs')
  }

  useEffect(()=>{

    if(submitted){

      if(isLoading){
     
          toast.info('Processing...')

      }
      if(isError){
      
          toast.dismiss()
          toast.error('Deleting Failed!')
       
      }
      if(isSuccess){

        setTimeout(()=>{

          toast.success('Deleted Successfully!')
        },1000)
        navigate('/jobs')
      }
    }
  },[submitted,isLoading,isError,isSuccess])

  return (
    <>
     
     <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                <Link to={`/edit-job/${job.jobid}`} className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">Edit Job</Link>
                <button onClick={()=>{
                  onButtonDelete()
                }} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                  Delete Job
                </button>
              </div>
    </>
  )
}

export default JobManage