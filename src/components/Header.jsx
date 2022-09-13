import React from "react"
import { NavLink, Outlet } from "react-router-dom"
import Heading from "./Heading"

const Header = (props) => (
  <>
    <header>
      <Heading />
      <HeaderLinks pageList={{
        Dashboard: "dashboard",
        Create: "create",
        Help: "help"
      }} />
    </header>
    <Outlet />
  </>
)

const HeaderLinks = (props) => (
  <div>
    <ul>
      {Object.entries(props.pageList).map(([pageName, pageRef]) => (
        <li key={pageName}>
          <NavLink to={pageRef}>{pageName}</NavLink>
        </li>
      ))}
    </ul>
  </div>
)

export default Header