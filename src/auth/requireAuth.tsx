import { useLocation, Navigate, Outlet, useSearchParams } from "react-router-dom";

import { useSelector } from "react-redux";

import { RootState } from "../store";
import Unauthorized from "../components/Unauthorized";

interface requireAuthType {

  allowedRoles: number[]
}


const requireAuth = ({ allowedRoles }: requireAuthType) => {

  const currentRoles = useSelector((state: RootState) => state.auth.roles)

  const user = useSelector((state: RootState) => state.auth.username)
  const location = useLocation()

  const [searchParams] = useSearchParams()
  const isEditor = searchParams.get('editor') === 'true';

  const allowed=currentRoles?.map((role) => allowedRoles?.includes(role)).find((value) => value === true)
  return (

    // /The replace ensures that the protected page doesn’t remain in the browser history, so the user can’t navigate back to it without logging in first.
     allowed? <Outlet /> : user? <Unauthorized/> : <Navigate to={isEditor ? '/login?editor=true' : '/login'} state={{ from: location }} replace />
  )
}

export default requireAuth