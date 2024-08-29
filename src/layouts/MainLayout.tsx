import Navbar from "../components/Navbar"
//in the layout you have to do this go get that
//child router that was not displaying
import { Outlet } from 'react-router-dom'
//npm i react-toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
const MainLayout = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
      {/* this ToastContainer provides a cute UI on the success or error of some tasks we initialize them like this in the mainLayouts or main pages whatever your main is and then the toast.success() method on which ever component you wanna use it */}
      <ToastContainer/>
    </>
  )
}

export default MainLayout