import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { startRestoreUser } from "../slices/auth"

const PrivateRoutes = () => {
  const dispatch = useDispatch()
  dispatch(startRestoreUser())
  const auth = useSelector(state => state.auth.userID)

  return (
    auth ? <Outlet /> : <Navigate to="/" />
  )
}

export default PrivateRoutes