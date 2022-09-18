import React from "react"
import { useDispatch } from "react-redux"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
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
      <header>
        <Heading />
        <button onClick={onLogout}>Logout</button>
        <HeaderLinks {...{ onLogout }} pageList={{
          Dashboard: "dashboard",
          Create: "create",
          Help: "help",
        }} />
      </header>
      <Outlet />
    </>
  )
}

const HeaderLinks = (props) => (
  <div>
    <ul>
      {Object.entries(props.pageList).map(([pageName, pageRef]) => (
        <li key={pageName}>
          <NavLink to={pageRef}>{pageName}</NavLink>
        </li>
      ))}
      <br></br>
    </ul>
  </div>
)

export default Header