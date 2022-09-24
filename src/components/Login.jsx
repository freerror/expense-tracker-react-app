import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Heading from "./Heading";
import { startLogin, startRestoreUser } from "../slices/auth"

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [state, setState] = useState({
    email: "",
    password: "",
    status: "Log in to continue"
  })
  const auth = useSelector(authState => authState.auth)

  const onChangeEmail = (e) => {
    setState((prev) => ({ ...prev, email: e.target.value }))
  }
  const onChangePassword = (e) => {
    setState((prev) => ({ ...prev, password: e.target.value }))
  }
  const onStatusChange = ({ statusMessage, isError }) => {
    console.log(statusMessage, isError)
    const statusDiv = document.getElementById("status")
    statusDiv.innerText = statusMessage
    if (isError) {
      statusDiv.classList.add("status-err")
    } else {
      statusDiv.classList.remove("status-err")
    }
  }
  const onSubmit = (e) => {
    e.preventDefault()
    onStatusChange({ statusMessage: "Logging in...", isError: false })
    dispatch(startLogin({
      email: state.email,
      password: state.password
    }))
  }

  useEffect(() => {
    if (auth.userID) {
      navigate("/app/dashboard")
    } else { dispatch(startRestoreUser()) }
    if (auth.err) {
      if (auth.err.includes("user-not-found"))
        onStatusChange({ statusMessage: "The email address is not recognized", isError: true })
      else if (auth.err.includes("wrong-password"))
        onStatusChange({ statusMessage: "The password was incorrect", isError: true })
      else
        onStatusChange({ statusMessage: auth.err.replace("Firebase: ", "").replace("auth/", ""), isError: true })
    }
  })

  return (
    <div className="box-layout">
      <div className="box-layout__box">
        <div className="box-layout__heading">
          <Heading />
        </div>
        <div id="status">Log in to continue</div>
        <form onSubmit={onSubmit}>
          <input
            className="text-input"
            type="text"
            placeholder="Email"
            autoFocus
            value={state.email}
            onChange={onChangeEmail}
          />
          <br></br>
          <input
            className="text-input"
            type="password"
            placeholder="Password"
            value={state.password}
            onChange={onChangePassword}
          />
          <br></br>
          <button type="submit" className="button">Log in</button>
          <br></br>
          <Link to="/register">Register a new account</Link>
        </form>
      </div>
    </div>
  )
}

export default LoginPage