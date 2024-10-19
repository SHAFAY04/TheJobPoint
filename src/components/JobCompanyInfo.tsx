

interface JobKeys{
  employer:string
  jobid:string
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

interface JobCompanyInfoProps {
  job: JobKeys;
}

const JobCompanyInfo = ({ job }: JobCompanyInfoProps) => {

  return (
    <>
    <div className=' p-6 bg-white rounded-xl shadow-2xl'>

<p className='  text-xl font-bold mb-6'>Company Info</p>
<h1 className='text-3xl underline'>{job.company.name}</h1>
<p className='my-2 '>{job.company.description}</p>
<hr className="my-4"></hr>
<h3 className="text-xl">Contact Email:</h3>
<p className=" bg-emerald-100 p-2 font-bold break-words">
  {job.company.contactemail}
</p>
<h3 className="text-xl">Contact Phone:</h3>
<p className="my-2 bg-emerald-100 p-2 font-bold">{job.company.contactphone}</p>
</div></>
  )
}

export default JobCompanyInfo