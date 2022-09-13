import React from "react";
import Heading from "./Heading";

const LoginPage = () => {
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
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}

export default LoginPage