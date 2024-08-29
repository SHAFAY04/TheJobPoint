import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Back = () => {
  return (
    <>
    <div className='bg-white h-16 pl-10 pt-5 w-full'>
        <Link to='/jobs' className='flex items-center px-4'>
        <FaArrowLeft className='text-emerald-500 mr-3 mt-[2px] size-5'/>
           Back to Job Listings
           </Link>
        </div>
    </>
  )
}

export default Back