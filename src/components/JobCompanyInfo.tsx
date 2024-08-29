

interface JobKeys{
  id:string|undefined
  type: string;
  title: string;
  description: string;
  salary: string;
  location: string;
  company:{
    name:string,
    description:string,
    contactPhone:string,
    contactEmail:string,
  }
}

const JobCompanyInfo = ({job}:{job:JobKeys}) => {
  return (
    <>
    <div className=' p-6 bg-white rounded-xl shadow-2xl'>

<p className='  text-xl font-bold mb-6'>Company Info</p>
<h1 className='text-3xl underline'>{job.company.name}</h1>
<p className='my-2 '>{job.company.description}</p>
<hr className="my-4"></hr>
<h3 className="text-xl">Contact Email:</h3>
<p className="my-2  bg-emerald-100 p-2 font-bold">
  {job.company.contactEmail}
</p>
<h3 className="text-xl">Contact Phone:</h3>
<p className="my-2 bg-emerald-100 p-2 font-bold">{job.company.contactPhone}</p>
</div></>
  )
}

export default JobCompanyInfo