import  { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteJobContext } from '../App'


const JobManage = ({id}:{id:string}) => {

  const deleteJob= useContext(deleteJobContext) 

  const navigate=useNavigate()

  function onButtonDelete() {

    let confirm=window.confirm('Are you sure you wanna do this?')
    if(!confirm)return

    deleteJob(id)

    toast.success('Job Deleted Succesfully!')

    navigate('/jobs')
  }

  return (
    <>
     
     <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                <Link to={`/edit-job/${id}`} className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">Edit Job</Link>
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