import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Heading from "./Heading";
import { startLogin } from "../slices/auth"
import { useEffect } from "react";

const LoginPage = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    status: "Log in to continue"
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector(state => state.auth)

  const onChangeEmail = (e) => {
    setState((prev) => ({ ...prev, email: e.target.value }))
  }
  const onChangePassword = (e) => {
    setState((prev) => ({ ...prev, password: e.target.value }))
  }
  const onStatusChange = (newStatus) => {
    setState((prev) => ({ ...prev, status: newStatus }))
  }

  useEffect(() => {
    if (auth.userCreds) {
      navigate("/app/dashboard")
    }
  })

  const onSubmit = (e) => {
    e.preventDefault()
    onStatusChange("Logging in...")
    dispatch(startLogin({
      email: state.email,
      password: state.password
    })).then(() => { navigate("/app/dashboard") })
  }

  return (
    <div>
      <Heading />
      <div>{state.status}</div>
      <br></br>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Email"
          autoFocus
          value={state.email}
          onChange={onChangeEmail}
        />
        <br></br>
        <input
          type="password"
          placeholder="Password"
          value={state.password}
          onChange={onChangePassword}
        />

        <br></br>
        <button type="submit">Log in</button>
        <br></br>
        <br></br>
        <Link to="/register">Register a new account</Link>
      </form>
    </div>
  )
}

export default LoginPage