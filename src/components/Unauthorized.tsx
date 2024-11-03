import { Link } from 'react-router-dom'
import unAuth from '../assets/images/image.png'

const Unauthorized = () => {
  return (
   <div className='bg-emerald-200 py-40 h-screen overflow-x-hidden overflow-y-hidden'>
    <div className='  bg-green-300 pl-32 md:pl-40 md:items-center pt-20 flex flex-row justify-center mx-5 md:mx-20 lg:mx-96 -space-x-3 md:-space-x-0'>

<div className=' md:max-w-96 pb-20'>
        <h1 className='text-3xl md:text-5xl font-serif mb-8 '>UNAUTHORIZED!</h1>
        <p className='text-md md:text-xl'>OOPS! You don't have permissions for this page. Want to hire?  <Link to={'/register?editor=true'} className='underline'>CLICK HERE</Link> to List your job right now by registering as an Employer!</p>
        </div>
        
          <img src={unAuth} className='pb-12 md:pb-0 pr-20 h-60 md:h-96' alt="Img here" />
      
    </div>
   </div>
  )
}

export default Unauthorized