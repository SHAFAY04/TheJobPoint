import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import logo from '../assets/images/logo.png'
import { NavLink } from 'react-router-dom'
import ToggleDarkMode from './toggledarkmode'
import useWindowResize from '../hooks/useWindowResize'
import { FaMobile,FaTablet,FaLaptop, FaMobileAlt, FaTabletAlt } from 'react-icons/fa'
import { FaMobileRetro, FaMobileScreen, FaTabletButton, FaTabletScreenButton } from 'react-icons/fa6'

const Navbar = () => {
  interface LinkClassProps {
    isActive: boolean;
  }
  const linkCLass=({isActive}:LinkClassProps)=> isActive?' bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2':'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
  const[theme,setTheme]=useState('bg-black-300')
  const prevThemeRef = useRef<string>();

  useEffect(() => {
    // Check if the theme has changed
    if (prevThemeRef.current !== theme) {
      if (document.body.classList.contains('bg-emerald-300')) {
        document.body.classList.remove('bg-emerald-300');
        document.body.classList.add('bg-black');
      } else {
        document.body.classList.add('bg-emerald-300');
      }

      // Update the previous theme reference
      prevThemeRef.current = theme;
    }
  }, [theme]);

  const {width}=useWindowResize()
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
                      <button onClick={()=>theme==='bg-emerald-300'?setTheme('bg-black'):setTheme('bg-emerald-300')}><ToggleDarkMode /></button>
                      {(width as number)<768?<FaMobileScreen className='text-4xl text-white'/>:(width as number)<1024?<FaTabletAlt className='text-4xl text-white'/>:<FaLaptop className='text-4xl text-white'/>}
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