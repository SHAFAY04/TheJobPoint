

import { GiCheckMark } from 'react-icons/gi'
import { square } from 'ldrs'

square.register()

import { useSelector } from 'react-redux'
import { RootState } from '../store'
const Success = ({ isLogin }: { isLogin: boolean }) => {
  const user=useSelector((State:RootState)=>State.auth.username)
  square.register
    return (
<div className='bg-emerald-500 py-20 my-48  mx-auto  max-w-md shadow-2xl'>  <GiCheckMark color='white' className='text-9xl bounce-icon bg-lime-400 rounded-full p-4 m-auto'/>
  <h1 className='text-center mt-8 mx-6 break-words text-white  font-bold font-serif text-4xl '>{isLogin?`WELCOME ${user}`:`Registered Successfully!`}!</h1>
  {/* items-center aligns items vertically justify-center alligns items horizontally */}
  <div className='flex justify-center items-center gap-4 mt-6'>
    <l-square 
      size="30"
      stroke="5"
      stroke-length="0.25"
      bg-opacity="0"
      speed="1.2"
      color="white" 
    ></l-square>
    <p className=' text-white font-serif text-xl text-center'>
      You're being redirected!
    </p>
  </div>
   </div>
    )
}

export default Success