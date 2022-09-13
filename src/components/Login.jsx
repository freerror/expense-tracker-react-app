import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Heading from "./Heading";
import { startLogin } from "../slices/auth"

const LoginPage = () => {
  const [state, setState] = useState({
    email: "",
    password: ""
  })

  const dispatch = useDispatch()

  const onChangeEmail = (e) => {
    setState((prev) => ({ ...prev, email: e.target.value }))
  }
  const onChangePassword = (e) => {
    setState((prev) => ({ ...prev, password: e.target.value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(startLogin({
      email: state.email,
      password: state.password
    }))
  }

  return (
    <div>
      <Heading />
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
        <Link to="/register">Register a new account</Link>
      </form>
    </div>
  )
}

export default LoginPage