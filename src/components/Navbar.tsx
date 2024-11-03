import logo from '../assets/images/Scrw-modified.png'
import { NavLink} from 'react-router-dom'
import useWindowResize from '../hooks/useWindowResize'
import {FaLaptop, FaSignOutAlt, FaTabletAlt } from 'react-icons/fa'
import { FaMobileScreen } from 'react-icons/fa6'
import {  useSelector } from 'react-redux'
import {  RootState } from '../store'
import { useLogOutMutation } from '../api/authApiSlice'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit/react'
import { toast } from 'react-toastify'

const Navbar = () => {
  interface LinkClassProps {
    isActive: boolean;
  }
  const linkCLass=({isActive}:LinkClassProps)=> isActive?' bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2':'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'

  const {width}=useWindowResize()

  const CurrentAccessToken=useSelector((state:RootState)=>state.auth.accessToken)

  const [logOut]=useLogOutMutation()

async function handleLogout(){

  try{
    
    await logOut().unwrap()
   window.location.reload()

  }
  catch(e){
    if ('status' in (e as FetchBaseQueryError)) {
      console.log((e as FetchBaseQueryError).data)
     toast.error((e as FetchBaseQueryError).status)
    }
    else {

      if ('message' in (e as SerializedError)) {
        console.log((e as SerializedError).message)
       toast.error((e as SerializedError).message)
      }
    }
  }
}

  return (
    <>
      <nav className="bg-emerald-700 border-b border-emerald-500">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between">
            <div
              className=" flex flex-1 items-center justify-center md:items-stretch md:justify-start"
            >
              {/* <!-- Logo --> */}
              {/*In react we use NavLink and Link tag instead of the 'a' tag and we use 'to' instead of href. NavLink component is designed for client-side routing within your React app, not for linking to external URLs.*/}
              <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
                <img
                  className="h-16 w-auto mt-0 mr-2"
                  //here we are importing our logo and using it
                  src={logo}
                  alt="React Jobs"
                />
                <span className="hidden md:block text-white text-2xl font-bold ml-2"
                >TheJobPoint</span>
              </NavLink>
              <div className="md:ml-auto">
                <div className="flex space-x-4 mt-3">
                  <NavLink
                    to="/"
                   className={linkCLass}
                  >Home</NavLink>
                  <NavLink
                    to="/jobs"
                    className={linkCLass}
                    >Jobs</NavLink>
                  <NavLink
                    to="/add-job"
                    className={linkCLass}
                    >Add Job</NavLink>
                    <NavLink
                    to="/hooks"
                    className={linkCLass}
                    >Hooks</NavLink>
                      {(width as number)<768?<FaMobileScreen className='text-4xl text-white'/>:(width as number)<1024?<FaTabletAlt className='text-4xl text-white'/>:<FaLaptop className='text-4xl text-white'/>}
                      {CurrentAccessToken?<FaSignOutAlt className='text-4xl hover:cursor-pointer hover:text-white' onClick={handleLogout}/>:null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar