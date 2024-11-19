import logo from '../assets/images/Scrw-modified.png'
import { NavLink } from 'react-router-dom'
import useWindowResize from '../hooks/useWindowResize'
import { FaLaptop, FaSignOutAlt, FaTabletAlt } from 'react-icons/fa'
import { FaMobileScreen } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useLogOutMutation } from '../api/authApiSlice'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit/react'
import { toast } from 'react-toastify'

const Navbar = () => {
  interface LinkClassProps {
    isActive: boolean;
  }
  const linkClass = ({ isActive }: LinkClassProps) => 
    isActive 
      ? 'bg-black text-white hover:bg-gray-900 rounded-md px-1 md:px-3 py-2' 
      : 'text-white hover:bg-gray-900 rounded-md px-3 py-2';

  const { width } = useWindowResize();
  const currentAccessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [logOut] = useLogOutMutation();

  async function handleLogout() {
    try {
      await logOut().unwrap();
      window.location.reload();
    } catch (e) {
      if ('status' in (e as FetchBaseQueryError)) {
        toast.error((e as FetchBaseQueryError).status);
      } else if ('message' in (e as SerializedError)) {
        toast.error((e as SerializedError).message);
      }
    }
  }

  return (
    <nav className="bg-emerald-700 border-b border-emerald-500">
      <div className="px-3 lg:px-8">
        <div className="flex items-center justify-center md:justify-between h-24">
          {/* Logo and Brand Name */}
          <NavLink className="flex items-center " to="/">
            <img className="h-12 mr-5 md:mr-0 md:h-14 w-auto" src={logo} alt="React Jobs" />
            <span className="hidden md:block text-white text-xl font-bold ml-2">TheJobPoint</span>
          </NavLink>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1 md:space-x-4">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/jobs" className={linkClass}>Jobs</NavLink>
            <NavLink to="/add-job" className={linkClass}>Add Job</NavLink>

            {/* Device Icon Based on Screen Width */}
            <div>
              {(width as number)< 768 ? (
                <FaMobileScreen className="text-3xl hidden text-white" />
              ) : (width as number)< 1024 ? (
                <FaTabletAlt className="text-3xl text-white" />
              ) : (
                <FaLaptop className="text-3xl text-white" />
              )}
            </div>

            {/* Logout Icon */}
            {currentAccessToken && (
              <FaSignOutAlt
                className="text-4xl text-white cursor-pointer hover:text-red-500 ml-4"
                onClick={handleLogout}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
