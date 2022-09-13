import React from "react"
import { Link } from "react-router-dom"

const NotFoundPage = () => (
  <div>
    <h2>404!</h2>
    <ul>
      <li><Link to="/">Login</Link></li>
      <li><Link to="/app/dashboard">Dashboard</Link></li>
    </ul>
  </div>
)

export default NotFoundPage