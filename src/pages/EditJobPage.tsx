import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { useLoaderData, useLocation, useNavigate, useParams } from 'react-router-dom'
import Job from '../components/Job';
import { toast } from 'react-toastify';
import { editJobContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { UseSelector } from 'react-redux';
import { jobEdit } from '../components/jobSlice';
import { AppDispatch, RootState } from '../store';
import spinners from '../components/spinners';
import Spinners from '../components/spinners';
import Error from './ErrorPage';
import { useEditJobMutation, useGetJobQuery } from '../api/apiSlice';


interface Job {
  id:string|undefined,
  type: string;
  title: string;
  description: string;
  salary: string;
  location: string;
  company: {
    name: string;
    description: string;
    contactPhone: string;
    contactEmail: string;
  };
}


const EditJobPage = () => {

  const { id } = useParams();


  // Now you can use the id variable
  const navigate = useNavigate()
  //USING REDUX!
  // const dispatch = useDispatch<AppDispatch>()
  // const { loading, error } = useSelector((state: RootState) => state.job)

  //USING RTK QUERY!
  const [editJob, { isLoading: isEditLoading, isError: isEditError, error: editError }] = useEditJobMutation(); 
   const [showError,setShowError]=useState(false)
   const { data: job, isLoading: isGetLoading, isError: isGetError, error: getError } = useGetJobQuery(id);

   const [type, setType] = useState<string>('Full-Time');
   const [ListingName, setListingName] = useState<string>('');
   const [Description, setDescription] = useState<string>('');
   const [Salary, setSalary] = useState<string>('Under $50K');
   const [location, setLocation] = useState<string>('');
   const [CompanyName, setCompanyName] = useState<string>('');
   const [CompanyDescription, setCompanyDescription] = useState<string>('');
   const [ContactEmail, setContactEmail] = useState<string>('');
   const [ContactPhone, setContactPhone] = useState<string>('');
 
   useEffect(() => {
     if (job) {
       setType(job.type || 'Full-Time');
       setListingName(job.title || '');
       setDescription(job.description || '');
       setSalary(job.salary || 'Under $50K');
       setLocation(job.location || '');
       setCompanyName(job.company.name || '');
       setCompanyDescription(job.company.description || '');
       setContactEmail(job.company.contactEmail || '');
       setContactPhone(job.company.contactPhone || '');
     }
   }, [job]);
  const submitEditedJob = (e: FormEvent) => {
    e.preventDefault();

    const editedJob: Job = {
      id:id,
      type: type,
      title: ListingName,
      description: Description,
      salary: Salary,
      location: location,
      company: {
        name: CompanyName,
        description: CompanyDescription,
        contactPhone: ContactPhone,
        contactEmail: ContactEmail,
      },
    };

    // dispatch(jobEdit({ newJob: editedJob, id: id }))
    editJob({editedJob,id})
    setFormSubmitted(true)
  };

  const [formSubmitted, setFormSubmitted] = useState(false)


  useEffect(() => {
    console.log(id)
    if(formSubmitted){
    if (isEditLoading) {
      toast.info('Loading!')
    }
    else if (isEditError) {

      setTimeout(()=>{
        toast.dismiss
        toast.error('status' in editError? editError.status:editError.message)
        setShowError(true)
  
      },2000)
    }
    else{
      toast.success('EDITED JOB SUCCESFULLY!')
      setTimeout(()=>{
        return navigate('/jobs')
      },200)
      
    }
  }
  }, [isEditError, isEditLoading, formSubmitted])
  
 
  return (
    <>
      {isGetLoading ? (
        <Spinners loading={true} />
      ) : isGetError ? (
        <Error error={getError} />
      ) : job ? (
        formSubmitted ? (
          showError !== true ? (
            <Spinners loading={true} />
          ) : isEditError ? (
            <Error error={editError} />
          ) : null
        ) : (
          <div className="container m-auto py-24">
            <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0 lg:w-[800px] lg:mx-96">
              <form onSubmit={submitEditedJob}>
                <h2 className="text-3xl text-center font-semibold mb-6">Edit Job</h2>
                <div className="mb-4">
                  <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
                    Job Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={type}
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
                    value={ListingName}
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
                    value={Description}
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
                    value={Salary}
                    className="border rounded w-full py-2 px-3"
                    onChange={(e) => setSalary(e.target.value)}
                    required
                  >
                    <option value="Under $50K">Under $50K</option>
                    <option value="$50K - 60K">$50K - $60K</option>
                    <option value="$60K - 70K">$60K - $70K</option>
                    <option value="$70K - 80K">$70K - $80K</option>
                    <option value="$80K - 90K">$80K - $90K</option>
                    <option value="$90K - 100K">$90K - $100K</option>
                    <option value="$100K - 125K">$100K - $125K</option>
                    <option value="$125K - 150K">$125K - $150K</option>
                    <option value="$150K - 175K">$150K - $175K</option>
                    <option value="$175K - 200K">$175K - $200K</option>
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
                    value={location}
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Company Location"
                    required
                    onChange={(e) => setLocation(e.target.value)}
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
                    value={CompanyName}
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
                    value={CompanyDescription}
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
                    value={ContactEmail}
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
                    value={ContactPhone}
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
                    Edit Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      ) : null}
    </>
  );
  

};

export default EditJobPage;
