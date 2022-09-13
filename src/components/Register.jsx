import React from "react";
import { useDispatch } from "react-redux";
import Heading from "./Heading";
import { startRegister } from "../slices/auth"

const RegisterPage = () => {
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(startRegister({}))
  }
  return (
    <div>
      <Heading />
      <form onSubmit={() => {
        console.log("This will be onSubmit")
      }}>
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