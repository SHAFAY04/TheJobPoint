interface Job{
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
type jobDescProps={
  job:Job,
}
const JobDesc = ({job}:jobDescProps) => {
  return (
   <>
   <div className='mt-6 bg-white  p-6 rounded-lg shadow-2xl'>
          <h3 className='text-emerald-600 text-lg font-bold mb-6'>Job description</h3>
          <p className='mb-4'>{job.jobdescription}</p>
          <h3 className='text-emerald-600 text-lg font-bold mb-2'>Salary</h3>
          <p className='mb-4'>{job.salary}</p>

          </div>
   </>
  )
}

export default JobDesc