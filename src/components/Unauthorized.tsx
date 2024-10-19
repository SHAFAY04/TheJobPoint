import React from 'react'
import { Link } from 'react-router-dom'
import unAuth from '../assets/images/image.png'

const Unauthorized = () => {
  return (
   <div className='bg-emerald-200 py-40 h-screen'>
    <div className=' max-w-3xl mx-auto bg-green-300 pl-10  pt-20 flex flex-row items-center'>

<div className='max-w-96 pb-20'>
        <h1 className='text-5xl font-serif mb-8 '>UNAUTHORIZED!</h1>
        <p className='text-xl'>OOPS! You don't have permissions for this page. Want to hire?  <Link to={'/register?editor=true'} className='underline'>CLICK HERE</Link> to List your job right now by registering as an Employer!</p>
        </div>
        
          <img src={unAuth} className='h-96' alt="Img here" />
      
    </div>
   </div>
  )
}

export default Unauthorized