import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const PrivateRoutes = () => {
  const auth = useSelector(state => state.auth.userID)

  return (
    auth ? <Outlet /> : <Navigate to="/" />
  )
}

export default PrivateRoutes