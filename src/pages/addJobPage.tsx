import  { FormEvent, useEffect, useState } from 'react'
//useNavigate hook helps navigating to some url after performing some action or some function
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinners from '../components/spinners';
import Error from './ErrorPage';
import { nanoid, SerializedError } from '@reduxjs/toolkit';
import { useAddJobMutation, useGetJobsQuery } from '../api/authApiSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

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
  
const addJobPage = () => {

    let [type, setType] =useState<string>('Full-Time')
const [ListingName, setListingName] =useState<string> ('')
const [Description, setDescription] =useState<string> ('')
const [Salary, setSalary] =useState<string> ('Under $50K')
const [location, setlocation] =useState<string> ('')
const [CompanyName, setCompanyName] =useState<string> ('')
const [CompanyDescription, setCompanyDescription] =useState<string> ('')
const [ContactEmail, setContactEmail] =useState<string> ('')
const [ContactPhone, setContactPhone] =useState<string> ('')

const navigate = useNavigate();

const[formSubmitted,setFormSubmitted]=useState(false)
const[showError,setShowError]=useState(false)
// USING REDUX!
// const dispatch= useDispatch<AppDispatch>()
// const {loading,error}=useSelector((state:RootState)=>state.job)

//USING RTK QUERY!
const [addJob,{isLoading,isError,error}]=useAddJobMutation()
const { refetch } = useGetJobsQuery(); // to trigger refetch
const [errorString,setError]=useState<string|undefined>('')

//type of form events is not just Event its form Event

const employer=useSelector((state:RootState)=>state.auth.username)!
console.log(employer)

const submitForm=async(e:FormEvent)=>{
    e.preventDefault()
    const id= nanoid(4)
   
    let job:Job={
      employer:employer,
        jobid:id,
        jobtype:type,
        title:ListingName,
        jobdescription:Description,
        salary:Salary,
        location:location,
        company:{
            name:CompanyName,
            description:CompanyDescription,
            contactphone: ContactPhone,
            contactemail:ContactEmail
        }
    }
    console.log(job)
    
      // dispatch(jobAdd(job))
      try{
        setFormSubmitted(true)
     await addJob(job).unwrap()
     refetch()
      }
      catch(e){
        
        if ('status' in (e as FetchBaseQueryError)) {
          const error = e as FetchBaseQueryError;  // Narrowing e to FetchBaseQueryError
          
          if (error.status&& error.data && typeof error.data === 'object' && 'message' in error.data) {
            setError(error.status+': '+error.data.message)
            console.log(error.status+': '+error.data.message);
          }
        }
        
        else{
          if('message' in (e as SerializedError)){
            setError(`${(e as SerializedError).code}: ${(e as SerializedError).message}`)
          }
        }
      }
     

}

useEffect(()=>{

  if(formSubmitted){
  if(isLoading ){

    toast.info('Loading..')
  }

 else if( isError ){

    setShowError(true)
    toast.dismiss()
    toast.error(errorString)

    
  }

  else{
toast.dismiss()
    
    setTimeout(()=>{
      toast.success('JOB ADDED SUCCESSFULLY!')
      return navigate('/jobs')

    },1500)
  }
}
},[formSubmitted,isLoading,isError])

return (
    <>
      {formSubmitted ? (
       showError!==true ? (
        <div className='mt-64'><Spinners loading={true} /></div>
          
        ) : isError && showError ? (
          <Error error={error} />

        ) : null // No need to handle success here as navigate will take care of it
      ) : (
        <div className="container m-auto py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0 lg:w-[800px] lg:mx-96">
            <form onSubmit={submitForm}>
              <h2 className="text-3xl text-center font-semibold mb-6">Add Job</h2>
  
              <div className="mb-4">
                <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
                  Job Type
                </label>
                <select
                  id="type"
                  name="type"
                  onChange={(e) => setType(e.target.value)}
                  className="border rounded w-full py-2 px-3"
                  required
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Remote">Remote</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
  
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                  Job Listing Name
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="e.g., Beautiful Apartment In Miami"
                  required
                  onChange={(e) => setListingName(e.target.value)}
                />
              </div>
  
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="border rounded w-full py-2 px-3"
                  rows={4}
                  placeholder="Add any job duties, expectations, requirements, etc."
                  required
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
  
              <div className="mb-4">
                <label htmlFor="salary" className="block text-gray-700 font-bold mb-2">
                  Salary
                </label>
                <select
                  id="salary"
                  name="salary"
                  className="border rounded w-full py-2 px-3"
                  onChange={(e) => setSalary(e.target.value)}
                  required
                >
                  <option value="Under $50K">Under $50K</option>
                  <option value="$50K - 60K">$50K - $60K</option>
                  <option value="$60K - 70K">$60K - $70K</option>
                  <option value="$70K - 80K">$70K - $80K</option>
                  <option value="$80K - 90K">$80K - $90K</option>
                  <option value="$90K - $100K">$90K - $100K</option>
                  <option value="$100K - 125K">$100K - $125K</option>
                  <option value="$125K - 150K">$125K - $150K</option>
                  <option value="$150K - 175K">$150K - $175K</option>
                  <option value="$175K - $200K">$175K - $200K</option>
                  <option value="Over $200K">Over $200K</option>
                </select>
              </div>
  
              <div className="mb-4">
                <label htmlFor="location" className="block text-gray-700 font-bold mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Company Location"
                  required
                  onChange={(e) => setlocation(e.target.value)}
                />
              </div>
  
              <h3 className="text-2xl mb-5">Company Info</h3>
  
              <div className="mb-4">
                <label htmlFor="company" className="block text-gray-700 font-bold mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Company Name"
                  required
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
  
              <div className="mb-4">
                <label htmlFor="company_description" className="block text-gray-700 font-bold mb-2">
                  Company Description
                </label>
                <textarea
                  id="company_description"
                  name="company_description"
                  className="border rounded w-full py-2 px-3"
                  rows={4}
                  placeholder="What does your company do?"
                  required
                  onChange={(e) => setCompanyDescription(e.target.value)}
                />
              </div>
  
              <div className="mb-4">
                <label htmlFor="contact_email" className="block text-gray-700 font-bold mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  id="contact_email"
                  name="contact_email"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Email address for applicants"
                  required
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
  
              <div className="mb-4">
                <label htmlFor="contact_phone" className="block text-gray-700 font-bold mb-2">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  id="contact_phone"
                  name="contact_phone"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Optional phone for applicants"
                  onChange={(e) => setContactPhone(e.target.value)}
                />
              </div>
  
              <div>
                <button
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Add Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
  

}
export default addJobPage