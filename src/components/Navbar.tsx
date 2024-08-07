import React from 'react'
import logo from '../assets/images/logo.png'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  interface LinkClassProps {
    isActive: boolean;
  }
  const linkCLass=({isActive}:LinkClassProps)=> isActive?' bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2':'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
  return (
    <>
      <nav className="bg-emerald-700 border-b border-emerald-500">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div
              className="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
            >
              {/* <!-- Logo --> */}
              {/*In react we use NavLink and Link tag instead of the 'a' tag and we use 'to' instead of href. NavLink component is designed for client-side routing within your React app, not for linking to external URLs.*/}
              <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
                <img
                  className="h-10 w-auto"
                  //here we are importing our logo and using it
                  src={logo}
                  alt="React Jobs"
                />
                <span className="hidden md:block text-white text-2xl font-bold ml-2"
                >React Jobs</span>
              </NavLink>
              <div className="md:ml-auto">
                <div className="flex space-x-4">
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