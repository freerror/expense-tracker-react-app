import React from "react"
import { NavLink } from "react-router-dom"

const Header = () => (
  <header>
    <h1>Expense Tracker</h1>
    <HeaderLinks pageList={{
      Dashboard: "/",
      Create: "create",
      Help: "help"
    }} />
  </header>
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