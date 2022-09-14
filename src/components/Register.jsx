import React from "react";
import { useDispatch } from "react-redux";
import Heading from "./Heading";
import { startRegister } from "../slices/auth"
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(startRegister({
      email: e.target[0].value,
      password: e.target[1].value
    })).then((check) => {
      // console.log(check.message)
      // navigate("/app/dashboard")
    }).catch((check) => {
      // console.log(check)
    })
  }
  return (
    <div>
      <Heading />
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Username"
          autoFocus
        />
        <br></br>
        <input
          type="password"
          placeholder="Password"
        />

        <br></br>
        <button type="submit">Create Account</button>
      </form>
    </div>
  )
}

export default RegisterPage