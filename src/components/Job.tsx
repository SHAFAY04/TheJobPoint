import { useState } from 'react';
//npm i react-icons
import { FaMapMarker } from 'react-icons/fa'
import { Link } from 'react-router-dom'; 

interface JobKeys {
  id:string|undefined;
  type: string;
  title: string;
  description: string;
  salary: string;
  location: string;
}
type jobProps = { job: JobKeys }

const Job = ({ job }: jobProps) => {

  let [showFullDescription,setshowFullDescription]= useState<boolean>(false)
  let descrpition= job.description

  if(!showFullDescription){
    descrpition=descrpition.substring(0,120)+'...'
  }

  return (

    <div className="bg-white rounded-xl shadow-md relative">
      
      <div className="p-4">
                  <div className="mb-4">
                    <div className="text-gray-600 my-2">{job.type}</div>
                    <h3 className="text-xl font-bold">{job.title}</h3>
                  </div>
                  <div className="mb-5">
                    {descrpition}
                  </div>
                  <button id='descriptionButton' onClick={()=>
                    setshowFullDescription((prevState)=>
                      !prevState )
                  }
                   className='rounded-md ml-2 p-2 w-60 hover:bg-emerald-600 text-white hover:text-emerald-800 mb-8 bg-emerald-500 pd'>{showFullDescription?'Less':'More'}</button>
                  <h3 className="text-indigo-500 mb-2">{job.salary}</h3>

                  <div className="border border-gray-100 mb-5"></div>

                  <div className="flex flex-col lg:flex-row justify-between mb-4">
                    <div className="text-orange-700 mb-3">
                      <FaMapMarker className='inline mr-2'/>
                      {job.location}
                    </div>
                    <Link
                      to={`/jobs/${job.id}`}
                      className="py-3 h-[42px] bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md text-center text-sm"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
      
    </div>

  )
}

export default Job