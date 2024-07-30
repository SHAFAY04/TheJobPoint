import React from 'react'
import Navbar from "../components/Navbar"
//in the layout you have to do this go get that
//child router that was not displaying
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default MainLayout