import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Heading from "./Heading";
import { startRegister } from "../slices/auth"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { startRestoreUser } from "../slices/auth"

const RegisterPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector(authState => authState.auth)

  const onSubmit = (e) => {
    e.preventDefault()
    onStatusChange({ statusMessage: "Creating new account...", isError: false })
    dispatch(startRegister({
      email: e.target[0].value,
      password: e.target[1].value
    }))
  }

  const onStatusChange = ({ statusMessage, isError }) => {
    const statusDiv = document.getElementById("status")
    statusDiv.innerText = statusMessage
    if (isError) {
      statusDiv.classList.add("status-err")
    } else {
      statusDiv.classList.remove("status-err")
    }
  }

  useEffect(() => {
    if (auth.userID) {
      navigate("/app/dashboard")
    } else { dispatch(startRestoreUser()) }
    if (auth.err) {
      onStatusChange({ statusMessage: auth.err.replace("Firebase: ", "").replace("auth/", ""), isError: true })
    }
  })

  return (
    <div className="box-layout">
      <div className="box-layout__box">
        <Heading />
        <div id="status">Create new account to continue</div>
        <form onSubmit={onSubmit}>
          <input
            className="text-input"
            type="text"
            placeholder="Email"
            autoFocus
          />
          <br></br>
          <input
            className="text-input"
            type="password"
            placeholder="Password"
          />

          <br></br>
          <button className="button" type="submit">Create Account</button>
        </form>

      </div>
    </div>
  )
}

export default RegisterPage