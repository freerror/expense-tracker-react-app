import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { startRestoreUser } from "../slices/auth"

const PrivateRoutes = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth.userID)
  if (!auth) {
    dispatch(startRestoreUser())
  }

  return (
    auth ? <Outlet /> : <Navigate to="/" />
  )
}

export default PrivateRoutes