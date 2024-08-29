
interface Job {
  id: string|undefined
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

type jobIntroProps={
  job:Job,
}
const JobDesc = (job:jobIntroProps) => {
  return (
   <>
   <div className='mt-6 bg-white  p-6 rounded-lg shadow-2xl'>
          <h3 className='text-emerald-600 text-lg font-bold mb-6'>Job description</h3>
          <p className='mb-4'>{job.job.description}</p>
          <h3 className='text-emerald-600 text-lg font-bold mb-2'>Salary</h3>
          <p className='mb-4'>{job.job.salary}</p>

          </div>
   </>
  )
}

export default JobDesc