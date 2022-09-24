import React from "react"
import { useDispatch } from "react-redux"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { startLogout } from "../slices/auth"
import Heading from "./Heading"

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogout = () => {
    dispatch(startLogout()).then(() => { navigate("/") })
  }

  return (
    <>
      <header className="header">
        <div className="content-container">
          <div className="header__content">
            <Link className="header__title" to="dashboard" >
              <Heading />
            </Link>
            <button className="button button--link" onClick={onLogout}>Sign out</button>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  )
}

export default Header